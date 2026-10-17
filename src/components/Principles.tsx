import { principles } from '../data/site'
import { SectionHeader } from './ui/SectionHeader'
import { Reveal } from './ui/Reveal'

export function Principles() {
  return (
    <section
      aria-labelledby="principles-heading"
      className="veil-soft shell border-t border-line py-20 sm:py-28 lg:py-36"
    >
      <SectionHeader
        eyebrow="WHY AB19"
        headingId="principles-heading"
        heading="Four principles we engineer by."
        support="They decide what we build, what we refuse to bolt on, and how long it keeps working after launch."
      />

      <ul className="mt-16 grid border-t border-line sm:mt-20 md:grid-cols-2">
        {principles.map((principle, i) => (
          <Reveal
            key={principle.title}
            as="li"
            delay={i * 90}
            className="group/principle border-b border-line py-10 transition-colors duration-500 hover:bg-ink-raised/70 md:px-8 md:odd:pl-0 md:even:border-l md:even:pr-0"
          >
            <div className="flex items-baseline gap-5">
              <span className="font-mono text-sm text-fg-faint transition-colors duration-500 group-hover/principle:text-accent">
                {principle.index}
              </span>
              <h3 className="text-[clamp(1.375rem,2.4vw,1.875rem)] font-medium tracking-[-0.025em]">
                {principle.title}
              </h3>
            </div>
            <p className="mt-4 max-w-[46ch] pl-10 text-base leading-relaxed text-fg-muted">
              {principle.description}
            </p>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
