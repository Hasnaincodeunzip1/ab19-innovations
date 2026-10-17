import { metrics, principles, site, team } from '../data/site'
import { PageHero } from '../components/ui/PageHero'
import { SectionHeader } from '../components/ui/SectionHeader'
import { Reveal } from '../components/ui/Reveal'
import { CtaBand } from '../components/ui/CtaBand'
import { Portrait } from '../components/ui/Portrait'
import { useSeo } from '../hooks/useSeo'
import { useScenePlan } from '../hooks/useScenePlan'
import type { StageAnchor } from '../three/sceneStore'

const PLAN: StageAnchor[] = [
  { id: 'top', stage: 0.6 },
  { id: 'story', stage: 1.6 },
  { id: 'team', stage: 2.4 },
  { id: 'cta', stage: 3 },
]

export default function AboutPage() {
  useScenePlan(PLAN)
  useSeo({
    title: 'About — built by engineers who build | AB19 Innovations',
    description:
      'AB19 Innovations is an AI, software and data engineering company. Who we are, how we decide what to build, and the standard we hold ourselves to.',
    path: '/about',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      url: `${site.url}/about`,
      mainEntity: {
        '@type': 'Organization',
        name: site.name,
        url: site.url,
        legalName: site.legalName,
        founder: { '@type': 'Person', name: team[0].name, jobTitle: team[0].role },
        employee: team.map((m) => ({ '@type': 'Person', name: m.name, jobTitle: m.role })),
      },
    },
  })

  return (
    <>
      <PageHero
        eyebrow="ABOUT AB19"
        title={
          <>
            Built by engineers who build<span className="text-accent">.</span>
          </>
        }
        intro="We are a small engineering company working on AI, software and data systems. Small is a choice: it keeps the people who scoped the work on the work."
      />

      <section
        id="story"
        aria-labelledby="story-heading"
        className="veil shell border-t border-line py-16 sm:py-24"
      >
        <SectionHeader
          eyebrow="WHY WE EXIST"
          headingId="story-heading"
          heading="Most technology fails in the gap between demo and production."
          support="That gap is where we work: evaluation, integration, observability, the failure paths, and the handover that lets your team own what we built."
        />

        <Reveal delay={120} className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <p className="max-w-[58ch] text-base leading-relaxed text-fg-muted">
            AB19 Innovations grew out of production engineering work rather than out of a deck.
            The pattern we kept meeting was the same in every sector: a prototype that impressed
            everybody, followed by months of silence while the organisation tried to answer how it
            would be trusted, monitored, paid for and maintained.
          </p>
          <p className="max-w-[58ch] text-base leading-relaxed text-fg-muted">
            Those are engineering questions with established answers. Bringing them forward — into
            the first week rather than the last — is most of what we do. It is less exciting than
            the demo and it is the reason the system is still running a year later.
          </p>
        </Reveal>
      </section>

      <section
        aria-labelledby="numbers-heading"
        className="veil-raised shell border-t border-line py-16 sm:py-20"
      >
        <Reveal>
          <h2 id="numbers-heading" className="label text-fg-faint">
            Selected engineering experience
          </h2>
        </Reveal>

        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-x-10">
          {metrics.map((metric, i) => {
            const match = /^(.*?)([+%])?$/.exec(metric.value)
            return (
              <Reveal key={metric.label} delay={i * 80}>
                <dt className="sr-only">{metric.label}</dt>
                <dd>
                  <span className="block text-[clamp(2.25rem,5vw,3.75rem)] leading-[0.9] font-medium tracking-[-0.045em] tabular-nums">
                    {match?.[1]}
                    {match?.[2] && <span className="text-accent">{match[2]}</span>}
                  </span>
                  <span className="mt-4 block max-w-[22ch] text-sm leading-relaxed text-fg-muted">
                    {metric.label}
                  </span>
                </dd>
              </Reveal>
            )
          })}
        </dl>

        <Reveal delay={120} className="mt-12 border-t border-line pt-6">
          <p className="max-w-[68ch] text-xs leading-relaxed text-fg-faint">
            Figures reflect selected professional engineering work by the founding team prior to
            and alongside AB19 Innovations. They are not presented as company-wide results, and
            we will show you the working behind any of them.
          </p>
        </Reveal>
      </section>

      <section
        id="team"
        aria-labelledby="team-heading"
        className="veil shell border-t border-line py-16 sm:py-24"
      >
        <SectionHeader
          eyebrow="WHO YOU WORK WITH"
          headingId="team-heading"
          heading="The people who scope it are the people who build it."
          support="No account layer between you and the engineering. The trade-offs get explained by whoever is going to live with them."
          className="mb-14"
        />

        <ul className="grid gap-x-12 gap-y-16 lg:grid-cols-3 lg:gap-x-14">
          {team.map((member, i) => (
            <Reveal key={member.slug} as="li" delay={i * 120}>
              <Portrait member={member} className="max-w-[22rem]" />
              <h3 className="mt-7 text-[clamp(1.375rem,2.1vw,1.75rem)] font-medium tracking-[-0.03em]">
                {member.name}
              </h3>
              <p className="label mt-2 text-accent">{member.role}</p>
              <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-fg-muted">
                {member.bio}
              </p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="principles-heading"
        className="veil-soft shell border-t border-line py-16 sm:py-24"
      >
        <SectionHeader
          eyebrow="WHAT WE HOLD TO"
          headingId="principles-heading"
          heading="Four principles we engineer by."
          className="mb-12"
        />
        <ul className="grid border-t border-line md:grid-cols-2">
          {principles.map((principle, i) => (
            <Reveal
              key={principle.title}
              as="li"
              delay={i * 80}
              className="border-b border-line py-9 md:px-8 md:odd:pl-0 md:even:border-l md:even:pr-0"
            >
              <div className="flex items-baseline gap-5">
                <span className="font-mono text-sm text-fg-faint">{principle.index}</span>
                <h3 className="text-[clamp(1.25rem,2.2vw,1.75rem)] font-medium tracking-[-0.025em]">
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

      <CtaBand secondary={{ label: 'See the work', to: '/work' }} />
    </>
  )
}
