# Contributing to Common Ground

Common Ground needs people who know a country from the inside. You don't need to write code or use GitHub to help.

## Ways to help

| Role | What you do | Time asked |
|---|---|---|
| Country reviewer | Read your country's culture and industry section each quarter and confirm it would feel fair to people there. Flag errors anywhere on the page. | About 2 hours a quarter |
| Country correspondent | Suggest news, polls and sources in your language, and propose "In their own words" quotes | About 1 hour a month |
| Translation reviewer | Spot-check machine translation in your language | About 1 hour a quarter |

We aim for two reviewers per country, ideally with different backgrounds (for example one from academia or civil society, one from industry or government), so that no one person's view becomes "the country's view".

## Quick contributions

- **Suggest a correction:** use the "Suggest a correction" link on any section, or [open a correction](../../issues/new?template=correction.yml).
- **Suggest a source:** [open a source suggestion](../../issues/new?template=suggest-source.yml). Sources from inside a country, in its own languages, are especially welcome.
- **Not on GitHub?** A simple web form will be added before public launch.

## Declaring interests

Everyone who contributes declares any interests that a reader would want to know about, for example "works for a national regulator", "works at an AI company" or "None". Declarations are published on the credits page next to your name or pseudonym.

The project's own interest: drafts are prepared with Claude, an AI model made by Anthropic. Anything that mentions Anthropic or its models gets a second reviewer.

## Credit, or anonymity

Contributors are credited by default. You can choose to contribute under a pseudonym or anonymously, and you never have to give your real name publicly. If commenting on government policy in your country carries risk, please contribute anonymously, and don't send us anything that could identify you.

## Editing content directly

If you're comfortable with GitHub:

1. Read the [editorial charter](editorial/charter.md) and the [guardrails](editorial/guardrails.md).
2. Edit `content/countries/<code>/profile.yaml`. Every statement needs at least one source id, and every source needs a URL, publisher, date, origin, type and language.
3. Run `npm run validate` and fix any errors. Read the warnings: flagged words aren't banned, but each one should be a deliberate choice.
4. Open a pull request and fill in the checklist. Nothing is merged without the editor's review.

## How decisions are made

The editor has the final say. When the editor overrules a reviewer, a one-line note explaining why goes into the pull request. Corrections are logged publicly.

## Code of conduct

Be respectful and assume good faith, including towards countries and views you disagree with. That is the point of the project. No harassment, no personal attacks, and no sharing of anyone's private information. The editor may remove contributions or contributors who don't follow this. Anyone can step down at any time by telling the editor, and can ask for their name to be removed from the credits.
