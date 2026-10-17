import { useMemo, useRef, useState } from 'react'
import { site, whatsappUrl } from '../data/site'
import { WhatsAppIcon } from '../components/ui/WhatsAppIcon'
import { PageHero } from '../components/ui/PageHero'
import { Reveal } from '../components/ui/Reveal'
import { Arrow } from '../components/ui/Arrow'
import { useSeo } from '../hooks/useSeo'
import { useScenePlan } from '../hooks/useScenePlan'
import type { StageAnchor } from '../three/sceneStore'

const PLAN: StageAnchor[] = [
  { id: 'top', stage: 4 },
  { id: 'brief', stage: 5 },
]

type Step = {
  key: 'name' | 'email' | 'problem' | 'constraint'
  question: string
  hint: string
  type: 'text' | 'email' | 'textarea'
  optional?: boolean
}

const STEPS: Step[] = [
  {
    key: 'name',
    question: 'Let’s start simple — what should we call you?',
    hint: 'A first name is plenty.',
    type: 'text',
  },
  {
    key: 'email',
    question: 'Where should the reply go?',
    hint: 'We answer from a person, not a queue.',
    type: 'email',
  },
  {
    key: 'problem',
    question: 'What are you trying to build, automate or improve?',
    hint: 'The problem, not the solution you have in mind. Two sentences is fine.',
    type: 'textarea',
  },
  {
    key: 'constraint',
    question: 'What’s the real constraint?',
    hint: 'Timeline, budget, a system you cannot replace, a date you cannot move. Optional.',
    type: 'textarea',
    optional: true,
  },
]

/**
 * One question at a time. No long form, and — since there is no backend here —
 * it composes a message in your own mail client rather than pretending to
 * submit somewhere.
 */
function Brief() {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  const step = STEPS[index]
  const done = index >= STEPS.length
  const progress = Math.round((Math.min(index, STEPS.length) / STEPS.length) * 100)

  const mailto = useMemo(() => {
    const body = [
      `Name: ${answers.name ?? ''}`,
      `Email: ${answers.email ?? ''}`,
      '',
      'What they want to build, automate or improve:',
      answers.problem ?? '',
      '',
      'Constraint:',
      answers.constraint || '—',
    ].join('\n')
    return `mailto:${site.email}?subject=${encodeURIComponent(
      `New project brief — ${answers.name ?? 'website'}`,
    )}&body=${encodeURIComponent(body)}`
  }, [answers])

  const advance = (event: React.FormEvent) => {
    event.preventDefault()
    const value = (answers[step.key] ?? '').trim()

    if (!value && !step.optional) {
      setError('This one we do need.')
      inputRef.current?.focus()
      return
    }
    if (step.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError('That does not look like an email address.')
      inputRef.current?.focus()
      return
    }

    setError(null)
    setIndex((current) => current + 1)
  }

  return (
    <div className="border border-line bg-ink/70">
      <div className="h-px w-full bg-line">
        <div
          className="h-px bg-accent transition-[width] duration-700 ease-[var(--ease-out-expo)]"
          style={{ width: `${done ? 100 : progress}%` }}
        />
      </div>

      <div className="p-7 sm:p-10">
        <p className="label text-fg-faint" aria-live="polite">
          {done ? 'Ready to send' : `Question ${index + 1} of ${STEPS.length}`}
        </p>

        {done ? (
          <div className="mt-7">
            <h3 className="text-balance-tight max-w-[22ch] text-[clamp(1.5rem,3vw,2.25rem)] font-medium">
              That’s everything we need to start, {answers.name}.
            </h3>
            <dl className="mt-8 space-y-5 border-t border-line pt-6">
              {STEPS.map((entry) => (
                <div key={entry.key}>
                  <dt className="label text-fg-faint">{entry.key}</dt>
                  <dd className="mt-1.5 max-w-[60ch] text-sm leading-relaxed text-fg-muted">
                    {answers[entry.key] || '—'}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={mailto}
                className="group/send inline-flex items-center justify-center gap-3 bg-accent px-7 py-4 text-sm font-medium text-ink transition-colors duration-300 hover:bg-accent-bright"
              >
                Send this brief
                <Arrow className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/send:translate-x-1" />
              </a>
              <button
                type="button"
                onClick={() => setIndex(0)}
                className="inline-flex items-center justify-center border border-line px-7 py-4 text-sm font-medium text-fg-muted transition-colors duration-300 hover:border-line-strong hover:text-fg"
              >
                Change an answer
              </button>
            </div>

            <p className="mt-6 text-xs leading-relaxed text-fg-faint">
              This opens the message in your own mail client. Nothing is stored on this site.
            </p>
          </div>
        ) : (
          <form onSubmit={advance} className="mt-7">
            <label htmlFor={`brief-${step.key}`} className="block">
              <span className="text-balance-tight block max-w-[24ch] text-[clamp(1.375rem,2.8vw,2rem)] font-medium">
                {step.question}
              </span>
              <span className="mt-3 block text-sm text-fg-faint">{step.hint}</span>
            </label>

            {step.type === 'textarea' ? (
              <textarea
                id={`brief-${step.key}`}
                ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                rows={4}
                value={answers[step.key] ?? ''}
                onChange={(e) => setAnswers((a) => ({ ...a, [step.key]: e.target.value }))}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `brief-${step.key}-error` : undefined}
                className="mt-7 w-full resize-y border-b border-line bg-transparent py-3 text-base text-fg outline-none transition-colors duration-300 placeholder:text-fg-faint focus:border-accent"
                placeholder="Type here…"
              />
            ) : (
              <input
                id={`brief-${step.key}`}
                ref={inputRef as React.RefObject<HTMLInputElement>}
                type={step.type}
                value={answers[step.key] ?? ''}
                onChange={(e) => setAnswers((a) => ({ ...a, [step.key]: e.target.value }))}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `brief-${step.key}-error` : undefined}
                autoComplete={step.key === 'email' ? 'email' : 'given-name'}
                className="mt-7 w-full border-b border-line bg-transparent py-3 text-base text-fg outline-none transition-colors duration-300 placeholder:text-fg-faint focus:border-accent"
                placeholder="Type here…"
              />
            )}

            {error && (
              <p id={`brief-${step.key}-error`} role="alert" className="mt-3 text-sm text-accent">
                {error}
              </p>
            )}

            <div className="mt-8 flex items-center gap-3">
              <button
                type="submit"
                className="group/next inline-flex items-center gap-3 bg-accent px-6 py-3.5 text-sm font-medium text-ink transition-colors duration-300 hover:bg-accent-bright"
              >
                {index === STEPS.length - 1 ? 'Review' : 'Continue'}
                <Arrow className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/next:translate-x-1" />
              </button>

              {index > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setError(null)
                    setIndex((current) => current - 1)
                  }}
                  className="px-3 py-3.5 text-sm text-fg-faint transition-colors duration-300 hover:text-fg"
                >
                  Back
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default function ContactPage() {
  useScenePlan(PLAN)
  useSeo({
    title: 'Contact — tell us what you’re trying to build | AB19 Innovations',
    description:
      'No forms into nowhere. Answer four short questions and an engineer reads it — usually back to you within one business day.',
    path: '/contact',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      url: `${site.url}/contact`,
      mainEntity: {
        '@type': 'Organization',
        name: site.name,
        email: site.email,
        url: site.url,
      },
    },
  })

  return (
    <>
      <PageHero
        eyebrow="CONTACT"
        title={
          <>
            What are you trying to solve<span className="text-accent">?</span>
          </>
        }
        intro="No forms into nowhere. Four short questions, read by an engineer rather than a sales queue — usually answered within one business day."
      />

      <section
        id="brief"
        aria-labelledby="brief-heading"
        className="veil shell border-t border-line py-16 sm:py-24"
      >
        <h2 id="brief-heading" className="sr-only">
          Start a project brief
        </h2>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <Brief />
          </Reveal>

          <Reveal delay={140} className="lg:col-span-5">
            <p className="label text-fg-faint">Or reach us directly</p>

            <ul className="mt-6 border-t border-line">
              <li className="border-b border-line">
                <a
                  href={`mailto:${site.email}`}
                  className="group/row flex items-center justify-between gap-6 py-5"
                >
                  <span>
                    <span className="block text-sm font-medium text-fg transition-colors duration-300 group-hover/row:text-accent">
                      Email
                    </span>
                    <span className="mt-1 block font-mono text-xs text-fg-muted">
                      {site.email}
                    </span>
                  </span>
                  <Arrow className="shrink-0 text-fg-faint transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/row:translate-x-1" />
                </a>
              </li>
              <li className="border-b border-line">
                <a
                  href={whatsappUrl('Hi AB19 Innovations — I have a project in mind.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/row flex items-center justify-between gap-6 py-5"
                >
                  <span>
                    <span className="flex items-center gap-2 text-sm font-medium text-fg transition-colors duration-300 group-hover/row:text-accent">
                      <WhatsAppIcon className="size-3.5" />
                      WhatsApp
                    </span>
                    <span className="mt-1 block font-mono text-xs text-fg-muted">
                      {site.phone}
                    </span>
                  </span>
                  <Arrow
                    direction="up-right"
                    className="shrink-0 text-fg-faint transition-all duration-300 ease-[var(--ease-out-expo)] group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5"
                  />
                </a>
              </li>
            </ul>

            <div className="mt-10 border-t border-line pt-6">
              <p className="label text-fg-faint">What happens next</p>
              <ol className="mt-5 space-y-4">
                {[
                  'An engineer reads the brief — not a form-fill notification.',
                  'We reply with what we think the real problem is, and what it would take.',
                  'If it is not a fit, we say so and point you somewhere better.',
                ].map((line, i) => (
                  <li key={line} className="flex gap-4 text-sm leading-relaxed text-fg-muted">
                    <span className="font-mono text-xs text-accent">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {line}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
