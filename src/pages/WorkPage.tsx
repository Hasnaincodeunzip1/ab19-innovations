import { Link } from 'react-router-dom'
import { caseStudies, industries } from '../data/work'
import { site } from '../data/site'
import { CaseVisual } from '../components/CaseVisual'
import { PageHero } from '../components/ui/PageHero'
import { Reveal } from '../components/ui/Reveal'
import { CtaBand } from '../components/ui/CtaBand'
import { Arrow } from '../components/ui/Arrow'
import { useSeo } from '../hooks/useSeo'
import { useScenePlan } from '../hooks/useScenePlan'
import type { StageAnchor } from '../three/sceneStore'

const PLAN: StageAnchor[] = [
  { id: 'top', stage: 3 },
  { id: 'domains', stage: 3.6 },
  { id: 'studies', stage: 4 },
  { id: 'cta', stage: 4.5 },
]

export default function WorkPage() {
  useScenePlan(PLAN)
  useSeo({
    title: 'Work — Systems built for real-world scale | AB19 Innovations',
    description:
      'Selected engineering experience across healthcare and claims, media and video, commerce personalisation and enterprise platforms. Anonymous by design, specific about the engineering.',
    path: '/work',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Selected engineering work',
      itemListElement: caseStudies.map((study, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: study.title,
        description: study.summary,
        url: `${site.url}/work/${study.industry}/${study.slug}`,
      })),
    },
  })

  return (
    <>
      <PageHero
        eyebrow="SELECTED WORK"
        title={
          <>
            Systems built for real-world scale<span className="text-accent">.</span>
          </>
        }
        intro="Selected engineering experience from the founding team. Client names and commercial figures are intentionally withheld — what is here is the architecture, the trade-offs and what we would do again."
      />

      <section
        id="domains"
        aria-labelledby="domains-heading"
        className="veil-soft shell border-t border-line py-16 sm:py-20"
      >
        <Reveal>
          <h2 id="domains-heading" className="label text-fg-faint">
            Pick a domain
          </h2>
        </Reveal>

        <ul className="mt-8 grid border-t border-line sm:grid-cols-2">
          {industries.map((industry, i) => (
            <Reveal
              key={industry.slug}
              as="li"
              delay={i * 80}
              className="border-b border-line sm:[&:nth-child(2n)]:border-l sm:[&:nth-child(2n)]:border-line"
            >
              <Link
                to={`/work/${industry.slug}`}
                className="group/dom block py-8 transition-colors duration-300 sm:px-8 sm:[&:nth-child(2n+1)]:pl-0"
              >
                <span className="flex items-center justify-between gap-6">
                  <span className="text-xl font-medium tracking-[-0.02em] transition-colors duration-300 group-hover/dom:text-accent sm:text-2xl">
                    {industry.name}
                  </span>
                  <Arrow
                    direction="up-right"
                    className="shrink-0 text-fg-faint transition-all duration-400 ease-[var(--ease-out-expo)] group-hover/dom:translate-x-0.5 group-hover/dom:-translate-y-0.5 group-hover/dom:text-accent"
                  />
                </span>
                <span className="mt-3 block max-w-[48ch] text-sm leading-relaxed text-fg-muted">
                  {industry.intro}
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      <section
        id="studies"
        aria-labelledby="studies-heading"
        className="veil-soft shell border-t border-line py-16 sm:py-24"
      >
        <Reveal>
          <h2 id="studies-heading" className="label text-fg-faint">
            Case studies
          </h2>
        </Reveal>

        <div className="mt-10 border-t border-line">
          {caseStudies.map((study, i) => (
            <Reveal
              key={study.slug}
              as="article"
              className="group/case border-b border-line py-12 sm:py-16"
            >
              <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
                <div className={i % 2 === 1 ? 'lg:order-2 lg:col-span-6' : 'lg:col-span-6'}>
                  <div className="flex items-center gap-4">
                    <span className="label font-mono text-accent">Case study {study.index}</span>
                    <span aria-hidden="true" className="h-px flex-1 bg-line" />
                  </div>

                  <h3 className="text-balance-tight mt-7 max-w-[16ch] text-[clamp(1.75rem,3.4vw,3rem)] font-medium">
                    <Link
                      to={`/work/${study.industry}/${study.slug}`}
                      className="transition-colors duration-300 hover:text-accent"
                    >
                      {study.title}
                    </Link>
                  </h3>

                  <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-fg-muted sm:text-lg">
                    {study.summary}
                  </p>

                  <ul className="mt-8 flex flex-wrap gap-2">
                    {study.capabilities.map((capability) => (
                      <li
                        key={capability}
                        className="border border-line px-3 py-1.5 text-xs text-fg-muted"
                      >
                        {capability}
                      </li>
                    ))}
                  </ul>

                  <dl className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-xs text-fg-faint">
                    <dt className="label">Stack</dt>
                    <dd className="font-mono">{study.stack.join(' · ')}</dd>
                  </dl>

                  <Link
                    to={`/work/${study.industry}/${study.slug}`}
                    className="group/link mt-8 inline-flex items-center gap-2.5 text-sm font-medium text-fg transition-colors duration-300 hover:text-accent"
                  >
                    <span className="border-b border-transparent pb-0.5 transition-colors duration-300 group-hover/link:border-current">
                      Read the story
                    </span>
                    <Arrow className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/link:translate-x-1" />
                  </Link>
                </div>

                {/* Decorative: the title and "Read the story" already link. */}
                <div className={i % 2 === 1 ? 'lg:order-1 lg:col-span-6' : 'lg:col-span-6'}>
                  <CaseVisual motif={study.motif} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand secondary={{ label: 'How we work', to: '/method' }} />
    </>
  )
}
