import { Hero } from '../components/Hero'
import { Metrics } from '../components/Metrics'
import { IntroSection } from '../components/IntroSection'
import { ServicesSection } from '../components/ServicesSection'
import { AISection } from '../components/AISection'
import { TechnologyMarquee } from '../components/TechnologyMarquee'
import { CaseStudies } from '../components/CaseStudies'
import { MethodSection } from '../components/MethodSection'
import { FounderSection } from '../components/FounderSection'
import { Principles } from '../components/Principles'
import { ContactCTA } from '../components/ContactCTA'
import { useSeo } from '../hooks/useSeo'
import { useScenePlan } from '../hooks/useScenePlan'
import { HOME_PLAN } from '../three/sceneStore'

export default function HomePage() {
  useScenePlan(HOME_PLAN)
  useSeo({
    title: 'AB19 Innovations — AI, Software & Data Engineering | Building products that solve real-world problems.',
    description:
      'AB19 Innovations builds AI-powered software, machine learning systems, generative AI and RAG applications, AI agents, data platforms and modern web products engineered for measurable business impact.',
    path: '/',
  })

  return (
    <>
      <Hero />
      <Metrics />
      <IntroSection />
      <ServicesSection />
      <AISection />
      <TechnologyMarquee />
      <CaseStudies />
      <MethodSection />
      <FounderSection />
      <Principles />
      <ContactCTA />
    </>
  )
}
