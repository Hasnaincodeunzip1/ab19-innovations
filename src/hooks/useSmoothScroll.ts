import { useEffect } from 'react'
import Lenis from 'lenis'

let instance: Lenis | null = null

/** The running Lenis instance, so overlays can pause page scrolling. */
export function getLenis() {
  return instance
}

/**
 * Smooth, inertial scrolling. This is what makes the page read as one
 * continuous move through the 3D world rather than a stack of sections.
 * Skipped entirely for users who ask for reduced motion.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      touchMultiplier: 1.6,
      autoRaf: true,
    })
    instance = lenis

    // Route in-page anchors through Lenis so jumps are eased, not instant.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return
      const anchor = (event.target as HTMLElement | null)?.closest?.('a[href^="#"]')
      if (!(anchor instanceof HTMLAnchorElement)) return

      const hash = anchor.getAttribute('href')
      if (!hash || hash === '#') return

      const target = document.querySelector(hash)
      if (!target) return

      event.preventDefault()
      lenis.scrollTo(target as HTMLElement, { offset: -96, duration: 1.2 })
      history.replaceState(null, '', hash)
    }

    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      lenis.destroy()
      instance = null
    }
  }, [])
}
