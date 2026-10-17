import { Eyebrow } from './ui/Eyebrow'
import { Reveal } from './ui/Reveal'
import { ArrowLink } from './ui/ArrowLink'

export function IntroSection() {
  return (
    <section
      aria-labelledby="intro-heading"
      className="veil-soft shell border-t border-line py-20 sm:py-28 lg:py-36"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-7">
          <Eyebrow>WHAT WE DO</Eyebrow>
          <h2
            id="intro-heading"
            className="text-balance-tight mt-8 max-w-[14ch] text-[length:var(--text-h2)] font-medium"
          >
            Technology built around the problem.
          </h2>
        </Reveal>

        <Reveal delay={140} className="flex flex-col justify-end lg:col-span-5">
          <p className="max-w-[48ch] text-base leading-relaxed text-fg-muted sm:text-lg">
            AB19 Innovations combines software engineering, artificial intelligence, machine
            learning and data engineering to build technology around real business problems.
          </p>
          <div className="mt-8 border-t border-line pt-6">
            <ArrowLink href="/method">See how we work</ArrowLink>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
