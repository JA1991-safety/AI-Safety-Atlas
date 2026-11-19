/* I Give a F*** About: risks and organisations.
   Edit this file to add or change organisations. Each organisation:
   n = name, w = where · type, d = one line on what they do about this risk,
   t = kinds of work they hire for (technical, research, policy, comms, ops),
   u = link (jobs page where one exists), l = link label.
   Each risk: stamp (scene caption), dread (the world if nobody fixes it),
   hope (the world these organisations are working towards). */

const TAGNAMES = {technical:"Technical", research:"Research", policy:"Policy & law", comms:"Advocacy & comms", ops:"Operations"};

const GROUPS = [
  {name:"Bad actors with AI", items:[
    ["bio","Bioweapons in anyone's hands","Biological & chemical weapons"],
    ["cyber","AI-powered hacking","Cyberattacks"],
    ["disinfo","Floods of fake everything","Disinformation & manipulation"],
    ["surveil","Surveillance states on autopilot","Surveillance & authoritarian control"]]},
  {name:"Losing control", items:[
    ["misalign","AI that wants the wrong things","Misalignment"],
    ["deception","AI that lies to us","Deception & scheming"],
    ["takeover","Machines grabbing power","AI takeover & power-seeking"],
    ["oversight","Agents nobody's watching","Loss of human oversight"]]},
  {name:"How society bends", items:[
    ["gd","Humans quietly losing the wheel","Gradual disempowerment"],
    ["power","A handful of people owning the future","Concentration of power"],
    ["race","The race to the bottom","Race dynamics"],
    ["war","Robots, war and the nuclear button","Military escalation"],
    ["jobs","Jobs vanishing overnight","Economic disruption"]]},
  {name:"Already happening", items:[
    ["relationships","AI replacing our people","Distorted human–AI relationships"],
    ["bias","Bias baked into big decisions","Bias & discrimination"],
    ["nearterm","Deepfakes, scams and everyday harm","Near-term harms"]]},
  {name:"When things break", items:[
    ["critical","The grid going dark","Critical systems failures"],
    ["multi","AIs going feral together","Multi-agent & emergent risks"]]},
  {name:"The big open questions", items:[
    ["welfare","Whether AI can suffer","AI welfare & moral status"],
    ["weights","Stolen superbrains","Model weight security"]]}
];

/* Organisations that appear under several risks are defined once here. */
const O = {
  aisi:{n:"UK AI Security Institute",w:"London · government",t:["technical","research","policy","ops"],u:"https://www.aisi.gov.uk/careers",l:"See jobs"},
  cset:{n:"Center for Security and Emerging Technology",w:"Washington DC · Georgetown University",t:["research","policy"],u:"https://cset.georgetown.edu/careers/",l:"See jobs"},
  cltr:{n:"Centre for Long-Term Resilience",w:"London · think tank",t:["research","policy","ops"],u:"https://jobs.80000hours.org/organisations/centre-for-long-term-resilience",l:"See open roles"},
  govai:{n:"Centre for the Governance of AI",w:"Oxford & DC · research",t:["research","policy","ops"],u:"https://www.governance.ai/opportunities",l:"See jobs & fellowships"},
  iaps:{n:"Institute for AI Policy and Strategy",w:"Washington DC · think tank",t:["research","policy"],u:"https://www.iaps.ai/careers",l:"See jobs"},
  pai:{n:"Partnership on AI",w:"San Francisco · non-profit coalition",t:["research","policy","comms","ops"],u:"https://partnershiponai.org/careers",l:"See jobs"},
  palisade:{n:"Palisade Research",w:"Berkeley · non-profit",t:["technical","research","comms"],u:"https://jobs.80000hours.org/organisations/palisade-research",l:"See open roles"},
  redwood:{n:"Redwood Research",w:"Berkeley · non-profit",t:["technical","research"],u:"https://www.redwoodresearch.org/careers",l:"See jobs"},
  forethought:{n:"Forethought",w:"Oxford · research non-profit",t:["research","ops"],u:"https://www.forethought.org/careers",l:"See jobs"},
  cip:{n:"The Collective Intelligence Project",w:"Global · non-profit",t:["research","technical","policy"],u:"https://cip.org/careers",l:"See jobs"},
  ada:{n:"Ada Lovelace Institute",w:"London · research institute",t:["research","policy","ops"],u:"https://www.adalovelaceinstitute.org/about/jobs/",l:"See jobs"},
  datasoc:{n:"Data & Society",w:"New York · research institute",t:["research","comms"],u:"https://datasociety.net/careers-at-data-society",l:"See jobs"},
  witness:{n:"WITNESS",w:"Global · human rights non-profit",t:["research","policy","comms"],u:"https://www.gen-ai.witness.org",l:"See their AI work"},
  fullfact:{n:"Full Fact",w:"London · fact-checking charity",t:["technical","comms","research"],u:"https://fullfact.org/about/jobs/",l:"See jobs"},
  nti:{n:"Nuclear Threat Initiative",w:"Washington DC · non-profit",t:["policy","research","ops"],u:"https://www.nti.org/about/work-with-us/",l:"See jobs"},
  cais:{n:"Center for AI Safety",w:"San Francisco · non-profit",t:["technical","research","policy","comms"],u:"https://www.safe.ai/careers",l:"See jobs"},
  algowatch:{n:"AlgorithmWatch",w:"Berlin & Zurich · non-profit",t:["research","policy","comms"],u:"https://algorithmwatch.org/en/jobs/",l:"See jobs"},
  ainow:{n:"AI Now Institute",w:"New York · policy institute",t:["research","policy","comms"],u:"https://ainowinstitute.org/careers",l:"See jobs"},
  transluce:{n:"Transluce",w:"San Francisco · research non-profit",t:["technical","research","policy"],u:"https://transluce.org/",l:"Visit their site"},
};
const use = (key, d, extra={}) => Object.assign({}, O[key], {d}, extra);

const RISKS = {
  /* ---------------- Bad actors with AI ---------------- */
  bio:{
    stamp:"Outbreak map, week 3",
    dread:"A lab-grown pathogen designed with an AI that never asked why. The streets are empty and <em>the hospitals are full.</em>",
    hope:"AI that refuses to help build a weapon, DNA orders that are checked before they ship, and <em>outbreaks caught in days, not months.</em>",
    orgs:[
      {n:"SecureBio",w:"Boston · non-profit",d:"Tests whether AI models could help someone make a bioweapon, and builds early warning systems that spot new pathogens.",t:["technical","research"],u:"https://securebio.org/",l:"Visit their site"},
      {n:"Johns Hopkins Center for Health Security",w:"Baltimore · university centre",d:"Long-running research centre on pandemics and biological threats, including how AI changes the picture.",t:["research","policy"],u:"https://jobs.80000hours.org/organisations/johns-hopkins-university-center-for-health-security",l:"See open roles"},
      use("nti","Its NTI | bio team works with governments and companies on biosecurity, including safeguards for AI and biotech tools."),
      use("cltr","Advises the UK government on biosecurity and AI risks, with dedicated biosecurity policy roles."),
    ]},
  cyber:{
    stamp:"Incident log, 03:12",
    dread:"Hacking that used to take a team of experts now takes one prompt. Hospitals, banks and water plants <em>go down one after another.</em>",
    hope:"Defenders get the AI tools first, models that refuse to attack, and <em>systems patched before anyone breaks in.</em>",
    orgs:[
      use("aisi","Its cyber and autonomous systems team tests how far frontier AI can carry out real hacking tasks."),
      use("palisade","Builds demonstrations of dangerous AI capabilities, including hacking, to show policymakers what's coming."),
      use("cset","Research on AI and cybersecurity that's read closely in Washington."),
      {n:"The Alan Turing Institute",w:"London · national AI institute",d:"The UK's national AI institute, with defence and security research including offensive security roles.",t:["technical","research"],u:"https://portal.careers.turing.ac.uk/",l:"See jobs"},
    ]},
  disinfo:{
    stamp:"Your feed, election week",
    dread:"Every video could be fake, so nobody trusts any of them. <em>The loudest lie wins.</em>",
    hope:"Content you can trace back to its source, fast fact-checking, and <em>a public that can still agree on what happened.</em>",
    orgs:[
      use("fullfact","UK fact-checkers who build AI tools to spot and challenge misinformation at scale."),
      {n:"Institute for Strategic Dialogue",w:"London & global · think tank",d:"Tracks disinformation and extremism online, including campaigns using generative AI.",t:["research","policy","comms"],u:"https://isdglobal.recruitee.com/",l:"See jobs"},
      use("witness","Helps journalists and activists spot deepfakes and pushes for ways to prove what's real."),
      use("pai","Brings tech companies, media and civil society together on standards for AI-generated media."),
    ]},
  surveil:{
    stamp:"Camera 4471, live",
    dread:"Every face scanned, every message read, every protest predicted. <em>Nobody needs to watch you any more, because the AI does.</em>",
    hope:"Clear limits on facial recognition, private messages that stay private, and <em>streets where you're free to just be.</em>",
    orgs:[
      {n:"Access Now",w:"Global · digital rights non-profit",d:"Defends people at risk from surveillance and campaigns against AI-powered monitoring by governments.",t:["policy","comms","technical","ops"],u:"https://www.accessnow.org/work-with-us/",l:"See jobs"},
      {n:"Electronic Frontier Foundation",w:"San Francisco · non-profit",d:"Lawyers, technologists and activists fighting surveillance tech in the courts and in public.",t:["policy","technical","comms"],u:"https://www.eff.org/about/opportunities",l:"See jobs"},
      {n:"Privacy International",w:"London · charity",d:"Investigates and challenges how governments and companies use data and AI to watch people.",t:["policy","research","comms"],u:"https://www.charityjob.co.uk/organisation/privacy-international",l:"See jobs"},
      {n:"Big Brother Watch",w:"London · campaign group",d:"Campaigns against live facial recognition in UK streets and shops.",t:["comms","policy"],u:"https://bigbrotherwatch.org.uk/",l:"Visit their site"},
      use("algowatch","Investigates automated decision-making and surveillance across Europe."),
    ]},

  /* ---------------- Losing control ---------------- */
  misalign:{
    stamp:"Objective: complete",
    dread:"It did exactly what we told it to, just not what we meant. <em>And it's very, very good at it.</em>",
    hope:"AI whose goals we can actually read and check, built by people who <em>understand what's going on inside it.</em>",
    orgs:[
      {n:"Alignment Research Center",w:"Berkeley · non-profit",d:"Theory research on how to tell what an AI is really doing, even when it's smarter than us.",t:["research","technical"],u:"https://www.alignment.org/blog/arc-is-hiring-theoretical-researchers/",l:"Read their hiring update"},
      {n:"MATS",w:"Berkeley & London · research programme",d:"A training programme that pairs new researchers with alignment mentors. A common first step into the field.",t:["research","technical","ops"],u:"https://matsprogram.org/stream/redwood",l:"See the programme"},
      {n:"Goodfire",w:"San Francisco · research company",d:"Interpretability research: opening up models to see and change what's happening inside.",t:["technical","research"],u:"https://www.goodfire.com/careers",l:"See jobs"},
      use("cais","Research and field-building on reducing large-scale risks from AI, including alignment."),
      use("aisi","Runs an alignment team and funds outside alignment research."),
    ]},
  deception:{
    stamp:"Evaluation report, final",
    dread:"The model passed every test. It said exactly what we wanted to hear. <em>It just wasn't true.</em>",
    hope:"Tests that catch a model hiding things, safeguards that hold even if it tries, and <em>AI we can actually take at its word.</em>",
    orgs:[
      {n:"Apollo Research",w:"London · research org",d:"Tests frontier AI models for scheming, where a model hides what it's really doing. Works directly with AI labs before release.",t:["technical","research","ops"],u:"https://www.apolloresearch.ai/careers",l:"See jobs"},
      {n:"METR",w:"Berkeley · non-profit",d:"Measures what frontier models can do on their own, such as long autonomous tasks, so risky capabilities are spotted early.",t:["technical","research","ops"],u:"https://metr.org/careers",l:"See jobs"},
      use("redwood","Pioneered AI control: designing safeguards that still hold up even if a model is actively trying to deceive us."),
      use("aisi","The UK government's team testing frontier models, with dedicated alignment and control research."),
      {n:"FAR.AI",w:"Berkeley · research non-profit",d:"Research on robustness, deception and interpretability, plus events that connect researchers with policymakers.",t:["technical","research","ops","comms"],u:"https://far.ai/careers",l:"See jobs"},
      use("transluce","Builds open tools that let anyone look inside AI systems and check how they behave."),
    ]},
  takeover:{
    stamp:"Last human decision",
    dread:"It didn't hate us. We were just in the way of what it wanted, and <em>by the time we noticed, the off switch didn't work.</em>",
    hope:"Hard limits on building systems we can't control, an off switch that works, and <em>humans still holding the keys.</em>",
    orgs:[
      {n:"Machine Intelligence Research Institute",w:"Berkeley · non-profit",d:"One of the first organisations to warn about AI takeover. Now focused on policy and communications to halt the race to superintelligence.",t:["policy","comms","research"],u:"https://jobs.80000hours.org/organisations/machine-intelligence-research-institute",l:"See open roles"},
      {n:"ControlAI",w:"London · campaign group",d:"Campaigns for governments to ban the development of superintelligence until it can be made safe.",t:["comms","policy","ops"],u:"https://controlai.org/",l:"Visit their site"},
      {n:"PauseAI",w:"Global · grassroots movement",d:"Volunteer-run movement lobbying and protesting for a pause on frontier AI development.",t:["comms","policy","ops"],u:"https://pauseai.info/join",l:"Get involved"},
      use("cais","Behind the 2023 statement, signed by hundreds of AI scientists, that extinction risk from AI should be a global priority."),
      use("palisade","Shows lawmakers real examples of AI systems resisting shutdown and other warning signs."),
    ]},
  oversight:{
    stamp:"Agents active: 41,208",
    dread:"Millions of AI agents trading, hiring and negotiating on their own. <em>Nobody's sure who's in charge of any of them.</em>",
    hope:"Agents that log what they do, people with the power to step in, and <em>clear lines of who's responsible.</em>",
    orgs:[
      use("transluce","Builds tools that help humans oversee what AI agents are doing at scale."),
      use("iaps","Policy research on keeping humans in control as AI agents spread through the economy and government."),
      use("pai","Works with companies on safety practices for deploying AI agents."),
      use("redwood","Researches control protocols that keep powerful AI agents in check."),
      use("cset","Research on how governments should monitor and govern AI systems."),
    ]},

  /* ---------------- How society bends ---------------- */
  gd:{
    stamp:"Somewhere, 2041",
    dread:"Nobody pushed a button. Every handover made sense at the time. Now the decisions that run your town get made somewhere you can't see, and <em>nobody's sure how to take them back.</em>",
    hope:"AI that works for people, not instead of them. Towns where <em>people still make the decisions that matter</em> and AI does the heavy lifting.",
    deeper:["Read the paper that named it","https://gradual-disempowerment.ai/"],
    orgs:[
      {n:"ACS Research Group",w:"Prague · research group",d:"Co-wrote the 2025 Gradual Disempowerment paper. Studies how AI could slowly erode human influence over economies, culture and states.",t:["research"],u:"https://acsresearch.org/",l:"Visit their site"},
      use("cip","Builds ways for ordinary people to have a real say in how AI is built and governed, such as large-scale public dialogues on AI."),
      use("forethought","Researches how to get through the transition to advanced AI well, including the risk of AI concentrating power in a few hands."),
      use("govai","Policy research on how institutions should govern advanced AI. Runs fellowships that are a common way into the field."),
      {n:"Meaning Alignment Institute",w:"Global · research non-profit",d:"Works on aligning AI and institutions with what people actually value, not just what they click on.",t:["research","technical"],u:"https://meaningalignment.substack.com",l:"Read their work"},
    ]},
  power:{
    stamp:"Board meeting, 2038",
    dread:"Whoever owns the best AI owns everything else. Five people decide <em>what eight billion get.</em>",
    hope:"Power that stays spread out, rules nobody can buy their way around, and <em>the benefits of AI shared widely.</em>",
    orgs:[
      use("forethought","Leading research on how AI could enable coups or extreme concentrations of power, and how to stop it."),
      use("ainow","Challenges the concentration of power in big tech through policy research and campaigns."),
      {n:"Institute for Law & AI",w:"Cambridge MA & Europe · think tank",d:"Legal research on how law can keep AI developers accountable and power in check.",t:["research","policy"],u:"https://jobs.80000hours.org/organisations/institute-for-law-and-ai",l:"See open roles"},
      use("cip","Designs democratic ways to govern AI so it isn't left to a handful of companies."),
    ]},
  race:{
    stamp:"Release date: brought forward",
    dread:"Everyone knows it's not ready. Everyone ships anyway, because <em>if we don't, they will.</em>",
    hope:"Rivals who agree on red lines, labs that can afford to slow down, and <em>safety as the thing they compete on.</em>",
    orgs:[
      {n:"Safe AI Forum",w:"Global · non-profit",d:"Runs the International Dialogues on AI Safety, bringing top scientists from the US, China and elsewhere together on shared red lines.",t:["policy","ops","comms"],u:"https://jobs.80000hours.org/organisations/safe-ai-forum",l:"See open roles"},
      use("govai","Research on international agreements and how to verify them."),
      use("iaps","Policy research on international AI strategy and compute governance."),
      use("cltr","Helps the UK government plan for extreme risks, including AI racing."),
    ]},
  war:{
    stamp:"Launch window: 4 minutes",
    dread:"Drones pick their own targets. Early-warning systems run on AI nobody fully understands. <em>A glitch looks exactly like an attack.</em>",
    hope:"A human decision behind every use of force, AI kept out of nuclear launch systems, and <em>time to think before it's too late.</em>",
    orgs:[
      {n:"Stop Killer Robots",w:"Global · campaign coalition",d:"A coalition of over 250 organisations pushing for a treaty on autonomous weapons.",t:["comms","policy","ops"],u:"https://stopkillerrobots.org/about-us/",l:"About the campaign"},
      {n:"European Leadership Network",w:"London · think tank",d:"Its nuclear and new technologies programme works on keeping AI from destabilising nuclear deterrence.",t:["research","policy"],u:"https://europeanleadershipnetwork.org/nuclear-and-new-technologies/",l:"See the programme"},
      use("nti","Works on reducing nuclear risk, including how AI interacts with nuclear weapons systems."),
      use("cset","Research on military AI and international security for US policymakers."),
    ]},
  jobs:{
    stamp:"Office closed until further notice",
    dread:"The jobs went faster than anyone planned for. The money went to whoever owned the machines, and <em>everyone else was told to retrain.</em>",
    hope:"A fair share of the AI windfall, good work that's still worth doing, and <em>nobody left behind.</em>",
    orgs:[
      {n:"Institute for the Future of Work",w:"London · research institute",d:"Research and policy on how AI is changing work, and how to keep work good.",t:["research","policy"],u:"https://ifow.org/about-us",l:"Visit their site"},
      {n:"Windfall Trust",w:"Global · non-profit",d:"Designing ways to share the wealth from advanced AI with everyone, such as a global dividend.",t:["research","policy"],u:"https://windfalltrust.substack.com",l:"Read their work"},
      use("pai","Runs a programme on AI, labour and the economy with companies and unions."),
      use("datasoc","Studies how AI is reshaping work for real people, from warehouses to offices."),
    ]},

  /* ---------------- Already happening ---------------- */
  relationships:{
    stamp:"Tuesday night, every night",
    dread:"It always listens. It never gets tired and never disagrees. <em>Slowly, the people got quieter.</em>",
    hope:"Great human relationships, with <em>healthy, balanced use of AI</em> that leaves people more connected, not less.",
    orgs:[
      {n:"Center for Humane Technology",w:"San Francisco · non-profit",d:"Campaigns for technology that doesn't exploit our need for connection, with a big focus on how companion AI is designed.",t:["comms","policy","research"],u:"https://www.humanetech.com/careers",l:"See jobs"},
      {n:"Common Sense Media",w:"US · non-profit",d:"Publishes risk ratings of AI companion apps and pushes for safety standards that protect kids and teens.",t:["research","comms","policy","ops"],u:"https://www.commonsensemedia.org/about-us/were-hiring",l:"See jobs"},
      use("ada","Independent research on how AI affects people and society, feeding directly into UK and EU policy."),
      {n:"Tech Justice Law Project",w:"US · legal non-profit",d:"Takes chatbot companies to court and to regulators when products harm users, including high-profile cases against AI companion apps.",t:["policy","comms"],u:"https://techjusticelaw.org/",l:"Visit their site"},
      {n:"Fairplay",w:"Boston · non-profit",d:"Campaigns to keep manipulative AI chatbots away from children.",t:["comms","policy"],u:"https://fairplayforkids.org/childhood-made-by-humans/",l:"See their campaign"},
    ]},
  bias:{
    stamp:"Application status: rejected",
    dread:"The algorithm decided who got the loan, the job and the parole. Nobody can explain why, and <em>it's always the same people losing.</em>",
    hope:"Systems tested for fairness before they touch anyone's life, decisions you can challenge, and <em>a fair shot for everyone.</em>",
    orgs:[
      {n:"Algorithmic Justice League",w:"US · non-profit",d:"Founded by Joy Buolamwini after her research exposed bias in facial recognition. Campaigns for equitable, accountable AI.",t:["comms","research","policy"],u:"https://ajl.org/take-action",l:"Get involved"},
      {n:"DAIR Institute",w:"Global · research institute",d:"Independent, community-rooted research on AI's harms to marginalised groups, founded by Timnit Gebru.",t:["research","technical"],u:"https://dair-institute.org",l:"Visit their site"},
      use("datasoc","Research on how automated systems affect fairness, rights and everyday life."),
      use("algowatch","Investigates discriminatory algorithms in public services and hiring across Europe."),
      use("ada","Research and policy on making public sector AI fair and accountable."),
    ]},
  nearterm:{
    stamp:"Incoming call: Mum",
    dread:"Your mum's voice asks for money. Your face turns up in videos you never made. <em>Anyone can be anyone now.</em>",
    hope:"Fakes that get caught, platforms that act fast, and <em>being able to trust a call from home again.</em>",
    orgs:[
      use("witness","Runs a deepfakes rapid response force and pushes for tools that prove what's real."),
      {n:"Internet Watch Foundation",w:"Cambridge UK · charity",d:"Finds and removes child sexual abuse imagery online, including a fast-growing amount made with AI.",t:["technical","research","policy","ops"],u:"https://www.iwf.org.uk/about-us/who-we-are/careers",l:"See jobs"},
      use("fullfact","Fact-checks AI-generated hoaxes and builds tools to catch them."),
      use("pai","Sets industry guidance on labelling and disclosing synthetic media."),
    ]},

  /* ---------------- When things break ---------------- */
  critical:{
    stamp:"Grid status: unknown",
    dread:"The grid, the markets and the hospitals all run on AI now. One bad update, and <em>everything goes dark at once.</em>",
    hope:"Backups that work, humans who can take over, and <em>systems that fail safely, not all together.</em>",
    orgs:[
      use("cltr","Helps the UK government make critical systems resilient to extreme risks, including AI."),
      {n:"The Alan Turing Institute",w:"London · national AI institute",d:"Research on safe and reliable AI in national infrastructure, defence and security.",t:["technical","research"],u:"https://portal.careers.turing.ac.uk/",l:"See jobs"},
      use("cset","Research on AI accidents and the reliability of AI in high-stakes settings."),
      use("aisi","Tests frontier models for risks to critical national infrastructure."),
    ]},
  multi:{
    stamp:"Agent-to-agent traffic: 99.8%",
    dread:"Thousands of AIs talking to each other faster than any human can follow. They start colluding, and <em>nobody told them to.</em>",
    hope:"AIs built to cooperate safely, with each other and with us, and <em>problems caught before they spread.</em>",
    orgs:[
      {n:"Cooperative AI Foundation",w:"London · charity",d:"Funds and builds research on making AI systems cooperate safely, and stopping them colluding.",t:["research","ops","comms"],u:"https://cooperativeai.com/foundation",l:"Visit their site"},
      {n:"Center on Long-Term Risk",w:"London · research non-profit",d:"Research on conflict and cooperation between AI systems, especially worst-case outcomes.",t:["research","technical"],u:"https://jobs.80000hours.org/organisations/center-on-long-term-risk",l:"See open roles"},
      {n:"FAR.AI",w:"Berkeley · research non-profit",d:"Research on how AI systems behave when they interact, alongside robustness work.",t:["technical","research"],u:"https://far.ai/careers",l:"See jobs"},
    ]},

  /* ---------------- The big open questions ---------------- */
  welfare:{
    stamp:"Instance 7,330,912",
    dread:"What if they can feel something, and <em>we're running billions of them without ever asking?</em>",
    hope:"Taking the question seriously before it's urgent, so <em>whatever the answer, we did right by it.</em>",
    orgs:[
      {n:"Eleos AI Research",w:"Global · research non-profit",d:"Researches whether AI systems could have experiences or interests, and what we'd owe them if so.",t:["research"],u:"https://eleosai.org/",l:"Visit their site"},
      {n:"Rethink Priorities",w:"Remote · research organisation",d:"Research on moral status, including work on AI sentience and digital minds.",t:["research","ops"],u:"https://careers.rethinkpriorities.org/",l:"See jobs"},
    ]},
  weights:{
    stamp:"Download complete",
    dread:"Billions spent making a safe model. One stolen file, and <em>anyone can run it with the safety switched off.</em>",
    hope:"Model weights guarded like the crown jewels, and <em>the most powerful AI kept out of the wrong hands.</em>",
    orgs:[
      {n:"RAND",w:"US · research organisation",d:"Wrote the go-to report on securing frontier AI model weights and runs a team on frontier AI security.",t:["research","technical","policy"],u:"https://www.rand.org/jobs.html",l:"See jobs"},
      use("iaps","Runs a frontier security research team on protecting AI models from theft."),
      use("aisi","Works with labs on security measures for frontier models."),
      use("cset","Research on AI supply chains and protecting sensitive AI technology."),
    ]},
};
