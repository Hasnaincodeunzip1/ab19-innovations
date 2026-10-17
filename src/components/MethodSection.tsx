import { method } from '../data/site'
import { SectionHeader } from './ui/SectionHeader'
import { Reveal } from './ui/Reveal'

export function MethodSection() {
  return (
    <section
      id="method"
      aria-labelledby="method-heading"
      className="veil-soft shell border-t border-line py-20 sm:py-28 lg:py-36"
    >
      <SectionHeader
        eyebrow="HOW WE WORK"
        headingId="method-heading"
        heading="From problem to production."
        support="One operating model across every engagement — the same discipline whether we are shipping an interface or an inference pipeline."
      />

      <ol className="mt-16 grid border-t border-line sm:mt-20 lg:grid-cols-5">
        {method.map((stage, i) => (
          <Reveal
            key={stage.title}
            as="li"
            delay={i * 90}
            className="group/stage relative border-b border-line pt-8 pb-10 transition-colors duration-500 hover:bg-ink-raised/70 lg:border-b-0 lg:border-l lg:px-6 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
          >
            <div className="flex items-center gap-4">
              <span className="font-mono text-[clamp(2.5rem,4.5vw,3.5rem)] leading-none font-medium tracking-[-0.05em] text-fg-faint transition-colors duration-500 group-hover/stage:text-accent">
                {stage.index}
              </span>
              <span
                aria-hidden="true"
                className="h-px flex-1 bg-line transition-colors duration-500 group-hover/stage:bg-line-strong"
              />
              <span
                aria-hidden="true"
                className="size-1.5 shrink-0 bg-line-strong transition-colors duration-500 group-hover/stage:bg-accent"
              />
            </div>

            <h3 className="mt-7 text-xl font-medium tracking-[-0.02em]">{stage.title}</h3>
            <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-fg-muted">
              {stage.description}
            </p>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
