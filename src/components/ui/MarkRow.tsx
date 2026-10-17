import { Reveal } from './Reveal'

/**
 * Qualitative marks rather than metrics — these describe how we build, so they
 * never imply performance figures we have not measured.
 */
export function MarkRow({ marks }: { marks: Array<{ value: string; label: string }> }) {
  return (
    <dl className="mt-12 grid gap-x-8 gap-y-8 border-t border-line pt-8 sm:grid-cols-3">
      {marks.map((mark, i) => (
        <Reveal key={mark.label} delay={i * 90}>
          <dt className="text-[clamp(1.5rem,3vw,2.25rem)] leading-none font-medium tracking-[-0.04em]">
            {mark.value}
          </dt>
          <dd className="mt-3 max-w-[26ch] text-sm leading-relaxed text-fg-muted">{mark.label}</dd>
        </Reveal>
      ))}
    </dl>
  )
}
