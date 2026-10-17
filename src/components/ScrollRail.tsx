import { useEffect, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { onStageChange, STAGE_LABELS } from '../three/sceneStore'

/**
 * A quiet readout of where you are in the world: progress, and the name of the
 * state the 3D scene is currently in. Decorative — the page never depends on it.
 */
export function ScrollRail() {
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, { stiffness: 140, damping: 32, mass: 0.35 })

  const [percent, setPercent] = useState(0)
  const [stage, setStage] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const next = Math.round(value * 100)
    setPercent((current) => (current === next ? current : next))
  })

  useEffect(() => onStageChange(setStage), [])

  return (
    <div
      aria-hidden="true"
      className="scroll-rail pointer-events-none fixed top-1/2 right-[max(1rem,2vw)] z-30 hidden -translate-y-1/2 flex-col items-end gap-4 text-fg-faint lg:flex"
    >
      <span className="label origin-right rotate-180 [writing-mode:vertical-rl]">
        {STAGE_LABELS[stage]}
      </span>

      <div className="rail-track relative h-32 w-px bg-line">
        <motion.span
          style={{ scaleY }}
          className="absolute inset-0 block origin-top bg-accent"
        />
      </div>

      <span className="font-mono text-[0.625rem] tabular-nums">
        {String(percent).padStart(3, '0')}%
      </span>
    </div>
  )
}
