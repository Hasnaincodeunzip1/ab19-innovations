import { Link, Navigate, useParams } from 'react-router-dom'
import { caseStudiesForIndustry, industries, industryBySlug } from '../data/work'
import { CaseVisual } from '../components/CaseVisual'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { PageHero } from '../components/ui/PageHero'
import { Reveal } from '../components/ui/Reveal'
import { CtaBand } from '../components/ui/CtaBand'
import { Arrow } from '../components/ui/Arrow'
import { SectionHeader } from '../components/ui/SectionHeader'
import { useSeo } from '../hooks/useSeo'
import { useScenePlan } from '../hooks/useScenePlan'
import type { StageAnchor } from '../three/sceneStore'

const PLAN: StageAnchor[] = [
  { id: 'top', stage: 3.2 },
  { id: 'challenges', stage: 3.6 },
  { id: 'studies', stage: 4 },
  { id: 'cta', stage: 4.4 },
]

export default function IndustryPage() {
  const { industry: slug = '' } = useParams()
  const industry = industryBySlug.get(slug)
  const studies = caseStudiesForIndustry(slug)

  useScenePlan(PLAN)
  useSeo({
    title: industry
      ? `${industry.name} — engineering work and case studies | AB19 Innovations`
      : 'Work | AB19 Innovations',
    description: industry?.intro ?? '',
    path: `/work/${slug}`,
  })

  if (!industry) return <Navigate to="/work" replace />

  const others = industries.filter((item) => item.slug !== slug)

  return (
    <>
      <Breadcrumbs
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Work', to: '/work' },
          { label: industry.name },
        ]}
      />

      <PageHero
        eyebrow="DOMAIN PERSPECTIVE"
        title={
          <>
            {industry.headline.replace(/\.$/, '')}
            <span className="text-accent">.</span>
          </>
        }
        intro={industry.intro}
        aside={
          <ul className="w-full border-t border-line lg:border-t-0 lg:border-l lg:pl-6">
            {industry.context.map((item) => (
              <li
                key={item}
                className="flex gap-3 border-b border-line py-3 text-sm leading-relaxed text-fg-muted lg:border-b-0 lg:py-2"
              >
                <span aria-hidden="true" className="mt-2 block h-px w-4 shrink-0 bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        }
      />

      <section
        id="challenges"
        aria-labelledby="challenges-heading"
        className="veil shell border-t border-line py-16 sm:py-24"
      >
        <SectionHeader
          eyebrow="WHAT IS ACTUALLY HARD"
          headingId="challenges-heading"
          heading="The problems that decide the architecture."
          className="mb-12"
        />
        <ul className="grid border-t border-line lg:grid-cols-3">
          {industry.challenges.map((challenge, i) => (
            <Reveal
              key={challenge.title}
              as="li"
              delay={i * 90}
              className="border-b border-line py-8 lg:border-b-0 lg:border-l lg:px-8 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
            >
              <span className="label font-mono text-accent">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-6 text-lg font-medium tracking-[-0.02em] sm:text-xl">
                {challenge.title}
              </h3>
              <p className="mt-3 max-w-[38ch] text-sm leading-relaxed text-fg-muted">
                {challenge.body}
              </p>
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
            {studies.length > 0 ? 'Work in this domain' : 'No case study published yet'}
          </h2>
        </Reveal>

        {studies.length > 0 ? (
          <ul className="mt-10 grid gap-10 md:grid-cols-2">
            {studies.map((study, i) => (
              <Reveal key={study.slug} as="li" delay={i * 90}>
                <Link to={`/work/${study.industry}/${study.slug}`} className="group/card block">
                  <CaseVisual motif={study.motif} />
                  <span className="label mt-6 block font-mono text-accent">
                    Case study {study.index}
                  </span>
                  <span className="mt-4 flex items-center justify-between gap-4">
                    <span className="text-xl font-medium tracking-[-0.025em] transition-colors duration-300 group-hover/card:text-accent sm:text-2xl">
                      {study.title}
                    </span>
                    <Arrow className="shrink-0 text-fg-faint transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/card:translate-x-1" />
                  </span>
                  <span className="mt-3 block max-w-[46ch] text-sm leading-relaxed text-fg-muted">
                    {study.summary}
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        ) : (
          <Reveal delay={90}>
            <p className="mt-6 max-w-[56ch] text-base leading-relaxed text-fg-muted">
              We have engineering experience in this domain but no published case study yet. Ask
              us directly and we will talk through comparable work.
            </p>
          </Reveal>
        )}
      </section>

      <section
        aria-labelledby="others-heading"
        className="veil-soft shell border-t border-line py-14 sm:py-20"
      >
        <Reveal>
          <h2 id="others-heading" className="label text-fg-faint">
            Other domains we work in
          </h2>
        </Reveal>
        <ul className="mt-8 grid border-t border-line sm:grid-cols-3">
          {others.map((item, i) => (
            <Reveal
              key={item.slug}
              as="li"
              delay={i * 80}
              className="border-b border-line sm:border-r sm:last:border-r-0"
            >
              <Link
                to={`/work/${item.slug}`}
                className="group/other block py-6 transition-colors duration-300 sm:px-6 sm:first:pl-0"
              >
                <span className="flex items-center justify-between gap-4 text-base font-medium tracking-[-0.02em] transition-colors duration-300 group-hover/other:text-accent">
                  {item.name}
                  <Arrow className="size-3.5 shrink-0 text-fg-faint transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/other:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      <CtaBand secondary={{ label: 'All work', to: '/work' }} />
    </>
  )
}
