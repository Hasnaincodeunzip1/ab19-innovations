/**
 * Procedural position sets for the six scroll states of the AB19 scene.
 *
 * Every layout returns a flat Float32Array of xyz triples for the same particle
 * count, so the GPU can morph between any two of them by index. Layouts are
 * generated from a seeded PRNG: the same build always produces the same world.
 */

export const STAGES = [
  'field', // hero        — abstract computational field
  'systems', // services  — the network separates into structured systems
  'network', // ai        — nodes converge, interconnection intensifies
  'lattice', // technology— particles resolve into architectural structure
  'constellation', // work— sparse field, selected clusters stand out
  'core', // contact      — everything converges into a single elegant form
] as const

export type Stage = (typeof STAGES)[number]
export const STAGE_COUNT = STAGES.length

/** Deterministic PRNG so the composition is identical on every load. */
function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

type Rng = () => number

function unitVector(rng: Rng): [number, number, number] {
  const u = rng() * 2 - 1
  const theta = rng() * Math.PI * 2
  const r = Math.sqrt(1 - u * u)
  return [r * Math.cos(theta), u, r * Math.sin(theta)]
}

/** Evenly distributed direction on a sphere — used where regularity should read as design. */
function fibonacciDirection(i: number, n: number): [number, number, number] {
  const y = 1 - (i / Math.max(n - 1, 1)) * 2
  const radius = Math.sqrt(Math.max(0, 1 - y * y))
  const phi = i * 2.399963229728653 // golden angle
  return [Math.cos(phi) * radius, y, Math.sin(phi) * radius]
}

/* ------------------------------------------------------------------ *
 * Stage 0 — FIELD: a wide, soft computational cloud.
 * ------------------------------------------------------------------ */
function field(count: number, rng: Rng, heroShiftX = 0) {
  const out = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const [dx, dy, dz] = unitVector(rng)
    const r = Math.pow(rng(), 0.55)
    out[i * 3] = dx * r * 16 + heroShiftX
    out[i * 3 + 1] = dy * r * 8.5
    out[i * 3 + 2] = dz * r * 11 - 2
  }
  return out
}

/* ------------------------------------------------------------------ *
 * Stage 1 — SYSTEMS: discrete modules, loosely coupled.
 * ------------------------------------------------------------------ */
const MODULES: Array<[number, number, number, number]> = [
  // x, y, z, tilt
  [-12.5, 1.8, -3, 0.5],
  [-6.2, -1.4, 1.5, -0.3],
  [0, 0.9, -0.5, 0.22],
  [6.2, -1.9, 2.2, -0.45],
  [12.5, 1.2, -2, 0.35],
]

function systems(count: number, rng: Rng) {
  const out = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    // A tenth of the cloud becomes the links running between modules.
    if (rng() < 0.1) {
      const a = MODULES[Math.floor(rng() * (MODULES.length - 1))]
      const b = MODULES[MODULES.indexOf(a) + 1]
      const t = rng()
      out[i * 3] = a[0] + (b[0] - a[0]) * t + (rng() - 0.5) * 0.5
      out[i * 3 + 1] = a[1] + (b[1] - a[1]) * t + (rng() - 0.5) * 0.5
      out[i * 3 + 2] = a[2] + (b[2] - a[2]) * t + (rng() - 0.5) * 0.5
      continue
    }

    const m = MODULES[Math.floor(rng() * MODULES.length)]
    const angle = rng() * Math.PI * 2
    const radius = 1.2 + Math.sqrt(rng()) * 2.1
    const lx = Math.cos(angle) * radius
    const ly = Math.sin(angle) * radius
    const lz = (rng() - 0.5) * 0.6

    // Tilt each disc around x so the set reads as a system, not a row of targets.
    const tilt = m[3]
    out[i * 3] = m[0] + lx
    out[i * 3 + 1] = m[1] + ly * Math.cos(tilt) - lz * Math.sin(tilt)
    out[i * 3 + 2] = m[2] + ly * Math.sin(tilt) + lz * Math.cos(tilt)
  }
  return out
}

/* ------------------------------------------------------------------ *
 * Stage 2 — NETWORK: concentric shells, dense and interconnected.
 * ------------------------------------------------------------------ */
function network(count: number, rng: Rng) {
  const out = new Float32Array(count * 3)
  const shells = [3.6, 5.4, 7.2]
  for (let i = 0; i < count; i++) {
    const roll = rng()
    let x: number, y: number, z: number

    if (roll < 0.62) {
      const shell = shells[i % shells.length]
      const [dx, dy, dz] = fibonacciDirection(i, count)
      const jitter = 1 + (rng() - 0.5) * 0.16
      x = dx * shell * jitter
      y = dy * shell * jitter
      z = dz * shell * jitter
    } else if (roll < 0.85) {
      const [dx, dy, dz] = unitVector(rng)
      const r = Math.pow(rng(), 0.7) * 2.6
      x = dx * r
      y = dy * r
      z = dz * r
    } else {
      const [dx, dy, dz] = unitVector(rng)
      const r = 8.5 + rng() * 5
      x = dx * r
      y = dy * r * 0.6
      z = dz * r
    }

    out[i * 3] = x
    out[i * 3 + 1] = y
    out[i * 3 + 2] = z - 1
  }
  return out
}

/* ------------------------------------------------------------------ *
 * Stage 3 — LATTICE: an explicit scaffold of struts, not a point cloud.
 * Particles are strung along regularly spaced lines in x, y and z so the
 * state reads unmistakably as structure under perspective.
 * ------------------------------------------------------------------ */
function lattice(count: number, rng: Rng) {
  const out = new Float32Array(count * 3)
  const half: [number, number, number] = [9, 5.25, 6]
  const cols = 7 // divisions along x
  const rows = 5 // divisions along y
  const depths = 5 // divisions along z

  const at = (i: number, n: number, extent: number) => (i / (n - 1) - 0.5) * extent * 2

  // Each strut is an axis plus the two fixed coordinates it is pinned to.
  type Strut = { axis: 0 | 1 | 2; a: number; b: number }
  const struts: Strut[] = []
  for (let iy = 0; iy < rows; iy++)
    for (let iz = 0; iz < depths; iz++) struts.push({ axis: 0, a: at(iy, rows, half[1]), b: at(iz, depths, half[2]) })
  for (let ix = 0; ix < cols; ix++)
    for (let iz = 0; iz < depths; iz++) struts.push({ axis: 1, a: at(ix, cols, half[0]), b: at(iz, depths, half[2]) })
  for (let ix = 0; ix < cols; ix++)
    for (let iy = 0; iy < rows; iy++) struts.push({ axis: 2, a: at(ix, cols, half[0]), b: at(iy, rows, half[1]) })

  const perStrut = Math.max(2, Math.ceil(count / struts.length))

  for (let i = 0; i < count; i++) {
    const strut = struts[i % struts.length]
    const step = Math.floor(i / struts.length) % perStrut
    const t = (step / (perStrut - 1)) * 2 - 1
    const jitter = () => (rng() - 0.5) * 0.09

    let x: number
    let y: number
    let z: number
    if (strut.axis === 0) {
      x = t * half[0]
      y = strut.a
      z = strut.b
    } else if (strut.axis === 1) {
      x = strut.a
      y = t * half[1]
      z = strut.b
    } else {
      x = strut.a
      y = strut.b
      z = t * half[2]
    }

    out[i * 3] = x + jitter()
    out[i * 3 + 1] = y + jitter()
    out[i * 3 + 2] = z + jitter() - 1
  }
  return out
}

/* ------------------------------------------------------------------ *
 * Stage 4 — CONSTELLATION: three worked systems, the rest recedes.
 * ------------------------------------------------------------------ */
const CLUSTERS: Array<[number, number, number]> = [
  [-9.5, 2.6, -2],
  [0.5, -2.8, 2.5],
  [9.5, 1.4, -3],
]

function gaussian(rng: Rng) {
  const u = Math.max(rng(), 1e-6)
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rng())
}

function constellation(count: number, rng: Rng) {
  const out = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    if (rng() < 0.55) {
      const c = CLUSTERS[i % CLUSTERS.length]
      out[i * 3] = c[0] + gaussian(rng) * 1.9
      out[i * 3 + 1] = c[1] + gaussian(rng) * 1.6
      out[i * 3 + 2] = c[2] + gaussian(rng) * 1.6
    } else {
      const [dx, dy, dz] = unitVector(rng)
      const r = 13 + rng() * 9
      out[i * 3] = dx * r
      out[i * 3 + 1] = dy * r * 0.5
      out[i * 3 + 2] = dz * r - 4
    }
  }
  return out
}

/* ------------------------------------------------------------------ *
 * Stage 5 — CORE: one resolved form.
 * ------------------------------------------------------------------ */
function core(count: number, rng: Rng) {
  const out = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    if (rng() < 0.17) {
      // A thin orbital ring keeps the sphere from reading as a ball.
      const angle = rng() * Math.PI * 2
      const r = 8.4 + (rng() - 0.5) * 0.25
      out[i * 3] = Math.cos(angle) * r
      out[i * 3 + 1] = (rng() - 0.5) * 0.3
      out[i * 3 + 2] = Math.sin(angle) * r
    } else {
      const [dx, dy, dz] = fibonacciDirection(i, count)
      const r = 5.4 * (1 + (rng() - 0.5) * 0.045)
      out[i * 3] = dx * r
      out[i * 3 + 1] = dy * r
      out[i * 3 + 2] = dz * r
    }
  }
  return out
}

const GENERATORS: Record<Stage, (count: number, rng: Rng, shift?: number) => Float32Array> = {
  field,
  systems,
  network,
  lattice,
  constellation,
  core,
}

/**
 * Builds all six position sets for `count` points.
 * `heroShiftX` pushes the opening field clear of the hero copy — zero on
 * phones, where the copy sits above the scene rather than beside it.
 */
export function buildLayouts(count: number, seed = 20260919, heroShiftX = 4.5) {
  return STAGES.map((stage, i) =>
    GENERATORS[stage](count, mulberry32(seed + i * 7919), heroShiftX),
  )
}

/** A stable per-particle random, used for size, colour and drift offsets. */
export function seededRandoms(count: number, seed = 404011) {
  const rng = mulberry32(seed)
  const out = new Float32Array(count)
  for (let i = 0; i < count; i++) out[i] = rng()
  return out
}
