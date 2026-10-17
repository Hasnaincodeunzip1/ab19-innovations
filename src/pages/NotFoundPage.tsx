import { PageHero } from '../components/ui/PageHero'
import { CtaBand } from '../components/ui/CtaBand'
import { useSeo } from '../hooks/useSeo'
import { useScenePlan } from '../hooks/useScenePlan'
import type { StageAnchor } from '../three/sceneStore'

const PLAN: StageAnchor[] = [
  { id: 'top', stage: 4.2 },
  { id: 'cta', stage: 5 },
]

export default function NotFoundPage() {
  useScenePlan(PLAN)
  useSeo({
    title: 'Page not found | AB19 Innovations',
    description: 'That page does not exist.',
    path: '/404',
  })

  return (
    <>
      <PageHero
        eyebrow="404"
        title={
          <>
            That page isn’t here<span className="text-accent">.</span>
          </>
        }
        intro="The link is wrong, or the page moved. Both are our problem rather than yours — the services, work and insights are all still where you would expect."
      />
      <CtaBand
        heading="Try one of these instead."
        body="Start with what we do, or with what we have built."
        secondary={{ label: 'All services', to: '/services' }}
      />
    </>
  )
}
