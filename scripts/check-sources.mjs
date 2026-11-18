#!/usr/bin/env node
// Source checker. Runs in CI (and anywhere with open web access).
//
//  1. Link check: every source URL must load. 404/410 and network failures are errors.
//     403/429/5xx are reported as warnings, because many official sites block automated requests.
//  2. Quote check: every "In their own words" quote must appear in the text of its source.
//     A quote that cannot be found is an error unless its source could not be fetched at all,
//     in which case it is listed for a person to check by hand.
//
// Usage: node scripts/check-sources.mjs [AREA] [--strict] [--markdown]
//   --strict    exit 1 on any error (CI on a schedule uses this)
//   --markdown  also write source-check-report.md

import fs from 'node:fs';
import { loadAreas, hasProfile, loadProfile } from '../src/lib/load.mjs';

const args = process.argv.slice(2);
const strict = args.includes('--strict');
const markdown = args.includes('--markdown');
const only = args.find((a) => !a.startsWith('--'))?.toUpperCase();

const TIMEOUT_MS = 20000;
const CONCURRENCY = 6;
const UA = 'Mozilla/5.0 (compatible; source-link-check/0.1)';

function normalise(text) {
  return text
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;|&#160;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;|&#34;|&ldquo;|&rdquo;|&#8220;|&#8221;/g, '"')
    .replace(/&#39;|&#x27;|&rsquo;|&lsquo;|&#8216;|&#8217;/g, "'")
    .replace(/&ndash;|&mdash;|&#8211;|&#8212;/g, '-')
    .replace(/[‘’‛′]/g, "'")
    .replace(/[“”‟″]/g, '"')
    .replace(/[–—−]/g, '-')
    .replace(/\s+/g, ' ')
    .toLowerCase()
    .trim();
}

// A quote may use an ellipsis for omitted words: each fragment must appear.
function quoteFragments(quote) {
  return normalise(quote)
    .replace(/^["']|["',.;:]+$/g, '')
    .split(/\.\.\.|…|\[[^\]]*\]/)
    .map((f) => f.trim().replace(/^["',.;:\s]+|["',.;:\s]+$/g, ''))
    .filter((f) => f.length >= 12);
}

async function fetchPage(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      signal: ctrl.signal,
      headers: { 'user-agent': UA, accept: 'text/html,application/xhtml+xml,application/pdf;q=0.8,*/*;q=0.5' },
    });
    const type = res.headers.get('content-type') ?? '';
    const body = type.includes('text') || type.includes('html') || type.includes('json') ? await res.text() : '';
    return { status: res.status, type, body, finalUrl: res.url };
  } catch (e) {
    return { status: 0, type: '', body: '', error: e.name === 'AbortError' ? 'timeout' : e.message };
  } finally {
    clearTimeout(timer);
  }
}

async function pool(items, fn) {
  const out = new Array(items.length);
  let i = 0;
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (i < items.length) {
        const n = i++;
        out[n] = await fn(items[n]);
      }
    }),
  );
  return out;
}

const areas = loadAreas().filter((a) => hasProfile(a.code) && (!only || a.code === only));
let errors = 0;
let warnings = 0;
const lines = ['# Source check', '', `Run ${new Date().toISOString().slice(0, 16).replace('T', ' ')} UTC`, ''];

for (const area of areas) {
  const p = loadProfile(area.code);
  console.log(`\n${area.code} ${area.name}: checking ${p.sources.length} sources`);
  lines.push(`## ${area.name}`, '');

  const results = await pool(p.sources, async (s) => ({ s, r: await fetchPage(s.url) }));
  const byId = new Map(results.map((x) => [x.s.id, x]));

  for (const { s, r } of results) {
    let level = 'ok';
    if (r.status === 0 || r.status === 404 || r.status === 410) level = 'error';
    else if (r.status >= 400) level = 'warning';
    if (level === 'ok') continue;
    const msg = `${s.id}: ${r.status || r.error} ${s.url}`;
    if (level === 'error') errors++;
    else warnings++;
    console.log(`  ${level === 'error' ? '✗' : '!'} link ${msg}`);
    lines.push(`- ${level === 'error' ? '**Link error**' : 'Link warning'}: \`${s.id}\` returned ${r.status || r.error}: ${s.url}`);
  }

  // Contact links are what readers act on, so check them too (as warnings, never errors).
  const contactLinks = (p.contacts?.items ?? []).flatMap((c) => [
    { label: c.name, url: c.url },
    ...c.links.map((l) => ({ label: `${c.name} (${l.label})`, url: l.url })),
  ]);
  for (const { label, url, r } of await pool(contactLinks, async (l) => ({ ...l, r: await fetchPage(l.url) }))) {
    if (r.status > 0 && r.status < 400) continue;
    warnings++;
    console.log(`  ! contact link ${label}: ${r.status || r.error} ${url}`);
    lines.push(`- Contact link warning: ${label} returned ${r.status || r.error}: ${url}`);
  }

  for (const q of p.culture.own_words) {
    const src = byId.get(q.source);
    const label = `"${q.quote.slice(0, 60)}${q.quote.length > 60 ? '…' : ''}" (${q.speaker})`;
    if (!src || !src.r.body || src.r.status >= 400) {
      warnings++;
      console.log(`  ! quote not checked, source unreadable: ${label}`);
      lines.push(`- Quote **not checked**, source could not be read automatically (check by hand): ${label}, \`${q.source}\``);
      continue;
    }
    const page = normalise(src.r.body);
    const missing = quoteFragments(q.quote).filter((f) => !page.includes(f));
    if (missing.length) {
      errors++;
      console.log(`  ✗ quote not found in source: ${label}`);
      lines.push(`- **Quote not found** in its source: ${label}, \`${q.source}\`. Missing: "${missing.join('" / "')}"`);
    }
  }
  lines.push('');
}

console.log(`\n${errors} errors, ${warnings} warnings`);
lines.push(`**${errors} errors, ${warnings} warnings.**`);
if (markdown) fs.writeFileSync('source-check-report.md', lines.join('\n') + '\n');
if (strict && errors) process.exit(1);
