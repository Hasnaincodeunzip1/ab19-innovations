import { Reveal } from './Reveal'

/**
 * Native disclosure elements: keyboard accessible, findable by in-page search,
 * and readable with JavaScript off.
 */
export function FaqAccordion({ faq }: { faq: Array<{ q: string; a: string }> }) {
  return (
    <div className="border-t border-line">
      {faq.map((item, i) => (
        <Reveal key={item.q} delay={i * 70}>
          <details className="group/faq border-b border-line">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-base font-medium tracking-[-0.015em] transition-colors duration-300 hover:text-accent sm:text-lg [&::-webkit-details-marker]:hidden">
              {item.q}
              <span
                aria-hidden="true"
                className="relative block size-3 shrink-0 text-fg-faint transition-colors duration-300 group-open/faq:text-accent"
              >
                <span className="absolute top-1/2 left-0 block h-px w-full -translate-y-1/2 bg-current" />
                <span className="absolute top-0 left-1/2 block h-full w-px -translate-x-1/2 bg-current transition-transform duration-400 ease-[var(--ease-out-expo)] group-open/faq:scale-y-0" />
              </span>
            </summary>
            <p className="max-w-[68ch] pb-7 text-sm leading-relaxed text-fg-muted sm:text-base">
              {item.a}
            </p>
          </details>
        </Reveal>
      ))}
    </div>
  )
}
