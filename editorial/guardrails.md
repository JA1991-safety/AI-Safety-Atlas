# Guardrails

The rules that keep drafting safe to automate. Publishing is never automated: every change arrives as a pull request for the editor.

## What the build enforces

`npm run validate` runs on every pull request. Errors block the build; warnings go to the editor.

| Rule | How it's checked | Result |
|---|---|---|
| No source, no claim | Every statement, figure, quote, news item and facet must reference at least one source id that exists in the profile | Error |
| Complete sources | Each source has an https URL, publisher, accessed date, origin, type and language | Error |
| Recent means recent | A news item marked `development` must be no more than **90 days** old on the section's last check date. Older items must be marked `foundational`. Items up to 30 days old show a "New" badge. | Error |
| No future dates | Section check dates can't be in the future, and no news item can be dated after its section was checked | Error |
| Inside voices on culture | At least **60%** of a culture section's sources are from inside the country, or the section sets `limited_inside_sources: true`, which shows a notice on the page | Error |
| Unused sources | Every listed source is cited somewhere | Warning |
| Judgement words | Words from `flagged-terms.yml` in our own voice (quotes are exempt) | Warning |
| Sensitive topics | Terms from `sensitive-topics.yml` mean a second reviewer is needed | Listed in the report |
| Links and quotes | `npm run check-sources` loads every source and checks every quote appears in it. Runs in CI on each pull request (advisory) and weekly (strict). | Error or warning |

The 90-day window is a change from the plan's 30 days. The weekly routine will keep the window fresh, but a first draft needs enough recent items to be useful. Change `DEVELOPMENT_WINDOW_DAYS` in `src/lib/load.mjs` to tighten it.

## Standing instructions for every drafting run

These go into the drafting routine's prompt.

1. Use neutral, descriptive language. Describe what a government or company did and said; don't characterise motives.
2. Every claim needs a source with URL, date, origin, type and language. No source, no claim.
3. Prefer primary sources (the law text, the poll release, the official statement) over reporting about them.
4. For culture and industry, look first for sources from inside the country, in its own languages.
5. Present notable disagreement inside a country as disagreement, rather than picking a side.
6. Use the same structure and the same level of detail for every country. Where evidence is thin, say so plainly instead of padding.
7. "Why it matters for AI safety" lines explain the link to safety, not whether the development is good or bad.
8. Quote only words that appear in the source. Never paraphrase inside quotation marks.
9. Report polls with fieldwork dates, sample size and the question as asked.
10. Don't make claims about Anthropic or its models in our own voice. If they are relevant, quote others and flag the item for a second reviewer.
11. Never auto-merge. Open a pull request with a summary of what changed and anything flagged.

## Review tiers

| Content | Updated | Review |
|---|---|---|
| News | Weekly | Light: the editor checks the headline, why it matters, and the source |
| Frameworks and regulation | Monthly | Medium: each change checked against the primary source |
| Public attitudes | When new polls appear | Medium: figure, sample and wording checked against the release |
| Culture and industry | Quarterly | Strict: the editor and a local reviewer read it in full |
| Sensitive topics | As needed | Strict: the editor and a second reviewer; sources from more than one side |

## Review states

Each section records one of: `draft` (prepared, not yet reviewed), `editor_approved`, or `locally_reviewed` (approved by the editor and a reviewer from the country). A profile shows a "Draft" label until `editor_approved: true`.
