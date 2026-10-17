import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Arrow } from './Arrow'
import { cn } from '../../lib/cn'

/** Inline text link with an arrow that slides on hover. */
export function ArrowLink({
  href,
  children,
  className,
  tone = 'default',
}: {
  href: string
  children: ReactNode
  className?: string
  tone?: 'default' | 'accent'
}) {
  const classes = cn(
    'group/link inline-flex items-center gap-2.5 text-sm font-medium transition-colors duration-300',
    tone === 'accent' ? 'text-accent hover:text-accent-bright' : 'text-fg hover:text-accent',
    className,
  )

  const content = (
    <>
      <span className="border-b border-transparent pb-0.5 transition-colors duration-300 group-hover/link:border-current">
        {children}
      </span>
      <Arrow className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/link:translate-x-1" />
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
