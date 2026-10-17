import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Scene } from './Scene'
import { NODE_COUNTS, PARTICLE_COUNTS, type Quality } from './sceneStore'

const DPR_CEILING: Record<Quality, number> = { low: 1, mid: 1.5, high: 1.75 }

/**
 * Everything that pulls in three.js lives behind this module so it can be
 * loaded on demand — devices without WebGL never download it at all.
 */
export default function SceneCanvas({
  quality,
  running,
}: {
  quality: Quality
  running: boolean
}) {
  return (
    <Canvas
      frameloop={running ? 'always' : 'never'}
      dpr={[1, DPR_CEILING[quality]]}
      performance={{ min: 0.4 }}
      gl={{
        alpha: true,
        antialias: false,
        stencil: false,
        powerPreference: 'high-performance',
      }}
      camera={{ fov: 46, near: 0.1, far: 120, position: [0, 0, 22] }}
    >
      <Suspense fallback={null}>
        <Scene particles={PARTICLE_COUNTS[quality]} nodes={NODE_COUNTS[quality]} quality={quality} />
      </Suspense>
    </Canvas>
  )
}
