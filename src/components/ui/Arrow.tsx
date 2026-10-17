import { cn } from '../../lib/cn'

/** Thin diagonal / horizontal arrow used across links and cards. */
export function Arrow({
  className,
  direction = 'right',
}: {
  className?: string
  direction?: 'right' | 'up-right'
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      className={cn('size-4 shrink-0', className)}
    >
      {direction === 'right' ? (
        <path
          d="M1 8h13M9 3l5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="square"
        />
      ) : (
        <path
          d="M4 12L12 4M5.5 4H12v6.5"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="square"
        />
      )}
    </svg>
  )
}
