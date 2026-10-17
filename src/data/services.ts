/**
 * Service records. Each one drives both its card on the index and its own
 * detail page, so there is a single place to change what we say we do.
 */

export const serviceCategories = [
  'All',
  'Software',
  'AI & ML',
  'Data & Cloud',
  'Automation',
  'Growth',
] as const

export type ServiceCategory = (typeof serviceCategories)[number]
export type ServiceGroup = Exclude<ServiceCategory, 'All'>

export type Service = {
  slug: string
  index: string
  title: string
  category: ServiceGroup
  /** One line, used on cards and in the mega menu. */
  description: string
  eyebrow: string
  headline: string
  intro: string
  /** Qualitative — never fabricated performance numbers. */
  marks: Array<{ value: string; label: string }>
  definition: { heading: string; body: string[] }
  comparison: { withoutTitle: string; without: string[]; withTitle: string; with: string[] }
  offerings: Array<{ title: string; body: string }>
  deliverables: string[]
  faq: Array<{ q: string; a: string }>
  related: string[]
}

export const services: Service[] = [
  {
    slug: 'web-development',
    index: '01',
    title: 'Web Development',
    category: 'Software',
    description:
      'High-performance websites and web applications built for modern digital experiences.',
    eyebrow: 'DESIGN · BUILD · SHIP',
    headline: 'Web platforms that earn their load time.',
    intro:
      'Marketing sites, product interfaces and internal tools, engineered rather than assembled. Typed end to end, measured against Core Web Vitals, and handed over as code you own outright.',
    marks: [
      { value: 'Typed', label: 'End to end, no implicit any' },
      { value: 'Yours', label: 'Repository, pipeline and hosting' },
      { value: 'Day 1', label: 'Analytics and error tracking live at launch' },
    ],
    definition: {
      heading: 'What web development actually covers',
      body: [
        'Two different jobs share the name. One is the interface: information architecture, layout, typography, interaction and the accessibility work that decides whether people can use any of it. The other is the engineering behind it: rendering strategy, data fetching, caching, build pipeline, hosting and observability.',
        'We do both, in that order. Structure and content first, because they decide the architecture. Then the build, so performance is a property of the system rather than something bolted on before launch.',
      ],
    },
    comparison: {
      withoutTitle: 'The template route',
      without: [
        'Page weight climbs with every plugin until first paint takes seconds',
        'Builder lock-in — you cannot fully own, extend or move the result',
        'Mobile treated as an afterthought, where most of the traffic actually is',
        'Nobody maintains it, and it quietly rots',
      ],
      withTitle: 'The engineered route',
      with: [
        'Ships lean by default, with a performance budget enforced in CI',
        'Plain TypeScript and standard tooling — any competent team can pick it up',
        'Designed at the narrow breakpoint first, then widened',
        'Deployment, monitoring and a documented handover from day one',
      ],
    },
    offerings: [
      {
        title: 'Marketing & brand sites',
        body: 'Editorial sites that load fast, rank well and are genuinely pleasant to edit.',
      },
      {
        title: 'Web applications',
        body: 'Dashboards, portals and internal tools with real state, auth and data.',
      },
      {
        title: 'Ecommerce front-ends',
        body: 'Storefronts built on headless commerce, tuned for conversion and speed.',
      },
      {
        title: 'Design systems',
        body: 'Component libraries and tokens so the next ten screens cost a fraction of the first.',
      },
      {
        title: 'Performance rescue',
        body: 'Audit and remediation for sites that have grown slow, heavy or unstable.',
      },
      {
        title: 'Headless CMS',
        body: 'Content modelling and integration so non-engineers can ship without a deploy.',
      },
    ],
    deliverables: [
      'Responsive, accessible front-end in React and TypeScript',
      'Component library and documented design tokens',
      'CI pipeline, preview deployments and production hosting',
      'Analytics, error tracking and a performance budget',
      'Handover documentation and a working local setup',
    ],
    faq: [
      {
        q: 'Do we own the code?',
        a: 'Yes. The repository is yours from the first commit, on your organisation, with no runtime licence and no dependency on us to deploy it.',
      },
      {
        q: 'Can you work with our existing design?',
        a: 'Yes. We can build to an existing Figma file or design system, or produce the design ourselves if there is not one.',
      },
      {
        q: 'What about content editing?',
        a: 'We model the content and integrate a headless CMS so your team edits and publishes without engineering involvement.',
      },
    ],
    related: ['custom-software', 'cloud-backend-engineering', 'seo-ai-search'],
  },
  {
    slug: 'custom-software',
    index: '02',
    title: 'Custom Software',
    category: 'Software',
    description:
      'Business-specific software designed around your workflows, data and operational needs.',
    eyebrow: 'FIT THE PROCESS · NOT THE TOOL',
    headline: 'Software shaped to how you already work.',
    intro:
      'When the off-the-shelf tool forces the business to bend, the spreadsheet workaround appears. We build the system the workaround was standing in for — around your data model, your rules and your people.',
    marks: [
      { value: 'Yours', label: 'Source, schema and infrastructure' },
      { value: 'Modelled', label: 'On the real process, not the org chart' },
      { value: 'Auditable', label: 'Every change traceable' },
    ],
    definition: {
      heading: 'When custom is the right call',
      body: [
        'Custom software is not automatically better. It is better when the process is genuinely yours — when it is the thing you compete on, when compliance dictates the shape of the data, or when the integration surface between existing tools is where all the work actually happens.',
        'We start by mapping the process as it runs today, including the workarounds, because the workarounds are the requirements nobody wrote down.',
      ],
    },
    comparison: {
      withoutTitle: 'Bending to the tool',
      without: [
        'Licence costs scale with headcount, not with value',
        'Critical logic lives in spreadsheets nobody owns',
        'Reporting needs a manual export and a person on a Friday',
        'The integration you need is on someone else’s roadmap',
      ],
      withTitle: 'Fitting the process',
      with: [
        'One system of record with the rules encoded in it',
        'Reporting that reads live data instead of a stale export',
        'Integrations built because you need them, not when they are prioritised',
        'Cost tied to what you build, not to how many people log in',
      ],
    },
    offerings: [
      {
        title: 'Internal platforms',
        body: 'Operations, admin and back-office systems that replace the spreadsheet layer.',
      },
      {
        title: 'Workflow engines',
        body: 'Multi-step processes with approvals, state, audit trail and SLA tracking.',
      },
      {
        title: 'Integration layers',
        body: 'The connective tissue between systems that were never designed to talk.',
      },
      {
        title: 'Legacy modernisation',
        body: 'Incremental replacement of systems that still work but can no longer change.',
      },
      {
        title: 'Client & partner portals',
        body: 'Authenticated external surfaces onto data you already hold.',
      },
      {
        title: 'Domain modelling',
        body: 'Getting the schema right first, because everything downstream inherits it.',
      },
    ],
    deliverables: [
      'Process map of the current and target workflow',
      'Domain model, database schema and migration strategy',
      'Application, API and role-based access control',
      'Automated test suite covering the business rules',
      'Runbook, monitoring and support handover',
    ],
    faq: [
      {
        q: 'How do you scope something this open-ended?',
        a: 'We scope the first slice narrowly — one workflow, end to end, in production. That establishes the architecture and the estimate quality for everything after it.',
      },
      {
        q: 'Can it integrate with the systems we already have?',
        a: 'That is usually the point. We build against existing APIs where they exist, and adapter layers where they do not.',
      },
      {
        q: 'What happens after launch?',
        a: 'You get a documented handover and a working local environment. We can stay on for evolution, or step back entirely — the system does not depend on us.',
      },
    ],
    related: ['cloud-backend-engineering', 'data-analytics', 'ai-agents-automation'],
  },
  {
    slug: 'ai-development',
    index: '03',
    title: 'AI Development',
    category: 'AI & ML',
    description:
      'Production-ready artificial intelligence systems built to solve practical business problems.',
    eyebrow: 'APPLIED AI · IN PRODUCTION',
    headline: 'AI that survives contact with production.',
    intro:
      'A demo that works on five examples is not a system. We build the parts that are missing between the two: evaluation, guardrails, fallbacks, observability, and the integration into the workflow where the value actually lands.',
    marks: [
      { value: 'Evaluated', label: 'Against a held-out set you can inspect' },
      { value: 'Observable', label: 'Every call traced, logged and costed' },
      { value: 'Bounded', label: 'Explicit fallbacks when the model is wrong' },
    ],
    definition: {
      heading: 'The gap between demo and system',
      body: [
        'Most AI projects stall in the same place. The prototype is convincing, then the questions start: how do we know it is right, what happens when it is not, what does it cost per request, who is accountable for the output, and how do we change it without breaking what already worked.',
        'Those questions are engineering problems with known answers. We treat the model as one component inside a system that has tests, monitoring and a defined failure mode — the same as any other dependency.',
      ],
    },
    comparison: {
      withoutTitle: 'The stalled pilot',
      without: [
        '"It works" measured by vibes on a handful of examples',
        'No visibility into cost, latency or failure rate',
        'Prompt changes ship blind and regress silently',
        'No answer for what happens when the model is confidently wrong',
      ],
      withTitle: 'A production system',
      with: [
        'A labelled evaluation set and a score you can argue with',
        'Per-request tracing, cost attribution and latency budgets',
        'Changes gated by evaluation runs before they reach users',
        'Explicit confidence thresholds, human review and graceful degradation',
      ],
    },
    offerings: [
      {
        title: 'Document intelligence',
        body: 'Extraction, classification and validation over messy real-world documents.',
      },
      {
        title: 'Decision support',
        body: 'Systems that surface evidence and rank options for a human to decide.',
      },
      {
        title: 'Evaluation harnesses',
        body: 'The test suite for probabilistic systems: datasets, metrics and regression gates.',
      },
      {
        title: 'Model integration',
        body: 'Wiring a model into real workflows, queues, permissions and audit trails.',
      },
      {
        title: 'Cost & latency engineering',
        body: 'Routing, caching and model selection to make unit economics work.',
      },
      {
        title: 'AI readiness review',
        body: 'An honest assessment of whether AI is the right tool for the problem at hand.',
      },
    ],
    deliverables: [
      'Problem framing with a measurable success criterion',
      'Evaluation dataset, metrics and baseline results',
      'Production service with tracing, cost tracking and rate limits',
      'Guardrails, fallback behaviour and human-in-the-loop paths',
      'Documentation of known failure modes and their handling',
    ],
    faq: [
      {
        q: 'How do you decide whether AI is even appropriate?',
        a: 'By asking what the system does when it is wrong. If a wrong answer is cheap to catch and correct, AI is usually a good fit. If it is expensive and invisible, we look at deterministic approaches first.',
      },
      {
        q: 'Which models do you use?',
        a: 'Whichever fits the constraint. We build provider-agnostic interfaces so the model is a swappable dependency, not an architectural commitment.',
      },
      {
        q: 'What about our data?',
        a: 'Data handling is designed before the model is chosen — what leaves your environment, what is retained, and what the contractual position is with each provider.',
      },
    ],
    related: ['generative-ai-rag', 'machine-learning', 'ai-agents-automation'],
  },
  {
    slug: 'generative-ai-rag',
    index: '04',
    title: 'Generative AI & RAG',
    category: 'AI & ML',
    description: 'LLM applications, retrieval systems and intelligent knowledge experiences.',
    eyebrow: 'RETRIEVAL · GROUNDING · CITATION',
    headline: 'Answers grounded in your own material.',
    intro:
      'A general model knows the internet and nothing about your business. Retrieval closes that gap — but only if the retrieval is good. Most RAG systems fail at the retrieval step, not the generation step, and that is where we spend the effort.',
    marks: [
      { value: 'Cited', label: 'Every answer traceable to a source' },
      { value: 'Scoped', label: 'Permissions enforced at retrieval' },
      { value: 'Measured', label: 'Retrieval quality scored independently' },
    ],
    definition: {
      heading: 'Why retrieval is the hard part',
      body: [
        'Generation is largely solved: given the right context, modern models write a good answer. The difficulty is deciding what the right context is. Chunking strategy, embedding choice, hybrid keyword and vector search, reranking, and knowing when to return nothing at all.',
        'We evaluate retrieval separately from generation. If the correct passage was never fetched, no amount of prompt engineering will save the answer — and you want to know which of the two failed.',
      ],
    },
    comparison: {
      withoutTitle: 'Naive RAG',
      without: [
        'Fixed-size chunks that split tables and headings apart',
        'Pure vector search that misses exact identifiers and part numbers',
        'No citations, so nobody can verify an answer',
        'Every user sees every document, regardless of permissions',
      ],
      withTitle: 'Engineered retrieval',
      with: [
        'Structure-aware chunking that preserves the document’s own hierarchy',
        'Hybrid search with reranking, so exact terms and meaning both work',
        'Inline citations back to the source passage',
        'Permission filtering applied at query time, not after',
      ],
    },
    offerings: [
      {
        title: 'Knowledge assistants',
        body: 'Ask-your-documents over policies, contracts, manuals and internal wikis.',
      },
      {
        title: 'Retrieval pipelines',
        body: 'Ingestion, parsing, chunking, embedding and index maintenance.',
      },
      {
        title: 'Hybrid search',
        body: 'Vector plus lexical retrieval with reranking for precision on real queries.',
      },
      {
        title: 'Structured extraction',
        body: 'Turning unstructured source material into typed, validated records.',
      },
      {
        title: 'Content generation',
        body: 'Drafting workflows with brand constraints and a human approval step.',
      },
      {
        title: 'Retrieval evaluation',
        body: 'Recall and precision measured per query class, not averaged into meaninglessness.',
      },
    ],
    deliverables: [
      'Ingestion pipeline with incremental re-indexing',
      'Hybrid retrieval service with reranking and permission filters',
      'Answer synthesis with inline citations',
      'Retrieval and answer evaluation suites, run in CI',
      'Admin surface for inspecting what was retrieved and why',
    ],
    faq: [
      {
        q: 'Do you fine-tune or use retrieval?',
        a: 'Retrieval first, almost always. It is cheaper, updates instantly when your content changes, and produces citable answers. Fine-tuning is for format and behaviour, not for facts.',
      },
      {
        q: 'How do you stop it inventing things?',
        a: 'Ground every claim in retrieved context, cite the source inline, and make "I do not have that" a valid, tested response rather than a failure.',
      },
      {
        q: 'Can it respect our access controls?',
        a: 'Yes, and it must. Permissions are applied as filters during retrieval so a user can never be shown a passage they could not otherwise open.',
      },
    ],
    related: ['ai-development', 'ai-agents-automation', 'data-analytics'],
  },
  {
    slug: 'ai-agents-automation',
    index: '05',
    title: 'AI Agents & Automation',
    category: 'Automation',
    description:
      'AI agents and workflow automation that execute tasks, connect systems and reduce repetitive work.',
    eyebrow: 'TOOLS · STATE · EXECUTION',
    headline: 'Systems that do the work, not just describe it.',
    intro:
      'An agent is a loop with tools, state and a stopping condition. The interesting engineering is in the boring parts: idempotency, retries, permissions, cost ceilings, and knowing when to hand back to a person.',
    marks: [
      { value: 'Scoped', label: 'Least-privilege tool access' },
      { value: 'Idempotent', label: 'Safe to retry, safe to resume' },
      { value: 'Capped', label: 'Hard limits on steps and spend' },
    ],
    definition: {
      heading: 'Where automation actually pays',
      body: [
        'The work worth automating is usually high-volume, rule-shaped and currently done by copying between systems. The work worth leaving alone is low-volume, judgement-heavy and expensive to get wrong.',
        'We look for the boundary between them and put the handoff there deliberately, rather than letting an agent discover it in production.',
      ],
    },
    comparison: {
      withoutTitle: 'Agents as a demo',
      without: [
        'An open-ended loop with no step limit and no budget',
        'Full credentials, because scoping them was fiddly',
        'Retries that duplicate side effects',
        'No record of what it did or why',
      ],
      withTitle: 'Agents as infrastructure',
      with: [
        'Bounded loops with explicit termination and spend ceilings',
        'Per-tool permissions, scoped to the smallest useful surface',
        'Idempotency keys so a retry is always safe',
        'A durable trace of every decision, tool call and result',
      ],
    },
    offerings: [
      {
        title: 'Task agents',
        body: 'Bounded agents that complete a defined job against real systems.',
      },
      {
        title: 'Workflow orchestration',
        body: 'Durable multi-step processes that survive restarts and partial failure.',
      },
      {
        title: 'Document & intake automation',
        body: 'Receive, classify, extract, validate and route — with exceptions to a human.',
      },
      {
        title: 'Tool & API integration',
        body: 'Typed, permissioned tool surfaces for models to act through safely.',
      },
      {
        title: 'Human-in-the-loop',
        body: 'Review queues and approval gates at the points where judgement is required.',
      },
      {
        title: 'Back-office automation',
        body: 'The repetitive copying between systems that consumes a working week.',
      },
    ],
    deliverables: [
      'Process map with the automate / escalate boundary made explicit',
      'Orchestration service with durable state and replay',
      'Scoped tool definitions with per-tool permissions',
      'Review queue for exceptions and low-confidence outcomes',
      'Full execution trace, cost reporting and alerting',
    ],
    faq: [
      {
        q: 'What stops an agent doing something destructive?',
        a: 'Tools are the only way it can act, and each tool is scoped, permissioned and — where the action is irreversible — gated behind an approval step.',
      },
      {
        q: 'How do you control cost?',
        a: 'Step limits, spend ceilings per run, model routing by task difficulty, and caching. Cost is a monitored metric with alerts, not a monthly surprise.',
      },
      {
        q: 'Do we need an agent, or just automation?',
        a: 'Often just automation. If the steps are known in advance, a deterministic workflow is cheaper, faster and easier to debug. We will tell you when that is the case.',
      },
    ],
    related: ['ai-development', 'custom-software', 'cloud-backend-engineering'],
  },
  {
    slug: 'machine-learning',
    index: '06',
    title: 'Machine Learning',
    category: 'AI & ML',
    description: 'Predictive models, recommendation systems and intelligent optimization.',
    eyebrow: 'FEATURES · MODELS · SERVING',
    headline: 'Prediction that changes a decision.',
    intro:
      'A model is only useful if someone acts differently because of it. We start from the decision and work backwards to the features, rather than starting from the dataset and hoping for relevance.',
    marks: [
      { value: 'Baselined', label: 'Measured against the simple approach' },
      { value: 'Reproducible', label: 'Versioned data, features and models' },
      { value: 'Monitored', label: 'Drift detection after deployment' },
    ],
    definition: {
      heading: 'Start from the decision',
      body: [
        'The first question is not which algorithm. It is: what decision does this change, who makes it, how often, and what does being wrong cost in each direction. That determines the metric, and the metric determines everything else.',
        'We always build the boring baseline first — a heuristic or a simple model. Often it is close enough, and when it is not, it is the number the real model has to beat.',
      ],
    },
    comparison: {
      withoutTitle: 'Model-first',
      without: [
        'Accuracy optimised on a metric nobody in the business uses',
        'Features computed differently in training and in production',
        'No versioning, so results cannot be reproduced',
        'Deployed once, then left to drift quietly',
      ],
      withTitle: 'Decision-first',
      with: [
        'A metric derived from the cost of each kind of error',
        'One feature definition, shared by training and serving',
        'Versioned datasets, features and model artefacts',
        'Monitoring for drift, with a defined retraining trigger',
      ],
    },
    offerings: [
      {
        title: 'Recommendation systems',
        body: 'Ranking and personalisation with cold-start and diversity handled.',
      },
      {
        title: 'Forecasting',
        body: 'Demand, load and capacity prediction with honest uncertainty ranges.',
      },
      {
        title: 'Classification & scoring',
        body: 'Risk, triage and prioritisation models with calibrated probabilities.',
      },
      {
        title: 'Feature pipelines',
        body: 'Consistent feature computation across training and low-latency serving.',
      },
      {
        title: 'Model serving',
        body: 'Versioned deployment, shadow traffic and safe rollback.',
      },
      {
        title: 'Anomaly detection',
        body: 'Finding the unusual in operational data without drowning in false alarms.',
      },
    ],
    deliverables: [
      'Problem framing tied to a business decision and its error costs',
      'Baseline model and the evaluation it must beat',
      'Feature pipeline shared between training and serving',
      'Versioned model artefacts and a reproducible training run',
      'Serving endpoint with monitoring, drift detection and rollback',
    ],
    faq: [
      {
        q: 'How much data do we need?',
        a: 'Less than people expect for a useful baseline, more than they expect for a reliable one. We assess what you have before proposing an approach.',
      },
      {
        q: 'Can you work with our existing data warehouse?',
        a: 'Yes. Building on the warehouse you already trust is usually faster and safer than standing up a parallel pipeline.',
      },
      {
        q: 'What happens when performance degrades?',
        a: 'Drift monitoring is part of the deployment, with a defined trigger for retraining and a rollback path to the previous model version.',
      },
    ],
    related: ['data-analytics', 'ai-development', 'computer-vision-nlp'],
  },
  {
    slug: 'data-analytics',
    index: '07',
    title: 'Data & Analytics',
    category: 'Data & Cloud',
    description:
      'Transform complex data into insights, decisions and measurable business intelligence.',
    eyebrow: 'PIPELINES · MODELS · TRUST',
    headline: 'Numbers the whole company agrees on.',
    intro:
      'Most analytics problems are definition problems. Three teams report three revenue figures because each built its own query. We fix the modelling layer first, then the dashboards are almost incidental.',
    marks: [
      { value: 'Defined', label: 'One metric, one definition, documented' },
      { value: 'Tested', label: 'Data quality checks in the pipeline' },
      { value: 'Traceable', label: 'Lineage from dashboard to source' },
    ],
    definition: {
      heading: 'The modelling layer is the product',
      body: [
        'A dashboard is a view. The durable asset is the layer underneath: cleaned, conformed tables with tested definitions and documented lineage. Get that right and any BI tool works; get it wrong and no BI tool helps.',
        'We build that layer with tests attached, so a broken upstream change fails the pipeline rather than quietly producing a wrong number on a Monday morning.',
      ],
    },
    comparison: {
      withoutTitle: 'Dashboard-first',
      without: [
        'Three teams, three definitions of the same metric',
        'Logic duplicated inside each dashboard, diverging over time',
        'Silent breakage — the chart still renders, the number is wrong',
        'Nobody can say where a figure came from',
      ],
      withTitle: 'Model-first',
      with: [
        'A single modelling layer with one tested definition per metric',
        'Dashboards as thin views over conformed tables',
        'Pipeline tests that fail loudly on bad or missing data',
        'Documented lineage from every figure back to its source',
      ],
    },
    offerings: [
      {
        title: 'Data pipelines',
        body: 'Batch and streaming ingestion with retries, backfill and idempotency.',
      },
      {
        title: 'Warehouse modelling',
        body: 'Conformed, tested tables with documented metric definitions.',
      },
      {
        title: 'Business intelligence',
        body: 'Dashboards built on the modelling layer, designed around actual questions.',
      },
      {
        title: 'Data quality',
        body: 'Freshness, volume, schema and distribution tests that run continuously.',
      },
      {
        title: 'Event tracking',
        body: 'A governed event schema so product analytics stay comparable over time.',
      },
      {
        title: 'Migration',
        body: 'Moving off legacy reporting without losing the history it holds.',
      },
    ],
    deliverables: [
      'Source inventory and ingestion pipelines',
      'Modelled warehouse layer with tests and documentation',
      'Metric definitions agreed and version-controlled',
      'Dashboards for the questions that prompted the work',
      'Monitoring for freshness, volume and schema drift',
    ],
    faq: [
      {
        q: 'Do we need a warehouse, or is our database enough?',
        a: 'If reporting queries are slowing your production database, or you need to join across systems, you need a warehouse. Otherwise, often not yet.',
      },
      {
        q: 'Which tools do you use?',
        a: 'PostgreSQL and the managed warehouses on GCP and Azure, with standard SQL transformation tooling. We avoid anything that locks the modelling layer to one vendor.',
      },
      {
        q: 'How do you handle disagreement about definitions?',
        a: 'We surface it early and force the decision, in writing. The disagreement already exists — the modelling work just makes it visible.',
      },
    ],
    related: ['cloud-backend-engineering', 'machine-learning', 'custom-software'],
  },
  {
    slug: 'cloud-backend-engineering',
    index: '08',
    title: 'Cloud & Backend Engineering',
    category: 'Data & Cloud',
    description:
      'Scalable APIs, distributed systems and cloud infrastructure engineered for reliability.',
    eyebrow: 'APIS · QUEUES · INFRASTRUCTURE',
    headline: 'Infrastructure that fails predictably.',
    intro:
      'Everything breaks eventually. The difference between a good system and a bad one is whether the failure is contained, visible and recoverable — or whether it takes the whole platform down at two in the morning.',
    marks: [
      { value: 'Typed', label: 'Contract-first API surfaces' },
      { value: 'Traced', label: 'Request-level observability' },
      { value: 'Recoverable', label: 'Tested restore, not just backup' },
    ],
    definition: {
      heading: 'Reliability is designed, not added',
      body: [
        'Timeouts, retries with backoff, circuit breakers, idempotency, dead-letter queues and graceful degradation are not advanced techniques. They are the baseline, and they are far cheaper to build in than to retrofit after an incident.',
        'We also insist on the unglamorous part: that the restore procedure has actually been run. A backup nobody has restored from is a hypothesis, not a safeguard.',
      ],
    },
    comparison: {
      withoutTitle: 'Hope as a strategy',
      without: [
        'One slow dependency stalls every request in the pool',
        'Retries without backoff turn a blip into an outage',
        'Logs without correlation IDs, so nothing can be traced',
        'Backups that have never been restored from',
      ],
      withTitle: 'Designed for failure',
      with: [
        'Timeouts and bulkheads so one dependency cannot take the rest down',
        'Exponential backoff, jitter and dead-letter queues',
        'Structured logs and traces correlated across services',
        'A restore procedure that has been rehearsed and timed',
      ],
    },
    offerings: [
      {
        title: 'API design & build',
        body: 'Contract-first REST services with generated types and versioning.',
      },
      {
        title: 'Event-driven systems',
        body: 'Queues, workers and pub/sub for work that should not happen in a request.',
      },
      {
        title: 'Media & batch processing',
        body: 'Long-running pipelines with progress, resumption and backpressure.',
      },
      {
        title: 'Containerisation & deploys',
        body: 'Docker, CI/CD and repeatable environments from local to production.',
      },
      {
        title: 'Observability',
        body: 'Structured logging, metrics, tracing and alerts that mean something.',
      },
      {
        title: 'Cost optimisation',
        body: 'Finding the resources you are paying for and not using.',
      },
    ],
    deliverables: [
      'Documented API contract with generated client types',
      'Containerised services and reproducible environments',
      'CI/CD pipeline with automated tests and staged rollout',
      'Logging, metrics, tracing and alert routing',
      'Runbook, incident checklist and a rehearsed restore',
    ],
    faq: [
      {
        q: 'Which cloud?',
        a: 'We work primarily across GCP and Azure. Where possible we keep the architecture portable so the provider is a deployment detail rather than a lock-in.',
      },
      {
        q: 'Do we need Kubernetes?',
        a: 'Usually not at the start. Managed container services carry far less operational cost until you genuinely need the control.',
      },
      {
        q: 'Can you work alongside our platform team?',
        a: 'Yes. We can build to your existing standards and pipelines, or establish them if there is nothing in place yet.',
      },
    ],
    related: ['custom-software', 'data-analytics', 'ai-agents-automation'],
  },
  {
    slug: 'computer-vision-nlp',
    index: '09',
    title: 'Computer Vision & NLP',
    category: 'AI & ML',
    description: 'Intelligent systems for image, video and natural-language understanding.',
    eyebrow: 'PIXELS · AUDIO · LANGUAGE',
    headline: 'Making unstructured input legible to software.',
    intro:
      'Images, video, audio and free text are where most real business data lives and where most systems give up. Turning them into structured, queryable records is the unlock — and it is as much a pipeline problem as a model one.',
    marks: [
      { value: 'Streamed', label: 'Processing that scales with volume' },
      { value: 'Validated', label: 'Confidence thresholds and review' },
      { value: 'Structured', label: 'Typed records out the far end' },
    ],
    definition: {
      heading: 'Mostly a pipeline problem',
      body: [
        'The model is rarely the bottleneck. Decoding, frame sampling, batching, GPU scheduling, queue depth, storage throughput and retry semantics are what decide whether a system handles ten files or ten thousand.',
        'We build the pipeline to be resumable and observable first, then slot the model in as a stage within it.',
      ],
    },
    comparison: {
      withoutTitle: 'Single-machine scripts',
      without: [
        'One long process that loses everything if it crashes at 90%',
        'No backpressure, so a burst exhausts memory',
        'Output quality unmeasured beyond spot checks',
        'Reprocessing means starting from the beginning',
      ],
      withTitle: 'A processing platform',
      with: [
        'Work split into resumable units with durable state',
        'Queue-based backpressure and controlled concurrency',
        'Accuracy measured on a held-out set per content type',
        'Selective reprocessing of only what changed',
      ],
    },
    offerings: [
      {
        title: 'Speech & transcription',
        body: 'Batch and near-real-time transcription with speaker and timing metadata.',
      },
      {
        title: 'Video processing',
        body: 'Transcoding, frame extraction and analysis pipelines built on FFmpeg.',
      },
      {
        title: 'Document OCR',
        body: 'Layout-aware extraction from scans, forms and photographed documents.',
      },
      {
        title: 'Image classification',
        body: 'Detection, tagging and quality inspection over image streams.',
      },
      {
        title: 'Text understanding',
        body: 'Entity extraction, classification and summarisation over free text.',
      },
      {
        title: 'Search over media',
        body: 'Making an archive of audio and video actually searchable.',
      },
    ],
    deliverables: [
      'Ingestion and queueing layer with backpressure',
      'Processing workers with resumable, idempotent units of work',
      'Model integration with confidence thresholds and review routing',
      'Structured output schema and storage',
      'Accuracy evaluation per content type and monitoring in production',
    ],
    faq: [
      {
        q: 'How accurate is transcription in practice?',
        a: 'It depends heavily on audio quality, accent and domain vocabulary. We measure on your own material before quoting a number, rather than repeating a benchmark figure.',
      },
      {
        q: 'Can this run on our own infrastructure?',
        a: 'Yes. Where data residency or cost requires it, the pipeline can run entirely within your environment with self-hosted models.',
      },
      {
        q: 'What about very large archives?',
        a: 'That is a throughput and cost question first. We size the pipeline against a sample and give you a per-hour processing cost before committing.',
      },
    ],
    related: ['machine-learning', 'ai-development', 'cloud-backend-engineering'],
  },
  {
    slug: 'seo-ai-search',
    index: '10',
    title: 'SEO & AI Search Optimization',
    category: 'Growth',
    description:
      'Technical SEO and AI-search-ready digital experiences designed for discoverability.',
    eyebrow: 'CRAWLABLE · CITABLE · FAST',
    headline: 'Findable by search engines and answer engines.',
    intro:
      'Discovery now splits in two. Classic search still rewards crawlability, structure and speed. Answer engines reward something adjacent: clear claims, structured data and content that is easy to quote correctly.',
    marks: [
      { value: 'Structured', label: 'Schema.org across every template' },
      { value: 'Crawlable', label: 'Rendered content, not just scripts' },
      { value: 'Cited', label: 'Written to be quoted accurately' },
    ],
    definition: {
      heading: 'What changed, and what did not',
      body: [
        'What did not change: a page that is slow, blocked, duplicated or invisible to a crawler will not rank. Technical foundations still decide the ceiling.',
        'What did change: a growing share of queries are answered without a click. Being the source an answer engine cites requires explicit structure — schema markup, unambiguous claims, clean heading hierarchy and crawler access policies that permit it.',
      ],
    },
    comparison: {
      withoutTitle: 'Content without foundations',
      without: [
        'Content rendered only in JavaScript, invisible to some crawlers',
        'No structured data, so nothing can be parsed reliably',
        'Duplicate and thin pages competing with each other',
        'AI crawlers blocked by an accidental robots.txt rule',
      ],
      withTitle: 'Engineered discoverability',
      with: [
        'Server-rendered or prerendered HTML for every indexable route',
        'Schema.org markup appropriate to each template',
        'A deliberate canonical and internal linking structure',
        'An explicit, reviewed policy for each AI crawler',
      ],
    },
    offerings: [
      {
        title: 'Technical SEO audit',
        body: 'Crawl, index coverage, Core Web Vitals and rendering diagnosis.',
      },
      {
        title: 'Structured data',
        body: 'Schema.org implementation matched to each page template.',
      },
      {
        title: 'AI search readiness',
        body: 'Crawler policy, llms.txt, citable structure and answer-shaped content.',
      },
      {
        title: 'Site architecture',
        body: 'URL structure, canonicals and internal linking that concentrate authority.',
      },
      {
        title: 'Core Web Vitals',
        body: 'Performance remediation measured on real user data, not lab scores.',
      },
      {
        title: 'Migration safety',
        body: 'Redirect mapping and monitoring so a replatform does not cost you rankings.',
      },
    ],
    deliverables: [
      'Technical audit with issues ranked by likely impact',
      'Structured data implemented and validated per template',
      'Crawler access policy, sitemap and robots configuration',
      'Core Web Vitals remediation with before-and-after field data',
      'Monitoring for index coverage and crawl errors',
    ],
    faq: [
      {
        q: 'Do you do content and link building?',
        a: 'We do the technical and structural side, and we will advise on content structure. We do not sell link building.',
      },
      {
        q: 'Should we block AI crawlers?',
        a: 'That is a business decision, not a default. We lay out what each crawler does with your content so you can decide deliberately rather than by accident.',
      },
      {
        q: 'How long until it shows?',
        a: 'Technical fixes can affect crawling within days and rankings over weeks. Anyone promising a fixed timeline is guessing.',
      },
    ],
    related: ['web-development', 'data-analytics', 'generative-ai-rag'],
  },
]

export const serviceBySlug = new Map(services.map((service) => [service.slug, service]))

/** Mega-menu grouping, mirroring the way buyers actually shop for this work. */
export const serviceGroups: Array<{ heading: string; slugs: string[] }> = [
  { heading: 'Software & Product', slugs: ['web-development', 'custom-software'] },
  {
    heading: 'AI & Machine Learning',
    slugs: ['ai-development', 'generative-ai-rag', 'machine-learning', 'computer-vision-nlp'],
  },
  { heading: 'Data & Cloud', slugs: ['data-analytics', 'cloud-backend-engineering'] },
  { heading: 'Automation & Growth', slugs: ['ai-agents-automation', 'seo-ai-search'] },
]
