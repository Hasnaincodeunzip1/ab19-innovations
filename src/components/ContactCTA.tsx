import { site } from '../data/site'
import { Button } from './ui/Button'
import { Reveal } from './ui/Reveal'

export function ContactCTA() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative isolate overflow-hidden border-t border-line py-24 sm:py-32 lg:py-40"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] [background-size:88px_88px] [mask-image:radial-gradient(90%_100%_at_50%_50%,#000,transparent_72%)]" />
        <div className="absolute -bottom-56 left-1/2 size-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(183,243,74,0.07),transparent_65%)]" />
        {/* On phones the converged form sits behind the copy, so dim it. */}
        <div className="absolute inset-0 bg-ink/50 sm:hidden" />
      </div>

      <div className="shell">
        <Reveal>
          <h2
            id="contact-heading"
            className="text-balance-tight max-w-[15ch] text-[clamp(2.5rem,6.5vw,6rem)] font-medium"
          >
            Have a problem worth solving<span className="text-accent">?</span>
          </h2>
        </Reveal>

        <Reveal delay={120} className="mt-8 max-w-[52ch]">
          <p className="text-base leading-relaxed text-fg-muted sm:text-lg">
            Tell us what you&rsquo;re trying to build, automate or improve.
          </p>
        </Reveal>

        <Reveal delay={200} className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <Button href={`mailto:${site.email}`}>Let&rsquo;s talk</Button>
          <Button href="/services" variant="ghost">
            Explore services
          </Button>
        </Reveal>

        <Reveal delay={260} className="mt-14 border-t border-line pt-6">
          <a
            href={`mailto:${site.email}`}
            className="font-mono text-sm text-fg-muted transition-colors duration-300 hover:text-accent"
          >
            {site.email}
          </a>
        </Reveal>
      </div>
    </section>
  )
}
