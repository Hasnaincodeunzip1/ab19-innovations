import { cn } from '../../lib/cn'

/**
 * The AB19 mark. Decorative wherever it sits beside the wordmark — the
 * company name is already in the adjacent text, so it carries no alt text.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <img
      src="/logo-64.png"
      srcSet="/logo-64.png 64w, /logo-128.png 128w, /logo.png 512w"
      sizes="36px"
      alt=""
      aria-hidden="true"
      width={64}
      height={64}
      // The mark is drawn for a light ground: its deep green would disappear
      // against the page, so it keeps its own cream chip on dark.
      className={cn('size-8 shrink-0 rounded-md object-cover', className)}
    />
  )
}
