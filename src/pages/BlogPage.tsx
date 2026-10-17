import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { categoryCounts, formatDate, postCategories, posts, type PostCategory } from '../data/posts'
import { site } from '../data/site'
import { PageHero } from '../components/ui/PageHero'
import { Reveal } from '../components/ui/Reveal'
import { CtaBand } from '../components/ui/CtaBand'
import { Arrow } from '../components/ui/Arrow'
import { useSeo } from '../hooks/useSeo'
import { useScenePlan } from '../hooks/useScenePlan'
import type { StageAnchor } from '../three/sceneStore'
import { cn } from '../lib/cn'

const PLAN: StageAnchor[] = [
  { id: 'top', stage: 0 },
  { id: 'archive', stage: 1.4 },
  { id: 'cta', stage: 2.2 },
]

export default function BlogPage() {
  const [active, setActive] = useState<PostCategory>('All')
  const counts = useMemo(() => categoryCounts(), [])

  useScenePlan(PLAN)
  useSeo({
    title: 'Insights — engineering notes on AI, data and software | AB19 Innovations',
    description:
      'Working notes from the build: retrieval engineering, evaluation sets, training/serving skew, queue architecture and when not to use AI. Written for engineers and operators.',
    path: '/blog',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'AB19 Innovations Insights',
      url: `${site.url}/blog`,
      blogPost: posts.map((post) => ({
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        url: `${site.url}/blog/${post.slug}`,
        author: { '@type': 'Organization', name: site.name },
      })),
    },
  })

  const visible = useMemo(
    () => (active === 'All' ? posts : posts.filter((post) => post.category === active)),
    [active],
  )

  const [lead, ...rest] = visible

  return (
    <>
      <PageHero
        eyebrow="INSIGHTS"
        align="center"
        title={
          <>
            Notes from the build<span className="text-accent">.</span>
          </>
        }
        intro="What we learned shipping AI, data and platform systems into production — including the parts that did not work. No thought leadership, no predictions, no hype."
      />

      <section
        id="archive"
        aria-labelledby="archive-heading"
        className="veil shell border-t border-line py-14 sm:py-20"
      >
        <Reveal>
          <h2 id="archive-heading" className="label text-fg-faint">
            Browse by topic
          </h2>
        </Reveal>

        <Reveal delay={80} className="mt-6">
          <div
            role="group"
            aria-label="Filter posts by category"
            className="no-scrollbar -mx-[clamp(1.25rem,4.5vw,5rem)] flex snap-x gap-2 overflow-x-auto px-[clamp(1.25rem,4.5vw,5rem)] pb-1 md:mx-0 md:flex-wrap md:px-0"
          >
            {postCategories.map((category) => {
              const isActive = category === active
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActive(category)}
                  aria-pressed={isActive}
                  className={cn(
                    'inline-flex shrink-0 snap-start items-center gap-2 border px-4 py-2.5 text-sm whitespace-nowrap transition-colors duration-300',
                    isActive
                      ? 'border-accent bg-accent text-ink'
                      : 'border-line text-fg-muted hover:border-line-strong hover:text-fg',
                  )}
                >
                  {category}
                  <span
                    className={cn(
                      'text-xs tabular-nums',
                      isActive ? 'text-ink/60' : 'text-fg-faint',
                    )}
                  >
                    {counts.get(category) ?? 0}
                  </span>
                </button>
              )
            })}
          </div>
        </Reveal>

        {lead && (
          <Reveal key={`lead-${active}`} delay={120} className="mt-12">
            <Link
              to={`/blog/${lead.slug}`}
              className="group/lead grid gap-8 border-t border-line pt-10 lg:grid-cols-12 lg:gap-14"
            >
              <span className="lg:col-span-7">
                <span className="label flex items-center gap-3 text-fg-faint">
                  <span className="text-accent">{lead.category}</span>
                  <span aria-hidden="true">·</span>
                  {formatDate(lead.date)}
                  <span aria-hidden="true">·</span>
                  {lead.readingMinutes} min
                </span>
                <span className="text-balance-tight mt-6 block max-w-[20ch] text-[clamp(1.75rem,3.6vw,3rem)] font-medium transition-colors duration-300 group-hover/lead:text-accent">
                  {lead.title}
                </span>
              </span>
              <span className="flex flex-col justify-end lg:col-span-5">
                <span className="block max-w-[46ch] text-base leading-relaxed text-fg-muted">
                  {lead.excerpt}
                </span>
                <span className="mt-6 flex items-center gap-2.5 text-sm font-medium text-fg transition-colors duration-300 group-hover/lead:text-accent">
                  Read it
                  <Arrow className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/lead:translate-x-1" />
                </span>
              </span>
            </Link>
          </Reveal>
        )}

        <ul key={active} className="mt-14 grid border-t border-line md:grid-cols-2 xl:grid-cols-3">
          {rest.map((post, i) => (
            <li
              key={post.slug}
              className="card-in border-b border-line md:[&:nth-child(2n)]:border-l xl:[&:nth-child(2n)]:border-l-0 xl:[&:not(:nth-child(3n+1))]:border-l"
              style={{ '--card-delay': `${Math.min(i, 6) * 60}ms` } as React.CSSProperties}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="group/post flex h-full flex-col justify-between gap-8 py-8 transition-colors duration-500 md:px-7 md:[&:nth-child(2n+1)]:pl-0"
              >
                <span>
                  <span className="label flex items-center gap-2.5 text-fg-faint">
                    <span className="text-accent">{post.category}</span>
                    <span aria-hidden="true">·</span>
                    {post.readingMinutes} min
                  </span>
                  <span className="mt-6 block text-lg font-medium tracking-[-0.02em] transition-colors duration-300 group-hover/post:text-accent sm:text-xl">
                    {post.title}
                  </span>
                  <span className="mt-3 block max-w-[40ch] text-sm leading-relaxed text-fg-muted">
                    {post.excerpt}
                  </span>
                </span>
                <span className="flex items-center justify-between gap-4 text-xs text-fg-faint">
                  {formatDate(post.date)}
                  <Arrow className="size-4 transition-transform duration-400 ease-[var(--ease-out-expo)] group-hover/post:translate-x-1 group-hover/post:text-accent" />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p aria-live="polite" className="sr-only">
          {visible.length} posts shown for {active}.
        </p>
      </section>

      <CtaBand
        heading="Got a harder version of one of these?"
        body="These notes come out of real engagements. If one of them describes your problem, we should talk."
        secondary={{ label: 'See the work', to: '/work' }}
      />
    </>
  )
}
