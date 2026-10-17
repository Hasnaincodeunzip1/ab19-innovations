/**
 * Editorial. Written by the team, about work we have actually done — not
 * keyword filler. Each post is a small argument with a position in it.
 */

export const postCategories = ['All', 'Engineering', 'AI', 'Data', 'Practice'] as const
export type PostCategory = (typeof postCategories)[number]

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'quote'; text: string }
  | { type: 'code'; lang: string; code: string }

export type Post = {
  slug: string
  title: string
  category: Exclude<PostCategory, 'All'>
  date: string
  readingMinutes: number
  excerpt: string
  /** Short abstract used for the answer-engine-friendly summary block. */
  summary: string
  body: Block[]
}

export const posts: Post[] = [
  {
    slug: 'retrieval-is-the-hard-part',
    title: 'Your RAG system is failing at retrieval, not generation',
    category: 'AI',
    date: '2026-09-02',
    readingMinutes: 7,
    excerpt:
      'When an assistant gives a bad answer, the instinct is to rewrite the prompt. Usually the correct passage was never fetched in the first place.',
    summary:
      'Most retrieval-augmented generation failures are retrieval failures. Evaluate retrieval separately from generation, use hybrid search with reranking, and chunk along document structure rather than fixed sizes.',
    body: [
      {
        type: 'p',
        text: 'There is a predictable sequence to debugging a retrieval-augmented system. The answer is wrong. Someone rewrites the prompt. It is still wrong, differently. Someone tries a larger model. It is now expensively wrong. Nobody has yet checked whether the passage containing the answer was ever retrieved.',
      },
      {
        type: 'p',
        text: 'It usually was not. Generation is the part of the stack that modern models have largely solved: give a capable model the right context and it will write a good answer. Deciding what the right context is remains an ordinary information-retrieval problem, and it is where the errors concentrate.',
      },
      { type: 'h2', text: 'Measure the two halves separately' },
      {
        type: 'p',
        text: 'The single most useful change you can make is to score retrieval on its own. Build a set of questions with the passages that should be returned for each, then measure whether they were — before any generation happens.',
      },
      {
        type: 'list',
        items: [
          'Recall@k: was the correct passage anywhere in the top k results?',
          'Precision: how much of what was retrieved was actually relevant?',
          'Per query class: identifier lookups, conceptual questions and comparisons fail differently, so never average them together.',
        ],
      },
      {
        type: 'p',
        text: 'Once retrieval is scored independently, a bad answer becomes diagnosable. Either the passage was missing, in which case no prompt will help, or it was present and the generation step mishandled it, which is a different and much easier fix.',
      },
      { type: 'h2', text: 'Fixed-size chunking destroys structure' },
      {
        type: 'p',
        text: 'Splitting documents every 500 tokens is the default in every tutorial and it is wrong for most real material. It severs tables from their headers, separates a clause from the definition it depends on, and produces fragments that are individually meaningless.',
      },
      {
        type: 'p',
        text: 'Chunk along the document’s own structure instead: sections, headings, table boundaries, list groupings. Carry the heading path into each chunk so a fragment still says what it belongs to. This one change routinely moves retrieval quality more than any embedding model swap.',
      },
      { type: 'h2', text: 'Pure vector search misses exact terms' },
      {
        type: 'p',
        text: 'Embeddings capture meaning, which is exactly wrong when someone searches for a part number, an error code or a policy reference. Semantically, `SKU-40192` and `SKU-40196` are nearly identical. Practically, returning the wrong one is a complete failure.',
      },
      {
        type: 'p',
        text: 'Run lexical and vector search together and rerank the merged set. Hybrid retrieval is more moving parts, and it is the difference between a system that demos well and one that survives the queries people actually type.',
      },
      { type: 'h2', text: 'Make "I don’t know" a tested behaviour' },
      {
        type: 'p',
        text: 'If retrieval returns nothing relevant, the correct answer is to say so. This has to be an explicit, evaluated path — with cases in your test set where the expected output is a refusal — or the model will fill the silence with something plausible.',
      },
      {
        type: 'quote',
        text: 'A system that confidently answers when it should abstain has not failed gracefully. It has failed invisibly, which is worse.',
      },
      {
        type: 'p',
        text: 'None of this is exotic. It is ordinary search engineering, applied before the interesting part. The teams whose assistants work are rarely the ones with the best prompts — they are the ones who took retrieval seriously.',
      },
    ],
  },
  {
    slug: 'evaluation-sets-not-vibes',
    title: 'You cannot ship AI without an evaluation set',
    category: 'AI',
    date: '2026-08-18',
    readingMinutes: 6,
    excerpt:
      'Every stalled AI project we have seen stalled at the same question: how do you know it works? Here is the cheapest useful answer.',
    summary:
      'AI features need an evaluation set the way code needs tests. Build a small labelled dataset early, score changes against it in CI, and treat prompt edits as deployments requiring a passing run.',
    body: [
      {
        type: 'p',
        text: 'A prototype gets built in a week and impresses everyone. Six months later it is still not in production. The reason is almost always the same, and it is not technical difficulty — it is that nobody can answer the question "how do we know it works?" with anything more than a demo.',
      },
      { type: 'h2', text: 'Start with fifty examples' },
      {
        type: 'p',
        text: 'People delay building an evaluation set because they imagine it needs thousands of carefully labelled records. It does not. Fifty real inputs with expected outputs, chosen to cover the cases you actually care about, will catch most regressions and immediately change how the team works.',
      },
      {
        type: 'list',
        items: [
          'Twenty typical cases — the bread and butter.',
          'Twenty known-hard cases — the ones that failed during the prototype.',
          'Ten cases where the correct output is a refusal or an escalation.',
        ],
      },
      { type: 'h2', text: 'Score in CI, not in a notebook' },
      {
        type: 'p',
        text: 'An evaluation that lives in someone’s notebook runs when they remember. An evaluation in the pipeline runs on every change. Treat a prompt edit exactly like a code change: it needs a passing run before it merges.',
      },
      {
        type: 'code',
        lang: 'text',
        code: 'PR opened\n  └─ run eval suite (50 cases)\n       ├─ score >= baseline  → allowed to merge\n       └─ score <  baseline  → blocked, with the failing cases listed',
      },
      {
        type: 'p',
        text: 'The blocked case is the valuable one. Without it, a prompt tweak that fixes the bug in front of you and quietly breaks four other things ships on a Friday afternoon.',
      },
      { type: 'h2', text: 'Grade what you actually care about' },
      {
        type: 'p',
        text: 'Exact-match scoring punishes correct answers that are worded differently. Human grading does not scale. Model-graded evaluation works reasonably well when the rubric is specific — but the rubric has to be written down and agreed, not improvised per run.',
      },
      {
        type: 'p',
        text: 'Where it matters most, grade structurally. If the output is meant to be a typed record, validate the schema and compare fields. Structured output is easier to build, easier to score and easier to use downstream than prose.',
      },
      {
        type: 'quote',
        text: 'An evaluation set is not quality assurance overhead. It is the thing that lets you change the system without fear, which is the only way anything reaches production.',
      },
    ],
  },
  {
    slug: 'training-serving-skew',
    title: 'The recommendation bug you cannot see',
    category: 'Data',
    date: '2026-07-29',
    readingMinutes: 5,
    excerpt:
      'Offline metrics look fine. Online behaviour does not match. The usual culprit is that your model sees a different world in production than it learned from.',
    summary:
      'Training/serving skew occurs when features are computed differently in training and inference. Fix it with a single shared feature definition consumed by both paths, and detect it by logging served feature vectors.',
    body: [
      {
        type: 'p',
        text: 'Training/serving skew is the most common serious bug in deployed machine learning and among the hardest to notice, because nothing errors. The pipeline runs. The model responds. The numbers are simply worse than they should be, and nobody can say why.',
      },
      { type: 'h2', text: 'How it happens' },
      {
        type: 'p',
        text: 'The training job computes features with a SQL query over the warehouse. The serving path recomputes them in application code against the production database. Two implementations of the same idea, written months apart by different people, diverging on exactly the details nobody documented.',
      },
      {
        type: 'list',
        items: [
          'Time windows: "last 30 days" measured from the event, or from now?',
          'Nulls: the training query drops them; the serving path substitutes zero.',
          'Categoricals: an unseen category maps to a different bucket in each path.',
          'Ordering: the warehouse deduplicates by latest; production takes the first row.',
        ],
      },
      { type: 'h2', text: 'One definition, both paths' },
      {
        type: 'p',
        text: 'The durable fix is to define each feature once, as code, and have both the training job and the serving path call it. This is what a feature store gives you, but you do not need a feature store to get the benefit — a shared library and the discipline to use it covers most of the distance.',
      },
      { type: 'h2', text: 'Detect it even after you have fixed it' },
      {
        type: 'p',
        text: 'Log the actual feature vector served with each prediction. Compare the distribution of served features against the training distribution on a schedule. When they drift apart, you find out from a monitor rather than from a quarterly review of declining performance.',
      },
      {
        type: 'p',
        text: 'It is unglamorous work. It is also the difference between a model that performs in production the way it did in evaluation and one that quietly under-delivers for a year.',
      },
    ],
  },
  {
    slug: 'queues-before-cleverness',
    title: 'Reach for a queue before you reach for cleverness',
    category: 'Engineering',
    date: '2026-07-10',
    readingMinutes: 6,
    excerpt:
      'Most throughput problems are solved by separating work into durable units, not by optimising the work itself.',
    summary:
      'Splitting long-running work into idempotent, durable queued units gives resumability, backpressure and priority isolation — usually delivering more than optimising the processing step itself.',
    body: [
      {
        type: 'p',
        text: 'A job takes three hours and fails at the ninety-minute mark. The instinct is to make the processing faster. The better move is usually to make the failure cheap.',
      },
      { type: 'h2', text: 'Durable units change the economics' },
      {
        type: 'p',
        text: 'Split the work into units small enough that losing one costs seconds, give each an idempotency key, and persist progress as each completes. A crash now costs a single unit rather than the whole run. Nothing about the processing got faster; the cost of failure collapsed.',
      },
      { type: 'h2', text: 'Backpressure is not optional' },
      {
        type: 'p',
        text: 'Without it, a burst of input is accepted at whatever rate it arrives until memory runs out. With a queue, depth is observable and ingestion can slow down deliberately. Slower is a decision; out of memory at 3am is not.',
      },
      { type: 'h2', text: 'Separate queues beat one clever scheduler' },
      {
        type: 'p',
        text: 'When two workloads share infrastructure and have different shapes — one latency-sensitive, one throughput-hungry — the temptation is to write a scheduler that balances them. Separate queues with their own worker pools and priorities are simpler, more predictable and far easier to reason about at two in the morning.',
      },
      {
        type: 'quote',
        text: 'Idempotency is what makes retries safe. Without it, a retry is just a second chance to corrupt something.',
      },
      {
        type: 'p',
        text: 'None of this requires exotic infrastructure. A managed queue, workers that can be killed at any moment without consequence, and persisted progress covers the overwhelming majority of throughput problems people try to solve with cleverness.',
      },
    ],
  },
  {
    slug: 'ai-search-readiness',
    title: 'What answer engines actually need from your site',
    category: 'Engineering',
    date: '2026-06-24',
    readingMinutes: 5,
    excerpt:
      'A growing share of queries are answered without a click. Being the source that gets cited is a structural problem, not a content-volume one.',
    summary:
      'To be cited by AI answer engines, sites need server-rendered or prerendered HTML, Schema.org structured data, clean heading hierarchy, unambiguous factual claims and a deliberate crawler access policy.',
    body: [
      {
        type: 'p',
        text: 'Classic search rewards pages. Answer engines reward passages. The practical consequence is that the unit of optimisation has shrunk: a well-structured section that states one thing clearly is more citable than a long page that covers ten things loosely.',
      },
      { type: 'h2', text: 'Be renderable without JavaScript' },
      {
        type: 'p',
        text: 'Some crawlers execute JavaScript. Many do not, or do so with a delay and a budget. If your content only exists after hydration, you are relying on the most expensive path in the crawler’s pipeline. Server rendering or build-time prerendering removes the question entirely.',
      },
      { type: 'h2', text: 'Structure is machine-readable intent' },
      {
        type: 'list',
        items: [
          'Schema.org markup appropriate to the template — Organization, Service, Article, FAQPage.',
          'A heading hierarchy that is actually hierarchical, with no skipped levels.',
          'One canonical URL per piece of content, consistently.',
          'Explicit question-and-answer blocks where the content is genuinely a question and answer.',
        ],
      },
      { type: 'h2', text: 'Decide your crawler policy deliberately' },
      {
        type: 'p',
        text: 'GPTBot, ClaudeBot, PerplexityBot, Google-Extended and the rest each read your robots.txt. Blocking them is a legitimate business decision; so is allowing them. What is not legitimate is discovering by accident that a default rule has been deciding it for you.',
      },
      { type: 'h2', text: 'Write claims that survive extraction' },
      {
        type: 'p',
        text: 'If a sentence needs the previous three paragraphs to make sense, it cannot be quoted accurately. State the claim, then elaborate. This is good writing anyway; it is now also a distribution strategy.',
      },
    ],
  },
  {
    slug: 'when-not-to-use-ai',
    title: 'When not to use AI',
    category: 'Practice',
    date: '2026-06-05',
    readingMinutes: 4,
    excerpt:
      'The fastest way to lose credibility with an AI project is to apply it where a deterministic system would have been better, cheaper and correct.',
    summary:
      'AI suits problems where errors are cheap to detect and correct and the rules resist enumeration. Deterministic logic remains better where rules are known, correctness is binary, or wrong answers are expensive and invisible.',
    body: [
      {
        type: 'p',
        text: 'We turn down more AI work than we take. Not out of scepticism — we build these systems — but because the failure mode of applying a probabilistic tool to a deterministic problem is expensive and entirely avoidable.',
      },
      { type: 'h2', text: 'The test: what does a wrong answer cost?' },
      {
        type: 'p',
        text: 'If a wrong answer is immediately visible and cheap to correct — a suggested tag, a draft, a ranked list a human scans — AI is often an excellent fit. If a wrong answer is invisible, expensive, or flows unchecked into a downstream system, the bar rises enormously.',
      },
      { type: 'h2', text: 'Signals that you want ordinary software' },
      {
        type: 'list',
        items: [
          'The rules are already written down somewhere and fit on a page.',
          'Correctness is binary and auditable, not a matter of judgement.',
          'The same input must always produce the same output.',
          'A regulator, an auditor or a court may ask why a specific decision was made.',
        ],
      },
      { type: 'h2', text: 'Signals that AI genuinely earns its place' },
      {
        type: 'list',
        items: [
          'The input is unstructured — language, images, audio, messy documents.',
          'The rules resist enumeration; experts recognise the answer but cannot fully specify it.',
          'Volume makes human handling impractical and sampling is acceptable.',
          'A human reviews the output before it has consequences.',
        ],
      },
      {
        type: 'quote',
        text: 'The question is never "can AI do this?" It is "what happens when it is wrong, and who finds out?"',
      },
      {
        type: 'p',
        text: 'Saying so early costs one uncomfortable conversation. Discovering it after two quarters of build costs considerably more.',
      },
    ],
  },
]

export const postBySlug = new Map(posts.map((post) => [post.slug, post]))

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export function categoryCounts() {
  const counts = new Map<string, number>([['All', posts.length]])
  for (const post of posts) counts.set(post.category, (counts.get(post.category) ?? 0) + 1)
  return counts
}
