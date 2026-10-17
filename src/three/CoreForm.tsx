import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { easeStage, sceneState, stageWeight } from './sceneStore'

/**
 * The resolved object. It only exists in the final state — as the system
 * converges, one lit form emerges from the point cloud.
 */
export function CoreForm() {
  const groupRef = useRef<THREE.Group>(null)
  const shellRef = useRef<THREE.MeshPhysicalMaterial>(null)
  const edgeRef = useRef<THREE.LineBasicMaterial>(null)
  const stageRef = useRef(0)

  const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(2.45, 1)), [])

  useFrame((_, delta) => {
    const group = groupRef.current
    if (!group) return

    const step = Math.min(delta, 0.05)
    stageRef.current = THREE.MathUtils.damp(
      stageRef.current,
      easeStage(sceneState.stage),
      4.5,
      step,
    )

    const presence = stageWeight(stageRef.current, 5)
    const scale = 0.4 + presence * 0.6
    group.scale.setScalar(scale)
    group.visible = presence > 0.01

    if (!sceneState.reduceMotion) {
      group.rotation.y += step * 0.08
      group.rotation.x = Math.sin(performance.now() * 0.00008) * 0.14
    }

    // Sit to the right of, and below, the CTA copy.
    group.position.x = 3.2 + sceneState.smoothX * 0.7
    group.position.y = -1.2 + sceneState.smoothY * 0.5

    if (shellRef.current) shellRef.current.opacity = presence * 0.34
    if (edgeRef.current) edgeRef.current.opacity = presence * 0.28
  })

  return (
    <group ref={groupRef} visible={false}>
      <mesh>
        <icosahedronGeometry args={[1.7, 2]} />
        <meshPhysicalMaterial
          ref={shellRef}
          color="#0c0c0c"
          roughness={0.16}
          metalness={0.55}
          clearcoat={0.7}
          clearcoatRoughness={0.25}
          emissive="#8cc63f"
          emissiveIntensity={0.07}
          transparent
          opacity={0}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      <lineSegments geometry={edges}>
        <lineBasicMaterial
          ref={edgeRef}
          color="#d4af37"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </lineSegments>
    </group>
  )
}
