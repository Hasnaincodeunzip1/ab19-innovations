import { technologies } from '../data/site'
import { Reveal } from './ui/Reveal'

function TechList({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {technologies.map((tech) => (
        <li
          key={tech}
          className="flex items-center gap-8 px-8 text-[clamp(1.125rem,2.2vw,1.75rem)] font-medium tracking-[-0.02em] whitespace-nowrap text-fg-muted transition-colors duration-300 hover:text-fg sm:gap-12 sm:px-12"
        >
          {tech}
          <span aria-hidden="true" className="block size-1 bg-line-strong" />
        </li>
      ))}
    </ul>
  )
}

/** One continuous lane. The list is rendered twice so a -50% shift loops seamlessly. */
function Row({ reverse = false }: { reverse?: boolean }) {
  return (
    <div
      aria-hidden={reverse || undefined}
      className="group/marquee relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
      style={{ '--marquee-duration': reverse ? '78s' : '62s' } as React.CSSProperties}
    >
      <div
        className="marquee-track flex w-max"
        style={reverse ? { animationDirection: 'reverse' } : undefined}
      >
        <TechList hidden={reverse} />
        <TechList hidden />
      </div>
    </div>
  )
}

export function TechnologyMarquee() {
  return (
    <section
      id="technology"
      aria-labelledby="technology-heading"
      className="overflow-hidden border-t border-line py-20 sm:py-24 lg:py-28"
    >
      <div className="shell">
        <Reveal>
          <h2
            id="technology-heading"
            className="text-balance-tight max-w-[18ch] text-[clamp(1.75rem,3.2vw,2.75rem)] font-medium"
          >
            Built with the technology modern products demand.
          </h2>
        </Reveal>
      </div>

      <Reveal delay={100} className="mt-12 space-y-5 sm:mt-16 sm:space-y-6">
        <Row />
        <Row reverse />
      </Reveal>
    </section>
  )
}
