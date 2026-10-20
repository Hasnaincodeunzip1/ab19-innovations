/** The single source of truth for every indexable route, derived from the content. */
import { services } from '../src/data/services.ts'
import { caseStudies, industries } from '../src/data/work.ts'
import { posts } from '../src/data/posts.ts'

export const SITE_URL = 'https://ab19innovations.com'

export const routes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/services', priority: '0.9', changefreq: 'monthly' },
  ...services.map((service) => ({
    path: `/services/${service.slug}`,
    priority: '0.8',
    changefreq: 'monthly',
  })),
  { path: '/method', priority: '0.7', changefreq: 'yearly' },
  { path: '/work', priority: '0.8', changefreq: 'monthly' },
  ...industries.map((industry) => ({
    path: `/work/${industry.slug}`,
    priority: '0.7',
    changefreq: 'monthly',
  })),
  ...caseStudies.map((study) => ({
    path: `/work/${study.industry}/${study.slug}`,
    priority: '0.7',
    changefreq: 'yearly',
  })),
  { path: '/about', priority: '0.6', changefreq: 'yearly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  ...posts.map((post) => ({
    path: `/blog/${post.slug}`,
    priority: '0.6',
    changefreq: 'yearly',
    lastmod: post.date,
  })),
  { path: '/contact', priority: '0.7', changefreq: 'yearly' },
]
