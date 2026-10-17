import { Reveal } from './Reveal'

/** The 2×3 "what this actually includes" grid. */
export function OfferingsGrid({
  offerings,
}: {
  offerings: Array<{ title: string; body: string }>
}) {
  return (
    <ul className="grid border-t border-line sm:grid-cols-2 xl:grid-cols-3">
      {offerings.map((offering, i) => (
        <Reveal
          key={offering.title}
          as="li"
          delay={(i % 3) * 80}
          className="group/offer border-b border-line py-8 transition-colors duration-500 sm:px-7 sm:[&:nth-child(2n+1)]:pl-0 xl:[&:nth-child(2n+1)]:pl-7 xl:[&:nth-child(3n+1)]:pl-0"
        >
          <span
            aria-hidden="true"
            className="block size-1.5 bg-line-strong transition-colors duration-300 group-hover/offer:bg-accent"
          />
          <h3 className="mt-6 text-lg font-medium tracking-[-0.02em]">{offering.title}</h3>
          <p className="mt-3 max-w-[38ch] text-sm leading-relaxed text-fg-muted">
            {offering.body}
          </p>
        </Reveal>
      ))}
    </ul>
  )
}
