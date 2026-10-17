import type { ReactNode } from 'react'
import { Eyebrow } from './Eyebrow'
import { Reveal } from './Reveal'
import { cn } from '../../lib/cn'

/** The shared opening for every interior page. */
export function PageHero({
  eyebrow,
  title,
  intro,
  aside,
  children,
  align = 'left',
}: {
  eyebrow: string
  title: ReactNode
  intro?: string
  aside?: ReactNode
  children?: ReactNode
  align?: 'left' | 'center'
}) {
  const centered = align === 'center'

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-28 pb-14 sm:pt-36 sm:pb-20 lg:pt-44"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {/* Even dim on phones; a side scrim once the copy sits beside the world. */}
        <div className={cn('absolute inset-0', centered ? 'bg-ink/70' : 'bg-ink/60 sm:hidden')} />
        {!centered && (
          <div className="absolute inset-y-0 left-0 hidden w-[80%] bg-gradient-to-r from-ink via-ink/82 to-transparent sm:block lg:w-[66%]" />
        )}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="shell">
        <div className={cn('grid gap-10 lg:grid-cols-12', centered && 'justify-items-center')}>
          <Reveal className={cn(centered ? 'lg:col-span-12 text-center' : 'lg:col-span-8')}>
            <Eyebrow className={cn(centered && 'justify-center')}>{eyebrow}</Eyebrow>
            <h1
              className={cn(
                'text-balance-tight mt-7 text-[clamp(2.5rem,6vw,5rem)] font-medium',
                centered ? 'mx-auto max-w-[18ch]' : 'max-w-[17ch]',
              )}
            >
              {title}
            </h1>
            {intro && (
              <p
                className={cn(
                  'mt-7 text-base leading-relaxed text-fg-muted sm:text-lg',
                  centered ? 'mx-auto max-w-[62ch]' : 'max-w-[58ch]',
                )}
              >
                {intro}
              </p>
            )}
            {children}
          </Reveal>

          {aside && (
            <Reveal delay={140} className="flex items-end lg:col-span-4">
              {aside}
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}
