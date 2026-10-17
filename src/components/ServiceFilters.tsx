import { serviceCategories, type ServiceCategory } from '../data/services'
import { cn } from '../lib/cn'

export function ServiceFilters({
  active,
  onChange,
  counts,
}: {
  active: ServiceCategory
  onChange: (category: ServiceCategory) => void
  counts: Record<ServiceCategory, number>
}) {
  return (
    <div
      role="group"
      aria-label="Filter services by category"
      className="no-scrollbar -mx-[clamp(1.25rem,4.5vw,5rem)] flex snap-x gap-2 overflow-x-auto px-[clamp(1.25rem,4.5vw,5rem)] pb-1 md:mx-0 md:flex-wrap md:px-0"
    >
      {serviceCategories.map((category) => {
        const isActive = category === active
        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            aria-pressed={isActive}
            className={cn(
              'group/filter inline-flex shrink-0 snap-start items-center gap-2 border px-4 py-2.5 text-sm whitespace-nowrap',
              'transition-colors duration-300',
              isActive
                ? 'border-accent bg-accent text-ink'
                : 'border-line text-fg-muted hover:border-line-strong hover:text-fg',
            )}
          >
            {category}
            <span
              className={cn(
                'text-xs tabular-nums transition-colors duration-300',
                isActive ? 'text-ink/60' : 'text-fg-faint',
              )}
            >
              {counts[category]}
            </span>
          </button>
        )
      })}
    </div>
  )
}
