import { cn } from '../../lib/cn'

/** Compact uppercase section label with a small accent marker. */
export function Eyebrow({ children, className }: { children: string; className?: string }) {
  return (
    <p className={cn('label flex items-center gap-3 text-fg-muted', className)}>
      <span aria-hidden="true" className="block size-[6px] bg-accent" />
      {children}
    </p>
  )
}
