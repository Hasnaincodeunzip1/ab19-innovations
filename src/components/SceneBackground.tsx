import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { detectQuality, installSceneDriver, sceneState, supportsWebGL } from '../three/sceneStore'

const SceneCanvas = lazy(() => import('../three/SceneCanvas'))

/** Shown until (or instead of) WebGL: a still version of the same language. */
function StaticField() {
  return (
    <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(60%_50%_at_70%_25%,rgba(183,243,74,0.06),transparent_70%),linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] [background-size:100%_100%,72px_72px,72px_72px]" />
  )
}

/**
 * The WebGL layer. It sits behind every DOM section, never takes pointer
 * events, and is entirely optional: without WebGL the page renders and reads
 * exactly as it does with it.
 */
export function SceneBackground() {
  const [ready, setReady] = useState(false)
  const [running, setRunning] = useState(true)

  const webgl = useMemo(() => supportsWebGL(), [])
  const quality = useMemo(() => detectQuality(), [])

  const reduceMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )

  // Let the hero text paint before we stand up a WebGL context.
  useEffect(() => {
    if (!webgl) return
    let raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(() => setReady(true))
    })
    return () => cancelAnimationFrame(raf)
  }, [webgl])

  useEffect(() => {
    sceneState.reduceMotion = reduceMotion
    sceneState.quality = quality
  }, [reduceMotion, quality])

  useEffect(() => (webgl ? installSceneDriver() : undefined), [webgl])

  // Stop rendering entirely while the tab is in the background.
  useEffect(() => {
    const onVisibility = () => setRunning(!document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      {webgl && ready ? (
        <Suspense fallback={<StaticField />}>
          <SceneCanvas quality={quality} running={running} />
        </Suspense>
      ) : (
        <StaticField />
      )}
    </div>
  )
}
