/**
 * Abstract, hand-built diagrams standing in for each case study.
 * No stock imagery — each motif nods at the system it represents.
 */
const stroke = 'var(--color-line-strong)'

function Claims() {
  return (
    <svg viewBox="0 0 320 220" fill="none" className="size-full" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={36 + i * 14}
          y={30 + i * 10}
          width="180"
          height="140"
          stroke={stroke}
          strokeWidth="1"
        />
      ))}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line
          key={i}
          x1="80"
          x2={i % 2 ? 220 : 190}
          y1={72 + i * 16}
          y2={72 + i * 16}
          stroke="var(--color-line)"
          strokeWidth="1"
        />
      ))}
      <line x1="64" x2="272" y1="126" y2="126" stroke="var(--color-accent)" strokeWidth="1" />
      <circle cx="272" cy="126" r="3" fill="var(--color-accent)" />
      <rect x="236" y="48" width="48" height="48" stroke={stroke} strokeWidth="1" />
      <rect x="252" y="64" width="16" height="16" fill="var(--color-accent)" opacity="0.7" />
    </svg>
  )
}

function Pipeline() {
  const bars = [14, 34, 22, 48, 30, 58, 26, 40, 18, 52, 24, 36, 16, 44, 28]
  return (
    <svg viewBox="0 0 320 220" fill="none" className="size-full" aria-hidden="true">
      <line x1="24" x2="296" y1="110" y2="110" stroke="var(--color-line)" strokeWidth="1" />
      {bars.map((h, i) => (
        <rect
          key={i}
          x={30 + i * 18}
          y={110 - h / 2}
          width="3"
          height={h}
          fill={i === 5 || i === 9 ? 'var(--color-accent)' : 'var(--color-fg-faint)'}
          opacity={i === 5 || i === 9 ? 0.9 : 0.55}
        />
      ))}
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={30 + i * 96}
          y="160"
          width="76"
          height="30"
          stroke={stroke}
          strokeWidth="1"
        />
      ))}
      <path d="M106 175h20M202 175h20" stroke="var(--color-accent)" strokeWidth="1" />
      <rect x="30" y="34" width="76" height="30" stroke={stroke} strokeWidth="1" />
      <path d="M68 64v22" stroke="var(--color-line)" strokeWidth="1" />
    </svg>
  )
}

function Graph() {
  const nodes = [
    [70, 60],
    [150, 40],
    [240, 72],
    [60, 140],
    [160, 120],
    [250, 158],
    [120, 184],
  ] as const
  return (
    <svg viewBox="0 0 320 220" fill="none" className="size-full" aria-hidden="true">
      {nodes.map(([x, y], i) =>
        nodes.slice(i + 1).map(([x2, y2], j) => (
          <line
            key={`${i}-${j}`}
            x1={x}
            y1={y}
            x2={x2}
            y2={y2}
            stroke="var(--color-line)"
            strokeWidth="1"
          />
        )),
      )}
      {nodes.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i === 4 ? 6 : 3}
          fill={i === 4 ? 'var(--color-accent)' : 'var(--color-fg-faint)'}
        />
      ))}
      <circle cx="160" cy="120" r="24" stroke="var(--color-accent)" strokeWidth="1" opacity="0.4" />
      <circle cx="160" cy="120" r="44" stroke="var(--color-accent)" strokeWidth="1" opacity="0.15" />
    </svg>
  )
}

const motifs = { claims: Claims, pipeline: Pipeline, graph: Graph }

export type Motif = keyof typeof motifs

export function CaseVisual({ motif }: { motif: Motif }) {
  const Component = motifs[motif]
  return (
    <div className="relative aspect-[16/11] w-full overflow-hidden border border-line bg-ink-raised/70 p-6 transition-colors duration-500 group-hover/case:border-line-strong sm:p-8">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-50 [background-image:linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(90%_80%_at_50%_50%,#000,transparent)]"
      />
      <div className="relative size-full transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover/case:scale-[1.02]">
        <Component />
      </div>
    </div>
  )
}
