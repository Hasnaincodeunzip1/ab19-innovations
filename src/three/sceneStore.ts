import { STAGE_COUNT } from './layouts'

/**
 * Shared, mutable scene state.
 *
 * Scroll and pointer are written straight into this object by DOM listeners and
 * read inside `useFrame`. Nothing here goes through React state — a 60fps scene
 * must never trigger a render.
 */
export type Quality = 'low' | 'mid' | 'high'

export const sceneState = {
  /** Continuous stage position, 0 … STAGE_COUNT - 1. */
  stage: 0,
  /** Whole-document scroll progress, 0 … 1. */
  progress: 0,
  /** Pointer target in normalised device space, -1 … 1. */
  pointerX: 0,
  pointerY: 0,
  /** Damped pointer, advanced by the render loop. */
  smoothX: 0,
  smoothY: 0,
  reduceMotion: false,
  quality: 'high' as Quality,
}

/**
 * A page's scene plan: which DOM anchors map to which visual state, in
 * document order. Every route registers its own, so the world keeps telling a
 * story even on a short page.
 */
export type StageAnchor = { id: string; stage: number }

export const HOME_PLAN: StageAnchor[] = [
  { id: 'top', stage: 0 },
  { id: 'services', stage: 1 },
  { id: 'ai', stage: 2 },
  { id: 'technology', stage: 3 },
  { id: 'work', stage: 4 },
  { id: 'contact', stage: 5 },
]

let plan: StageAnchor[] = HOME_PLAN
let remeasure: (() => void) | null = null

/** Called by each page to take over the world. */
export function setStagePlan(next: StageAnchor[]) {
  plan = next.length > 0 ? next : HOME_PLAN
  remeasure?.()
}

export function getStagePlan() {
  return plan
}

export const STAGE_LABELS = [
  'Computational field',
  'Structured systems',
  'Interconnection',
  'Architecture',
  'Selected systems',
  'Convergence',
] as const

const listeners = new Set<(stage: number) => void>()
let lastNotified = -1

/**
 * Subscribe to whole-number stage changes (for DOM affordances, not the scene).
 * New subscribers are synced immediately: the driver installs before the rail
 * mounts, so its first notification would otherwise be missed.
 */
export function onStageChange(fn: (stage: number) => void) {
  listeners.add(fn)
  fn(Math.max(lastNotified, 0))
  return () => {
    listeners.delete(fn)
  }
}

export function detectQuality(): Quality {
  if (typeof window === 'undefined') return 'mid'
  const width = window.innerWidth
  const cores = navigator.hardwareConcurrency ?? 4
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4
  const coarse = window.matchMedia('(pointer: coarse)').matches

  if (width < 768 || coarse || cores <= 4 || memory <= 4) return 'low'
  if (width < 1280 || cores <= 8) return 'mid'
  return 'high'
}

export const PARTICLE_COUNTS: Record<Quality, number> = { low: 2200, mid: 4600, high: 7200 }
export const NODE_COUNTS: Record<Quality, number> = { low: 34, mid: 54, high: 72 }

export function supportsWebGL() {
  if (typeof window === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl2') || canvas.getContext('webgl')),
    )
  } catch {
    return false
  }
}

/**
 * Wires scroll and pointer into `sceneState`. Anchor offsets are measured once
 * per layout change rather than per scroll event.
 */
export function installSceneDriver() {
  let anchors: number[] = []
  let stages: number[] = []
  let frame = 0

  const measure = () => {
    const docHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
    const current = getStagePlan()

    anchors = current.map((entry, i) => {
      if (i === 0) return 0
      const el = document.getElementById(entry.id)
      if (!el) return (docHeight * i) / Math.max(current.length - 1, 1)
      const rect = el.getBoundingClientRect()
      return rect.top + window.scrollY + Math.min(rect.height, window.innerHeight) * 0.3
    })
    stages = current.map((entry) => entry.stage)

    // Anchors must increase monotonically for the interpolation below.
    for (let i = 1; i < anchors.length; i++) {
      if (anchors[i] <= anchors[i - 1]) anchors[i] = anchors[i - 1] + 1
    }
  }

  const readScroll = () => {
    const y = window.scrollY
    const docHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
    sceneState.progress = Math.min(Math.max(y / docHeight, 0), 1)

    const reference = y + window.innerHeight * 0.45
    let stage = stages[0] ?? 0
    if (reference >= anchors[anchors.length - 1]) {
      stage = stages[stages.length - 1]
    } else {
      for (let i = 0; i < anchors.length - 1; i++) {
        if (reference < anchors[i + 1]) {
          const span = anchors[i + 1] - anchors[i]
          const t = Math.min(Math.max((reference - anchors[i]) / span, 0), 1)
          stage = stages[i] + (stages[i + 1] - stages[i]) * t
          break
        }
      }
    }
    sceneState.stage = Math.min(Math.max(stage, 0), STAGE_COUNT - 1)

    const whole = Math.round(stage)
    if (whole !== lastNotified) {
      lastNotified = whole
      for (const fn of listeners) fn(whole)
    }
  }

  const onScroll = () => {
    if (frame) return
    frame = requestAnimationFrame(() => {
      frame = 0
      readScroll()
    })
  }

  const onPointerMove = (event: PointerEvent) => {
    sceneState.pointerX = (event.clientX / window.innerWidth) * 2 - 1
    sceneState.pointerY = -((event.clientY / window.innerHeight) * 2 - 1)
  }

  const onPointerLeave = () => {
    sceneState.pointerX = 0
    sceneState.pointerY = 0
  }

  const onResize = () => {
    measure()
    readScroll()
  }

  measure()
  readScroll()
  remeasure = onResize

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize)
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  document.addEventListener('pointerleave', onPointerLeave)

  // The page grows as fonts settle and sections reveal; re-measure when it does.
  const observer = new ResizeObserver(onResize)
  observer.observe(document.body)

  return () => {
    remeasure = null
    if (frame) cancelAnimationFrame(frame)
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onResize)
    window.removeEventListener('pointermove', onPointerMove)
    document.removeEventListener('pointerleave', onPointerLeave)
    observer.disconnect()
  }
}

/** Weight of `index` given a continuous, eased stage position. */
export function stageWeight(stage: number, index: number) {
  return Math.max(0, 1 - Math.abs(stage - index))
}

/** Smoothstep the fractional part so transitions read as cinematic, not linear. */
export function easeStage(stage: number) {
  const base = Math.floor(stage)
  const f = stage - base
  return base + f * f * (3 - 2 * f)
}
