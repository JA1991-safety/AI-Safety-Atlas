// Loads, validates and enriches all content. Used by the site build and by scripts/validate.mjs.
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { Profile, Area } from './schema.mjs';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const CONTENT = path.join(ROOT, 'content');
const EDITORIAL = path.join(ROOT, 'editorial');

// JSON_SCHEMA keeps dates as plain strings, so 2026-11-18 is not turned into a Date object.
const readYaml = (file) => yaml.load(fs.readFileSync(file, 'utf8'), { schema: yaml.JSON_SCHEMA });

export const CULTURE_MIN_INSIDE_SHARE = 0.6;
export const DEVELOPMENT_WINDOW_DAYS = 90; // "development" news must be this recent at the last check
export const NEW_BADGE_DAYS = 30; // shown as "new" on the site

export function loadAreas() {
  const raw = readYaml(path.join(CONTENT, 'areas.yaml'));
  return raw.map((a) => Area.parse(a));
}

function profilePath(code) {
  return path.join(CONTENT, 'countries', code.toLowerCase(), 'profile.yaml');
}

export function hasProfile(code) {
  return fs.existsSync(profilePath(code));
}

const toDate = (d) => new Date(d.length === 4 ? `${d}-07-01` : d.length === 7 ? `${d}-15` : d);
const daysBetween = (a, b) => Math.round((toDate(b) - toDate(a)) / 86400000);

// Collect every source id a statement-like object refers to.
function refs(obj) {
  if (!obj) return [];
  if (Array.isArray(obj)) return obj.flatMap(refs);
  const out = [];
  if (Array.isArray(obj.sources)) out.push(...obj.sources);
  if (typeof obj.source === 'string') out.push(obj.source);
  return out;
}

// Every string in the profile that a reader will see, with a path for error messages.
function* textFields(node, at = '') {
  if (typeof node === 'string') {
    yield [at, node];
  } else if (Array.isArray(node)) {
    for (let i = 0; i < node.length; i++) yield* textFields(node[i], `${at}[${i}]`);
  } else if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) {
      if (['sources', 'source', 'url', 'id', 'accessed', 'published', 'date', 'checked', 'language'].includes(k)) continue;
      yield* textFields(v, at ? `${at}.${k}` : k);
    }
  }
}

function loadWordLists() {
  const flagged = readYaml(path.join(EDITORIAL, 'flagged-terms.yml'));
  const sensitive = readYaml(path.join(EDITORIAL, 'sensitive-topics.yml'));
  return { flagged: flagged.en ?? [], sensitive: sensitive.topics ?? [] };
}

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const wordRe = (term) => new RegExp(`(^|[^\\p{L}])${escapeRe(term)}([^\\p{L}]|$)`, 'iu');

/**
 * Validate one profile beyond the schema: references, editorial rules, word lists.
 * Returns { errors: string[], warnings: string[], sensitive: string[] }.
 */
export function checkProfile(p) {
  const errors = [];
  const warnings = [];
  const sensitiveHits = new Set();
  const ids = new Set();
  for (const s of p.sources) {
    if (ids.has(s.id)) errors.push(`Duplicate source id "${s.id}"`);
    ids.add(s.id);
  }

  // 1. No source, no claim: every reference must resolve.
  const used = new Set();
  const check = (where, list) => {
    for (const id of list) {
      used.add(id);
      if (!ids.has(id)) errors.push(`${where}: cites unknown source "${id}"`);
    }
  };
  check('summary.overview', refs(p.summary.overview));
  check('summary.regulation_line', refs(p.summary.regulation_line));
  check('facets', [
    ...refs(p.facets.safety_institute),
    ...refs(p.facets.frontier_developers),
    ...refs(p.facets.commitments),
  ]);
  check('attitudes', [...refs(p.attitudes.statements), ...p.attitudes.headline_figures.map((f) => f.source)]);
  check('regulation', refs(p.regulation.items));
  check('culture', [...refs(p.culture.summary), ...refs(p.culture.own_words), ...refs(p.culture.outside_analysis)]);
  check('news', refs(p.news.items));
  for (const id of ids) if (!used.has(id)) warnings.push(`Source "${id}" is listed but never cited`);

  // 2. Culture leans on voices from inside the country.
  const mix = cultureMix(p);
  if (mix.total > 0 && mix.insideShare < CULTURE_MIN_INSIDE_SHARE && !p.culture.limited_inside_sources) {
    errors.push(
      `Culture section: ${Math.round(mix.insideShare * 100)}% of its sources are from inside the country (minimum ${CULTURE_MIN_INSIDE_SHARE * 100}%). Add inside sources or set limited_inside_sources: true so readers see the gap.`
    );
  }
  for (const q of p.culture.own_words) {
    if (q.original_language !== 'en' && !q.translation) errors.push(`Quote from ${q.speaker} is not in English and has no translation`);
  }

  // 3. News labelled "development" must be recent at the time of checking.
  for (const n of p.news.items) {
    const age = daysBetween(n.date, p.news.meta.checked);
    if (age < 0) errors.push(`News "${n.id}" is dated after the section was checked`);
    if (n.kind === 'development' && age > DEVELOPMENT_WINDOW_DAYS)
      errors.push(`News "${n.id}" is ${age} days old at last check; relabel it "foundational" or remove it`);
  }

  // 4. Section check dates cannot be in the future.
  const today = new Date().toISOString().slice(0, 10);
  for (const [name, sec] of Object.entries({ attitudes: p.attitudes, regulation: p.regulation, culture: p.culture, news: p.news })) {
    if (sec.meta.checked > today) errors.push(`${name}.meta.checked is in the future`);
  }

  // 5. Word lists: flag loaded terms and sensitive topics for the editor.
  const { flagged, sensitive } = loadWordLists();
  for (const [at, text] of textFields(p)) {
    if (at.startsWith('culture.own_words') && at.endsWith('.quote')) continue; // quotes are the speaker's words
    for (const term of flagged) {
      if (wordRe(term).test(text)) warnings.push(`Flagged term "${term}" in ${at}: "${text.slice(0, 90)}…"`);
    }
  }
  for (const [, text] of textFields(p)) {
    for (const topic of sensitive) {
      if (topic.terms.some((t) => wordRe(t).test(text))) sensitiveHits.add(topic.name);
    }
  }

  return { errors, warnings, sensitive: [...sensitiveHits] };
}

export function cultureMix(p) {
  const byId = new Map(p.sources.map((s) => [s.id, s]));
  const ids = new Set([...refs(p.culture.summary), ...refs(p.culture.own_words), ...refs(p.culture.outside_analysis)]);
  let inside = 0;
  let outside = 0;
  let international = 0;
  for (const id of ids) {
    const s = byId.get(id);
    if (!s) continue;
    if (s.origin === 'inside') inside++;
    else if (s.origin === 'outside') outside++;
    else international++;
  }
  const total = inside + outside + international;
  return { inside, outside, international, total, insideShare: total ? inside / total : 0 };
}

export function sourceMix(p) {
  const counts = { inside: 0, outside: 0, international: 0 };
  for (const s of p.sources) counts[s.origin]++;
  return counts;
}

/** Load one profile, parse it against the schema and add derived fields for the site. */
export function loadProfile(code) {
  const file = profilePath(code);
  const raw = readYaml(file);
  const parsed = Profile.safeParse(raw);
  if (!parsed.success) {
    const msg = parsed.error.issues.map((i) => `  ${i.path.join('.')}: ${i.message}`).join('\n');
    throw new Error(`${path.relative(ROOT, file)} does not match the schema:\n${msg}`);
  }
  const p = parsed.data;
  const news = [...p.news.items].sort((a, b) => (a.date < b.date ? 1 : -1));
  return {
    ...p,
    news: { ...p.news, items: news },
    derived: {
      topStories: news.filter((n) => n.kind === 'development').slice(0, 3),
      cultureMix: cultureMix(p),
      sourceMix: sourceMix(p),
      sourceIndex: Object.fromEntries(p.sources.map((s, i) => [s.id, i + 1])),
    },
  };
}

export function loadAll() {
  const areas = loadAreas();
  const profiles = {};
  for (const a of areas) if (hasProfile(a.code)) profiles[a.code] = loadProfile(a.code);
  return { areas, profiles };
}

export function isNew(date, ref = new Date().toISOString().slice(0, 10)) {
  return daysBetween(date, ref) <= NEW_BADGE_DAYS;
}
