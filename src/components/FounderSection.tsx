import { team } from '../data/site'
import { Portrait } from './ui/Portrait'
import { Eyebrow } from './ui/Eyebrow'
import { Reveal } from './ui/Reveal'
import { ArrowLink } from './ui/ArrowLink'

export function FounderSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="veil shell border-t border-line py-20 sm:py-28 lg:py-36"
    >
      <Reveal>
        <Eyebrow>ABOUT AB19</Eyebrow>
        <h2
          id="about-heading"
          className="text-balance-tight mt-8 max-w-[14ch] text-[length:var(--text-h2)] font-medium"
        >
          Built by engineers who build.
        </h2>
      </Reveal>

      <ul className="mt-14 grid gap-10 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
        {team.map((member, i) => (
          <Reveal key={member.slug} as="li" delay={80 + i * 80}>
            <Portrait member={member} />
            <h3 className="mt-6 text-[clamp(1.25rem,1.9vw,1.6rem)] font-medium tracking-[-0.03em]">
              {member.name}
            </h3>
            <p className="label mt-2 text-accent">{member.role}</p>
          </Reveal>
        ))}
      </ul>

      <div className="mt-12">
        <ArrowLink href="/about">More about the team</ArrowLink>
      </div>
    </section>
  )
}
