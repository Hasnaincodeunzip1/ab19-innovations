import { useLayoutEffect } from 'react'
import { HOME_PLAN, setStagePlan, type StageAnchor } from '../three/sceneStore'

/**
 * Hands the WebGL world this page's story: which anchors map to which visual
 * state. Registered in layout so the scene is already correct on first paint.
 */
export function useScenePlan(plan: StageAnchor[]) {
  useLayoutEffect(() => {
    setStagePlan(plan)
    return () => setStagePlan(HOME_PLAN)
  }, [plan])
}
