import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { method, site } from '../data/site'
import { PageHero } from '../components/ui/PageHero'
import { CtaBand } from '../components/ui/CtaBand'
import { Reveal } from '../components/ui/Reveal'
import { useSeo } from '../hooks/useSeo'
import { useScenePlan } from '../hooks/useScenePlan'
import type { StageAnchor } from '../three/sceneStore'
import { cn } from '../lib/cn'

const PLAN: StageAnchor[] = [
  { id: 'top', stage: 0.5 },
  { id: 'phase-01', stage: 1 },
  { id: 'phase-03', stage: 2.5 },
  { id: 'phase-05', stage: 4 },
  { id: 'cta', stage: 5 },
]

const detail: Record<string, { promise: string; body: string }> = {
  Discover: {
    promise: 'A shared, honest picture of the current state.',
    body: 'We map the operation as it actually runs — the workflows, the workarounds, the spreadsheet nobody admits to. Not the org chart, not the process document. Fixing the wrong problem quickly is still fixing the wrong problem.',
  },
  Design: {
    promise: 'A concrete plan, scoped and estimated, with success metrics.',
    body: 'Architecture, interface and technical direction decided together, because they constrain each other. We write down what success looks like in measurable terms before anyone opens an editor.',
  },
  Build: {
    promise: 'Working software, reviewed and tested, in small increments.',
    body: 'Engineering in slices that each reach a deployable state. You see progress in a running system rather than in a status report, and the estimate improves with every slice.',
  },
  Deploy: {
    promise: 'Production, with monitoring and a rehearsed rollback.',
    body: 'Launch is a process, not an event: staged rollout, observability wired in before traffic arrives, and a restore procedure someone has actually run.',
  },
  Evolve: {
    promise: 'A system that keeps earning its place.',
    body: 'Measure against the metrics agreed in design, then improve what the data points at. Documentation and handover mean this can be us, your team, or both.',
  },
}

function StepTracker({ activeIndex }: { activeIndex: number }) {
  return (
    <ol className="flex items-center gap-2 sm:gap-3" aria-hidden="true">
      {method.map((stage, i) => (
        <li key={stage.title} className="flex items-center gap-2 sm:gap-3">
          <span
            className={cn(
              'font-mono text-[0.625rem] tracking-[0.18em] transition-colors duration-500',
              i === activeIndex ? 'text-accent' : i < activeIndex ? 'text-fg-muted' : 'text-fg-faint',
            )}
          >
            {stage.index}
          </span>
          {i < method.length - 1 && (
            <span
              className={cn(
                'block h-px w-6 transition-colors duration-500 sm:w-10',
                i < activeIndex ? 'bg-accent' : 'bg-line',
              )}
            />
          )}
        </li>
      ))}
    </ol>
  )
}

/**
 * One phase = one tall section with a pinned panel inside it. Scrolling the
 * section drives the word across the viewport, so the page reads as a sequence
 * of stations rather than a list.
 */
function Phase({ index }: { index: number }) {
  const stage = method[index]
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const x = useTransform(scrollYProgress, [0, 1], ['12%', '-42%'])
  const numeralX = useTransform(scrollYProgress, [0, 1], ['4%', '-18%'])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.18, 0.75, 1], [0, 1, 1, 0.25])
  // Without this, the tail of one pinned panel shows through the next.
  const panelOpacity = useTransform(scrollYProgress, [0, 0.05, 0.9, 1], [0, 1, 1, 0])

  const info = detail[stage.title]

  return (
    <section
      ref={ref}
      id={`phase-${stage.index}`}
      aria-labelledby={`phase-${stage.index}-heading`}
      className="relative h-[220vh] border-t border-line"
    >
      <motion.div
        style={{ opacity: panelOpacity }}
        className="sticky top-0 flex h-dvh flex-col justify-center overflow-hidden"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-ink/45" />
        <motion.span
          aria-hidden="true"
          style={{ x: numeralX }}
          className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 font-mono text-[34vw] leading-none font-medium tracking-[-0.06em] text-[#141414] select-none"
        >
          {stage.index}
        </motion.span>

        <div className="relative w-full">
          <motion.h2
            id={`phase-${stage.index}-heading`}
            style={{ x }}
            className="w-max text-[clamp(4rem,16vw,15rem)] leading-[0.85] font-medium tracking-[-0.055em] whitespace-nowrap"
          >
            {stage.title}
            <span className="text-accent">.</span>
          </motion.h2>

          <motion.div style={{ opacity: copyOpacity }} className="shell mt-10 sm:mt-14">
            <p className="label text-accent">{`Phase ${stage.index} of 05`}</p>
            <p className="mt-6 max-w-[58ch] text-base leading-relaxed text-fg-muted sm:text-lg">
              {info.body}
            </p>
            <p className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm">
              <span className="label text-fg-faint">You get</span>
              <span className="text-fg">{info.promise}</span>
            </p>
          </motion.div>
        </div>

        <div className="shell absolute inset-x-0 bottom-10">
          <StepTracker activeIndex={index} />
        </div>
      </motion.div>
    </section>
  )
}

export default function MethodPage() {
  useScenePlan(PLAN)
  useSeo({
    title: 'Method — From problem to production | AB19 Innovations',
    description:
      'Five phases run on every engagement: Discover, Design, Build, Deploy, Evolve. One operating model whether we are shipping an interface or an inference pipeline.',
    path: '/method',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'How AB19 Innovations runs an engagement',
      description:
        'The five-phase operating model used on every AB19 Innovations engagement.',
      url: `${site.url}/method`,
      step: method.map((stage, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: stage.title,
        text: detail[stage.title].body,
      })),
    },
  })

  return (
    <>
      <PageHero
        eyebrow="HOW WE WORK"
        title={
          <>
            From problem to production<span className="text-accent">.</span>
          </>
        }
        intro="One operating model across every engagement. The same five phases whether the deliverable is an interface, an inference pipeline or the connective tissue between two systems that were never meant to meet."
        aside={
          <ul className="w-full border-t border-line lg:border-t-0 lg:border-l lg:pl-6">
            {method.map((stage) => (
              <li
                key={stage.title}
                className="flex items-baseline gap-4 border-b border-line py-3 text-sm lg:border-b-0 lg:py-1.5"
              >
                <span className="font-mono text-xs text-accent">{stage.index}</span>
                <span className="text-fg-muted">{stage.title}</span>
              </li>
            ))}
          </ul>
        }
      />

      {method.map((_, index) => (
        <Phase key={index} index={index} />
      ))}

      <section className="veil-soft shell border-t border-line py-16 sm:py-24">
        <Reveal>
          <h2 className="text-balance-tight max-w-[20ch] text-[clamp(1.75rem,3.4vw,2.75rem)] font-medium">
            The phases are fixed. The weight given to each one is not.
          </h2>
          <p className="mt-6 max-w-[62ch] text-base leading-relaxed text-fg-muted">
            A greenfield product spends most of its time in Design and Build. A struggling
            platform spends most of it in Discover, because the stated problem is rarely the real
            one. We size the phases to the engagement and say so up front.
          </p>
        </Reveal>
      </section>

      <CtaBand
        heading="Start with Discover."
        body="The first phase is short, scoped and produces something useful on its own: an honest map of where you are and what it would take to move."
        secondary={{ label: 'See the work', to: '/work' }}
      />
    </>
  )
}
