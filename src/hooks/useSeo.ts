import { useEffect } from 'react'
import { site } from '../data/site'

type Seo = {
  title: string
  description: string
  path: string
  /** Extra JSON-LD injected for this route, on top of the site-wide graph. */
  jsonLd?: Record<string, unknown>
  type?: 'website' | 'article'
}

function upsertMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/**
 * Per-route document metadata. Small and hand-rolled rather than a helmet
 * dependency — there is exactly one head to manage and one owner per route.
 */
export function useSeo({ title, description, path, jsonLd, type = 'website' }: Seo) {
  useEffect(() => {
    const url = `${site.url}${path}`
    document.title = title

    upsertMeta('meta[name="description"]', 'name', 'description', description)
    upsertMeta('meta[property="og:title"]', 'property', 'og:title', title)
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', description)
    upsertMeta('meta[property="og:url"]', 'property', 'og:url', url)
    upsertMeta('meta[property="og:type"]', 'property', 'og:type', type)
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title)
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url

    if (!jsonLd) return
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.dataset.route = 'true'
    script.textContent = JSON.stringify(jsonLd)
    document.head.appendChild(script)
    return () => script.remove()
  }, [title, description, path, jsonLd, type])
}
