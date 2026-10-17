import { domains } from '../data/site'
import { caseStudies } from '../data/work'
import { CaseVisual, type Motif } from './CaseVisual'
import { SectionHeader } from './ui/SectionHeader'
import { Reveal } from './ui/Reveal'
import { ArrowLink } from './ui/ArrowLink'
import { cn } from '../lib/cn'

const motifs: Motif[] = ['claims', 'pipeline', 'graph']

export function CaseStudies() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="veil-soft shell border-t border-line py-20 sm:py-28 lg:py-36"
    >
      <SectionHeader
        eyebrow="SELECTED WORK"
        headingId="work-heading"
        heading="Systems built for real-world scale."
        support="Selected engineering experience across AI, data and platform work. Client names and commercial figures are intentionally withheld."
      />

      {/* Domains — the industries this work sits in. */}
      <div id="industries" className="mt-14 scroll-mt-28 sm:mt-16">
        <Reveal>
          <p className="label border-t border-line pt-6 text-fg-faint">Domains we work in</p>
          <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
            {domains.map((domain) => (
              <li key={domain} className="flex items-center gap-2.5 text-sm text-fg-muted">
                <span aria-hidden="true" className="block h-px w-4 bg-accent" />
                {domain}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <div className="mt-16 space-y-px border-t border-line sm:mt-20">
        {caseStudies.map((study, i) => (
          <Reveal key={study.title} as="article" className="group/case border-b border-line py-12 sm:py-16">
            <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
              <div className={cn('lg:col-span-6', i % 2 === 1 && 'lg:order-2')}>
                <div className="flex items-center gap-4">
                  <span className="label font-mono text-accent">Case study {study.index}</span>
                  <span aria-hidden="true" className="h-px flex-1 bg-line" />
                </div>

                <h3 className="text-balance-tight mt-7 max-w-[16ch] text-[clamp(1.75rem,3.4vw,3rem)] font-medium">
                  {study.title}
                </h3>

                <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-fg-muted sm:text-lg">
                  {study.summary}
                </p>

                <ul className="mt-8 flex flex-wrap gap-2">
                  {study.capabilities.map((capability) => (
                    <li
                      key={capability}
                      className="border border-line px-3 py-1.5 text-xs text-fg-muted"
                    >
                      {capability}
                    </li>
                  ))}
                </ul>

                <dl className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-xs text-fg-faint">
                  <dt className="label">Stack</dt>
                  <dd className="font-mono">{study.stack.join(' · ')}</dd>
                </dl>
              </div>

              <div className={cn('lg:col-span-6', i % 2 === 1 && 'lg:order-1')}>
                <CaseVisual motif={motifs[i]} />
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={100} className="mt-12">
        <ArrowLink href="/work">See all selected work</ArrowLink>
      </Reveal>
    </section>
  )
}
