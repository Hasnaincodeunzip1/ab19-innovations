/**
 * Single source of truth for every piece of site copy.
 * Components stay presentational; content lives here.
 */

export const site = {
  name: 'AB19 Innovations',
  tagline: 'Building products that solve real-world problems.',
  email: 'founder@ab19innovations.com',
  phone: '+91 79055 44611',
  /** Digits only, for wa.me links. */
  whatsapp: '917905544611',
  url: 'https://www.ab19innovations.in',
  location: 'Gorakhpur, Uttar Pradesh, India',
  legalName: 'AB19 Innovations Private Limited',
} as const

export type NavItem = {
  label: string
  href: string
  /** Opens a mega panel rather than navigating on hover/focus. */
  panel?: 'services' | 'work' | 'insights'
}

/** wa.me link, optionally pre-filled with a message. */
export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${site.whatsapp}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export const nav: NavItem[] = [
  { label: 'Services', href: '/services', panel: 'services' },
  { label: 'Method', href: '/method' },
  { label: 'Work', href: '/work', panel: 'work' },
  { label: 'Insights', href: '/blog' },
  { label: 'About', href: '/about' },
]

export const metrics = [
  { value: '4+', label: 'Years engineering experience' },
  { value: '10K+', label: 'Users served by systems engineered' },
  { value: '95%', label: 'AI transcription accuracy' },
  { value: '25%', label: 'Processing efficiency improvement' },
] as const

export const aiPillars = [
  {
    index: '01',
    title: 'Generative AI',
    description:
      'Build intelligent applications using modern language models, RAG architectures and domain-specific knowledge.',
    stack: ['LLM applications', 'Retrieval / RAG', 'Knowledge systems'],
  },
  {
    index: '02',
    title: 'AI Agents',
    description: 'Design systems that reason, interact with tools and execute business workflows.',
    stack: ['Tool use', 'Orchestration', 'Workflow execution'],
  },
  {
    index: '03',
    title: 'Machine Learning',
    description:
      'Build predictive and recommendation systems that turn data into measurable outcomes.',
    stack: ['Prediction', 'Recommendation', 'Optimization'],
  },
] as const

export const technologies = [
  'Python',
  'TypeScript',
  'JavaScript',
  'React',
  'Next.js',
  'Node.js',
  'FastAPI',
  'Django',
  'Flask',
  'TensorFlow',
  'PyTorch',
  'scikit-learn',
  'OpenCV',
  'PostgreSQL',
  'MongoDB',
  'MySQL',
  'Docker',
  'GCP',
  'Azure',
  'RabbitMQ',
  'FFmpeg',
] as const

export const domains = [
  'Healthcare & claims',
  'Media & video',
  'Commerce & personalization',
  'Enterprise platforms',
] as const

export const method = [
  {
    index: '01',
    title: 'Discover',
    description: 'Understand the business problem, users and desired outcome.',
  },
  {
    index: '02',
    title: 'Design',
    description: 'Define the architecture, experience and technical direction.',
  },
  {
    index: '03',
    title: 'Build',
    description: 'Engineer the product, AI system or infrastructure.',
  },
  {
    index: '04',
    title: 'Deploy',
    description: 'Test, optimize and launch production systems.',
  },
  {
    index: '05',
    title: 'Evolve',
    description: 'Measure, improve and continuously evolve the technology.',
  },
] as const

export const team = [
  {
    slug: 'bushara',
    name: 'Bushara',
    role: 'Founder & Director',
    photo: '/team-bushara.jpg',
    photoAlt: 'Bushara, Founder and Director of AB19 Innovations',
    bio: 'Bushara is the Founder and Director of AB19 Innovations Private Limited. She is committed to building meaningful digital products that address real-world needs and create value for businesses and communities. Through AB19 Innovations, she aims to help turn promising ideas into practical, user-focused solutions.',
  },
  {
    slug: 'anmol',
    name: 'Anmol',
    role: 'Co-founder & Director',
    photo: '/team-anmol.jpg',
    photoAlt: 'Anmol, Co-founder and Director of AB19 Innovations',
    bio: 'Anmol is the Co-founder and Director of AB19 Innovations Private Limited, bringing a software development and technology-focused perspective to the company. He is passionate about building reliable digital products, modern applications, and technology solutions that solve practical problems. His vision is to transform innovative ideas into useful products that can grow with the needs of businesses and users.',
  },
  {
    slug: 'hasnain-ahmad-khan',
    name: 'Hasnain Ahmad Khan',
    role: 'CTO',
    photo: '/founder.jpg',
    photoAlt: 'Hasnain Ahmad Khan, CTO of AB19 Innovations',
    bio: 'Hasnain Ahmad Khan is the CTO of AB19 Innovations, a Software Development Engineer specializing in artificial intelligence, machine learning and full-stack development. His engineering experience spans production AI systems, scalable backend infrastructure, modern web applications, data platforms and intelligent automation.',
  },
] as const

export type TeamMember = (typeof team)[number]

export const principles = [
  {
    index: '01',
    title: 'Engineering First',
    description: 'Technology should work in production, not just in a presentation.',
  },
  {
    index: '02',
    title: 'AI With Purpose',
    description:
      'Use AI where it creates measurable value rather than adding AI for its own sake.',
  },
  {
    index: '03',
    title: 'Built to Scale',
    description: 'Architecture should support the next stage of the business.',
  },
  {
    index: '04',
    title: 'Continuous Innovation',
    description: 'Technology should evolve as the business evolves.',
  },
] as const

export const footerColumns = [
  {
    heading: 'Services',
    links: [
      { label: 'Web Development', href: '/services/web-development' },
      { label: 'Custom Software', href: '/services/custom-software' },
      { label: 'AI Development', href: '/services/ai-development' },
      { label: 'Generative AI & RAG', href: '/services/generative-ai-rag' },
      { label: 'Machine Learning', href: '/services/machine-learning' },
      { label: 'Data & Analytics', href: '/services/data-analytics' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Method', href: '/method' },
      { label: 'Work', href: '/work' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Insights', href: '/blog' },
      { label: 'All services', href: '/services' },
      { label: 'Privacy Policy', href: '/contact' },
      { label: 'Terms', href: '/contact' },
      { label: 'Sitemap', href: '/sitemap.xml' },
    ],
  },
] as const
