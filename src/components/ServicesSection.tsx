import { useMemo, useState } from 'react'
import { serviceCategories, services, type ServiceCategory } from '../data/services'
import { ServiceFilters } from './ServiceFilters'
import { ServiceGrid } from './ServiceGrid'
import { SectionHeader } from './ui/SectionHeader'
import { Reveal } from './ui/Reveal'

export function ServicesSection() {
  const [active, setActive] = useState<ServiceCategory>('All')

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
    () => (active === 'All' ? services : services.filter((service) => service.category === active)),
    [active],
  )

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="veil shell border-t border-line py-20 sm:py-28 lg:py-36"
    >
      <SectionHeader
        eyebrow="SERVICES"
        headingId="services-heading"
        heading="From idea to intelligent product."
        support="From modern web platforms to production AI systems, we design and engineer technology around the outcomes that matter."
      />

      <Reveal delay={80} className="mt-14 sm:mt-16">
        <ServiceFilters active={active} onChange={setActive} counts={counts} />
      </Reveal>

      <Reveal delay={140} className="mt-8">
        <ServiceGrid services={visible} resetKey={active} />
        <p aria-live="polite" className="sr-only">
          {visible.length} services shown for {active}.
        </p>
      </Reveal>
    </section>
  )
}
