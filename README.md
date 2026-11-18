# Common Ground: A Global Look at AI Safety

A free, public reference on AI safety around the world. Pick a country on the globe to see what people there think about AI, what their government has done, what the people building AI there care about, and the news that matters for AI safety. Every statement links to its source, and every source is labelled by origin (inside or outside the country), type and language.

Editor: James Armitage. Status: **pilot preview**. Content is a draft until the editor approves it.

- [Editorial charter](editorial/charter.md): the neutrality aim, the source policy, and what we will and won't publish
- [Guardrails](editorial/guardrails.md): the rules the build enforces and the standing instructions for every drafting run
- [Contributing](CONTRIBUTING.md): how to suggest sources and corrections, review a country, or check a translation

## How it works

Each country is one YAML file in `content/countries/<code>/profile.yaml`. The schema in `src/lib/schema.mjs` describes every field. A build cannot succeed if a statement has no source, a source is missing its date or labels, a culture section relies mostly on outside sources without saying so, or a "recent development" is older than the allowed window.

```
content/
  areas.yaml                  the pilot areas, their map shapes and languages
  countries/gb/profile.yaml   one profile per area
editorial/
  charter.md, guardrails.md   the rules, in words
  flagged-terms.yml           words that tend to judge rather than describe (warnings)
  sensitive-topics.yml        topics that need a second reviewer
scripts/
  validate.mjs                the editorial checks
  check-sources.mjs           link check and quote-in-source check (needs open web access, runs in CI)
src/                          the Astro site: globe, cards, country pages, method page
```

## Running it

Requires Node 20 or later.

```sh
npm ci
npm run validate          # editorial checks; add --markdown for a report file
npm run check-sources     # link and quote check (needs open web access)
npm run dev               # local site at http://localhost:4321
npm run build             # validate, then build the static site into dist/
```

The built site uses relative links, so `dist/` can be served from any host or folder.

## Licence

Confirmed by the editor on 18 November 2026: code is under the [MIT licence](LICENSE). Written content in `content/` and `editorial/` is under [Creative Commons Attribution 4.0](LICENSE-CONTENT.md). Quotes and figures from sources remain the work of their authors. Country shapes are from [Natural Earth](https://www.naturalearthdata.com/) via world-atlas, in the public domain.

Borders are shown for navigation only and imply no position on any disputed territory.
