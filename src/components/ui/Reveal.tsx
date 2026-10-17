import type { CSSProperties, ReactNode } from 'react'
import { useReveal } from '../../hooks/useReveal'
import { cn } from '../../lib/cn'

type RevealTag = 'div' | 'li' | 'article' | 'section' | 'header' | 'figure'

type RevealProps = {
  children: ReactNode
  className?: string
  /** Stagger in milliseconds. */
  delay?: number
  as?: RevealTag
}

/** Fades and lifts its children into place the first time they enter the viewport. */
export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const ref = useReveal<HTMLDivElement>()
  // Every supported tag takes the same ref/className/style props at runtime.
  const Tag = as as 'div'

  return (
    <Tag
      ref={ref}
      className={cn('reveal', className)}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  )
}
