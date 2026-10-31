/**
 * Writes dist/llms.txt (https://llmstxt.org) from the site content. Run after `vite build`.
 * A curated, link-first map of the site for answer engines; derived from the same data as
 * the pages so it cannot drift from them.
 */
import { writeFileSync } from 'node:fs'
import { site, team } from '../src/data/site.ts'
import { services, serviceGroups, serviceBySlug } from '../src/data/services.ts'
import { caseStudies, industries, industryBySlug } from '../src/data/work.ts'
import { posts } from '../src/data/posts.ts'

const url = (path) => `${site.url}${path}`
const link = (title, path, note) => `- [${title}](${url(path)})${note ? `: ${note}` : ''}`

const lines = [
  `# ${site.name}`,
  '',
  `> ${site.legalName} is an AI, software engineering, machine learning and data company in ${site.location}. ` +
    'It builds AI-powered software, generative AI and RAG applications, AI agents, data platforms and ' +
    'modern web products, engineered for production and measurable business impact.',
  '',
  `Tagline: ${site.tagline}`,
  `Contact: ${site.email} · ${site.phone} · WhatsApp https://wa.me/${site.whatsapp}`,
  `Team: ${team.map((member) => `${member.name} (${member.role})`).join(', ')}`,
  '',
  '## Services',
  '',
  link('All services', '/services', 'overview of every service, grouped by area'),
]

for (const group of serviceGroups) {
  lines.push('', `### ${group.heading}`, '')
  for (const slug of group.slugs) {
    const service = serviceBySlug.get(slug)
    if (service) lines.push(link(service.title, `/services/${service.slug}`, service.description))
  }
}
const grouped = new Set(serviceGroups.flatMap((group) => group.slugs))
const ungrouped = services.filter((service) => !grouped.has(service.slug))
if (ungrouped.length) {
  lines.push('', '### Other services', '')
  for (const service of ungrouped) lines.push(link(service.title, `/services/${service.slug}`, service.description))
}

lines.push('', '## Work', '', link('All work', '/work', 'domains and case studies'))
for (const industry of industries) {
  lines.push(link(industry.name, `/work/${industry.slug}`, industry.headline))
}
lines.push('', '### Case studies', '')
for (const study of caseStudies) {
  const industry = industryBySlug.get(study.industry)
  lines.push(
    link(study.title, `/work/${study.industry}/${study.slug}`, `${industry ? `${industry.name}. ` : ''}${study.summary}`),
  )
}

lines.push('', '## Insights', '', link('All articles', '/blog', 'engineering notes on AI, data and software'))
for (const post of [...posts].sort((a, b) => b.date.localeCompare(a.date))) {
  lines.push(link(post.title, `/blog/${post.slug}`, `${post.date}. ${post.summary}`))
}

lines.push(
  '',
  '## Company',
  '',
  link('About', '/about', 'who we are, the team and the principles we work by'),
  link('Method', '/method', 'how we take a problem from discovery to production'),
  link('Contact', '/contact', 'start a project or ask a question'),
  '',
  '## Optional',
  '',
  link('Sitemap', '/sitemap.xml', 'every indexable URL'),
  '',
)

writeFileSync('dist/llms.txt', lines.join('\n'))
console.log(`llms.txt: ${services.length} services, ${caseStudies.length} case studies, ${posts.length} posts`)
