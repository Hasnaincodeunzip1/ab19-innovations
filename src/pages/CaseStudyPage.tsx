import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { caseStudyBySlug, industryBySlug } from '../data/work'
import { site } from '../data/site'
import { CaseVisual } from '../components/CaseVisual'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { Reveal } from '../components/ui/Reveal'
import { Eyebrow } from '../components/ui/Eyebrow'
import { CtaBand } from '../components/ui/CtaBand'
import { Arrow } from '../components/ui/Arrow'
import { useSeo } from '../hooks/useSeo'
import { useScenePlan } from '../hooks/useScenePlan'
import { useLightSurface } from '../hooks/useLightSurface'
import type { StageAnchor } from '../three/sceneStore'
import { cn } from '../lib/cn'

const PLAN: StageAnchor[] = [
  { id: 'top', stage: 3.8 },
  { id: 'story', stage: 4 },
  { id: 'takeaways', stage: 4.2 },
  { id: 'cta', stage: 4.6 },
]

/** Highlights whichever story section is currently in view. */
function useActiveHeading(ids: string[]) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null)
    if (nodes.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: 0 },
    )

    for (const node of nodes) observer.observe(node)
    return () => observer.disconnect()
  }, [ids])

  return active
}

export default function CaseStudyPage() {
  const { industry: industrySlug = '', slug = '' } = useParams()
  const study = caseStudyBySlug.get(slug)
  const industry = industryBySlug.get(industrySlug)

  const sectionIds = study ? study.sections.map((section) => section.id) : []
  const active = useActiveHeading(sectionIds)
  const lightRef = useRef<HTMLElement>(null)
  useLightSurface(lightRef)

  useScenePlan(PLAN)
  useSeo({
    title: study ? `${study.title} — case study | AB19 Innovations` : 'Case study',
    description: study?.summary ?? '',
    path: `/work/${industrySlug}/${slug}`,
    type: 'article',
    jsonLd: study
      ? {
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Article',
              headline: study.title,
              description: study.summary,
              url: `${site.url}/work/${industrySlug}/${study.slug}`,
              author: { '@type': 'Organization', name: site.name },
              publisher: { '@type': 'Organization', name: site.name },
              about: study.capabilities,
            },
            {
              '@type': 'FAQPage',
              mainEntity: study.faq.map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: { '@type': 'Answer', text: item.a },
              })),
            },
          ],
        }
      : undefined,
  })

  if (!study || !industry) return <Navigate to="/work" replace />

  return (
    <>
      <Breadcrumbs
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Work', to: '/work' },
          { label: industry.name, to: `/work/${industry.slug}` },
          { label: study.title },
        ]}
      />

      <section id="top" className="relative isolate overflow-hidden pb-16 sm:pb-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-ink/45 sm:bg-ink/25" />
        </div>

        <div className="shell pt-10 sm:pt-14">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7">
              <Eyebrow>{`CASE STUDY ${study.index} · ${industry.name.toUpperCase()}`}</Eyebrow>
              <h1 className="text-balance-tight mt-7 max-w-[15ch] text-[clamp(2.25rem,5.2vw,4.5rem)] font-medium">
                {study.title}
              </h1>
              <p className="mt-7 max-w-[56ch] text-base leading-relaxed text-fg-muted sm:text-lg">
                {study.summary}
              </p>

              <dl className="mt-10 grid gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-3">
                {study.outcomes.map((outcome) => (
                  <div key={outcome.label}>
                    <dt className="text-[clamp(1.5rem,3vw,2.25rem)] leading-none font-medium tracking-[-0.04em]">
                      {outcome.value}
                    </dt>
                    <dd className="mt-3 max-w-[24ch] text-sm leading-relaxed text-fg-muted">
                      {outcome.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={140} className="lg:col-span-5">
              <CaseVisual motif={study.motif} />
              <dl className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-xs text-fg-faint">
                <dt className="label">Stack</dt>
                <dd className="font-mono">{study.stack.join(' · ')}</dd>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The one place the site goes light. A deliberate break for long reading. */}
      <section
        ref={lightRef}
        id="story"
        aria-labelledby="story-heading"
        className="relative z-10 rounded-t-[2rem] bg-[#f5f5f0] text-[#0a0a0a] sm:rounded-t-[3rem]"
      >
        <div className="shell py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-28">
                <p className="label text-[#6f6f6f]">In this story</p>
                <ol className="mt-5 space-y-px">
                  {study.sections.map((section, i) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className={cn(
                          'flex items-baseline gap-3 border-t border-[#d8d8d2] py-2.5 text-sm transition-colors duration-300',
                          active === section.id
                            ? 'text-[#0a0a0a]'
                            : 'text-[#6f6f6f] hover:text-[#0a0a0a]',
                        )}
                      >
                        <span className="font-mono text-xs">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ol>

                <p className="mt-8 border-t border-[#d8d8d2] pt-5 text-xs leading-relaxed text-[#6f6f6f]">
                  Client name withheld. Figures stated are ones we measured.
                </p>
              </div>
            </aside>

            <div className="lg:col-span-8 lg:col-start-5">
              <h2
                id="story-heading"
                className="text-balance-tight max-w-[18ch] text-[clamp(1.875rem,4vw,3.25rem)] font-medium"
              >
                {industry.name}
              </h2>

              <ul className="mt-7 flex flex-wrap gap-2">
                {study.capabilities.map((capability) => (
                  <li
                    key={capability}
                    className="border border-[#d8d8d2] px-3 py-1.5 text-xs text-[#4a4a44]"
                  >
                    {capability}
                  </li>
                ))}
              </ul>

              {study.sections.map((section, i) => (
                <section key={section.id} id={section.id} className="scroll-mt-28 pt-14">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-[#6f6f6f]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-[clamp(1.375rem,2.4vw,1.875rem)] font-medium tracking-[-0.025em]">
                      {section.heading}
                    </h3>
                  </div>
                  {section.body.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="mt-5 max-w-[68ch] text-base leading-relaxed text-[#3b3b36]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}

              <section id="takeaways" className="scroll-mt-28 pt-16">
                <h3 className="text-[clamp(1.375rem,2.4vw,1.875rem)] font-medium tracking-[-0.025em]">
                  What we would tell another team
                </h3>
                <ul className="mt-7 space-y-4">
                  {study.takeaways.map((takeaway) => (
                    <li
                      key={takeaway}
                      className="flex gap-4 text-base leading-relaxed text-[#3b3b36]"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-3 block h-px w-5 shrink-0 bg-[#0a0a0a]"
                      />
                      {takeaway}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="pt-16">
                <h3 className="text-[clamp(1.375rem,2.4vw,1.875rem)] font-medium tracking-[-0.025em]">
                  Questions
                </h3>
                <div className="mt-7 border-t border-[#d8d8d2]">
                  {study.faq.map((item) => (
                    <details key={item.q} className="group/faq border-b border-[#d8d8d2]">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-base font-medium [&::-webkit-details-marker]:hidden">
                        {item.q}
                        <span
                          aria-hidden="true"
                          className="relative block size-3 shrink-0 text-[#6f6f6f]"
                        >
                          <span className="absolute top-1/2 left-0 block h-px w-full -translate-y-1/2 bg-current" />
                          <span className="absolute top-0 left-1/2 block h-full w-px -translate-x-1/2 bg-current transition-transform duration-400 group-open/faq:scale-y-0" />
                        </span>
                      </summary>
                      <p className="max-w-[66ch] pb-6 text-sm leading-relaxed text-[#3b3b36]">
                        {item.a}
                      </p>
                    </details>
                  ))}
                </div>
              </section>

              <Link
                to={`/work/${industry.slug}`}
                className="group/back mt-14 inline-flex items-center gap-2.5 text-sm font-medium text-[#0a0a0a]"
              >
                <span className="border-b border-[#d8d8d2] pb-0.5 transition-colors duration-300 group-hover/back:border-[#0a0a0a]">
                  More {industry.name.toLowerCase()} work
                </span>
                <Arrow className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/back:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        heading="Building something like this?"
        body="The architecture above is not a template, but the trade-offs recur. Tell us the shape of your problem."
        secondary={{ label: 'More work', to: '/work' }}
      />
    </>
  )
}
