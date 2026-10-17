import { useEffect, useRef } from 'react'

/**
 * One shared IntersectionObserver for every reveal-on-scroll element,
 * so a page full of sections costs a single observer rather than dozens.
 */
let observer: IntersectionObserver | null = null

function getObserver() {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return null
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer?.unobserve(entry.target)
        }
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
  )
  return observer
}

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const io = getObserver()
    if (!io) {
      node.classList.add('is-visible')
      return
    }

    io.observe(node)
    return () => io.unobserve(node)
  }, [])

  return ref
}
