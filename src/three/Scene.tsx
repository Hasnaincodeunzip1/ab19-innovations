import { AdaptiveDpr } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { CameraRig } from './CameraRig'
import { CoreForm } from './CoreForm'
import { NodeNetwork } from './NodeNetwork'
import { ParticleField } from './ParticleField'
import type { Quality } from './sceneStore'

/**
 * Scene contents. Lighting stays dark and directional: one cool key, one
 * restrained green accent, and just enough ambient to keep the nodes readable.
 */
export function Scene({
  particles,
  nodes,
  quality,
}: {
  particles: number
  nodes: number
  quality: Quality
}) {
  // Phones put the copy above the scene, so the field stays centred there and
  // each point carries more weight to make up for the lower count.
  const heroShift = quality === 'low' ? 0 : 4.5
  const pointSize = quality === 'low' ? 3.1 : 2.25

  // A narrow viewport crops horizontally at a fixed vertical FOV, so shrink the
  // world rather than pushing the camera back into the fog.
  const aspect = useThree((state) => state.size.width / state.size.height)
  const worldScale = 0.55 + 0.45 * Math.min(Math.max(aspect / 1.6, 0), 1)

  return (
    <>
      {/* No scene background: the page's own near-black shows through. */}
      <fog attach="fog" args={['#0a0a0a', 26, 60]} />

      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 8, 10]} intensity={1.1} color="#f5f5f0" />
      <pointLight position={[-9, -5, 7]} intensity={14} distance={32} color="#8cc63f" />
      <pointLight position={[7, 5, -6]} intensity={28} distance={34} color="#fff3d6" />

      <CameraRig />

      <group scale={worldScale}>
        <ParticleField count={particles} heroShift={heroShift} pointSize={pointSize} />
        <NodeNetwork count={nodes} heroShift={heroShift} />
        <CoreForm />
      </group>

      <AdaptiveDpr pixelated />
    </>
  )
}
