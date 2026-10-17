import type { ReactNode } from 'react'
import { Eyebrow } from './Eyebrow'
import { Reveal } from './Reveal'
import { cn } from '../../lib/cn'

/**
 * The repeating editorial header: eyebrow, large heading and optional
 * supporting column set to the right on wide screens.
 */
export function SectionHeader({
  eyebrow,
  heading,
  support,
  aside,
  className,
  headingId,
}: {
  eyebrow: string
  heading: ReactNode
  support?: ReactNode
  aside?: ReactNode
  className?: string
  headingId?: string
}) {
  return (
    <div className={cn('grid gap-10 lg:grid-cols-12 lg:gap-12', className)}>
      <Reveal className="lg:col-span-7">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2
          id={headingId}
          className="text-balance-tight mt-7 max-w-[15ch] text-[length:var(--text-h2)] font-medium"
        >
          {heading}
        </h2>
      </Reveal>

      {(support || aside) && (
        <Reveal delay={120} className="flex flex-col justify-end gap-6 lg:col-span-5 lg:pb-2">
          {support && (
            <p className="max-w-[46ch] text-base leading-relaxed text-fg-muted sm:text-lg">
              {support}
            </p>
          )}
          {aside}
        </Reveal>
      )}
    </div>
  )
}
