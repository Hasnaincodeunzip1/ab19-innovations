import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { STAGE_COUNT } from './layouts'
import { easeStage, sceneState, stageWeight } from './sceneStore'

/** One camera position per state — the move between them is the transition. */
const POSITIONS: Array<[number, number, number]> = [
  [0, 0, 22],
  [3.4, 1.1, 18.5],
  [-2.6, 0.9, 15],
  [6.8, 2.8, 15],
  [3.8, -1.7, 17],
  [0, 0, 16],
]

const TARGETS: Array<[number, number, number]> = [
  [0, 0, 0],
  [0.8, 0, 0],
  [0, 0, 0],
  [-1.6, -0.6, 0],
  [0.6, 0.3, 0],
  [0, 0, 0],
]

/**
 * Scroll interpolates the camera between states; the pointer adds a damped
 * parallax on top. Everything is critically damped — no snapping, no orbiting.
 */
export function CameraRig() {
  const camera = useThree((state) => state.camera)
  const target = useRef(new THREE.Vector3())
  const desired = useRef(new THREE.Vector3())
  const look = useRef(new THREE.Vector3())

  useFrame((_, delta) => {
    const step = Math.min(delta, 0.05)
    const stage = easeStage(sceneState.stage)
    const reduce = sceneState.reduceMotion

    // Damp the pointer once per frame; every other system reads the result.
    const rate = reduce ? 40 : 2.6
    sceneState.smoothX = THREE.MathUtils.damp(
      sceneState.smoothX,
      reduce ? 0 : sceneState.pointerX,
      rate,
      step,
    )
    sceneState.smoothY = THREE.MathUtils.damp(
      sceneState.smoothY,
      reduce ? 0 : sceneState.pointerY,
      rate,
      step,
    )

    desired.current.set(0, 0, 0)
    look.current.set(0, 0, 0)
    for (let k = 0; k < STAGE_COUNT; k++) {
      const w = stageWeight(stage, k)
      if (w === 0) continue
      desired.current.x += POSITIONS[k][0] * w
      desired.current.y += POSITIONS[k][1] * w
      desired.current.z += POSITIONS[k][2] * w
      look.current.x += TARGETS[k][0] * w
      look.current.y += TARGETS[k][1] * w
      look.current.z += TARGETS[k][2] * w
    }

    if (!reduce) {
      // Very slow idle drift so a still page is never completely frozen.
      const t = performance.now() * 0.0001
      desired.current.x += Math.sin(t) * 0.7
      desired.current.y += Math.cos(t * 0.8) * 0.45

      desired.current.x += sceneState.smoothX * 1.5
      desired.current.y += sceneState.smoothY * 1.0
    }

    target.current.copy(desired.current)
    camera.position.x = THREE.MathUtils.damp(camera.position.x, target.current.x, 2.4, step)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, target.current.y, 2.4, step)
    camera.position.z = THREE.MathUtils.damp(camera.position.z, target.current.z, 2.4, step)
    camera.lookAt(look.current)
  })

  return null
}
