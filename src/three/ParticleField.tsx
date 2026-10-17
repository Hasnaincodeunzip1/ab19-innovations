import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { buildLayouts, seededRandoms, STAGE_COUNT } from './layouts'
import { easeStage, sceneState } from './sceneStore'

const vertexShader = /* glsl */ `
  uniform float uStage;
  uniform float uTime;
  uniform float uSize;
  uniform float uMotion;
  uniform vec2  uPointer;
  uniform float uPixelRatio;

  attribute vec3  p0;
  attribute vec3  p1;
  attribute vec3  p2;
  attribute vec3  p3;
  attribute vec3  p4;
  attribute vec3  p5;
  attribute float aRand;

  varying float vRand;
  varying float vDepth;

  // Only two weights are ever non-zero, so this is a branch-free lerp
  // between the two stages the scroll currently sits between.
  float w(float s, float k) {
    return clamp(1.0 - abs(s - k), 0.0, 1.0);
  }

  void main() {
    float s = clamp(uStage, 0.0, ${(STAGE_COUNT - 1).toFixed(1)});

    vec3 pos =
      p0 * w(s, 0.0) +
      p1 * w(s, 1.0) +
      p2 * w(s, 2.0) +
      p3 * w(s, 3.0) +
      p4 * w(s, 4.0) +
      p5 * w(s, 5.0);

    // Idle drift — small enough to read as breathing, not motion.
    float t = uTime * 0.11;
    float seed = aRand * 6.2831853;
    pos.x += sin(t + seed) * 0.26 * uMotion;
    pos.y += cos(t * 0.86 + seed * 1.7) * 0.22 * uMotion;
    pos.z += sin(t * 0.74 + seed * 2.3) * 0.20 * uMotion;

    // Pointer parallax, weighted so near particles move more than far ones.
    float depthWeight = smoothstep(-16.0, 8.0, pos.z);
    pos.x += uPointer.x * (0.55 + aRand * 0.9) * depthWeight;
    pos.y += uPointer.y * (0.45 + aRand * 0.8) * depthWeight;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;

    vRand = aRand;
    vDepth = -mv.z;
    gl_PointSize = uSize * uPixelRatio * (0.55 + aRand * 1.1) * (20.0 / max(vDepth, 0.25));
  }
`

const fragmentShader = /* glsl */ `
  precision mediump float;

  uniform vec3  uColor;
  uniform vec3  uAccent;
  uniform float uAccentMix;
  uniform vec3  uGold;
  uniform float uGoldMix;
  uniform float uOpacity;

  varying float vRand;
  varying float vDepth;

  void main() {
    vec2 offset = gl_PointCoord - 0.5;
    float d = length(offset);
    if (d > 0.5) discard;

    // Soft falloff gives the glow without a bloom pass.
    float alpha = smoothstep(0.5, 0.0, d);
    alpha *= alpha;

    float fog = 1.0 - smoothstep(16.0, 44.0, vDepth);
    vec3 color = mix(uColor, uAccent, step(1.0 - uAccentMix, vRand));
    color = mix(color, uGold, step(1.0 - uGoldMix, vRand));

    gl_FragColor = vec4(color, alpha * uOpacity * fog);
  }
`

export function ParticleField({
  count,
  heroShift,
  pointSize,
}: {
  count: number
  heroShift: number
  pointSize: number
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const geometryRef = useRef<THREE.BufferGeometry>(null)
  const dpr = useThree((state) => state.viewport.dpr)

  const layouts = useMemo(() => buildLayouts(count, 20260919, heroShift), [count, heroShift])
  const randoms = useMemo(() => seededRandoms(count), [count])

  const uniforms = useMemo(
    () => ({
      uStage: { value: 0 },
      uTime: { value: 0 },
      uSize: { value: 2.25 },
      uMotion: { value: 1 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uPixelRatio: { value: 1 },
      uColor: { value: new THREE.Color('#f5f5f0') },
      uAccent: { value: new THREE.Color('#8cc63f') },
      uAccentMix: { value: 0.12 },
      uGold: { value: new THREE.Color('#d4af37') },
      uGoldMix: { value: 0.03 },
      uOpacity: { value: 0.0 },
    }),
    [],
  )

  useEffect(() => {
    uniforms.uPixelRatio.value = dpr
    uniforms.uSize.value = pointSize
  }, [dpr, pointSize, uniforms])

  // Points travel a long way between stages; a fixed, generous bounding sphere
  // keeps them from being culled mid-morph.
  useEffect(() => {
    const geometry = geometryRef.current
    if (!geometry) return
    geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 40)
  }, [count])

  useFrame((_, delta) => {
    const material = materialRef.current
    if (!material) return

    const step = Math.min(delta, 0.05)
    const eased = easeStage(sceneState.stage)

    // Damp the stage itself so flick-scrolling still resolves cinematically.
    material.uniforms.uStage.value = THREE.MathUtils.damp(
      material.uniforms.uStage.value,
      eased,
      4.5,
      step,
    )
    material.uniforms.uTime.value += step * (sceneState.reduceMotion ? 0 : 1)
    material.uniforms.uMotion.value = sceneState.reduceMotion ? 0 : 1
    material.uniforms.uPointer.value.set(sceneState.smoothX * 1.1, sceneState.smoothY * 0.8)

    // Selected-work state lifts the accent share; convergence calms it again.
    const stage = material.uniforms.uStage.value
    const highlight = Math.max(0, 1 - Math.abs(stage - 4))
    const converge = Math.max(0, 1 - Math.abs(stage - 5))
    material.uniforms.uAccentMix.value = 0.1 + highlight * 0.14 + converge * 0.05
    material.uniforms.uGoldMix.value = 0.022 + highlight * 0.03 + converge * 0.012

    // Fade in on first frames rather than popping.
    material.uniforms.uOpacity.value = THREE.MathUtils.damp(
      material.uniforms.uOpacity.value,
      0.78,
      1.6,
      step,
    )
  })

  return (
    <points frustumCulled={false}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute attach="attributes-position" args={[layouts[0], 3]} />
        <bufferAttribute attach="attributes-p0" args={[layouts[0], 3]} />
        <bufferAttribute attach="attributes-p1" args={[layouts[1], 3]} />
        <bufferAttribute attach="attributes-p2" args={[layouts[2], 3]} />
        <bufferAttribute attach="attributes-p3" args={[layouts[3], 3]} />
        <bufferAttribute attach="attributes-p4" args={[layouts[4], 3]} />
        <bufferAttribute attach="attributes-p5" args={[layouts[5], 3]} />
        <bufferAttribute attach="attributes-aRand" args={[randoms, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
