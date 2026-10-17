import { Link } from 'react-router-dom'
import { site } from '../../data/site'

export type Crumb = { label: string; to?: string }

/** Visible trail plus the matching BreadcrumbList structured data. */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.label,
      ...(crumb.to ? { item: `${site.url}${crumb.to}` } : {}),
    })),
  }

  return (
    <nav aria-label="Breadcrumb" className="shell pt-24 sm:pt-28">
      <ol className="label flex flex-wrap items-center gap-x-2.5 gap-y-1 text-fg-faint">
        {crumbs.map((crumb, i) => (
          <li key={crumb.label} className="flex items-center gap-2.5">
            {i > 0 && (
              <span aria-hidden="true" className="text-line-strong">
                /
              </span>
            )}
            {crumb.to ? (
              <Link to={crumb.to} className="transition-colors duration-300 hover:text-fg">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-fg-muted">{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </nav>
  )
}
