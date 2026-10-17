import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { serviceCategories, services, type ServiceCategory } from '../data/services'
import { site } from '../data/site'
import { ServiceFilters } from '../components/ServiceFilters'
import { PageHero } from '../components/ui/PageHero'
import { Reveal } from '../components/ui/Reveal'
import { CtaBand } from '../components/ui/CtaBand'
import { Arrow } from '../components/ui/Arrow'
import { useSeo } from '../hooks/useSeo'
import { useScenePlan } from '../hooks/useScenePlan'
import type { StageAnchor } from '../three/sceneStore'

const PLAN: StageAnchor[] = [
  { id: 'top', stage: 0.4 },
  { id: 'catalogue', stage: 1 },
  { id: 'cta', stage: 1.8 },
]

export default function ServicesPage() {
  const [active, setActive] = useState<ServiceCategory>('All')
  useScenePlan(PLAN)
  useSeo({
    title: 'Services — AI, software, data and automation engineering | AB19 Innovations',
    description:
      'Ten engineering services across software, AI and machine learning, data and cloud, automation and growth. From modern web platforms to production AI systems.',
    path: '/services',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'AB19 Innovations services',
      itemListElement: services.map((service, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: service.title,
        description: service.description,
        url: `${site.url}/services/${service.slug}`,
      })),
    },
  })

  const counts = useMemo(() => {
    const entries = serviceCategories.map((category) => [
      category,
      category === 'All'
        ? services.length
        : services.filter((service) => service.category === category).length,
    ])
    return Object.fromEntries(entries) as Record<ServiceCategory, number>
  }, [])

  const visible = useMemo(
    () => (active === 'All' ? services : services.filter((s) => s.category === active)),
    [active],
  )

  return (
    <>
      <PageHero
        eyebrow="SERVICES"
        title={
          <>
            Ten services. One engineering standard<span className="text-accent">.</span>
          </>
        }
        intro="Every engagement starts from the outcome, not the service line. What we build is whatever that outcome actually requires — and it is engineered the same way regardless of which column it sits in."
      />

      <section
        id="catalogue"
        aria-labelledby="catalogue-heading"
        className="veil shell border-t border-line py-16 sm:py-20 lg:py-24"
      >
        <h2 id="catalogue-heading" className="sr-only">
          All services
        </h2>

        <Reveal>
          <ServiceFilters active={active} onChange={setActive} counts={counts} />
        </Reveal>

        <Reveal delay={120} className="mt-10">
          <ul key={active} className="grid sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((service, i) => (
              <li
                key={service.slug}
                className="card-in outline-1 outline-line"
                style={{ '--card-delay': `${Math.min(i, 8) * 45}ms` } as React.CSSProperties}
              >
                <Link
                  to={`/services/${service.slug}`}
                  className="group/card flex h-full flex-col justify-between gap-8 bg-ink/72 p-7 transition-colors duration-500 hover:bg-ink-raised/90 sm:gap-10 sm:p-8"
                >
                  <div>
                    <div className="flex items-start justify-between gap-6">
                      <span className="label font-mono text-fg-faint transition-colors duration-300 group-hover/card:text-accent">
                        {service.index}
                      </span>
                      <span
                        aria-hidden="true"
                        className="block size-1.5 bg-line-strong transition-colors duration-300 group-hover/card:bg-accent"
                      />
                    </div>
                    <h3 className="mt-8 text-lg font-medium tracking-[-0.02em] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/card:-translate-y-0.5 sm:text-xl">
                      {service.title}
                    </h3>
                    <p className="mt-3 max-w-[38ch] text-sm leading-relaxed text-fg-muted">
                      {service.description}
                    </p>
                  </div>
                  <span className="flex items-center gap-2.5 text-xs text-fg-faint transition-colors duration-300 group-hover/card:text-fg">
                    <span className="label">{service.category}</span>
                    <Arrow className="ml-auto size-4 transition-transform duration-400 ease-[var(--ease-out-expo)] group-hover/card:translate-x-1 group-hover/card:text-accent" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p aria-live="polite" className="sr-only">
            {visible.length} services shown for {active}.
          </p>
        </Reveal>
      </section>

      <CtaBand
        heading="Not sure which one you need?"
        body="Describe the problem rather than the service. We will tell you what it actually needs — including when the answer is less than you expected."
        secondary={{ label: 'See how we work', to: '/method' }}
      />
    </>
  )
}
