/** Writes dist/sitemap.xml from the route list. Run after `vite build`. */
import { writeFileSync } from 'node:fs'
import { routes, SITE_URL } from './routes.mjs'

const today = new Date().toISOString().slice(0, 10)

const body = routes
  .map(
    (route) => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${route.lastmod ?? today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join('\n')

writeFileSync(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`,
)

console.log(`sitemap: ${routes.length} routes`)
