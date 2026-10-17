import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer'
import { SceneBackground } from '../SceneBackground'
import { ScrollRail } from '../ScrollRail'
import { useSmoothScroll } from '../../hooks/useSmoothScroll'
import { getLenis } from '../../hooks/useSmoothScroll'

/** Returns to the top on navigation, the way a real page load would. */
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

/**
 * The shell every route renders inside. The WebGL canvas lives here, above the
 * router, so it is never unmounted — navigating moves through one world rather
 * than tearing it down and rebuilding it.
 */
export function RootLayout() {
  useSmoothScroll()

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink"
      >
        Skip to content
      </a>

      <SceneBackground />
      <ScrollRail />
      <ScrollToTop />

      <div className="relative z-10">
        <Navbar />
        <main id="main">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}
