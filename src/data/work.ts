/**
 * Selected engineering experience, organised by domain.
 *
 * Deliberately anonymous: no client names, no revenue figures, no invented
 * testimonials. Everything here describes work the founding team has actually
 * engineered, at the level of detail we can stand behind.
 */

export type Industry = {
  slug: string
  name: string
  headline: string
  intro: string
  /** Qualitative context rather than fabricated performance claims. */
  context: string[]
  challenges: Array<{ title: string; body: string }>
}

export const industries: Industry[] = [
  {
    slug: 'healthcare',
    name: 'Healthcare & claims',
    headline: 'Where healthcare data engineering is going.',
    intro:
      'Claims, clinical documents and prior authorisation generate enormous volumes of semi-structured text. The engineering problem is rarely the model — it is handling that material safely, traceably and at volume.',
    context: [
      'Document formats vary by payer, provider and decade',
      'Every automated decision needs an audit trail a human can follow',
      'Data handling constraints shape the architecture before the model is chosen',
    ],
    challenges: [
      {
        title: 'Extraction over inconsistent documents',
        body: 'Layout-aware parsing and validation that degrades gracefully instead of silently mis-reading a field.',
      },
      {
        title: 'Traceable decisions',
        body: 'Every derived value linked back to the passage it came from, so a reviewer can verify rather than trust.',
      },
      {
        title: 'Throughput without loss',
        body: 'Queue-based pipelines with resumable units of work, so a failure costs minutes rather than a full reprocess.',
      },
    ],
  },
  {
    slug: 'media-and-video',
    name: 'Media & video',
    headline: 'Where media processing is going.',
    intro:
      'Audio and video workloads punish naive architecture. Throughput, cost per hour processed and resumability decide whether a pipeline handles a catalogue or falls over on it.',
    context: [
      'Processing cost scales directly with content hours, so efficiency is the product',
      'Users expect near-real-time results from inherently slow operations',
      'Archives are large enough that reprocessing everything is never an option',
    ],
    challenges: [
      {
        title: 'Real-time and batch together',
        body: 'The same pipeline serving live transcription and bulk archive processing without one starving the other.',
      },
      {
        title: 'Cost per processed hour',
        body: 'Frame sampling, codec choice and worker sizing tuned against measured cost rather than assumption.',
      },
      {
        title: 'Resumable work',
        body: 'Long jobs split into durable units so an interrupted run continues instead of restarting.',
      },
    ],
  },
  {
    slug: 'commerce',
    name: 'Commerce & personalization',
    headline: 'Where commerce personalisation is going.',
    intro:
      'Recommendation is an infrastructure problem wearing a machine-learning hat. Feature freshness, serving latency and cold-start behaviour matter more than the choice of algorithm.',
    context: [
      'Latency budgets are measured in tens of milliseconds at request time',
      'Most catalogue items and most users are cold-start most of the time',
      'Offline metric gains frequently fail to survive online measurement',
    ],
    challenges: [
      {
        title: 'Training / serving consistency',
        body: 'One feature definition used by both paths, so the model sees at inference what it saw in training.',
      },
      {
        title: 'Cold start',
        body: 'Sensible fallbacks for new users and new items, rather than an empty or arbitrary result.',
      },
      {
        title: 'Honest evaluation',
        body: 'Offline scores treated as a filter, with the real decision made on measured online behaviour.',
      },
    ],
  },
  {
    slug: 'enterprise-platforms',
    name: 'Enterprise platforms',
    headline: 'Where internal platforms are going.',
    intro:
      'Internal tools carry the operational load of a business and almost none of its design attention. The work is integration, permissions and reliability far more than interface.',
    context: [
      'The real requirements are the workarounds people have already built',
      'Access control is a first-class concern, not a later feature',
      'Most of the complexity lives between systems, not inside any one of them',
    ],
    challenges: [
      {
        title: 'Integration surface',
        body: 'Adapter layers over systems that were never designed to be integrated with.',
      },
      {
        title: 'Permissions',
        body: 'Role and resource-level access enforced at the data layer rather than in the UI.',
      },
      {
        title: 'Migration without a freeze',
        body: 'Incremental replacement that lets the old and new systems run side by side.',
      },
    ],
  },
]

export const industryBySlug = new Map(industries.map((industry) => [industry.slug, industry]))

export type CaseStudy = {
  slug: string
  index: string
  industry: string
  title: string
  summary: string
  motif: 'claims' | 'pipeline' | 'graph'
  capabilities: string[]
  stack: string[]
  /** Outcome statements — qualitative unless the figure is one we can stand behind. */
  outcomes: Array<{ value: string; label: string }>
  sections: Array<{ id: string; heading: string; body: string[] }>
  takeaways: string[]
  faq: Array<{ q: string; a: string }>
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'ai-healthcare-intelligence',
    index: '01',
    industry: 'healthcare',
    title: 'AI Healthcare Intelligence',
    summary:
      'GenAI + machine learning systems for healthcare claims analysis, risk detection and intelligent processing.',
    motif: 'claims',
    capabilities: ['Generative AI', 'Risk detection', 'Document intelligence'],
    stack: ['Python', 'LLMs', 'PostgreSQL', 'Azure'],
    outcomes: [
      { value: 'Traceable', label: 'Every extracted value linked to its source passage' },
      { value: 'Reviewable', label: 'Low-confidence output routed to a human queue' },
      { value: 'Resumable', label: 'Failures cost minutes, not a full reprocess' },
    ],
    sections: [
      {
        id: 'problem',
        heading: 'The problem',
        body: [
          'Claims and clinical documentation arrive in dozens of formats from dozens of sources. Reviewers spend most of their time locating information rather than judging it, and the volume grows faster than the team can.',
          'The obvious answer — put a language model on it — collapses on the first hard question: how does a reviewer know the extracted value is right, and what happens when it is not?',
        ],
      },
      {
        id: 'approach',
        heading: 'The approach',
        body: [
          'We treated extraction as a pipeline stage rather than a product. Documents are parsed with layout awareness so tables and headings survive, chunked along their own structure, and processed with a model whose output is constrained to a typed schema.',
          'Every extracted field carries a reference back to the passage it came from and a confidence score. Anything below the threshold is routed to a review queue instead of flowing silently into the record.',
          'Risk signals are scored separately from extraction, so a model change in one does not quietly move the other.',
        ],
      },
      {
        id: 'engineering',
        heading: 'The engineering',
        body: [
          'Ingestion runs through a durable queue with idempotent workers, so a crash mid-batch resumes rather than restarts. Each processing run is versioned against the prompt, model and schema used, which makes results reproducible and regressions attributable.',
          'An evaluation set built from reviewed documents gates every change. A prompt or model update that lowers the score does not reach production.',
        ],
      },
      {
        id: 'result',
        heading: 'Where it landed',
        body: [
          'Reviewers work from a pre-populated record with citations rather than a raw document, and spend their attention on judgement rather than search. Exceptions surface explicitly instead of hiding inside an average.',
        ],
      },
    ],
    takeaways: [
      'Constrain model output to a typed schema — free text is not an interface.',
      'Cite the source passage for every derived value, or reviewers cannot trust any of them.',
      'Gate prompt and model changes behind an evaluation set, exactly like code.',
      'Route low confidence to a human rather than letting it flow through silently.',
    ],
    faq: [
      {
        q: 'How is accuracy measured?',
        a: 'Against a held-out set of documents reviewed by domain experts, scored per field type rather than as a single headline number — different fields fail in different ways.',
      },
      {
        q: 'What happens to documents the system cannot handle?',
        a: 'They are routed to a review queue with the reason attached. An explicit exception is far more useful than a confident wrong answer.',
      },
    ],
  },
  {
    slug: 'transcription-video-platform',
    index: '02',
    industry: 'media-and-video',
    title: 'Transcription & Video Platform',
    summary:
      'Real-time transcription and scalable video processing infrastructure using Python, RabbitMQ, FFmpeg and cloud technologies.',
    motif: 'pipeline',
    capabilities: ['Real-time transcription', 'Media pipelines', 'Queue architecture'],
    stack: ['Python', 'RabbitMQ', 'FFmpeg', 'GCP'],
    outcomes: [
      { value: '95%', label: 'Transcription accuracy on evaluated material' },
      { value: '25%', label: 'Processing efficiency improvement' },
      { value: '10K+', label: 'Users served by the systems engineered' },
    ],
    sections: [
      {
        id: 'problem',
        heading: 'The problem',
        body: [
          'Two workloads wanted the same infrastructure and pulled in opposite directions. Live transcription needs low latency and predictable capacity. Bulk archive processing wants to saturate every available worker.',
          'Run them on one undifferentiated pool and the archive job starves the live one at exactly the wrong moment.',
        ],
      },
      {
        id: 'approach',
        heading: 'The approach',
        body: [
          'Work was split into small, durable units and dispatched through separate queues with their own priorities and worker pools. Live traffic gets reserved capacity; batch work fills whatever is left and yields when live demand rises.',
          'Media handling runs through FFmpeg with codec and sampling decisions made against measured cost per processed hour rather than defaults.',
        ],
      },
      {
        id: 'engineering',
        heading: 'The engineering',
        body: [
          'Every unit of work is idempotent and keyed, so a retry after a worker dies cannot duplicate output. Progress is persisted per unit, which turns an interrupted three-hour job into a job that resumes where it stopped.',
          'Backpressure is explicit: when queue depth passes a threshold, ingestion slows rather than allowing memory to be exhausted. Accuracy is measured per content type, because a clean studio recording and a noisy field recording are not the same problem.',
        ],
      },
      {
        id: 'result',
        heading: 'Where it landed',
        body: [
          'Accuracy on evaluated material reached 95%, and processing efficiency improved by around 25% against the previous approach — largely from better batching and codec choices rather than from a different model.',
        ],
      },
    ],
    takeaways: [
      'Separate queues beat one clever scheduler when workloads have different shapes.',
      'Idempotency keys are not optional the moment retries exist.',
      'Persist progress per unit — resumability is worth more than raw speed.',
      'Measure accuracy per content type; a single average hides every real problem.',
    ],
    faq: [
      {
        q: 'Where does the 95% figure come from?',
        a: 'Word-level accuracy measured against a held-out, manually corrected evaluation set drawn from the same material the system processes. It is not a vendor benchmark.',
      },
      {
        q: 'What drove the efficiency improvement?',
        a: 'Mostly batching strategy, frame sampling and codec selection — pipeline engineering rather than a change of model.',
      },
    ],
  },
  {
    slug: 'ai-recommendation-engine',
    index: '03',
    industry: 'commerce',
    title: 'AI Recommendation Engine',
    summary:
      'Machine-learning recommendation infrastructure designed to deliver personalized recommendations at scale.',
    motif: 'graph',
    capabilities: ['Recommendations', 'Feature pipelines', 'Model serving'],
    stack: ['Python', 'scikit-learn', 'FastAPI', 'Docker'],
    outcomes: [
      { value: 'Shared', label: 'One feature definition across training and serving' },
      { value: 'Bounded', label: 'Latency budget enforced at request time' },
      { value: 'Versioned', label: 'Rollback to any previous model artefact' },
    ],
    sections: [
      {
        id: 'problem',
        heading: 'The problem',
        body: [
          'Recommendation quality was limited less by the model than by everything around it. Features were computed one way in a training notebook and another way in the serving path, so the model saw a different world in production than it learned from.',
          'Cold start had no defined behaviour, which meant new users and new catalogue items — most of both, most of the time — received effectively arbitrary results.',
        ],
      },
      {
        id: 'approach',
        heading: 'The approach',
        body: [
          'We defined each feature exactly once and had both the training job and the serving path consume that definition. That single change removed an entire class of silent inconsistency.',
          'Cold-start behaviour was made explicit: popularity and content-similarity fallbacks with a defined blend, rather than an implicit accident of whatever the model produced with no history.',
        ],
      },
      {
        id: 'engineering',
        heading: 'The engineering',
        body: [
          'Serving runs behind a typed FastAPI surface in containers, with a hard latency budget — if the personalised path exceeds it, the request falls back to a cached ranking rather than hanging.',
          'Model artefacts are versioned alongside the feature definitions that produced them, so any deployment can be rolled back as a unit. New models go out against shadow traffic before they take real requests.',
        ],
      },
      {
        id: 'result',
        heading: 'Where it landed',
        body: [
          'The system serves ranked, personalised results within a fixed latency budget, degrades to a sensible ranking instead of failing, and can be rolled back cleanly when a new model underperforms.',
        ],
      },
    ],
    takeaways: [
      'Training/serving skew is the most common and least visible recommendation bug.',
      'Define cold-start behaviour deliberately — it is the majority case, not an edge case.',
      'Give the personalised path a latency budget and a fallback it can fail into.',
      'Version the model and its feature definitions together, or rollback is a fiction.',
    ],
    faq: [
      {
        q: 'Why scikit-learn rather than a deep model?',
        a: 'It cleared the bar at a fraction of the serving cost and complexity. The infrastructure is model-agnostic, so a heavier model can be swapped in when it earns its place.',
      },
      {
        q: 'How is a new model validated?',
        a: 'Offline evaluation as a filter, then shadow traffic to compare against the incumbent on live requests before it serves anyone.',
      },
    ],
  },
]

export const caseStudyBySlug = new Map(caseStudies.map((study) => [study.slug, study]))

export function caseStudiesForIndustry(slug: string) {
  return caseStudies.filter((study) => study.industry === slug)
}
