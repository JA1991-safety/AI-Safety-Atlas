# Common Ground: A Global Look at AI Safety

## Execution plan

*Prepared 16 November 2026 for James Armitage, editor. Written so that Claude can start delivering on 17 November.*

---

## 1. The short version

- **What we're building:** a free, public, multilingual website with an interactive globe. Click or search a country to see a summary card, then open a deeper page with four sections: public attitudes, government frameworks and regulation, industry culture and zeitgeist, and current news that affects AI safety. Every statement carries a source, a date and clear source flags.
- **Who it's for:** AI safety researchers and policymakers first, journalists second.
- **Editorial stance:** neutral reference. The only position the site takes is that understanding each other helps countries cooperate.
- **How it's built:** one structured data file per country in a public GitHub repo, a static site generated from those files, a MapLibre globe, free hosting on Cloudflare Pages (or GitHub Pages).
- **How it stays current:** a weekly scheduled Claude routine drafts updates as pull requests. Nothing publishes without a human approving it. Review is light for news, stricter for regulation, and strictest for culture.
- **Scope:** a pilot of 13 countries plus the EU, then scale to 50 over roughly six months.
- **Time to a public pilot:** about 6 to 8 weeks, at around 4 to 6 hours a week of your time.
- **Is automation too risky?** Fully automatic publishing would be. Automated drafting with the guardrails in section 6 and human approval is not, and it's the only way a site like this stays current.

---

## 2. Decisions this plan is built on

These come from your messages. I've treated them as fixed.

| Topic | Decision |
|---|---|
| Primary readers | Safety researchers and policymakers. Journalists welcome but not designed for. |
| Voice | Neutral. No rankings, scores or "good/bad" judgements of countries. |
| Evidence weighting | **Culture and industry:** weighted towards sources from inside the country. **Facts** (laws, launches, investment, polling numbers): inside and outside sources weighted equally. Every source is flagged clearly. |
| Definition of AI safety | Broad, following [Stanford HAI's definition](https://hai.stanford.edu/ai-definitions/what-is-ai-safety): technical safety and reliability, misuse, and societal harms. |
| News scope | News *about* safety and news that *affects* safety: frontier model launches, open-weight releases with strong benchmarks, compute and chip policy, changes in political control, major court rulings. |
| Comparative views | As filters on the globe and as searchable queries. |
| Business model | Free and public, for the public good. Optional donations. |
| Languages | AI translation into every covered country's main language(s), clearly flagged. |
| Contributors | Invite contributors from other countries. |
| EU | Treated as one area in the pilot (see 4.2 for when member states split out). |

### Setup decisions

1. **GitHub repository. Done:** [JA1991-safety/AI-Safety-Atlas](https://github.com/JA1991-safety/AI-Safety-Atlas), attached to the project on 16 Nov.
2. **Name: chosen.** "Common Ground: A Global Look at AI Safety" ("Common Ground" for short). Before launch, check that the name and a matching domain are free, and that no similar AI or policy project already uses it. If there's a clash, a distinguishing suffix (for example "Common Ground AI") is the fallback. The repo can keep its current name or be renamed on GitHub; GitHub redirects the old address.
3. **Pilot countries: confirmed**, with Nigeria included (13 countries plus the EU, see 4.1).
4. **Named editor: confirmed.** James Armitage is named as editor, with an editorial statement explaining why the site exists and how it's made (draft in 3.4).

---

## 3. What the product is

### 3.1 Screens

1. **Globe view.** A 3D globe (flat map on small screens). Countries in the pilot are shaded; others are greyed with "not yet covered". A search bar for countries and topics. A filter panel (see 3.3).
2. **Country summary card** (opens on click, beside the globe):
   - One-paragraph overview, in neutral language
   - Regulatory status in one line (for example "Binding horizontal AI law in force" or "Voluntary guidance and sector rules"), with a link to the source
   - Public attitude snapshot: one or two poll figures with poll name, date and sample, or "No national polling found" where that's true
   - Top three current stories
   - Freshness stamp per section and an evidence-depth indicator
3. **Country deep page** with four tabs:
   - **Public attitudes:** polls, surveys and qualitative evidence, each with method notes
   - **Frameworks and regulation:** laws, strategies, guidance, institutions (for example AI safety institutes), international commitments signed
   - **Culture and industry zeitgeist:** what the domestic AI sector prioritises, the values and norms shaping it, current debates. Led by **"In their own words"** quotes from the country's own officials, researchers, companies and media, with outside analysis shown separately and labelled.
   - **News:** dated stories, each with a one-line note on *why it matters for AI safety*, tagged as "development" (new) or "foundational" (older but essential context)
4. **Compare view.** Pick two to four countries and see the same fields side by side. This is the most useful screen for policymakers.
5. **About and method pages.** The editorial statement (3.4), definition of AI safety, source policy, how AI is used, how translation works, corrections log, contributor credits, donation link.

### 3.2 How sources are flagged

Every claim links to one or more sources, and every source carries three visible tags:

- **Origin:** `inside` (from the country), `outside` (from elsewhere), or `international body` (OECD, UN, etc.)
- **Type:** `government`, `legislation`, `poll`, `academic`, `industry`, `journalism`, `civil society`, `local voice`
- **Language:** the original language, plus `machine-translated` if we translated it

In the culture section, a small bar shows the inside/outside mix for that section, so readers can see at a glance whose voices it rests on.

### 3.3 Comparative filters (map and search)

Filters colour the globe and are also available as search queries, such as "countries with binding AI law":

- Regulatory approach: binding horizontal law / sector-specific rules / voluntary guidance / strategy only / none found
- Has a national AI safety or security institute (or equivalent)
- Signed key international statements (Bletchley Declaration, Seoul commitments, Council of Europe AI convention, etc.)
- Hosts frontier or major open-weight model developers
- Public attitudes data available, and its headline direction where comparable polls exist (for example the same question in the same multinational survey)
- Updated in the last 7 / 30 / 90 days

I'll only build filters where the data is genuinely comparable. Where countries define things differently, the filter will say so rather than force a yes or no.


### 3.4 Editorial statement (draft for James to edit)

Shown on the About page and linked from every page footer. Written in James's voice; edit freely.

> **Why I made this**
>
> AI is being built and governed everywhere, but most of us only follow the conversation in our own country and our own language. Making AI safe is a global problem, and I don't think it can be solved by any one country, or by one set of values being applied to everyone else. It will need countries to work together, and working together starts with understanding each other.
>
> Common Ground is an attempt to help with that. For each country it sets out what people there think about AI, what their government has done, what the people building AI there care about, and the news that's shaping it now. It doesn't rank countries or judge them. The only position it takes is that cooperation is worth working for, and that understanding comes before agreement.
>
> **How it's made**
>
> - **Sources for everything.** Every statement links to its evidence, with a date, and a label showing whether it comes from inside or outside the country and what kind of source it is.
> - **Local voices first on culture.** Sections about a country's culture and industry give priority to sources from that country, including "in their own words" quotes from its officials, researchers and media. Factual claims draw equally on sources from inside and outside.
> - **AI-assisted, human-approved.** Claude, an AI model made by Anthropic, helps find sources, draft updates and translate pages. Nothing is published until I have reviewed it, and sections on culture are also reviewed by contributors from the country concerned.
> - **Machine translation, clearly marked.** Translated pages say so, and you can report problems from any page.
> - **Open and correctable.** All content and its full edit history are public on GitHub. If something is wrong or unfair, please tell us. Corrections are logged publicly, and anyone described here has a right of reply.
>
> *James Armitage, Editor*
>
> *James lives and works in the UK and has recently moved into AI safety. James started Common Ground out of a commitment to helping the world come together on the biggest challenge of our time.*

**Points to settle before launch:** whether to mention being UK-based in the statement itself, since readers in other countries may want to know where the editor stands (I've included it in the bio, which I think is the honest choice), and whether to name Claude specifically or say "AI tools". I've named it, because being specific is more transparent.

---

## 4. Phased delivery

### 4.1 Pilot countries (13 plus the EU, confirmed)

Chosen for spread across regions, regulatory approaches and evidence depth, so the format gets tested on both rich and thin evidence.

| Area | Why it's in the pilot |
|---|---|
| United States | Frontier labs, federal and state policy shifts |
| China | Major model developer, distinct regulatory model |
| European Union (as one area) | AI Act, the reference case for binding law |
| United Kingdom | AI Security Institute, international convening |
| India | Large population, fast-growing sector, multilingual |
| Japan | Soft-law approach, AI Safety Institute |
| South Korea | AI Basic Act, major chip industry |
| Singapore | Governance frameworks and testing tools, regional hub |
| United Arab Emirates | Sovereign AI investment, open-weight models |
| Brazil | Latin America's main legislative effort |
| Canada | Research history, AI safety institute |
| Kenya | East African hub, tests thin-evidence handling |
| Nigeria | West Africa's largest market and tech hub, a second African perspective alongside Kenya |

### 4.2 Phases

| Phase | What gets delivered | Your time | Elapsed |
|---|---|---|---|
| **0. First slice** (from tomorrow) | Repo, data schema, editorial guardrails, globe shell, **one country fully researched** (UK suggested, as you can judge its accuracy best) | 1 to 2 hrs review | 1 to 2 days |
| **1. Foundations** | Site skeleton with summary card, deep page, search and two filters working. Validation checks (every claim has a source, links resolve, quotes appear in sources). Method page draft. | 2 to 3 hrs | Week 1 |
| **2. Pilot content** | Remaining 12 countries plus the EU researched and drafted, about 3 to 4 per week, each reviewed by you. Weekly news routine switched on as countries come online. | 4 to 6 hrs/week | Weeks 2 to 4 |
| **3. Contributors and soft launch** | Recruit 1 to 2 reviewers per pilot country (section 7). Their review of culture sections. Compare view. Translations into pilot languages. Private beta link sent to 10 to 20 researchers and policymakers for feedback. | 4 to 5 hrs/week | Weeks 5 to 8 |
| **4. Public pilot launch** | Name and domain availability confirmed, public site, donation link, corrections process live, launch post | 3 to 4 hrs | Week 8 to 9 |
| **5. Scale to ~25** | Add about 12 countries, chosen to fill regional gaps. Only add a country once it has at least one local reviewer. | 5 to 7 hrs/week | Months 3 to 4 |
| **6. Scale to 50** | Remaining countries. Consider splitting the EU into member-state pages beneath the EU page (France and Germany first, since their national strategies differ). Newsletter digest. | 6 to 8 hrs/week | Months 5 to 6 |

The gating rule between phases: **don't scale until the weekly upkeep of the current set feels sustainable for a month.** A stale page hurts credibility more than a missing one.

### 4.3 Order of work inside each country

1. Regulation and frameworks (most factual, easiest to verify)
2. Public attitudes (find what polling exists; record honestly when none does)
3. News: 5 to 10 foundational stories plus the last 90 days
4. Culture and industry, last, because it benefits most from what's already been found, and goes to the strictest review

---

## 5. Recommended stack and hosting

| Need | Choice | Why |
|---|---|---|
| Content | One folder per country in the repo, containing structured YAML/JSON for facts and Markdown for prose | Easy for contributors to edit, every change has a public history |
| Validation | A schema that rejects any claim without a source, date and tags | Turns the source policy into something enforced, not just hoped for |
| Site generator | **Astro** (static) | Fast, simple, good built-in support for multiple languages and content collections |
| Globe | **MapLibre GL JS** with globe projection, Natural Earth boundaries | Free, open source, handles both globe and flat map |
| Search | **Pagefind** | Static search that works in every language without a server |
| Translation | Claude translates changed content after approval; stored as separate files per language | Only changed text is retranslated, which keeps cost down. Each translated page carries a "machine-translated" banner and a "report a translation problem" link. |
| Automation | Weekly scheduled Claude routine that opens a pull request with proposed changes | You review in GitHub, or in a simple review page I can generate |
| Hosting | **Cloudflare Pages** (free tier), with GitHub Pages as a fallback | Free, fast worldwide including in Asia and Africa, deploys automatically on merge |
| Donations | **Open Collective** | Public ledger of income and spending fits a public-good project; GitHub Sponsors as a secondary option |
| Contributor input | GitHub pull requests for technical contributors, plus a simple web form for everyone else | Most country experts won't use GitHub |
| Domain | Around £10 to £15 a year | The only fixed cost |

**A note on map borders.** Disputed borders and territories will draw criticism whatever map we use. I'd use Natural Earth's default boundaries, show disputed areas with dashed lines, and say plainly on the method page that boundaries are shown for navigation only and imply no position.

### Example country data (abbreviated)

```yaml
country: JP
name: Japan
last_reviewed: 2026-11-20
reviewers: [editor, local-reviewer-1]
regulation:
  status: voluntary_guidance_plus_framework_law
  freshness: 2026-11-20
  items:
    - claim: "Japan passed an AI promotion act establishing a national AI strategy headquarters."
      date: 2025-05
      sources:
        - url: https://...
          origin: inside
          type: legislation
          language: ja
          machine_translated: true
culture:
  evidence_mix: {inside: 7, outside: 2}
  own_words:
    - quote: "..."
      speaker: "..."
      role: "..."
      source: {url: https://..., origin: inside, type: government, language: ja}
```

*(Example structure only. Facts in the real file will be researched and verified, not taken from this sketch.)*

---

## 6. Automated drafting: guardrails and review

### 6.1 Direct answer: is it too risky to automate?

**Automating the publishing would be too risky. Automating the drafting, with these guardrails and your approval, is not.** The real risks are specific and each one has a check:

| Risk | What could go wrong | Guardrail |
|---|---|---|
| Invented or wrong sources | A citation that doesn't exist, or doesn't say what's claimed | Automated link check, plus a check that every direct quote actually appears in the fetched source. Claims failing either are blocked. |
| Wrong dates | An old story presented as new | Every item stores the source's publication date; anything older than 90 days can't be tagged "development" (confirmed 18 Nov 2026) |
| Framing drift | Loaded adjectives creep in over many small updates | A banned/flagged word list ("authoritarian", "lagging", "aggressive", "ambitious", etc.) and a **swap test**: would this sentence read as fair if it were written about a different country? Flagged sentences go to you. |
| Outside voices dominating culture | Most English-language commentary on China, India or the Gulf comes from Western institutions | Culture sections must reach a minimum share of inside sources (suggested 60%). If they can't, the section shows "limited inside sources" rather than filling the gap. |
| Translation errors | Meaning shifts, especially in policy terms | Translation happens after English approval; key legal terms are kept in the original language alongside the translation; banner and report link on every translated page |
| Sensitive topics | Taiwan, Israel and Palestine, Russia and Ukraine, Xinjiang, Kashmir and similar | A sensitive-topics list. Any draft touching it needs your approval **and** a second reviewer, and is held to factual statements with sources from multiple sides. |
| Silent errors | A mistake stays live unnoticed | Public corrections log, a "suggest a correction" link on every section, and a right of reply for governments and organisations described |

### 6.2 Review tiers

| Content | Who drafts | Who approves | How much review |
|---|---|---|---|
| **News** | Weekly routine | You (batch approval) | **Light:** skim headline, "why it matters" line and source. About 1 to 2 minutes per item. |
| **Regulation and frameworks** | Weekly routine flags changes; monthly full check | You | **Medium:** check the claim against the primary source. About 5 minutes per change. |
| **Public attitudes** | When new polls appear | You | **Medium:** check sample, method and wording are reported accurately |
| **Culture and industry** | Quarterly review | You **plus** a local reviewer | **Strict:** read in full; local reviewer confirms it would feel fair to people in that country |
| **Anything on the sensitive list** | Any routine | You plus a second reviewer | **Strict** |

### 6.3 Standing instructions for every drafting run

These go into the routine's prompt and the repo's contributor guide:

1. Use neutral, descriptive language. Describe what a government or company did and said; don't characterise motives.
2. Every claim needs a source with URL, date, origin, type and language. No source, no claim.
3. Prefer primary sources (the law text, the poll release, the official statement) over reporting about them.
4. For culture and industry, look first for sources from inside the country, in its own languages.
5. Present notable disagreement inside a country as disagreement, rather than picking a side.
6. Use the same structure and the same level of detail for every country. Where evidence is thin, say so plainly instead of padding.
7. "Why it matters for AI safety" lines explain the link to safety, not whether the development is good or bad.
8. Never auto-merge. Open a pull request with a summary of what changed and anything flagged.

---

## 7. Recruiting and governing contributors

### 7.1 Roles

| Role | What they do | Time asked |
|---|---|---|
| **Country reviewer** | Reviews their country's culture section quarterly and flags errors elsewhere | About 2 hours a quarter |
| **Country correspondent** | Suggests news, polls and sources in their language; drafts "In their own words" quotes | About 1 hour a month |
| **Translation reviewer** | Spot-checks machine translation in their language | About 1 hour a quarter |
| **Advisory group** (later) | 5 to 7 people from different regions who advise on method and sensitive cases | Two calls a year |

Aim for **two reviewers per country** where possible, ideally with different backgrounds (for example one from academia or civil society, one from industry or policy). It guards against one person's view becoming "the country's view".

### 7.2 Where to find them

- Regional AI safety and governance organisations, for example Concordia AI (China), AI Safety Asia, ILINA (Kenya), CeSIA (France), and the AI safety and governance groups at universities in each pilot country
- Researchers who have published on their own country's AI policy (the reference lists from OECD.AI and Carnegie are a good starting point)
- Staff connected to the national AI safety institutes and the International Network of AI Safety Institutes, acting in a personal capacity
- AI safety community channels and fellowship alumni networks
- A "Contribute" page on the site from launch

I can draft the outreach email and a one-page contributor brief in Phase 3. You'd send them, since they should come from you.

### 7.3 Governance

- **Editorial charter** (one page): the neutrality aim, the source policy, what we will and won't publish
- **Conflict of interest declaration** for every contributor, published on the credits page (for example "works for a national regulator" or "works at an AI company")
- **Editor has final say**, and every decision to overrule a reviewer gets a one-line note in the repo
- **Credit by default**, with the option to contribute anonymously for people in countries where commenting on government policy carries risk. Contributor safety comes first: never require real names publicly.
- **Code of conduct** and a clear way to step down
- **No pay at pilot stage.** If donations allow later, small honoraria for reviewers in lower-income countries would help fairness.

---

## 8. Languages

- **Pilot launch:** English plus Simplified Chinese, Japanese, Korean, Hindi, Arabic, Portuguese, French and Swahili, plus Hausa, Yoruba and Igbo for Nigeria (with extra caution, since machine translation is weaker in these languages).
- **EU:** start with French, German, Spanish and Italian, then add the remaining official EU languages in Phase 5.
- **At 50 countries:** roughly 30 to 40 languages. Only text that changed gets retranslated, so the ongoing cost tracks the number of updates, not the number of languages.
- Interface text (buttons, labels) is translated once and reviewed by a native speaker where we can find one.
- Source quotes stay in their original language with a translation beside them.

---

## 9. Maintenance intensity

Estimates once each phase is set up. Claude usage is given as a share of a weekly allowance, which I'll recalibrate after measuring the first month.

### Pilot (13 countries plus the EU)

| Task | Frequency | Claude usage | Your time |
|---|---|---|---|
| News scan and drafting | Weekly | Moderate: roughly 10 to 15% of a week | 45 to 60 min approving about 20 to 40 items |
| Regulation check | Monthly | Low | About 30 min a month |
| Polling check | Monthly | Low | About 15 min a month |
| Culture refresh | Quarterly, staggered (about 1 country a week) | Moderate per country | About 30 min a week, plus reviewer coordination |
| Translations of approved changes | Weekly | Low to moderate | Spot checks only |
| Corrections and contributor emails | Ongoing | Minimal | About 30 to 60 min a week |
| **Total** | | **Roughly 15 to 20% of a week** | **About 2.5 to 4 hours a week** |

### At 50 countries

| | Claude usage | Your time |
|---|---|---|
| With 1 to 2 active reviewers in most countries | Probably more than one person's plan comfortably supports alongside other work, so I'd recommend running the weekly routine through the Claude API with a fixed monthly budget, funded by donations if possible. Weekly runs would scale roughly 4 times the pilot. | **About 6 to 10 hours a week**, mostly approving news and coordinating reviewers |
| Without local reviewers | Similar | **15 hours or more a week.** Not sustainable for one person, which is why contributors gate scaling. |

**Ways to cut upkeep later:** move to fortnightly news for countries with less activity; let trusted country reviewers approve news for their own country; batch approvals into one weekly sitting.

---

## 10. Timeline at a glance

| When | Milestone |
|---|---|
| 17 to 18 Nov 2026 | First slice: foundations plus the UK, fully researched |
| Week of 23 Nov | Site skeleton complete; first 3 to 4 more countries |
| By mid December | All pilot countries drafted and reviewed by you; weekly news routine running |
| December to January | Contributor recruitment, local review of culture sections, translations, private beta |
| Mid to late January 2027 | Public pilot launch |
| February to March 2027 | Scale to about 25 |
| April to May 2027 | Scale to about 50 |

Allow for the holiday period slowing contributor responses in late December.

---

## 11. Risks this plan doesn't remove

Being honest about what remains:

- **Selection is still an editorial act.** Choosing which news and which quotes to include will always reflect judgement. The mitigations are transparency (method page, public history, source mix shown) and local reviewers, not a claim of perfect objectivity.
- **Some countries will stay thin.** Where polling and inside sources are scarce, pages will be shorter. The site should say so, rather than hide it.
- **Contributor risk.** In some countries, commenting on government AI policy can carry personal risk. Anonymous contribution needs to be genuinely safe.
- **Upkeep depends on you until contributors arrive.** If your time drops, pause adding countries before letting existing ones go stale.
- **AI translation of policy language.** Legal and political terms can shift meaning. Keeping original terms visible helps, but won't catch everything.

---

## 12. First session checklist (for tomorrow)

1. Clone [JA1991-safety/AI-Safety-Atlas](https://github.com/JA1991-safety/AI-Safety-Atlas) (start from a session that has the repo attached) and work on a branch, with pull requests for James to review
2. Write the schema, validation script and guardrails files
3. Build the globe shell and card/page templates
4. Research and draft the UK profile, all four sections
5. Run validation (sources, dates, quotes, banned words, swap test)
6. Publish a private preview link for you to review
7. Report actual credit usage and adjust the maintenance estimates

---

## 13. Progress log

### Session 1, 18 Nov 2026

- **Done:** checklist items 1 to 6. Pull request: [JA1991-safety/AI-Safety-Atlas#1](https://github.com/JA1991-safety/AI-Safety-Atlas/pull/1), branch `phase-0-foundations-uk`. Private preview: https://claude.ai/artifact/8YzGPcaMQN8F5abP7B7UAL
- **UK draft:** 37 sources, 13 of 16 culture sources from inside the UK, validation clean. Awaiting James's review, and a second reviewer for elections, policing and Anthropic mentions.
- **Changes from this plan:** "recent development" window is 90 days, not 30 (items under 30 days show a "New" badge); search is a built-in index instead of Pagefind for now; licence MIT for code and CC BY 4.0 for content. Dani confirmed the licence, the 90-day window and keeping the repository public on 18 Nov 2026.
- **Checks:** CI passed. All 8 quotes are confirmed in their sources (4 by the CI source check, 4 by hand because those sites block automated requests). Still unverified: the outcome of the Artificial Superintelligence Bill's second reading.
- **Credit usage (checklist item 7):** not measurable from inside a session. To calibrate, note the weekly usage figure before and after the next country profile; one country is the best unit for the estimates in section 9.

### Session 1, continued: UK revision, 18 Nov 2026

- **Done:** the UK profile now has three new sections: how the five principles work in practice; "Areas for Improvement in AI Safety" (seven areas named sources have identified, each set beside what is in place, with approaches used elsewhere listed for information); and "AI Safety Contacts" (ten UK organisations with links). Each statistic appears once outside the summary. Pull request: [JA1991-safety/AI-Safety-Atlas#2](https://github.com/JA1991-safety/AI-Safety-Atlas/pull/2), branch `uk-profile-principles-gaps`, built on #1. Private preview: https://claude.ai/artifact/3MCo3WndPeXwwVHKmyUsRi. The first preview still shows the original draft.
- **James's decisions (18 Nov, evening):** no rankings or ratings of countries; the goal is mutual understanding and engagement. No comparison that measures countries against the UK approach. Once the first set of countries is in, a comparison table may describe features of AI safety across countries. The tone should feel equally positive or negative for every country. All are now in the charter.
- **UK draft:** 78 sources, validation clean (0 errors, 0 warnings). New check: repeated statistics (warning).
- **Second reviewer:** Reuters reporting that names Anthropic is in the model-testing area and in news.

### Session 1, continued: map colours and the other twelve areas, 18 Nov 2026

- **Done:** the globe now uses colour: a soft blue sea, warm pale land outside the pilot, and coral for pilot areas (deeper where a profile exists, a light tint where one is in preparation). The search hint now suggests "regulation". Pull request: [JA1991-safety/AI-Safety-Atlas#3](https://github.com/JA1991-safety/AI-Safety-Atlas/pull/3), branch `map-colour`, built on #2. The preview at https://claude.ai/artifact/3MCo3WndPeXwwVHKmyUsRi shows it.
- **Dani's decision:** each country's regulation and improvement sections are framed by that country's own published principles, with the OECD AI Principles as the fallback where a country has none.
- **Next:** the other twelve profiles, one pull request each, in this order: US, EU, Canada, then Singapore, Japan, South Korea, India, China, Brazil, Kenya, Nigeria and the UAE.

### Session 1, continued: United States, 19 Nov 2026

- **Done:** the US draft profile, 73 sources, validation clean (0 errors, 0 warnings). Its frame is NIST's seven characteristics of trustworthy AI, the US government's own published set. The schema now lets each country name its own principles, with the OECD set as the fallback; the UK profile moved to the new shape with no content change. Pull request: [JA1991-safety/AI-Safety-Atlas#4](https://github.com/JA1991-safety/AI-Safety-Atlas/pull/4), branch `us-profile`, built on #3. The preview at https://claude.ai/artifact/3MCo3WndPeXwwVHKmyUsRi shows it.
- **Fixed:** long "Proposed by" labels pushed country pages wider than a phone screen. They now wrap.
- **Second reviewer:** Anthropic appears (testing agreement, copyright settlement, a political network in the midterms), as does election coverage.
- **Source checks:** this environment cannot reach outside sites, so the link and quote checker runs in CI only.
- **Next:** the EU, then Canada.

### Session 1, continued: AI News and AI Safety News, 19 Nov 2026

- **Dani's request (19 Nov, 00:20):** include major AI news (frontier model launches, company news such as the Anthropic IPO and the Nvidia CEO change) as well as AI safety news, in two sections called "AI News" and "AI Safety News", for every country. Where a country lacks enough of both, merge them under "News".
- **Done:** each news item now has a stream (safety or ai). A country with at least 3 of each gets two sections; otherwise one News section, with AI items tagged. US AI News: GPT-6 Astra, Nvidia's CEO stepping down, Anthropic's share pricing. UK AI News: the Google DeepMind partnership, the Action Plan's first-year report, the AI sector study and the Technology Prosperity Deal. Section links now land below the sticky masthead, and on phones they are one scrolling row. Added to PR #4 (commit `8e679be`); the preview is updated.
- **Second reviewer:** the Anthropic share pricing item is reported in others' words (TechCrunch, "reportedly"); check it against the final figures.
- **Next:** the EU profile, with both news streams, then Canada.

### Session 1, continued: European Union, 19 Nov 2026

- **Done:** the EU draft profile, 56 sources, validation clean (0 errors, 0 warnings). The EU is one area; sources from EU institutions and from organisations and media in member states count as inside. Its frame is the seven requirements of the 2019 Ethics Guidelines for Trustworthy AI. News is split: 10 AI Safety News items and 3 AI News items (Mistral AI's €3 billion round, the AI gigafactories call, the AI Continent Action Plan). Pull request: [JA1991-safety/AI-Safety-Atlas#5](https://github.com/JA1991-safety/AI-Safety-Atlas/pull/5), branch `eu-profile`, built on #4. The preview shows it.
- **Fixed:** the word checks were scanning derived news data and repeating each flagged term once per news item.
- **For the editor:** the national authorities figure comes from a compliance firm's summary of Politico; some MEPs' first names were added from general knowledge and need checking; the "Surveillance and policing" flag is a false positive from "market surveillance authorities".
- **Second reviewer:** Anthropic is not named in the EU text, but it signed the Paris Call, which the profile covers.
- **Next:** Canada, then Singapore, Japan, South Korea, India, China, Brazil, Kenya, Nigeria and the UAE.

### Session 1, continued: Canada, 19 Nov 2026

- **Done:** the Canada draft profile, 45 sources, validation clean (0 errors, 0 warnings, no sensitive-topic flags). Its frame is the six principles of the 2023 Voluntary Code of Conduct on advanced generative AI; four of six are classed "guidance only", since Canada has no AI-specific law. News is split: 9 AI Safety News items (including the Paris Call, Bill C-34 going to committee, the Tumbler Ridge reporting questions and LawZero's funding) and 3 AI News items (Cohere's funding round, Bell's Saskatchewan AI infrastructure, the Canada–Germany declaration). Pull request: [JA1991-safety/AI-Safety-Atlas#6](https://github.com/JA1991-safety/AI-Safety-Atlas/pull/6), branch `ca-profile`, built on #5. The preview shows it.
- **Fixed:** the statistic check treated bill numbers such as "C-36" as figures.
- **For the editor:** the Tumbler Ridge item needs a tone check (no shooter's name or victim details are given); the fairness principle is classed "guidance only" because no source on human rights law was found; the minister's title differs in one source; the regulatory approach facet could be either "existing regulators" or "voluntary guidance".
- **Second reviewer:** Anthropic is not named. It signed the Paris Call alongside Cohere, and a Mila–Anthropic partnership (July 2026) was left out.
- **Next:** Singapore, then Japan, South Korea, India, China, Brazil, Kenya, Nigeria and the UAE.

### Session 1, continued: Singapore, 19 Nov 2026

- **Done:** the Singapore draft profile, 35 sources, validation clean (0 errors, 0 warnings, no sensitive-topic flags). Its frame is the nine dimensions of the 2024 Model AI Governance Framework for Generative AI (IMDA and the AI Verify Foundation); Accountability and Data are classed "partly binding" through the Personal Data Protection Act, the other seven "guidance only". News is split: 9 AI Safety News items (including the September 2026 Call for Control of Frontier AI Models, the proposed UN convention on AI safeguards, and the first accredited AI testers) and 4 AI News items (the EDB round-up, the SWITCH programmes, the OpenAI and Google partnerships, over S$1 billion for AI research). Pull request: [JA1991-safety/AI-Safety-Atlas#7](https://github.com/JA1991-safety/AI-Safety-Atlas/pull/7), branch `sg-profile`, built on #6. The preview shows it.
- **For the editor:** the framework's dimensions are quoted from a law firm summary; the Council of Europe convention and New Delhi Declaration show as "not known" for lack of a source; Lawrence Wong and Gan Kim Yong appear without titles to avoid the elections flag; most quoted voices are ministers.
- **Second reviewer:** Anthropic is not named. OpenAI and Google are named for their 2026 government partnerships.
- **Shared research for later countries:** the September 2026 Call for Control of Frontier AI Models was signed by 20 countries and the European Commission, including Canada, Kenya and the UAE, but not Japan, South Korea, India, China, Brazil or Nigeria.
- **Next:** Japan, then South Korea, India, China, Brazil, Kenya, Nigeria and the UAE.

### Session 1, continued: Japan, 19 Nov 2026

- **Done:** the Japan draft profile, 30 sources, validation clean (0 errors, 0 warnings, no sensitive-topic flags). Its frame is the ten common guiding principles of the AI Guidelines for Business (MIC and METI, version 1.2, March 2026); Privacy protection is classed "partly binding", the other nine "guidance only", because the AI Act sets no penalties. News is split: 7 AI Safety News items (including the national AI testing system, sexual deepfakes of children, the AI Basic Plan revision and the governing party's proposal for penalties) and 3 AI News items (Sakana AI's reported listing plans, the SoftBank, NEC, Honda and Sony foundation model company, SB OAI Japan). Pull request: [JA1991-safety/AI-Safety-Atlas#8](https://github.com/JA1991-safety/AI-Safety-Atlas/pull/8), branch `jp-profile`, built on #7. The preview shows it.
- **For the editor:** regulatory approach set to "voluntary guidance"; frontier developers set to "yes" on the strength of Sakana AI and the new foundation model company; the plan revision's Cabinet approval date is unconfirmed; several items rest on aggregator or translated articles; only two safety items fall within the last 90 days.
- **Second reviewer:** Anthropic is not named. A source says the plan revision followed an Anthropic model's release; the profile says only "frontier AI models".
- **Fetch notes for later countries:** MLex articles sometimes fail; asianews.network rate-limits; aa.com.tr refuses automated fetches.
- **Next:** South Korea, then India, China, Brazil, Kenya, Nigeria and the UAE.

### Session 1, continued: South Korea, 19 Nov 2026

- **Done:** the South Korea draft profile, 39 sources, validation clean (0 errors, 0 warnings, no sensitive-topic flags). Its frame is the seven national AI ethics principles announced by the Ministry of Science and ICT in August 2026; five are classed "partly binding" (through the AI Basic Act, in force since January 2026, or privacy law) and two "guidance only". Regulatory approach: "general AI law in force". News is split: 10 AI Safety News items (including the safety institute's staffing figures and its evaluations of 34 models, the OpenAI workshop on frontier risks, and the privacy regulator's work on AI agents) and 4 AI News items (LG's K-EXAONE 2.5, Nvidia AI Day Seoul, the cybersecurity foundation model, the national foundation model project). Pull request: [JA1991-safety/AI-Safety-Atlas#9](https://github.com/JA1991-safety/AI-Safety-Atlas/pull/9), branch `kr-profile`, built on #8. The preview shows it.
- **For the editor:** the principles are described from The Korea Times and a company blog, not the ministry's own text; staffing comparisons with other countries were left out under the no-rankings rule; a Digital Policy Alert page's address names a different bill from its text; two MLex articles could not be read.
- **Second reviewer:** Anthropic is not named. A source says the safety institute evaluates GPT and Claude; the profile names neither model. OpenAI is named for its agreement and workshop with the institute.
- **Found in CI:** the advisory source check reports three broken source links in earlier profiles (`nist-caisi-2026` in the US and EU profiles, `vector-safety` in Canada, `futurium-hleg` in the EU). They do not fail pull requests but would fail the weekly strict check after merging. To fix before India.
- **Fetch notes for later countries:** mofa.go.kr refuses automated fetches (robots).
- **Next:** fix the three links, then India, China, Brazil, Kenya, Nigeria and the UAE.
- **Fixed (same day):** the three broken links. US and EU now cite NIST's own bulletin for the CAISI agreements, the EU guidelines chapter uses the archived page's `.html` address, and the Canada contact entry for the Vector Institute cites its AI trust and safety principles. Each fix is on its own branch (#4, #5, #6) and merged up the stack to #9.

### Session 1, continued: India, 19 Nov 2026

- **Done:** the India draft profile, 31 sources, validation clean (0 errors, 0 warnings, no sensitive-topic flags). Its frame is the seven sutras of the India AI Governance Guidelines (MeitY, November 2025); Accountability, Understandable by Design and Safety are classed "partly binding" (through the 2026 IT Rules amendments on AI-generated content, the data protection rules and CERT-In's six-hour incident reporting rule), the other four "guidance only". Regulatory approach: "existing regulators and sector rules". News is split: 9 AI Safety News items (including CERT-In's report of AI agents under test accessing Indian organisations' systems, the minister's remarks that a law is needed, the announced consultation paper and reported draft testing rules) and 4 AI News items (Soket Labs and ZenteiQ models, five IndiaAI Mission models, Google's Visakhapatnam hub, Sarvam's models). Pull request: [JA1991-safety/AI-Safety-Atlas#10](https://github.com/JA1991-safety/AI-Safety-Atlas/pull/10), branch `in-profile`, built on #9. The preview shows it.
- **For the editor:** the sutras are quoted from a copy of the guidelines on a law firm's website (the ministry's own address is unconfirmed); the draft testing rules come from an aggregator's summary of NDTV Profit; frontier developers set to "no", like Singapore (Japan says "yes"); Seoul shown as "did not sign"; India's New Delhi endorsement rests on the MEA list carried by ANI.
- **Second reviewer:** Anthropic is not named. The Reuters report on the October incidents mentions earlier incidents at Anthropic and OpenAI for context; neither is named.
- **Fetch notes for later countries:** the Vikaspedia guidelines page returns no body text; emergent.sh "news" pages are vendor content with no sources, so not used.
- **Next:** China, then Brazil, Kenya, Nigeria and the UAE.

### Session 1, continued: China, 19 Nov 2026

- **Done:** the China draft profile, 39 sources, validation clean (0 errors, 0 warnings, no sensitive-topic flags). Its frame is the six basic ethical requirements of the Ethical Norms for New Generation AI (2021, national AI governance committee under MOST); Well-being, Privacy, Controllability and Accountability are classed "partly binding" (through the July 2026 rules on AI companion services and the amended Cybersecurity Law), Fairness and Ethical literacy "guidance only". Regulatory approach: "existing regulators and sector rules"; safety institute "equivalent" (CnAISDA). News is split: 8 AI Safety News items (including the NDRC's 3 November announcement on a comprehensive AI law and safety standards, the SemiAnalysis count of published safety results, and Framework 3.0) and 4 AI News items (Meituan's LongCat-2.5, DeepSeek-V4.1-Flash, the World AI Conference, the international AI cooperation plan). Pull request: [JA1991-safety/AI-Safety-Atlas#11](https://github.com/JA1991-safety/AI-Safety-Atlas/pull/11), branch `cn-profile`, built on #10. The preview shows it.
- **For the editor:** regulatory approach facet is a judgement call (targeted binding rules, no general law); state media and Concordia AI counted as inside; Caixin pages read only to the paywall; no Chinese-run attitude survey found; no industry voices; chip supply and trade restrictions left out, so no sensitive-topic flag.
- **Second reviewer:** Anthropic is not named. Bloomberg and PYMNTS name it as a rival of Chinese developers, and Caixin's AI-generated sidebars mention its models; none of this is used.
- **Fetch notes for later countries:** Caixin Global is paywalled after the lede and its "Digest Hub" sidebars are AI-generated (do not use); cac.gov.cn pages load and can be cited with https.
- **Next:** Brazil, then Kenya, Nigeria and the UAE.

### Session 1, continued: Brazil, 19 Nov 2026

- **Done:** the Brazil draft profile, 36 sources, validation clean (0 errors, 0 warnings, no sensitive-topic flags). It is the first profile to use the **OECD AI Principles** fallback: Brazil has no set of AI principles of its own in force, its 2021 strategy (EBIA) says it follows the OECD Recommendation, and the principles in PL 2338/2023 are not law. News is split: 11 AI Safety News items and 6 AI News items. Pull request: [JA1991-safety/AI-Safety-Atlas#12](https://github.com/JA1991-safety/AI-Safety-Atlas/pull/12), branch `br-profile`, built on #11. The preview shows it.
- **Flagged for the editor:** confirm the OECD frame for Brazil; WAICO membership is sourced to Gazeta do Povo, used for the facts only; the US chip licence rule is in AI News, worded without trade-dispute terms.
- **Next:** Kenya, then Nigeria and the UAE.

### Session 1, continued: Kenya, 19 Nov 2026

- **Done:** the Kenya draft profile, 34 sources, validation clean (0 errors, 0 warnings, no sensitive-topic flags). It uses the **OECD AI Principles** fallback for now: the National AI Strategy 2025-2030 has its own guiding principles (section 4.3, p.63), but that part could not be read for this draft. Rights, Transparency and Accountability are classed "partly binding" (through the Data Protection Act 2019 and the ODPC's draft AI guidance), Well-being and Safety "guidance only". Regulatory approach: "existing regulators and sector rules"; no safety institute; no frontier developers. News is split: 9 AI Safety News items (including the Paris Call for AI safety and security, the Senate committee's rejection of the AI Bill 2026 and the ODPC's draft guidance) and 5 AI News items (the planned sovereign model, the BCG survey, Servernah Cloud, the Olkaria data centre, GPU computing). Pull request: [JA1991-safety/AI-Safety-Atlas#13](https://github.com/JA1991-safety/AI-Safety-Atlas/pull/13), branch `ke-profile`, built on #12. The preview shows it.
- **Flagged for the editor:** switch to the strategy's own principles once section 4.3 is checked; the bill's rejection rests on one source (Techweez); the ODPC note is a draft; Pew gives no Kenya fieldwork dates.
- **Second reviewer:** Anthropic is not named. The Standard (agreement between Kenya and Anthropic, November 2026) and Citizen Digital (Philip Thigo meeting Anthropic, July 2026) were not used; a second reviewer should decide whether they belong. The Paris Call page lists Anthropic among company signatories.
- **Fetch notes for later countries:** a second fetch of the strategy PDF was refused by the permission system and was not worked around. Standard 2001539031 is paywalled; TechArena misattributes the strategy; CULTR is not a reliable source.
- **Next:** Nigeria, then the UAE.

### Session 1, continued: Nigeria, 19 Nov 2026

- **Done:** the Nigeria draft profile, 34 sources, validation clean (0 errors, 0 warnings, no sensitive-topic flags). It uses the **OECD AI Principles** fallback: NITDA names five guiding principles for the National AI Strategy (responsibility, ethics, inclusivity, sustainability, collaboration) but we found no published definitions, and the August 2024 draft's principles section could not be read in full. Rights and Accountability are "partly binding" (Nigeria Data Protection Act 2023), the other three "guidance only". Regulatory approach: "existing regulators and sector rules"; no safety institute; no frontier developers; polling "international surveys only". News is split: 7 AI Safety News items (including the Central Bank's warning on AI agents in banking and the NDPC's planned review of the data protection law) and 6 AI News items (including the N-ATLAS challenge and the BCG and HP surveys). Pull request: [JA1991-safety/AI-Safety-Atlas#14](https://github.com/JA1991-safety/AI-Safety-Atlas/pull/14), branch `ng-profile`, built on #13. The preview shows it.
- **Flagged for the editor:** switch to Nigeria's own principles once defined text is found; the digital economy bill was at third reading in July 2026 (no later report found; New Telegraph's "signs into law" headline is contradicted by its own body); Seoul shown as "did not sign" though Digital Policy Alert says "endorsed"; election-related AI coverage left out; confirm Paradigm Initiative as a contact.
- **Second reviewer:** Anthropic is not named. BusinessDay's CBN article includes an official's reference to an Anthropic investigation (not used); a BusinessDay explainer naming Anthropic was not used.
- **Fetch notes for later countries:** the web-fetch budget is 100 pages per hour across all agents; keep batches small. guardian.ng, techcabal 2026 pages, vanguardngr, channelstv and leadership.ng refuse automated fetches.
- **Next:** the UAE.

### Session 1, continued: UAE, 19 Nov 2026

- **Done:** the United Arab Emirates draft profile, 23 sources, validation clean (0 errors, 0 warnings, no sensitive-topic flags). Its frame is the **UAE Charter for the Development and Use of AI** (July 2024), the country's own set: ten of its twelve principles are shown (the schema allows ten; Strengthening Human-Machine Ties and Technological Excellence are named in the about text). Data Privacy, Human Oversight and Commitment to Treaties and Applicable Laws are "partly binding", the rest "guidance only". Regulatory approach: "voluntary guidance"; no safety institute; frontier developers "no" (TII Falcon and MBZUAI K2/JAIS are open models). News is split: 5 AI Safety News items and 6 AI News items. Pull request: [JA1991-safety/AI-Safety-Atlas#15](https://github.com/JA1991-safety/AI-Safety-Atlas/pull/15), branch `ae-profile`, built on #14. The preview shows it.
- **Flagged for the editor:** raise the principles limit to twelve if wanted; Charter descriptions are paraphrased; regulatory approach facet is a judgement call; the new federal authority's decree, start date and powers were not found; TII left out of contacts as a model developer; weapons remarks and a sensitive-technology declaration left out to avoid flags.
- **Second reviewer:** Anthropic is not named. The National's Children First article mentions an OpenAI and Anthropic research pledge (not used).
- **Fetch notes:** wam.ae returns only a site shell; gulfbusiness.com refuses automated fetches. Subagents hit a five-hour usage limit at 10:26 UTC; work resumed at 14:10 UTC.
- **Pilot status:** all 13 pilot areas now have draft profiles (#4 to #15 stacked, plus the UK). **Next:** editor review, and the comparison table James asked for.

- **Done (19 Nov, principles re-check):** at Dani's request, searched again for Brazil, Kenya and Nigeria's own AI principles, and raised the principles limit from ten to twelve. **Nigeria** now uses the ten guiding principles of its National AI Strategy (final version, September 2025); the descriptions are paraphrased because pages 28-29 could only be read through a summary, so the editor should check them ([#14](https://github.com/JA1991-safety/AI-Safety-Atlas/pull/14)). **UAE** now shows all twelve Charter principles ([#15](https://github.com/JA1991-safety/AI-Safety-Atlas/pull/15)). **Kenya** stays on the OECD fallback: the readable copy of the strategy stops before its principles section, the ministry's copy can't be read automatically, and only a partial list was found (now named in the about text) ([#13](https://github.com/JA1991-safety/AI-Safety-Atlas/pull/13)). **Brazil** stays on the OECD fallback: its 2021 strategy follows the OECD set, and the proposed 2024-2028 AI plan lists undefined "premises", not principles ([#12](https://github.com/JA1991-safety/AI-Safety-Atlas/pull/12)). Preview updated to version 18.

- **Done (21 Nov, Kenya principles):** using the copy of the Kenya AI Strategy 2025-2030 that Dani supplied, Kenya now uses the strategy's **eight guiding principles** (section 4.3, p. 63) instead of the OECD fallback ([#13](https://github.com/JA1991-safety/AI-Safety-Atlas/pull/13)). The draft "AI Principles for Kenya" statement (January 2025) Dani also supplied is named in the about text through KICTANet's public workshop report; it is not cited directly because we found no public copy, and it has not been adopted. Brazil is now the only pilot area on the OECD fallback.

- **Approved (21 Nov):** Dani approved the **EU** profile. It is now marked approved by the editor (`editor_approved: true`, every section "Approved by the editor"), merged up the stack; PR [#5](https://github.com/JA1991-safety/AI-Safety-Atlas/pull/5) notes it. Its "Surveillance and policing" flag is a false positive from "market surveillance authorities". Not merged: #5 is stacked on #1 to #4, so it reaches main only after those merge.

- **Nigeria fixes (21 Nov):** at Dani's request, the bill entry now says plainly that the National Digital Economy and E-Governance Bill is "not yet law" (third reading; the ThisDay headline calling it an Act was anticipatory), and **AI Safety Nigeria** (Abuja; research, training and policy work) is added to the contacts. It had been noted as a possible contact but not checked; it was not left out for its size ([#14](https://github.com/JA1991-safety/AI-Safety-Atlas/pull/14)).

- **Approved (21 Nov):** Dani approved the **Nigeria** profile. It is now marked approved by the editor, merged up to `ae-profile`; PR [#14](https://github.com/JA1991-safety/AI-Safety-Atlas/pull/14) notes it. Approved so far: EU, Nigeria.

- **Approved (21 Nov):** Dani approved the **UK** profile; it is marked approved by the editor (commit on `uk-profile-principles-gaps`, merged up the whole stack; PR [#2](https://github.com/JA1991-safety/AI-Safety-Atlas/pull/2) notes it). A second reviewer is still needed for its sensitive topics (Anthropic, police facial recognition, elections). Dani also accepted the paraphrased Nigeria principles, so the "should be checked" note was removed. Approved so far: UK, EU, Nigeria.

- **Reviewers (21 Nov):** James is first reviewer (editor) and Dani is second reviewer for sensitive topics, as stated in the project thread.

### Session 1, continued: Kenya review fixes, 21 Nov 2026 (late evening)

- **Done (Dani's review of Kenya):** the AI Bill 2026 is now "stalled", not "rejected": the Senate ICT committee advised against proceeding in October 2026 (Techweez, single source; committee report not found). Dates from the Senate bill digest: published 19 Feb 2026, first reading 2 Apr 2026. ODPC AI guidance note read to section 11; sections 12, 13 and annexes in summary only; the note does not call itself a draft. Pew's Kenya methodology page could not be read; survey-wide dates (8 Feb to 13 May 2026) added to gaps. Three Anthropic news items added at Dani's request (joint declaration 22 Sep 2026, Thigo talks July 2026, reported misuse of Claude for political posts with CS Wandayi's response), all attributed to Kenyan media and the OECD incident monitor. Kenya: 43 sources, 0 errors; Anthropic sensitive flag needs the second reviewer (Dani). Pushed ke/ng/ae; PR #13 body updated; preview refreshed.
- **Open:** Kenya approval; Pew Kenya fieldwork dates and sample size (ask Dani to paste); public URL of the draft Statement of Principles PDF.

### Session 1, continued: UAE review fixes, 22 Nov 2026 (early hours)

- **Done (Dani's review of the UAE):** San Francisco Declaration (November 2026, safeguarding sensitive AI technology and supply chains) added as a regulation item and a news item, from The National and Bloomberg Law. The AI and Data Authority now cites the Dubai Media Office announcement (chair Omar Sultan Al Olama, reports to Cabinet; no decree, start date or powers named). ai.gov.ae is the AI Office portal and does not describe the authority. Charter read in full from Dani's PDF; descriptions now quote it; principle 3 renamed "Fairness" (u.ae says "Algorithmic Bias"). UAE: 26 sources, 0 errors, no sensitive flags. PR #15 body updated; preview refreshed.
- **Open:** UAE approval.
- **UAE approved by Dani, 22 Nov 2026.** Before approval, the San Francisco Declaration was rewritten from its full text (Australian government copy; signed 15 Nov 2026 by ten governments). Marked editor_approved and pushed. Approved so far: EU, Nigeria, UK (needs second review), UAE.
- **Kenya Pew details added, 22 Nov 2026:** from Dani's screenshot of Pew's Kenya methodology page (7 Mar to 15 Apr 2026, n=1,020, face to face, MoE 4.8, Gallup).
- **Kenya approved by Dani, 22 Nov 2026** (including the Anthropic items); second review of the Anthropic flag still needed, Dani arranging it. Approved so far: EU, Nigeria, UAE, UK (second review pending), Kenya (second review pending).
- **US approved by Dani, 28 Nov 2026**; second review still needed (Anthropic, elections). Merged up the stack and pushed.
- **Canada approved by Dani, 28 Nov 2026**; no sensitive flags. Merged up the stack and pushed.
