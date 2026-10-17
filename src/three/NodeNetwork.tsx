import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { buildLayouts, STAGE_COUNT } from './layouts'
import { easeStage, sceneState, stageWeight } from './sceneStore'

/** Link reach per stage — the AI state is deliberately the most connected. */
const LINK_REACH = [2.5, 2.9, 5.1, 3.5, 2.7, 3.8]

const BASE = new THREE.Color('#f5f5f0')
const ACCENT = new THREE.Color('#8cc63f')

/**
 * The legible layer of the scene: a small set of nodes carried through the same
 * six states as the particle field, re-linked every frame. Node transforms run
 * on an InstancedMesh, links on a single LineSegments with a moving draw range.
 */
export function NodeNetwork({ count, heroShift }: { count: number; heroShift: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const stageRef = useRef(0)

  const layouts = useMemo(() => buildLayouts(count, 91117, heroShift), [count, heroShift])
  const maxSegments = useMemo(() => Math.min(count * 5, 420), [count])

  const scratch = useMemo(
    () => ({
      dummy: new THREE.Object3D(),
      color: new THREE.Color(),
      positions: new Float32Array(count * 3),
      linePositions: new Float32Array(maxSegments * 6),
      lineColors: new Float32Array(maxSegments * 6),
    }),
    [count, maxSegments],
  )

  /** Three nodes stand in for the three case studies. */
  const highlights = useMemo(
    () => new Set([Math.floor(count * 0.17), Math.floor(count * 0.5), Math.floor(count * 0.83)]),
    [count],
  )

  useFrame((_, delta) => {
    const mesh = meshRef.current
    const lines = linesRef.current
    if (!mesh || !lines) return

    const step = Math.min(delta, 0.05)
    stageRef.current = THREE.MathUtils.damp(
      stageRef.current,
      easeStage(sceneState.stage),
      4.5,
      step,
    )

    const stage = stageRef.current
    const time = sceneState.reduceMotion ? 0 : performance.now() * 0.00011
    const motion = sceneState.reduceMotion ? 0 : 1
    const { dummy, color, positions, linePositions, lineColors } = scratch

    const highlightMix = stageWeight(stage, 4)
    let reach = 0
    for (let k = 0; k < STAGE_COUNT; k++) reach += LINK_REACH[k] * stageWeight(stage, k)

    // 1. Resolve node positions for this frame.
    for (let i = 0; i < count; i++) {
      let x = 0
      let y = 0
      let z = 0
      for (let k = 0; k < STAGE_COUNT; k++) {
        const w = stageWeight(stage, k)
        if (w === 0) continue
        x += layouts[k][i * 3] * w
        y += layouts[k][i * 3 + 1] * w
        z += layouts[k][i * 3 + 2] * w
      }

      const seed = i * 0.618
      x += Math.sin(time + seed * 6.283) * 0.3 * motion
      y += Math.cos(time * 0.9 + seed * 4.1) * 0.26 * motion
      z += Math.sin(time * 0.75 + seed * 2.7) * 0.24 * motion

      const depthWeight = THREE.MathUtils.smoothstep(z, -16, 8)
      x += sceneState.smoothX * 1.15 * depthWeight
      y += sceneState.smoothY * 0.85 * depthWeight

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      const isHighlight = highlights.has(i)
      const scale = 0.055 + (isHighlight ? highlightMix * 0.14 : 0)

      dummy.position.set(x, y, z)
      dummy.scale.setScalar(scale)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)

      color.copy(BASE).lerp(ACCENT, isHighlight ? 0.3 + highlightMix * 0.7 : 0.05)
      mesh.setColorAt(i, color)
    }

    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true

    // 2. Re-link whatever is now close enough.
    const reachSq = reach * reach
    let segment = 0
    for (let i = 0; i < count && segment < maxSegments; i++) {
      for (let j = i + 1; j < count && segment < maxSegments; j++) {
        const dx = positions[i * 3] - positions[j * 3]
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
        const distSq = dx * dx + dy * dy + dz * dz
        if (distSq > reachSq) continue

        const strength = (1 - Math.sqrt(distSq) / reach) * 0.55
        const o = segment * 6

        linePositions[o] = positions[i * 3]
        linePositions[o + 1] = positions[i * 3 + 1]
        linePositions[o + 2] = positions[i * 3 + 2]
        linePositions[o + 3] = positions[j * 3]
        linePositions[o + 4] = positions[j * 3 + 1]
        linePositions[o + 5] = positions[j * 3 + 2]

        const linked = highlights.has(i) || highlights.has(j)
        color.copy(BASE).lerp(ACCENT, linked ? highlightMix : 0)
        const r = color.r * strength
        const g = color.g * strength
        const b = color.b * strength
        lineColors[o] = r
        lineColors[o + 1] = g
        lineColors[o + 2] = b
        lineColors[o + 3] = r
        lineColors[o + 4] = g
        lineColors[o + 5] = b

        segment++
      }
    }

    const geometry = lines.geometry
    const positionAttribute = geometry.getAttribute('position') as THREE.BufferAttribute
    const colorAttribute = geometry.getAttribute('color') as THREE.BufferAttribute
    positionAttribute.needsUpdate = true
    colorAttribute.needsUpdate = true
    geometry.setDrawRange(0, segment * 2)
  })

  return (
    <group>
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, count]}
        frustumCulled={false}
      >
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          roughness={0.32}
          metalness={0.15}
          emissive={ACCENT}
          emissiveIntensity={0.14}
          toneMapped={false}
        />
      </instancedMesh>

      <lineSegments ref={linesRef} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[scratch.linePositions, 3]}
            usage={THREE.DynamicDrawUsage}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[scratch.lineColors, 3]}
            usage={THREE.DynamicDrawUsage}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.5}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </lineSegments>
    </group>
  )
}
