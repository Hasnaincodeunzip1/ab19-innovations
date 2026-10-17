import { Link, Navigate, useParams } from 'react-router-dom'
import { formatDate, postBySlug, posts, type Block } from '../data/posts'
import { site } from '../data/site'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { Reveal } from '../components/ui/Reveal'
import { Eyebrow } from '../components/ui/Eyebrow'
import { CtaBand } from '../components/ui/CtaBand'
import { Arrow } from '../components/ui/Arrow'
import { useSeo } from '../hooks/useSeo'
import { useScenePlan } from '../hooks/useScenePlan'
import type { StageAnchor } from '../three/sceneStore'

const PLAN: StageAnchor[] = [
  { id: 'top', stage: 1.6 },
  { id: 'article', stage: 2.2 },
  { id: 'cta', stage: 2.8 },
]

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 className="text-balance-tight mt-14 max-w-[24ch] text-[clamp(1.5rem,2.8vw,2.125rem)] font-medium">
          {block.text}
        </h2>
      )
    case 'list':
      return (
        <ul className="mt-6 space-y-3">
          {block.items.map((item) => (
            <li key={item} className="flex gap-4 text-base leading-relaxed text-fg-muted">
              <span aria-hidden="true" className="mt-3 block h-px w-4 shrink-0 bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      )
    case 'quote':
      return (
        <blockquote className="mt-10 border-l border-accent pl-6">
          <p className="max-w-[54ch] text-[clamp(1.125rem,2vw,1.5rem)] leading-snug font-medium tracking-[-0.02em] text-fg">
            {block.text}
          </p>
        </blockquote>
      )
    case 'code':
      return (
        <pre className="mt-8 overflow-x-auto border border-line bg-ink-raised/70 p-5 font-mono text-xs leading-relaxed text-fg-muted">
          <code>{block.code}</code>
        </pre>
      )
    default:
      return <p className="mt-6 max-w-[68ch] text-base leading-relaxed text-fg-muted">{block.text}</p>
  }
}

export default function PostPage() {
  const { slug = '' } = useParams()
  const post = postBySlug.get(slug)

  useScenePlan(PLAN)
  useSeo({
    title: post ? `${post.title} | AB19 Innovations` : 'Insights',
    description: post?.excerpt ?? '',
    path: `/blog/${slug}`,
    type: 'article',
    jsonLd: post
      ? {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          abstract: post.summary,
          datePublished: post.date,
          dateModified: post.date,
          url: `${site.url}/blog/${post.slug}`,
          wordCount: post.body.reduce(
            (total, block) =>
              total + ('text' in block ? block.text.split(/\s+/).length : 0),
            0,
          ),
          author: { '@type': 'Organization', name: site.name, url: site.url },
          publisher: { '@type': 'Organization', name: site.name, url: site.url },
          articleSection: post.category,
        }
      : undefined,
  })

  if (!post) return <Navigate to="/blog" replace />

  const more = posts.filter((item) => item.slug !== post.slug).slice(0, 2)

  return (
    <>
      <Breadcrumbs
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Insights', to: '/blog' },
          { label: post.category },
        ]}
      />

      <article>
        <header id="top" className="relative isolate overflow-hidden pb-12 sm:pb-16">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-ink/45 sm:bg-ink/25" />
          <div className="shell pt-10 sm:pt-14">
            <Reveal className="max-w-[46rem]">
              <Eyebrow>{`${post.category} · ${post.readingMinutes} MIN READ`}</Eyebrow>
              <h1 className="text-balance-tight mt-7 text-[clamp(2.125rem,5vw,4rem)] font-medium">
                {post.title}
              </h1>
              <p className="mt-7 max-w-[56ch] text-base leading-relaxed text-fg-muted sm:text-lg">
                {post.excerpt}
              </p>
              <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-line pt-5 text-xs text-fg-faint">
                <span>AB19 Innovations</span>
                <span aria-hidden="true">·</span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </p>
            </Reveal>
          </div>
        </header>

        <div id="article" className="veil shell border-t border-line py-14 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* An answer-engine-friendly abstract, and a genuine reader courtesy. */}
            <Reveal className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <p className="label text-fg-faint">In short</p>
                <p className="mt-5 max-w-[38ch] border-t border-line pt-5 text-sm leading-relaxed text-fg-muted">
                  {post.summary}
                </p>
              </div>
            </Reveal>

            <Reveal delay={100} className="lg:col-span-8">
              {post.body.map((block, i) => (
                <BlockView key={i} block={block} />
              ))}
            </Reveal>
          </div>
        </div>

        <section
          aria-labelledby="more-heading"
          className="veil-soft shell border-t border-line py-14 sm:py-20"
        >
          <Reveal>
            <h2 id="more-heading" className="label text-fg-faint">
              Keep reading
            </h2>
          </Reveal>
          <ul className="mt-8 grid border-t border-line md:grid-cols-2">
            {more.map((item, i) => (
              <Reveal
                key={item.slug}
                as="li"
                delay={i * 90}
                className="border-b border-line md:[&:nth-child(2)]:border-l"
              >
                <Link
                  to={`/blog/${item.slug}`}
                  className="group/more block py-7 transition-colors duration-300 md:px-7 md:first:pl-0"
                >
                  <span className="label text-accent">{item.category}</span>
                  <span className="mt-4 flex items-center justify-between gap-4">
                    <span className="max-w-[24ch] text-lg font-medium tracking-[-0.02em] transition-colors duration-300 group-hover/more:text-accent">
                      {item.title}
                    </span>
                    <Arrow className="shrink-0 text-fg-faint transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/more:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </section>
      </article>

      <CtaBand secondary={{ label: 'All insights', to: '/blog' }} />
    </>
  )
}
