#!/usr/bin/env node
// Checks every country profile against the schema and the editorial guardrails.
// Errors stop the build. Warnings and sensitive topics are listed for the editor.
// Usage: npm run validate            (all profiles)
//        npm run validate -- gb      (one profile)
//        npm run validate -- --markdown   (also write a review summary to validation-report.md)
import fs from 'node:fs';
import { loadAreas, loadProfile, hasProfile, checkProfile } from '../src/lib/load.mjs';

const args = process.argv.slice(2);
const only = args.filter((a) => !a.startsWith('--')).map((a) => a.toUpperCase());
const markdown = args.includes('--markdown');

let areas;
try {
  areas = loadAreas();
} catch (e) {
  console.error('content/areas.yaml is invalid:\n', e.message);
  process.exit(1);
}

let failed = false;
const report = ['# Validation report', ''];

for (const area of areas) {
  if (only.length && !only.includes(area.code)) continue;
  if (!hasProfile(area.code)) {
    if (only.length) console.log(`${area.code}: no profile yet`);
    continue;
  }
  let profile;
  try {
    profile = loadProfile(area.code);
  } catch (e) {
    failed = true;
    console.error(`✗ ${area.code}\n${e.message}\n`);
    report.push(`## ${area.name}`, '', '```', e.message, '```', '');
    continue;
  }
  const { errors, warnings, sensitive } = checkProfile(profile);
  const mark = errors.length ? '✗' : '✓';
  console.log(`${mark} ${area.code} ${area.name}: ${profile.sources.length} sources, ${errors.length} errors, ${warnings.length} warnings`);
  for (const e of errors) console.log(`   error: ${e}`);
  for (const w of warnings) console.log(`   check: ${w}`);
  if (sensitive.length) console.log(`   second reviewer needed (sensitive topics): ${sensitive.join(', ')}`);
  if (errors.length) failed = true;

  report.push(`## ${area.name} (${area.code})`, '');
  report.push(`- Sources: ${profile.sources.length}`);
  report.push(`- Culture sources from inside the country: ${profile.derived.cultureMix.inside} of ${profile.derived.cultureMix.total}`);
  report.push(`- Sensitive topics (need a second reviewer): ${sensitive.length ? sensitive.join(', ') : 'none'}`);
  report.push('', errors.length ? '### Errors' : '### Errors: none', '');
  for (const e of errors) report.push(`- ${e}`);
  report.push('', warnings.length ? '### For the editor to check' : '### For the editor to check: nothing flagged', '');
  for (const w of warnings) report.push(`- ${w}`);
  report.push('');
}

if (markdown) fs.writeFileSync('validation-report.md', report.join('\n'));
if (failed) {
  console.error('\nValidation failed. Fix the errors above before publishing.');
  process.exit(1);
}
console.log('\nValidation passed.');
