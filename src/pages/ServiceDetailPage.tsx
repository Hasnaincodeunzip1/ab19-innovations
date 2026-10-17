import { Link, Navigate, useParams } from 'react-router-dom'
import { serviceBySlug } from '../data/services'
import { site } from '../data/site'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { PageHero } from '../components/ui/PageHero'
import { MarkRow } from '../components/ui/MarkRow'
import { ComparisonList } from '../components/ui/ComparisonList'
import { OfferingsGrid } from '../components/ui/OfferingsGrid'
import { FaqAccordion } from '../components/ui/FaqAccordion'
import { CtaBand } from '../components/ui/CtaBand'
import { SectionHeader } from '../components/ui/SectionHeader'
import { Reveal } from '../components/ui/Reveal'
import { Arrow } from '../components/ui/Arrow'
import { useSeo } from '../hooks/useSeo'
import { useScenePlan } from '../hooks/useScenePlan'
import type { StageAnchor } from '../three/sceneStore'

const PLAN: StageAnchor[] = [
  { id: 'top', stage: 1 },
  { id: 'definition', stage: 1.6 },
  { id: 'offerings', stage: 2.2 },
  { id: 'faq', stage: 2.8 },
  { id: 'cta', stage: 3.2 },
]

export default function ServiceDetailPage() {
  const { slug = '' } = useParams()
  const service = serviceBySlug.get(slug)

  useScenePlan(PLAN)
  useSeo({
    title: service
      ? `${service.title} — ${service.headline} | AB19 Innovations`
      : 'Service | AB19 Innovations',
    description: service ? service.intro : '',
    path: `/services/${slug}`,
    jsonLd: service
      ? {
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Service',
              name: service.title,
              description: service.description,
              url: `${site.url}/services/${service.slug}`,
              provider: { '@type': 'Organization', name: site.name, url: site.url },
              areaServed: 'Worldwide',
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: `${service.title} offerings`,
                itemListElement: service.offerings.map((offering) => ({
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: offering.title,
                    description: offering.body,
                  },
                })),
              },
            },
            {
              '@type': 'FAQPage',
              mainEntity: service.faq.map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: { '@type': 'Answer', text: item.a },
              })),
            },
          ],
        }
      : undefined,
  })

  if (!service) return <Navigate to="/services" replace />

  const related = service.related
    .map((relatedSlug) => serviceBySlug.get(relatedSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))

  return (
    <>
      <Breadcrumbs
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Services', to: '/services' },
          { label: service.title },
        ]}
      />

      <PageHero
        eyebrow={service.eyebrow}
        title={
          <>
            {service.headline.replace(/\.$/, '')}
            <span className="text-accent">.</span>
          </>
        }
        intro={service.intro}
      >
        <MarkRow marks={service.marks} />
      </PageHero>

      <section
        id="definition"
        aria-labelledby="definition-heading"
        className="veil shell border-t border-line py-16 sm:py-24"
      >
        <SectionHeader
          eyebrow="THE SHORT VERSION"
          headingId="definition-heading"
          heading={service.definition.heading}
          support={service.definition.body[0]}
        />
        {service.definition.body.slice(1).length > 0 && (
          <div className="mt-10 grid gap-6 lg:grid-cols-12">
            {service.definition.body.slice(1).map((paragraph) => (
              <Reveal key={paragraph} delay={120} className="lg:col-span-5 lg:col-start-8">
                <p className="max-w-[46ch] text-base leading-relaxed text-fg-muted">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      <section
        aria-labelledby="comparison-heading"
        className="veil-raised shell border-t border-line py-16 sm:py-24"
      >
        <Reveal>
          <h2
            id="comparison-heading"
            className="text-balance-tight mb-12 max-w-[16ch] text-[clamp(1.75rem,3.4vw,2.75rem)] font-medium"
          >
            The difference is where the effort goes.
          </h2>
        </Reveal>
        <ComparisonList {...service.comparison} />
      </section>

      <section
        id="offerings"
        aria-labelledby="offerings-heading"
        className="veil-soft shell border-t border-line py-16 sm:py-24"
      >
        <SectionHeader
          eyebrow="WHAT IT INCLUDES"
          headingId="offerings-heading"
          heading="Scope, in plain terms."
          support="Every engagement is shaped to the problem, but this is the ground it typically covers."
          className="mb-12"
        />
        <OfferingsGrid offerings={service.offerings} />

        <Reveal delay={120} className="mt-14">
          <h3 className="label text-fg-faint">What you get</h3>
          <ul className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {service.deliverables.map((item) => (
              <li key={item} className="flex gap-4 text-sm leading-relaxed text-fg-muted">
                <span aria-hidden="true" className="mt-2 block h-px w-4 shrink-0 bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="veil shell border-t border-line py-16 sm:py-24"
      >
        <SectionHeader
          eyebrow="QUESTIONS"
          headingId="faq-heading"
          heading="The things people ask first."
          className="mb-12"
        />
        <FaqAccordion faq={service.faq} />
      </section>

      {related.length > 0 && (
        <section
          aria-labelledby="related-heading"
          className="veil-soft shell border-t border-line py-16 sm:py-20"
        >
          <Reveal>
            <h2 id="related-heading" className="label text-fg-faint">
              Often paired with
            </h2>
          </Reveal>
          <ul className="mt-8 grid border-t border-line md:grid-cols-3">
            {related.map((item, i) => (
              <Reveal
                key={item.slug}
                as="li"
                delay={i * 90}
                className="border-b border-line md:border-r md:last:border-r-0"
              >
                <Link
                  to={`/services/${item.slug}`}
                  className="group/rel block py-7 transition-colors duration-300 md:px-7 md:first:pl-0"
                >
                  <span className="label font-mono text-fg-faint">{item.index}</span>
                  <span className="mt-4 flex items-center justify-between gap-4">
                    <span className="text-lg font-medium tracking-[-0.02em] transition-colors duration-300 group-hover/rel:text-accent">
                      {item.title}
                    </span>
                    <Arrow className="shrink-0 text-fg-faint transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/rel:translate-x-1" />
                  </span>
                  <span className="mt-2 block max-w-[34ch] text-sm leading-relaxed text-fg-muted">
                    {item.description}
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </section>
      )}

      <CtaBand
        heading={`Need ${service.title.toLowerCase()}?`}
        body="Tell us the problem and the constraint. We will tell you what it takes — and whether this is even the right service for it."
        secondary={{ label: 'All services', to: '/services' }}
      />
    </>
  )
}
