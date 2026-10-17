import { Link } from 'react-router-dom'
import type { Service } from '../data/services'
import { Arrow } from './ui/Arrow'

/**
 * Hairline matrix of compact service cards. The 1px gap over a line-coloured
 * background keeps the grid rules perfect at any column count.
 */
export function ServiceGrid({ services, resetKey }: { services: Service[]; resetKey: string }) {
  return (
    <ul key={resetKey} className="grid sm:grid-cols-2 xl:grid-cols-3">
      {services.map((service, i) => (
        <li
          key={service.title}
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
  )
}
