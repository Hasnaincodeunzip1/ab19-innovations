import { useEffect, useState } from 'react'

/**
 * Tracks which of the given section ids is currently in view.
 * Returns null when none of them is — e.g. while the hero fills the screen —
 * so the navigation does not keep highlighting the section we last left.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (sections.length === 0) return

    const visibility = new Map<string, number>()

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visibility.set(entry.target.id, entry.intersectionRatio)
          else visibility.delete(entry.target.id)
        }

        let best: string | null = null
        let bestRatio = -1
        for (const [id, ratio] of visibility) {
          if (ratio > bestRatio) {
            best = id
            bestRatio = ratio
          }
        }
        setActive(best)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )

    for (const section of sections) io.observe(section)
    return () => io.disconnect()
  }, [ids])

  return active
}
