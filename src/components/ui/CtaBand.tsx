import { Link } from 'react-router-dom'
import { Button } from './Button'
import { Reveal } from './Reveal'
import { Arrow } from './Arrow'
import { site } from '../../data/site'

/** Closing call to action, shared by every interior page. */
export function CtaBand({
  heading = 'Have a problem worth solving?',
  body = 'Tell us what you’re trying to build, automate or improve.',
  secondary = { label: 'Explore services', to: '/services' },
}: {
  heading?: string
  body?: string
  secondary?: { label: string; to: string }
}) {
  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      className="relative isolate overflow-hidden border-t border-line py-20 sm:py-28 lg:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -bottom-56 left-1/2 size-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(183,243,74,0.06),transparent_65%)]" />
        <div className="absolute inset-0 bg-ink/50 sm:hidden" />
      </div>

      <div className="shell">
        <Reveal>
          <h2
            id="cta-heading"
            className="text-balance-tight max-w-[16ch] text-[clamp(2.25rem,5vw,4.5rem)] font-medium"
          >
            {heading}
          </h2>
        </Reveal>

        <Reveal delay={110} className="mt-7 max-w-[52ch]">
          <p className="text-base leading-relaxed text-fg-muted sm:text-lg">{body}</p>
        </Reveal>

        <Reveal
          delay={180}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
        >
          <Button href="/contact">Let&rsquo;s talk</Button>
          <Link
            to={secondary.to}
            className="group/btn inline-flex items-center justify-center gap-3 border border-line px-7 py-4 text-sm font-medium text-fg transition-all duration-300 ease-[var(--ease-out-expo)] hover:border-line-strong hover:bg-ink-raised"
          >
            {secondary.label}
            <Arrow className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/btn:translate-x-1" />
          </Link>
        </Reveal>

        <Reveal delay={240} className="mt-12 border-t border-line pt-6">
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
