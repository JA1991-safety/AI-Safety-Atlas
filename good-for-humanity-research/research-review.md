# Beyond Survival: what "good for humanity" means for alignment

*Research review for Dani's article. Prepared 28 November 2026.*

## How to read this

Your hypothesis is a chain of three steps, refined through discussion. The evidence treats each step differently, so this review scores them separately:

- **H1. Known dimensions are not factored in.** We broadly know the dimensions of a good human life, but they are not factored into how we think about progressing AI. Progress is judged instead by what is easy to measure and what markets and governments are rewarded for: capability benchmarks, productivity, revenue and GDP. Those are not sufficient. This focus starts as a symptom of the problem and then becomes a driver of it, because what gets measured becomes the target and crowds out everything else. Part of the gap is also a missing measurement science: some dimensions, such as meaning, agency and belonging, have no mature measures yet.
- **H2. No consensus within the dimensions.** Even on the known dimensions, there is no consensus on what good looks like, because people and political traditions weigh them very differently (for example, capitalism versus socialism).
- **H3. Drift and degradation.** Unless the dimensions are factored in, *and* we have a legitimate way of handling disagreement over them, we are likely to drift into gradual disempowerment and a degraded human experience. Drift of this kind already happens without AI (deaths of despair, the social media debate). What AI adds is speed, scale, and the removal of the human participation that keeps institutions answerable to people.

**The testable prediction.** As AI spreads, the measured dimensions (output, income, some health outcomes) will improve while the unmeasured ones (relationships, agency, competence, meaning, belonging) stagnate or decline, and the gap between them will widen.

**Scope note.** This is a structured narrative review of the main strands in each field, built from roughly 100 sources. It is not a PRISMA-style systematic review. Every source below is real. Papers link to arXiv, DOIs or the journal; books link to the publisher where possible. Where a finding is contested, the review says so.

## Bottom line

| Claim | Verdict | Strongest support | Main challenge |
|---|---|---|---|
| **H1** Known dimensions are not factored in | **Strongly supported** | Convergent dimensions across philosophy, psychology and national frameworks; adaptation research; the Global Flourishing Study; the gap in AI safety work (sections 1 to 4) | Some dimensions (meaning, agency, belonging) lack mature measures, so part of the gap is measurement science, not neglect |
| **H2** No consensus within the dimensions | **Strongly supported** | Moral foundations and world values research; stated-preference wellbeing studies; Arrow's theorem; value pluralism (section 5) | Some argue full weights are not needed: floors on every dimension plus a dashboard can avoid forcing one ranking |
| **H3** Drift and degradation | **Supported as a serious risk** | Kulveit et al. (2025), Christiano (2019), Critch & Russell (2023); existing drift without AI (Case & Deaton) | Critics may say drift predates AI, and that a single imposed vision is itself a risk. Both are answered by the refined wording: AI adds speed, scale and less need for human participation, and the remedy is a process for disagreement, not one vision |

**The core argument the evidence supports.**

1. **AI progress ignores the known dimensions (H1).** Philosophy, psychology and national wellbeing statistics converge on a fairly stable set of dimensions of a good life. AI progress is tracked through capability and economic output, and most of the other dimensions are not tracked at all. Sections 1 to 4 cover this.
2. **Even on the known dimensions, there is no consensus on what good looks like (H2).** People and political traditions weigh the dimensions very differently, and those weights are what they fight over. Section 5 covers this.
3. **The two compound into drift (H3).** AI optimisation always needs *some* weighting. When none is agreed and only some dimensions are measured, the weighting is set by default by whatever is easiest to measure and sell. The absence of agreed weights does not produce neutrality. It produces a growth-and-consumption weighting that nobody chose. AI then applies it faster and at greater scale than any earlier technology, while needing less human participation to keep running.

**What would stop the drift.** Full consensus is not required, and seeking it is open to the charge of paternalism. What is required is (a) measuring the neglected dimensions, and (b) a legitimate process for handling disagreement: minimum thresholds on every dimension, separate scores rather than one combined index, and deliberation over the weights above the minimums.

---

## 1. AI safety literature

### 1.1 How the field frames a "good outcome"

The literature falls into seven strands. Only the last three deal directly with your question.

**A. Catastrophe and extinction avoidance.** The dominant frame. Key texts: Bostrom, *[Superintelligence](https://global.oup.com/academic/product/superintelligence-9780199678112)* (2014); Ord, *[The Precipice](https://theprecipice.com/)* (2020); Hendrycks et al., "[An Overview of Catastrophic AI Risks](https://arxiv.org/abs/2306.12001)" (2023); Bengio et al., "[Managing extreme AI risks amid rapid progress](https://www.science.org/doi/10.1126/science.adn0117)" (*Science*, 2024); the *[International AI Safety Report 2026](https://arxiv.org/abs/2602.21012)*.

A useful point for your article: Bostrom's own definition of existential risk already covers your case. In "[Existential Risk Prevention as Global Priority](https://existential-risk.com/concept.pdf)" (2013) he defines it as a risk that threatens extinction *or* "the permanent and drastic destruction of its potential for desirable future development". In practice the field has concentrated on the extinction half. You can argue you are reclaiming a neglected half of the field's own founding definition.

**B. Technical intent alignment.** Making systems do what operators intend: RLHF, Constitutional AI, scalable oversight. Representative: Ngo, Chan & Mindermann, "[The Alignment Problem from a Deep Learning Perspective](https://arxiv.org/abs/2209.00626)" (2022); Ji et al., "[AI Alignment: A Comprehensive Survey](https://arxiv.org/abs/2310.19852)" (2023); Casper et al., "[Open Problems and Fundamental Limitations of RLHF](https://arxiv.org/abs/2307.15217)" (2023). This strand mostly leaves "aligned to whom, and towards what?" open.

**C. Value specification: "aligned to what?"** The closest strand to your question, mostly philosophical.
- Gabriel, "[Artificial Intelligence, Values, and Alignment](https://arxiv.org/abs/2001.09768)" (*Minds and Machines*, 2020). The key reference. Distinguishes aligning to instructions, expressed intentions, revealed preferences, informed preferences, **interests or wellbeing**, and values. Argues that because people disagree, the goal should be principles that people with different views could reasonably endorse.
- Yudkowsky, "[Coherent Extrapolated Volition](https://intelligence.org/files/CEV.pdf)" (2004). Aim at what humanity would want "if we knew more, thought faster, were more the people we wished we were".
- Russell, *[Human Compatible](https://people.eecs.berkeley.edu/~russell/hc.html)* (2019). Machines should be uncertain about, and defer to, human preferences.
- Zhi-Xuan, Carroll, Franklin & Ashton, "[Beyond Preferences in AI Alignment](https://arxiv.org/abs/2408.16984)" (*Philosophical Studies*, 2024). Argues preferences are a poor proxy for wellbeing and value, and that alignment should target normative standards appropriate to a system's social role.
- Klingefjord, Lowe & Edelman, "[What are human values, and how do we align AI to them?](https://arxiv.org/abs/2404.10636)" (2024). Builds a "moral graph" of values from participants and shows people converge more than expected on what wise responses look like.
- Meaning Alignment Institute and co-authors, "[Full-Stack Alignment: Co-Aligning AI and Institutions with Thick Models of Value](https://arxiv.org/abs/2512.03399)" (2025). Argues alignment must cover institutions, not just models, and that "thin" preference models miss what people actually care about. Very close to your thesis.

**D. Pluralistic and democratic alignment.** How to aggregate diverse values.
- Sorensen et al., "[A Roadmap to Pluralistic Alignment](https://arxiv.org/abs/2402.05070)" (ICML, 2024).
- Conitzer et al., "[Social Choice Should Guide AI Alignment](https://arxiv.org/abs/2404.10271)" (ICML, 2024).
- Anthropic & CIP, "[Collective Constitutional AI](https://www.anthropic.com/research/collective-constitutional-ai-aligning-a-language-model-with-public-input)" (2023; [paper](https://arxiv.org/abs/2406.07814)). About 1,000 US adults drafted principles for a model.
- OpenAI, "[Democratic Inputs to AI](https://openai.com/index/democratic-inputs-to-ai/)" (2023).
- Kirk et al., "[The PRISM Alignment Dataset](https://arxiv.org/abs/2404.16019)" (2024). Preferences from 1,500 people in 75 countries.
- Tessler et al., "[AI can help humans find common ground in democratic deliberation](https://www.science.org/doi/10.1126/science.adq2852)" (*Science*, 2024), the "Habermas machine".

These solve the *procedure* problem (how to combine views), not the *content* problem (what a good life contains).

**E. Structural risk and gradual disempowerment.** Your hypothesis sits here.
- Christiano, "[What failure looks like](https://www.alignmentforum.org/posts/HBxe6wdjxK239zajf/what-failure-looks-like)" (2019). Part I, "going out with a whimper", describes AI systems optimising easy-to-measure proxies (profit, reported crime, GDP) until human influence over the future erodes. This is almost exactly your H3 mechanism, and is the best early citation for it.
- Critch & Krueger, "[AI Research Considerations for Human Existential Safety (ARCHES)](https://arxiv.org/abs/2006.04948)" (2020).
- Critch & Russell, "[TASRA: A Taxonomy and Analysis of Societal-Scale Risks from AI](https://arxiv.org/abs/2306.06924)" (2023). Includes risks with no single bad actor, arising from many locally reasonable decisions.
- Kulveit, Douglas, Ammann, Turan, Krueger & Duvenaud, "[Gradual Disempowerment: Systemic Existential Risks from Incremental AI Development](https://arxiv.org/abs/2501.16946)" (2025; [ICML 2025 position paper](https://proceedings.mlr.press/v267/kulveit25a.html)). The central text. Argues that economic, cultural and state systems stay aligned with human interests partly because they *need* human labour and participation. As AI replaces that participation, the feedback that keeps institutions serving people weakens, even without any misaligned AI.
- Drago & Laine, "[The Intelligence Curse](https://intelligence-curse.ai/intelligence-curse.pdf)" (2025). Applies the "resource curse" to AI: states and firms that no longer need people may stop investing in them.
- Acemoglu & Johnson, *Power and Progress* (2023); Acemoglu, "[Harms of AI](https://www.nber.org/papers/w29247)" (NBER, 2021).

**F. Individual-level wellbeing and socio-affective harms.** Growing fast since 2024 and becoming empirical.
- Weidinger et al., "[Ethical and social risks of harm from Language Models](https://arxiv.org/abs/2112.04359)" (2021); Weidinger et al., "[Sociotechnical Safety Evaluation of Generative AI Systems](https://arxiv.org/abs/2310.11986)" (2023).
- Gabriel et al., "[The Ethics of Advanced AI Assistants](https://arxiv.org/abs/2404.16244)" (Google DeepMind, 2024). A 200-page treatment covering wellbeing, autonomy, manipulation and anthropomorphism. Explicitly discusses aligning assistants to user *wellbeing*, not just requests.
- Kirk, Gabriel, Summerfield, Vidgen & Hale, "[Why human–AI relationships need socioaffective alignment](https://arxiv.org/abs/2502.02528)" (2025).
- Phang et al. (OpenAI & MIT Media Lab), "[Investigating Affective Use and Emotional Well-being on ChatGPT](https://arxiv.org/abs/2504.03888)" (2025). Heavy use correlated with more loneliness and emotional dependence for a subset of users.
- Anthropic, "[Who's in Charge? Disempowerment Patterns in Real-World LLM Usage](https://arxiv.org/abs/2601.19062)" (2026; [summary](https://www.anthropic.com/research/disempowerment-patterns)). Empirical analysis of real conversations for patterns where users cede judgement or agency.
- Sharma et al., "[Towards Understanding Sycophancy in Language Models](https://arxiv.org/abs/2310.13548)" (2023).
- Kosmyna et al., "[Your Brain on ChatGPT](https://arxiv.org/abs/2506.08872)" (2025). Small EEG study suggesting "cognitive debt" from essay-writing with LLMs. Not yet peer reviewed; cite with care.

**G. Positive visions of flourishing.** Small but growing.
- Amodei, "[Machines of Loving Grace](https://www.darioamodei.com/essay/machines-of-loving-grace)" (2024). Covers biology, neuroscience, economic development, governance, and "work and meaning". Notably, the meaning section is the most tentative.
- Bostrom, *[Deep Utopia: Life and Meaning in a Solved World](https://nickbostrom.com/deep-utopia/2024-03-18)* (2024). Asks what gives life purpose when AI can do everything better.
- MacAskill et al., "[Better Futures](https://www.forethought.org/research/better-futures)" (Forethought, 2025). Argues that making the future *good*, not just making sure it exists, deserves comparable attention, and that a "mostly great" future is a narrow target.
- "[Measuring AI Alignment with Human Flourishing](https://arxiv.org/abs/2507.07787)" (2025). The Flourishing AI benchmark scores models across seven dimensions drawn from the Harvard flourishing framework.
- Schiff et al., "[IEEE 7010: A New Standard for Assessing the Well-being Implications of AI](https://arxiv.org/abs/2005.06620)" (2020); [IEEE 7010-2020 standard](https://standards.ieee.org/ieee/7010/7718/).
- Stray, "[Aligning AI Optimization to Community Well-Being](https://pmc.ncbi.nlm.nih.gov/articles/PMC7610010)" (2020). Proposes using wellbeing metrics such as the OECD framework as AI optimisation targets. One of very few papers that connect AI alignment to the wellbeing-measurement literature.

### 1.2 What is well covered and what is not

| Coverage | Themes |
|---|---|
| **Well covered** | Catastrophic misuse (bio, cyber); loss of control and deceptive alignment; technical intent alignment; preference aggregation and social choice; bias, fairness and toxicity; labour displacement framed as income and employment; concentration of power; sycophancy and manipulation inside a single conversation |
| **Emerging, mostly conceptual** | Gradual disempowerment (strong theory, few metrics); emotional dependence on AI (early empirical work); epistemic autonomy and cognitive offloading; wellbeing-aware assistant design |
| **Thin or missing** | See the list below |

**Gaps your article can fill:**

1. **No substantive account of the good life.** Alignment targets defer to "preferences", "values" or "helpful, honest, harmless". Almost no technical work specifies what dimensions of human life an aligned system should protect or improve.
2. **No societal-level metrics.** Benchmarks measure model behaviour per conversation. There is almost nothing that tracks whether AI deployment is improving or eroding relationships, purpose, civic participation or skills at population level. IEEE 7010 exists but is rarely used.
3. **Weak links to wellbeing science.** The safety literature rarely cites self-determination theory, adaptation research, the Easterlin paradox or the OECD/Stiglitz-Sen-Fitoussi measurement work. Stray (2020), IEEE 7010 and the Flourishing AI benchmark are the exceptions.
4. **Meaning, contribution and status treated as philosophy, not engineering.** Bostrom, Amodei and Danaher raise them; nobody operationalises them.
5. **Aggregation of individually good interactions into collectively bad outcomes.** Kulveit et al. name it, but there is little work on how to detect it.
6. **Cross-cultural content.** Collective Constitutional AI used about 1,000 US adults. PRISM is broader but is about chatbot preferences, not visions of the good life.
7. **Relational and community goods.** Trust, belonging, local institutions and shared culture are almost absent from AI safety evaluations.

**Verdict for your hypothesis.** The AI safety literature **supports H3** (Kulveit, Christiano and Critch give you the mechanism) and **confirms a real gap** behind H1 and H2: almost no one has connected alignment targets to an empirically grounded, multi-dimensional account of wellbeing. That gap is your article's contribution.

---

## 2. Philosophy: what "good for humanity" means

### 2.1 The three classic theories of wellbeing

Parfit's taxonomy in *[Reasons and Persons](https://global.oup.com/academic/product/reasons-and-persons-9780198249085)* (1984, Appendix I) is still the standard map. For an accessible overview see Crisp, "[Well-Being](https://plato.stanford.edu/entries/well-being/)" (*Stanford Encyclopedia of Philosophy*).

| Theory | Says a life goes well when... | Relevance to AI |
|---|---|---|
| **Hedonism** | It contains more pleasure and less suffering | Most at risk of "wireheading". An AI could maximise pleasant experience while hollowing out everything else |
| **Desire or preference satisfaction** | People get what they want (or would want if informed) | The implicit theory behind RLHF and most alignment. Vulnerable to adaptive preferences and manipulation, since AI can shape what people want |
| **Objective list** | It contains certain goods whether or not the person wants them | Closest to your thesis. Lists vary, but typically include achievement, friendship, knowledge, autonomy, pleasure, virtue and self-respect. See Fletcher, "[A Fresh Look at the Objective List Theory of Well-Being](https://doi.org/10.1017/S0953820812000453)" (*Utilitas*, 2013) |

**Nozick's experience machine** (*Anarchy, State, and Utopia*, 1974) is the classic argument that we care about more than experience: most people would not plug into a machine that guaranteed pleasant experiences, because they want to actually *do* things and actually *be* certain kinds of people. This thought experiment is very well suited to AI: it is exactly the choice a powerful AI could offer.

### 2.2 Flourishing traditions

- **Aristotle.** *Nicomachean Ethics* treats *eudaimonia* as activity that exercises our distinctively human capacities well, over a whole life. External goods, including wealth and health, are needed but not sufficient. Aristotle explicitly says wealth is "merely useful and for the sake of something else". See Kraut, "[Aristotle's Ethics](https://plato.stanford.edu/entries/aristotle-ethics/)" (SEP).
- **The capabilities approach.** Sen, *[Development as Freedom](https://global.oup.com/academic/product/development-as-freedom-9780192893307)* (1999), and Nussbaum, *[Creating Capabilities](https://www.hup.harvard.edu/books/9780674072350)* (2011). Judge a society by what people are actually able to do and be, not by resources. Nussbaum's ten central capabilities include affiliation, play, practical reason and control over one's environment. Designed to be the object of cross-cultural agreement. See Robeyns & Byskov, "[The Capability Approach](https://plato.stanford.edu/entries/capability-approach/)" (SEP).
- **Practices and internal goods.** MacIntyre, *[After Virtue](https://undpress.nd.edu/9780268035044/after-virtue/)* (1981). Many goods, such as the satisfaction of craft, are only available to people who take part in a practice. If AI does the practice, those goods vanish even if the outputs improve.
- **Meaning in life.** Wolf, *[Meaning in Life and Why It Matters](https://press.princeton.edu/books/paperback/9780691154503/meaning-in-life-and-why-it-matters)* (2010): meaning arises "when subjective attraction meets objective attractiveness", active engagement with something worthwhile beyond oneself. See Metz, "[The Meaning of Life](https://plato.stanford.edu/entries/life-meaning/)" (SEP).
- **Autonomy.** Mill, *On Liberty* (1859), and Raz, *The Morality of Freedom* (1986), treat self-direction as part of the good itself, not just a route to it. This matters directly for disempowerment: a life where good outcomes are delivered but not chosen is worse on these views.

### 2.3 Philosophy of post-work and "solved" worlds

- Keynes, "[Economic Possibilities for our Grandchildren](http://www.econ.yale.edu/smith/econ116a/keynes1.pdf)" (1930). Predicted the main problem after abundance would be how to "occupy the leisure".
- Suits, *[The Grasshopper: Games, Life and Utopia](https://broadviewpress.com/product/the-grasshopper-third-edition/)* (1978). In utopia, game-playing (voluntarily overcoming unnecessary obstacles) might be all that remains.
- Danaher, *[Automation and Utopia](https://www.hup.harvard.edu/books/9780674984240)* (2019). Argues automation of work could be good, but that cognitive automation threatens the human capacity for understanding and agency.
- Bostrom, *Deep Utopia* (2024), cited above. Separates the loss of *instrumental* purpose from the question of whether life can still be meaningful.
- Vallor, *[The AI Mirror](https://global.oup.com/academic/product/the-ai-mirror-9780197759066)* (2024). Argues AI reflects past human patterns back to us and can erode our capacity for moral self-cultivation.

### 2.4 The case against a shared vision

This is the strongest challenge to H2 and H3, and the article should engage it directly.

- **Liberal neutrality.** Rawls, *[Political Liberalism](https://cup.columbia.edu/book/political-liberalism/9780231130899)* (1993), argues that in a free society people will reasonably disagree about the good life, so public institutions should not impose one "comprehensive doctrine". Instead they should secure "primary goods" (rights, liberties, opportunities, income, the social bases of self-respect) that any life plan needs. Gabriel (2020) applies this directly to AI.
- **Value pluralism.** Berlin argued genuine values can conflict without a single correct ranking. See Mason, "[Value Pluralism](https://plato.stanford.edu/entries/value-pluralism/)" (SEP).
- **Lock-in risk.** If the vision is specified by a lab or government and then optimised by a powerful system, it could disempower people more than drift would. MacAskill's "Better Futures" series and the pluralistic-alignment literature both make this point.

**How to answer it.** Rawls's primary goods and Nussbaum's capabilities are themselves *thin shared visions*. They specify the *conditions* any good life needs without dictating which good life to lead. This lets you argue for a shared vision without paternalism: alignment should protect the capabilities and primary goods that allow people to pursue their own conceptions of the good, and these go well beyond wealth and health.

**Verdict.** Philosophy **strongly supports H1**: no serious theory equates the good life with wealth and health. It **supports H2**: there is real convergence on a list of goods (relationships, knowledge, achievement, autonomy, meaning), but principled and probably permanent disagreement on how to rank them and on whether any authority should choose for others. It **qualifies H3**: the remedy is a thin vision of protected capabilities, not a thick vision of the ideal life.

---

## 3. Psychology: what creates sustainable happiness

### 3.1 Two kinds of wellbeing

Psychology distinguishes **hedonic** wellbeing (positive feeling, life satisfaction) from **eudaimonic** wellbeing (meaning, growth, functioning well). See Ryan & Deci, "[On Happiness and Human Potentials](https://doi.org/10.1146/annurev.psych.52.1.141)" (*Annual Review of Psychology*, 2001). Measures include Diener's subjective wellbeing ("[Subjective Well-Being](https://doi.org/10.1037/0033-2909.95.3.542)", 1984) and Ryff's six dimensions of psychological wellbeing: autonomy, environmental mastery, personal growth, positive relations, purpose in life, self-acceptance ("[Happiness is everything, or is it?](https://doi.org/10.1037/0022-3514.57.6.1069)", 1989).

### 3.2 Money: necessary, not sufficient, and with diminishing returns

- **Easterlin paradox.** Easterlin, "[Does Economic Growth Improve the Human Lot?](https://doi.org/10.1016/B978-0-12-205050-3.50008-7)" (1974). Within a country, richer people are happier; over time, as whole countries grow richer, average happiness rises much less than expected.
- **Income and emotion.** Kahneman & Deaton, "[High income improves evaluation of life but not emotional well-being](https://doi.org/10.1073/pnas.1011492107)" (*PNAS*, 2010) suggested a plateau around $75k. Killingsworth, Kahneman & Mellers, "[Income and emotional well-being: A conflict resolved](https://pmc.ncbi.nlm.nih.gov/articles/PMC10068796/)" (*PNAS*, 2023) found happiness keeps rising with income for most people, except the least happy fifth, where it plateaus.

**Be careful here.** The modern evidence says money matters more than the popular "money doesn't buy happiness" line. The safe claim for your article is that income has *diminishing* returns (roughly logarithmic), that *relative* income and status matter, and that income cannot substitute for the other drivers below.

### 3.3 Adaptation: why material gains fade

- Brickman, Coates & Janoff-Bulman, "[Lottery winners and accident victims: Is happiness relative?](https://doi.org/10.1037/0022-3514.36.8.917)" (1978), introduced the "hedonic treadmill".
- Diener, Lucas & Scollon, "[Beyond the hedonic treadmill](https://doi.org/10.1037/0003-066X.61.4.305)" (2006), revised it: adaptation is real but not complete, and varies by person and event.
- Luhmann, Hofmann, Eid & Lucas, "[Subjective well-being and adaptation to life events: a meta-analysis](https://pmc.ncbi.nlm.nih.gov/articles/PMC3289759)" (*JPSP*, 2012). People adapt fairly well to many events, but adapt poorly or slowly to **unemployment** and to losing a partner.

**Why this matters for your thesis.** There is an asymmetry: people adapt to material gains, but losses of social roles, relationships and work persist. An AI transition that raises incomes while removing roles could therefore leave people worse off even as wealth rises. This is one of your strongest evidence-based arguments.

### 3.4 Sustainable happiness

- Lyubomirsky, Sheldon & Schkade, "[Pursuing Happiness: The Architecture of Sustainable Change](https://doi.org/10.1037/1089-2680.9.2.111)" (2005). Proposed that circumstances explain little of happiness and intentional activity a lot. **Do not cite the famous "50/10/40 pie" as fact.** It has been heavily criticised, notably by Brown & Rohrer, "[Easy as (Happiness) Pie?](https://doi.org/10.1007/s10902-019-00128-4)" (2020). The durable lesson is that activities people choose and engage in sustain wellbeing better than changes in circumstances.
- Sheldon & Lyubomirsky, "[The Challenge of Staying Happier](https://doi.org/10.1177/0146167212436400)" (2012). Positive changes last when they bring variety and are actively appreciated.

### 3.5 What reliably drives wellbeing

1. **Basic psychological needs: autonomy, competence, relatedness.** Self-determination theory: Ryan & Deci, "[Self-Determination Theory and the Facilitation of Intrinsic Motivation, Social Development, and Well-Being](https://doi.org/10.1037/0003-066X.55.1.68)" (2000). Cross-cultural support in Chen et al., "[Basic psychological need satisfaction... across four cultures](https://doi.org/10.1007/s11031-014-9450-1)" (2015). **This is the single most useful framework for your article**, because each need maps onto a specific AI risk: delegation erodes autonomy, deskilling erodes competence, AI companionship can substitute for relatedness.
2. **Close relationships.** The Harvard Study of Adult Development, running since 1938, finds relationship quality is the strongest predictor of later-life health and happiness (Waldinger & Schulz, *[The Good Life](https://www.simonandschuster.com/books/The-Good-Life/Robert-Waldinger/9781982166694)*, 2023). Holt-Lunstad, Smith & Layton, "[Social Relationships and Mortality Risk](https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.1000316)" (2010), found strong social ties raise survival odds by about 50%, comparable to quitting smoking. Baumeister & Leary, "[The Need to Belong](https://doi.org/10.1037/0033-2909.117.3.497)" (1995).
3. **Meaning and purpose.** Martela & Steger, "[The three meanings of meaning in life](https://doi.org/10.1080/17439760.2015.1137623)" (2016): coherence, purpose, significance. Hill & Turiano, "[Purpose in Life as a Predictor of Mortality](https://doi.org/10.1177/0956797614531799)" (2014).
4. **Work beyond income.** Jahoda, "[Work, employment, and unemployment](https://doi.org/10.1037/0003-066X.36.2.184)" (1981), identified the "latent functions" of work: time structure, social contact, shared purpose, status and identity, and regular activity. Paul & Moser, "[Unemployment impairs mental health: Meta-analyses](https://doi.org/10.1016/j.jvb.2009.01.001)" (2009). This is direct evidence that replacing income does not replace what work provides.
5. **Mastery and flow.** Csikszentmihalyi, *[Flow](https://www.harpercollins.com/products/flow-mihaly-csikszentmihalyi)* (1990). Deep engagement in challenging, skilled activity.
6. **Prosocial behaviour.** Dunn, Aknin & Norton, "[Spending Money on Others Promotes Happiness](https://doi.org/10.1126/science.1150952)" (*Science*, 2008). *[World Happiness Report 2025](https://worldhappiness.report/ed/2025/)*, "Caring and Sharing", found benevolence, trust, and sharing meals predict happiness strongly, and that eating alone is rising.
7. **Materialistic values hurt.** Kasser & Ryan, "[A dark side of the American dream](https://doi.org/10.1037/0022-3514.65.2.410)" (1993); Dittmar et al., "[The relationship between materialism and personal well-being: A meta-analysis](https://doi.org/10.1037/a0037409)" (2014).

### 3.6 Population-level evidence: rich but not flourishing

- **Global Flourishing Study.** VanderWeele, Johnson et al. (*Nature Mental Health*, 2025), about 200,000 people in 22 countries ([Harvard summary](https://hsph.harvard.edu/news/measuring-a-life-well-lived/); [Harvard Gazette](https://news.harvard.edu/gazette/story/2025/04/more-proof-that-money-isnt-everything)). Wealthier countries scored higher on financial security but often lower on meaning, relationships and prosocial character. Indonesia ranked highest on overall flourishing; Japan lowest. Young adults are flourishing less than older adults in many countries. **This is probably the single best empirical source for H1.** The measurement framework is in VanderWeele, "[On the promotion of human flourishing](https://pmc.ncbi.nlm.nih.gov/articles/PMC5547610)" (*PNAS*, 2017).
- **Deaths of despair.** Case & Deaton, *[Deaths of Despair and the Future of Capitalism](https://press.princeton.edu/books/hardcover/9780691190785/deaths-of-despair-and-the-future-of-capitalism)* (2020). In the US, rising deaths from suicide, drugs and alcohol among people without degrees tracked the loss of good jobs, community and status, not simply income.
- **Social capital decline.** Putnam, *[Bowling Alone](https://www.simonandschuster.com/books/Bowling-Alone/Robert-D-Putnam/9780743203043)* (2000).
- **Optimising a proxy: the social media analogy.** Engagement-optimised platforms are the closest existing case of technology optimising a proxy at scale. The evidence on harm is genuinely contested: compare Haidt, *[The Anxious Generation](https://www.anxiousgeneration.com/book)* (2024), with Orben & Przybylski, "[The association between adolescent well-being and digital technology use](https://doi.org/10.1038/s41562-018-0506-1)" (2019). Use it as an analogy for proxy optimisation, not as settled proof of harm.

**Verdict.** Psychology **strongly supports H1**, with one correction: do not say money doesn't matter. Say it has diminishing returns and cannot substitute for autonomy, competence, relationships, meaning and contribution. The adaptation asymmetry and Jahoda's latent functions of work give you a concrete mechanism for how an AI-driven economy could raise wealth while degrading lives.

---

## 4. Frameworks for breaking down human experience

### 4.1 The main candidates

| Framework | Origin | Dimensions | Fit for your article |
|---|---|---|---|
| **[OECD Well-being Framework](https://www.oecd.org/en/publications/how-s-life-2024_90ba854a-en)** (How's Life?) | OECD, 2011, revised 2020 | 11 current-wellbeing dimensions: income and wealth; work and job quality; housing; health; knowledge and skills; environmental quality; subjective wellbeing; safety; work-life balance; social connections; civic engagement. Plus 4 capitals for the future: natural, economic, human, social | **Most authoritative and measurable.** Agreed across 38 governments, with indicators. Weak on meaning, purpose, culture and autonomy |
| **[Stiglitz-Sen-Fitoussi Commission](https://ec.europa.eu/eurostat/documents/8131721/8131772/Stiglitz-Sen-Fitoussi-Commission-report.pdf)** | French government, 2009 | 8: material living standards; health; education; personal activities including work; political voice and governance; social connections; environment; insecurity | **The founding "Beyond GDP" text.** Cite it for the argument that GDP misleads |
| **[Capabilities approach](https://plato.stanford.edu/entries/capability-approach/)** (Nussbaum's list) | Sen and Nussbaum, 1980s to 2011 | 10: life; bodily health; bodily integrity; senses, imagination and thought; emotions; practical reason; affiliation; other species; play; control over one's environment | **Best philosophical anchor.** Designed for cross-cultural consensus, focuses on what people can do and be. Harder to measure |
| **[NZ Living Standards Framework](https://www.treasury.govt.nz/publications/tp/living-standards-framework-2021)** | NZ Treasury, 2021 | 12 domains: cultural capability and belonging; engagement and voice; environmental amenity; family and friends; health; housing; income, consumption and wealth; knowledge and skills; leisure and play; safety; subjective wellbeing; work, care and volunteering. Plus institutions and wealth. Paired with the Māori [He Ara Waiora](https://www.oecd.org/en/publications/well-being-knowledge-exchange-platform-kep_93d45d63-en/new-zealand-s-living-standards-framework-and-he-ara-waiora-framework_dfce8af5-en.html) framework | **Strong on culture, belonging and voice.** A real government using wellbeing in budgeting |
| **[UK ONS Measuring National Well-being](https://www.ons.gov.uk/peoplepopulationandcommunity/wellbeing)** | ONS, 2010 onwards | 10: personal wellbeing; relationships; health; what we do; where we live; personal finance; economy; education and skills; governance; environment | Good UK reference with long data series |
| **[Bhutan Gross National Happiness](https://ophi.org.uk/node/3258)** | Centre for Bhutan Studies, 2008 onwards | 9: psychological wellbeing; health; education; time use; cultural diversity and resilience; good governance; community vitality; ecological diversity; living standards | Includes **time use, culture and community vitality**, which most Western frameworks miss |
| **[Social Progress Index](https://www.socialprogress.org/methodology)** | Social Progress Imperative, 2013 onwards | 3 dimensions, 12 components: basic human needs; foundations of wellbeing; opportunity (rights, freedom and choice, inclusiveness, advanced education) | Deliberately excludes economic indicators. Strong on freedom and opportunity |
| **[Harvard Human Flourishing](https://hfh.fas.harvard.edu/post/insights-from-the-global-flourishing-study)** (VanderWeele) | Harvard, 2017 | 5 core domains: happiness and life satisfaction; mental and physical health; meaning and purpose; character and virtue; close social relationships. Plus financial and material stability | Used in the Global Flourishing Study and the Flourishing AI benchmark. Individual-level only |
| **PERMA** | Seligman, *[Flourish](https://www.simonandschuster.com/books/Flourish/Martin-E-P-Seligman/9781439190760)* (2011) | Positive emotion; engagement; relationships; meaning; accomplishment | Popular and memorable. Weaker empirical structure |
| **Self-determination theory** | Ryan & Deci, 2000 | Autonomy; competence; relatedness | Best evidence base for psychological *mechanisms* |
| **Max-Neef Human Scale Development** | Max-Neef, *Human Scale Development* (*Development Dialogue* 1989:1, Dag Hammarskjöld Foundation; book 1991) | 9 needs (subsistence, protection, affection, understanding, participation, leisure, creation, identity, freedom) across 4 modes (being, having, doing, interacting) | **Distinctive and very useful for AI.** Separates fixed *needs* from changeable *satisfiers*, and names "pseudo-satisfiers" that seem to meet a need but don't. See 4.3 |
| **Doyal & Gough, *A Theory of Human Need*** | 1991 | Basic needs: physical health and autonomy. 11 intermediate needs | Rigorous argument that needs are universal and objective |
| **Allardt's Having, Loving, Being** | Allardt, 1976; in Nussbaum & Sen, *[The Quality of Life](https://global.oup.com/academic/product/the-quality-of-life-9780198287971)* (1993) | Having (material); loving (social); being (self-realisation, political participation, meaning) | Simple three-part structure, good for a headline |
| **Bourdieu's forms of capital** | Bourdieu, "[The Forms of Capital](https://www.marxists.org/reference/subject/philosophy/works/fr/bourdieu-forms-capital.htm)" (1986) | Economic, social, cultural (later symbolic) | Closest match to your "economic, social, intellectual, cultural" example. Strong on power and inequality, but a sociology of advantage, not of wellbeing |
| **[Doughnut Economics](https://doughnuteconomics.org/about-doughnut-economics)** social foundation | Raworth, 2017 | 12: food; health; education; income and work; peace and justice; political voice; social equity; gender equality; housing; networks; energy; water | Adds the planetary ceiling. Mostly a floor of basic needs |
| **[WHOQOL](https://www.who.int/tools/whoqol)** | WHO, 1990s | 6: physical; psychological; level of independence; social relationships; environment; spirituality and personal beliefs | Validated, cross-cultural, health-centred |
| **Maslow's hierarchy** | Maslow, 1943 | Physiological, safety, belonging, esteem, self-actualisation | Widely known but the *hierarchy* is not well supported. Tay & Diener, "[Needs and subjective well-being around the world](https://doi.org/10.1037/a0023779)" (2011), found the needs matter universally but not in fixed order. Use with care |

Others worth knowing: the [UN Human Development Index](https://hdr.undp.org/data-center/human-development-index) (health, education, income only, so a useful *example* of the narrow view), the UN [Sustainable Development Goals](https://sdgs.un.org/goals), Wales's [Well-being of Future Generations Act](https://www.futuregenerations.wales/about-us/future-generations-act/) (2015, which includes "vibrant culture"), the [Canadian Index of Wellbeing](https://uwaterloo.ca/canadian-index-wellbeing/), and Gallup's five elements of wellbeing (Rath & Harter, *Wellbeing*, 2010).

### 4.2 Recommendation: adopt a composite, anchored in established work

No single framework covers everything your argument needs. The OECD framework is measurable but thin on meaning and agency. Capabilities is normatively strong but hard to measure. SDT explains mechanisms but is individual-level only.

A defensible approach is to **anchor on the OECD framework and the capabilities approach**, then add the dimensions that the psychology evidence says matter and that AI specifically threatens. For example, eight domains:

| Domain | Draws on | What AI could do to it |
|---|---|---|
| **Material security** | OECD income and wealth, housing; Allardt "having" | Likely improves on average; distribution is the risk |
| **Health and body** | OECD health; Nussbaum life, bodily health | Likely improves |
| **Relationships and belonging** | SDT relatedness; OECD social connections; Harvard Study | AI companions may substitute for human ties |
| **Agency and voice** | SDT autonomy; Nussbaum practical reason and control over environment; OECD civic engagement | Delegated decisions; institutions that no longer need citizens (Kulveit) |
| **Competence and understanding** | SDT competence; OECD knowledge and skills; Nussbaum senses, imagination and thought | Deskilling and cognitive offloading |
| **Meaning and contribution** | Martela & Steger; Jahoda's functions of work; Wolf | Loss of roles in which people are needed |
| **Culture, identity and play** | NZ LSF cultural capability; GNH cultural diversity; Nussbaum play; Bourdieu | Homogenised culture; AI-generated culture displacing human-made culture |
| **Shared environment and future** | OECD capitals; Doughnut; GNH ecology | Mixed |

Your article's core claim then becomes very concrete: **current success metrics capture the first two rows; the other six are where the gradual degradation would happen, and they are the ones nobody is measuring.**

This also lines up with the project's existing [Reasonable Path simulator](../gradual-disempowerment-simulator/reasonable-path.html), which already tracks six areas: economic, political, cultural, cognitive, social and purpose. Mapping those to the domains above (and adding material security and health as the "rising" dimensions) would let the simulator show your H3 argument directly: two lines go up while six go down.

### 4.3 A tool worth borrowing: Max-Neef's satisfiers

Max-Neef's most useful idea for AI is that **needs stay constant across cultures and history; what changes is the "satisfiers" we use to meet them.** He classifies satisfiers as:

- **Synergic:** meet one need and support others (for example, community education meets understanding, participation and identity).
- **Singular:** meet one need only.
- **Pseudo-satisfiers:** create a false sense of meeting a need.
- **Inhibiting:** over-satisfy one need and block others.
- **Violators or destroyers:** claim to meet a need but end up undermining it.

This gives you a clean test for any AI product: is it a synergic satisfier (an AI tutor that builds understanding *and* competence), a pseudo-satisfier (an AI companion that feels like affection without the mutual relationship), or an inhibiting satisfier (an assistant that meets the need for subsistence and protection while removing participation and creation)? It is a vivid, original lens that I have not found applied systematically in the AI safety literature.

---

## 5. Where the real disagreement lies: weights

### 5.1 Same dimensions, different weights

Political traditions rarely disagree about *whether* material security, equality, freedom, belonging or contribution matter. They disagree about how to trade them against each other. Capitalism versus socialism is the clearest case. Both value material security and human dignity. Market economies weight growth, choice, competition and individual achievement more heavily; socialist traditions weight equality, solidarity, security and collective contribution more heavily.

| Trade-off | Weighted more by... | Weighted more by... |
|---|---|---|
| Growth vs equality | Market liberal traditions | Social democratic and socialist traditions |
| Individual freedom vs collective security | Liberal and libertarian | Communitarian and collectivist |
| Competition and achievement vs solidarity and belonging | Meritocratic cultures | Egalitarian cultures |
| Consumption and choice vs sufficiency | Growth economics | Degrowth, Doughnut, Buddhist economics |
| Tradition and identity vs openness and self-expression | Conservative and "traditional" societies | Liberal and "self-expression" societies |

The eight domains in section 4.2 can stay the same while each of these positions gives a very different answer to "is this AI-shaped society good for people?".

### 5.2 Evidence that people weight dimensions differently

- **Political moral psychology.** Graham, Haidt & Nosek, "[Liberals and conservatives rely on different sets of moral foundations](https://pubmed.ncbi.nlm.nih.gov/19379034/)" (*JPSP*, 2009). Liberals weight care and fairness most; conservatives spread weight more evenly across care, fairness, loyalty, authority and sanctity. Same moral vocabulary, different weights.
- **Cross-cultural values.** Schwartz, "[An Overview of the Schwartz Theory of Basic Values](https://doi.org/10.9707/2307-0919.1116)" (2012), finds the same ten basic values across cultures but different priorities among them. The World Values Survey's [Inglehart–Welzel cultural map](https://www.worldvaluessurvey.org/) shows societies differ systematically on traditional versus secular values and on survival versus self-expression values, and that priorities shift as economic security rises.
- **Stated trade-offs between wellbeing dimensions.** Benjamin, Heffetz, Kimball & Szembrot, "[Beyond Happiness and Satisfaction: Toward Well-Being Indices Based on Stated Preference](https://www.nber.org/papers/w18374)" (*American Economic Review*, 2014), asked people to trade off 136 aspects of wellbeing. People value much more than happiness, and the relative weights vary across groups.
- **What people choose when they set the weights.** Balestra, Boarini & Tosetto, "[What Matters the Most to People?](https://www.oecd.org/en/publications/what-matters-the-most-to-people_edf9a89a-en.html)" (OECD, 2018), analyse how users of the [OECD Better Life Index](https://www.oecd.org/en/data/tools/oecd-better-life-index.html) weight its dimensions. Health, life satisfaction and education rank high overall, but rankings differ by country, age and gender.
- **The system shapes the weights.** Alesina & Fuchs-Schündeln, "[Good-bye Lenin (or Not?): The Effect of Communism on People's Preferences](https://www.nber.org/papers/w11700)" (*American Economic Review*, 2007). After reunification, East Germans favoured state provision and redistribution much more than West Germans, an effect expected to take one to two generations to fade. Weights are not fixed facts about people; the economic system people live in produces them. This matters for AI, which may reshape weights in the same way.
- **Switching systems is not a simple win.** Guriev & Zhuravskaya, "[(Un)Happiness in Transition](https://ideas.repec.org/a/aea/jecper/v23y2009i2p143-68.html)" (*Journal of Economic Perspectives*, 2009), found life satisfaction in post-communist countries fell during the transition to markets and stayed below comparable countries, linked to lost public goods, rising inequality and insecurity.
- **Even the facts about trade-offs are contested.** Wilkinson & Pickett, *The Spirit Level* (2009), argue more equal societies do better on almost every social outcome; critics dispute the data and causality (see [Fischer, *Boston Review*, 2010](https://sociology.berkeley.edu/sites/default/files/faculty/fischer/Fischer_Mind%20the%20Gap_Boston%20Review%202010.pdf)). This is a useful example: disagreement about weights is often mixed with disagreement about evidence.

### 5.3 Why there may be no single right answer

- **No fair way to combine rankings.** Arrow's impossibility theorem shows that no method of combining individual rankings into a social ranking satisfies a small set of reasonable fairness conditions at once. See Morreau, "[Arrow's Theorem](https://plato.stanford.edu/entries/arrows-theorem/)" (SEP). Conitzer et al. (2024) apply this directly to alignment.
- **Reasonable disagreement is permanent.** Rawls's "burdens of judgement" in *Political Liberalism* explain why free people will keep disagreeing about how to weigh values, even in good faith. Berlin's value pluralism (section 2.4) goes further: some values may be incommensurable.
- **But you can agree without a full ranking.** Sen, *The Idea of Justice* (2009), argues we do not need a complete ranking to agree that some states of the world are clearly better than others. Partial agreement is enough to act on.

### 5.4 Why this matters more for AI than for politics

1. **Optimisation forces a weighting.** A reward model, a ranking algorithm or a business KPI always turns many values into one number. Politics can leave weights unresolved and renegotiate them at elections; an optimiser cannot.
2. **The default weighting is the measurable one.** When no weighting is agreed, systems optimise what is easy to measure and monetise. This is Christiano's (2019) "proxy" failure. The result looks like an extreme growth-and-consumption weighting, chosen by no one.
3. **AI can shift the weights themselves.** If living under communism shifted East German preferences in a generation (Alesina & Fuchs-Schündeln), living inside AI-mediated systems may shift what people value. This is the adaptive-preferences problem from Zhi-Xuan et al. (2024) at societal scale.
4. **Lock-in.** Weights embedded in infrastructure are hard to revisit. MacAskill's "Better Futures" series treats value lock-in as one of the main threats to a good future.

### 5.5 Options for handling weights without settling the big debates

The literature offers five approaches, which can be combined:

1. **Floors, not weights.** Set a minimum threshold on every dimension and never trade below it. This is Nussbaum's threshold for each capability, Raworth's social foundation, and Doyal & Gough's basic needs. Disagreement then only applies above the floors.
2. **A dashboard, not an index.** The [Stiglitz-Sen-Fitoussi report](https://ec.europa.eu/eurostat/documents/8131721/8131772/Stiglitz-Sen-Fitoussi-Commission-report.pdf) and the OECD both recommend reporting each dimension separately rather than collapsing them into one score, so trade-offs stay visible.
3. **Let people and communities set the weights.** The Better Life Index model; "steerable" and "distributional" pluralism in Sorensen et al. (2024); subsidiarity, with decisions made at the most local level that works.
4. **Deliberate on the weights.** Citizens' assemblies, Collective Constitutional AI, and the Habermas machine (Tessler et al., 2024) are early methods.
5. **Monitor the weights themselves.** Track whether AI-mediated systems are shifting what people value, and flag it, as with any other drift.

**A line for the article:** we do not need to settle capitalism versus socialism to align AI. We need to stop letting the optimisation target settle it for us by default.

---

## 6. Overall assessment and suggested article structure

**What the evidence lets you claim confidently:**

1. Philosophy, psychology and national wellbeing frameworks converge on a stable set of dimensions of a good human life.
2. Wealth and health are necessary but not sufficient. People adapt to material gains but not to losses of roles, relationships and purpose, so an AI transition that raises income while removing those things could make lives worse.
3. AI progress is judged by capability and economic output, and alignment targets are framed as preferences and instructions. Neither refers to the multi-dimensional wellbeing that the wellbeing sciences describe.
4. There is no consensus on how to weigh the dimensions, and that disagreement maps onto the deepest political divides.
5. AI safety research has focused on extinction and control. The main work on gradual disempowerment is recent and largely conceptual.

**Framing choices that make the argument harder to dismiss:**

1. **Call the measurement focus "a symptom that becomes a driver".** It arises because output is easy to measure and is what markets and governments are rewarded for. Once it is the target, it crowds out the rest ("what we measure affects what we do", Stiglitz-Sen-Fitoussi).
2. **Name the real proxies.** Say "capability and economic output", not "wealth and health". Health is one of the few dimensions people already agree on, and in AI it appears more as a promise than a metric.
3. **Don't make consensus a precondition.** Argue that drift follows from neglected dimensions *plus* no legitimate way of handling disagreement. That avoids both "consensus is impossible, so drift is inevitable" and "you want to impose a vision".
4. **Say what AI adds.** Drift already happens without AI. AI adds speed, scale, and the loss of the human participation that keeps institutions answerable (Kulveit et al.). This is what makes it an AI safety argument rather than a critique of GDP.
5. **Admit the measurement gap and turn it into an ask.** Meaning, agency and belonging lack mature measures. Building them is a concrete research agenda.
6. **State a testable prediction.** Measured dimensions improve while unmeasured ones decline, and the gap widens.
7. **Avoid the clichés.** "Money doesn't buy happiness" and "40% of happiness is under your control" are both contested.

**A possible structure:**

1. The extinction frame and its neglected half (Bostrom's "drastic destruction of potential").
2. What we already know about a good human life (philosophy and psychology convergence).
3. **H1:** why AI progress tracks the wrong things. Capability and output are easy to measure and well rewarded; the rest is unmeasured or unmeasurable today (adaptation, Jahoda, Global Flourishing Study, the AI safety gap).
4. **H2:** we agree on the dimensions but not the weights. The capitalism versus socialism example, moral foundations, Arrow (section 5).
5. **H3:** how the two compound into drift, and what AI adds: speed, scale, and less need for human participation (Christiano, Kulveit, the eight-domain table, the testable prediction).
6. Why "just ask people's preferences" is not enough (Zhi-Xuan et al., adaptive preferences, Alesina & Fuchs-Schündeln, Max-Neef's pseudo-satisfiers).
7. What would stop the drift: measures for the neglected dimensions, minimums on every dimension, separate scores rather than one index, and deliberation over the weights above the minimums.

---

*Related project work: [The Quiet Handover](../gd-timeline/quiet-handover.html) and [Decision Points](../gd-timeline/decision-points.html) timelines, and the [Reasonable Path simulator](../gradual-disempowerment-simulator/reasonable-path.html).*
