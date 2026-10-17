import { metrics } from '../data/site'
import { Reveal } from './ui/Reveal'

/** Splits "10K+" into its number and its trailing symbol so the symbol can carry the accent. */
function splitValue(value: string) {
  const match = /^(.*?)([+%])?$/.exec(value)
  return { number: match?.[1] ?? value, symbol: match?.[2] ?? '' }
}

export function Metrics() {
  return (
    <section aria-labelledby="metrics-heading" className="shell pt-4 pb-20 sm:pb-24 md:pt-8">
      <Reveal>
        <h2 id="metrics-heading" className="label border-t border-line pt-6 text-fg-faint">
          Selected engineering experience
        </h2>
      </Reveal>

      <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:mt-12 lg:grid-cols-4 lg:gap-x-10">
        {metrics.map((metric, i) => {
          const { number, symbol } = splitValue(metric.value)
          return (
            <Reveal key={metric.label} delay={i * 90} className="lg:pr-6">
              <dt className="sr-only">{metric.label}</dt>
              <dd>
                <span className="block text-[clamp(2.75rem,6.5vw,4.5rem)] leading-[0.9] font-medium tracking-[-0.045em] tabular-nums">
                  {number}
                  {symbol && <span className="text-accent">{symbol}</span>}
                </span>
                <span className="mt-4 block max-w-[22ch] text-sm leading-relaxed text-fg-muted">
                  {metric.label}
                </span>
              </dd>
            </Reveal>
          )
        })}
      </dl>

      <Reveal delay={120} className="mt-12 border-t border-line pt-6">
        <p className="max-w-[68ch] text-xs leading-relaxed text-fg-faint">
          Figures reflect selected professional engineering work by the founding team prior to and
          alongside AB19 Innovations. They are not presented as company-wide results.
        </p>
      </Reveal>
    </section>
  )
}
