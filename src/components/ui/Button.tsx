import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Arrow } from './Arrow'
import { cn } from '../../lib/cn'

/**
 * Primary (accent) and ghost (outlined) calls to action.
 * Internal paths route through the router; everything else stays an anchor.
 */
export function Button({
  href,
  children,
  variant = 'primary',
  className,
}: {
  href: string
  children: ReactNode
  variant?: 'primary' | 'ghost'
  className?: string
}) {
  const classes = cn(
    'group/btn inline-flex items-center justify-center gap-3 px-7 py-4 text-sm font-medium',
    'transition-all duration-300 ease-[var(--ease-out-expo)]',
    variant === 'primary'
      ? 'bg-accent text-ink hover:bg-accent-bright'
      : 'border border-line text-fg hover:border-line-strong hover:bg-ink-raised',
    className,
  )

  const content = (
    <>
      {children}
      <Arrow className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/btn:translate-x-1" />
    </>
  )

  if (href.startsWith('/') && !href.startsWith('//')) {
    return (
      <Link to={href} className={classes}>
        {content}
      </Link>
    )
  }

  return (
    <a href={href} className={classes}>
      {content}
    </a>
  )
}
