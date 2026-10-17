import { useEffect } from 'react'
import type { RefObject } from 'react'

/**
 * Marks the document while a light-background section owns the viewport, so
 * fixed dark-theme furniture (the scroll rail) can flip to stay legible.
 */
export function useLightSurface(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) document.body.dataset.surface = 'light'
        else delete document.body.dataset.surface
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      delete document.body.dataset.surface
    }
  }, [ref])
}
