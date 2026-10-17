import { Reveal } from './Reveal'

/** The before/after pair: what goes wrong, and what we do instead. */
export function ComparisonList({
  withoutTitle,
  without,
  withTitle,
  with: withItems,
}: {
  withoutTitle: string
  without: string[]
  withTitle: string
  with: string[]
}) {
  return (
    <div className="grid border-t border-line md:grid-cols-2">
      <Reveal className="border-b border-line py-8 md:border-b-0 md:pr-10">
        <h3 className="label text-fg-faint">{withoutTitle}</h3>
        <ul className="mt-6 space-y-4">
          {without.map((item) => (
            <li key={item} className="flex gap-4 text-sm leading-relaxed text-fg-muted">
              <span aria-hidden="true" className="mt-2 block h-px w-4 shrink-0 bg-line-strong" />
              {item}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={120} className="py-8 md:border-l md:border-line md:pl-10">
        <h3 className="label text-accent">{withTitle}</h3>
        <ul className="mt-6 space-y-4">
          {withItems.map((item) => (
            <li key={item} className="flex gap-4 text-sm leading-relaxed text-fg">
              <span aria-hidden="true" className="mt-2 block h-px w-4 shrink-0 bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  )
}
