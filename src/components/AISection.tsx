import { aiPillars } from '../data/site'
import { Eyebrow } from './ui/Eyebrow'
import { Reveal } from './ui/Reveal'
import { ArrowLink } from './ui/ArrowLink'

export function AISection() {
  return (
    <section
      id="ai"
      aria-labelledby="ai-heading"
      className="veil-raised relative isolate overflow-hidden border-t border-line py-20 sm:py-28 lg:py-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] [background-size:120px_100%] [mask-image:linear-gradient(to_bottom,transparent,#000_35%,#000_65%,transparent)]"
      />

      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Eyebrow>AI ENGINEERING</Eyebrow>
            <h2
              id="ai-heading"
              className="text-balance-tight mt-8 max-w-[13ch] text-[length:var(--text-h2)] font-medium"
            >
              AI that does more than generate.
            </h2>
          </Reveal>

          <Reveal delay={120} className="flex items-end lg:col-span-5">
            <p className="max-w-[44ch] text-base leading-relaxed text-fg-muted sm:text-lg">
              We treat AI as an engineering discipline: evaluated, integrated with real systems and
              measured against the outcome it was built to move.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid border-t border-line sm:mt-20 lg:grid-cols-3">
          {aiPillars.map((pillar, i) => (
            <Reveal
              key={pillar.title}
              delay={i * 110}
              as="article"
              className="group/pillar border-b border-line pt-8 pb-10 transition-colors duration-500 hover:bg-ink/55 lg:border-b-0 lg:border-l lg:px-8 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
            >
              <div className="flex items-center gap-4 lg:px-0">
                <span className="label font-mono text-accent">{pillar.index}</span>
                <span
                  aria-hidden="true"
                  className="h-px flex-1 origin-left scale-x-100 bg-line transition-colors duration-500 group-hover/pillar:bg-accent/40"
                />
              </div>

              <h3 className="mt-8 text-2xl font-medium tracking-[-0.025em] sm:text-[1.75rem]">
                {pillar.title}
              </h3>
              <p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-fg-muted sm:text-base">
                {pillar.description}
              </p>

              <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
                {pillar.stack.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-fg-faint">
                    <span aria-hidden="true" className="block size-1 bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-12">
          <ArrowLink href="/work" tone="accent">
            See AI systems we have engineered
          </ArrowLink>
        </Reveal>
      </div>
    </section>
  )
}
