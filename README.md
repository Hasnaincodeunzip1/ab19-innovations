# AB19 Innovations

Marketing site for **AB19 Innovations** — AI, software engineering, machine learning and
data technology. Dark-first, typography-led, editorial.

> **Building products that solve real-world problems.**

## Pages

| Route | What it is |
| --- | --- |
| `/` | The long-form home narrative |
| `/services` | Filterable index of all ten services |
| `/services/:slug` | Service detail — definition, before/after, offerings, deliverables, FAQ |
| `/method` | Five pinned, scroll-driven phase panels |
| `/work` | Domains and case studies |
| `/work/:industry` | Domain perspective and the work in it |
| `/work/:industry/:slug` | Case study, with a light reading panel and sticky TOC |
| `/about` | Company, numbers, team, principles |
| `/blog` | Insights index with category filtering |
| `/blog/:slug` | Post, with an abstract rail for readers and answer engines |
| `/contact` | A four-question conversational brief |

## Stack

- **React 19** + **TypeScript** (Vite) with **React Router**
- **Three.js / React Three Fiber / @react-three/drei** — the scroll-driven WebGL world
- **Framer Motion** — hero entrance orchestration and the scroll-linked progress rail
- **Lenis** — inertial smooth scrolling, so the page reads as one continuous move
- **Tailwind CSS v4** (CSS-first config — tokens live in `src/index.css` under `@theme`)
- **Inter Variable**, self-hosted via `@fontsource-variable/inter` (no runtime font CDN)
- No UI framework and no icon library — every card, arrow, diagram and shader is hand-written

## Commands

```bash
npm install
npm run dev         # dev server
npm run build       # typecheck, build, generate sitemap, prerender every route
npm run build:fast  # typecheck + build only, skipping prerender
npm run preview     # serve the production build
npm run lint        # oxlint
```

`build` runs two extra steps after Vite:

- `scripts/sitemap.mjs` writes `dist/sitemap.xml` from `scripts/routes.mjs`, which derives
  the route list from the content itself — add a service or a post and the sitemap follows.
- `scripts/prerender.mjs` drives the built bundle in headless Chrome (WebGL disabled) and
  writes static HTML for all 31 routes plus `404.html`. Each is emitted as both
  `dist/<route>/index.html` and `dist/<route>.html` so it resolves on any static host.
  Set `CHROME_PATH` if Chrome is not at the macOS default location.

## Structure

```
public/            logo assets, founder.jpg, og-image.png, robots.txt
index.html         document head: SEO meta, Open Graph, X/Twitter, JSON-LD
src/
  data/
    site.ts        global copy — navigation, metrics, method, founder, footer
    services.ts    all ten services, including everything their detail pages render
    work.ts        domains and case studies
    posts.ts       the blog
  hooks/           useReveal (shared IntersectionObserver), useScrolled,
                   useActiveSection, useSmoothScroll (Lenis)
  lib/cn.ts        class-name joiner
  three/
    layouts.ts     procedural position sets for the six states (seeded, deterministic)
    sceneStore.ts  mutable scroll/pointer state, quality detection, WebGL probe
    ParticleField  GPU-morphing point cloud (custom GLSL)
    NodeNetwork    InstancedMesh nodes + per-frame re-linked LineSegments
    CoreForm       the resolved object in the final state
    CameraRig      scroll interpolation + damped pointer parallax
    Scene          lighting and composition
    SceneCanvas    the <Canvas> — lazily imported, isolates three.js in its own chunk
  pages/           one file per route, each declaring its own SEO and scene plan
  components/
    layout/        RootLayout — the shell the router renders inside
    ui/            Reveal, Eyebrow, Arrow, ArrowLink, Button, SectionHeader,
                   PageHero, Breadcrumbs, MarkRow, ComparisonList,
                   OfferingsGrid, FaqAccordion, CtaBand
    SceneBackground ScrollRail
    Navbar Hero Metrics IntroSection
    ServiceFilters ServiceGrid ServicesSection
    AISection TechnologyMarquee CaseVisual CaseStudies
    MethodSection FounderSection Principles CareersSection ContactCTA Footer
  App.tsx          section order
  index.css        design tokens, base layer, utilities, motion
```

**Content is data-driven.** A service, case study or post is a record in `src/data/`. Adding
one gives you its detail page, its place in the index and mega menu, its structured data, its
sitemap entry and its prerendered HTML, with no component changes.

## Design system

| Token | Value | Use |
| --- | --- | --- |
| `--color-ink` | `#0A0A0A` | page background |
| `--color-ink-raised` | `#101010` | alternating section bands |
| `--color-ink-sunken` | `#060606` | footer |
| `--color-fg` | `#F5F5F0` | primary text |
| `--color-fg-muted` | `#A1A1A1` | secondary text |
| `--color-fg-faint` | `#6F6F6F` | tertiary text, indices |
| `--color-line` | `#242424` | hairline borders |
| `--color-line-strong` | `#333333` | hover borders, diagram strokes |
| `--color-accent` | `#B7F34A` | CTAs, indicators, numerals, arrows |
| `--color-accent-bright` | `#CDFF6E` | accent hover |

The accent is strictly an accent: the interface stays black, charcoal and off-white.

Custom utilities: `shell` (max-width 1500px + fluid gutters), `label` (uppercase eyebrow),
`text-balance-tight` (display headings), `reveal` / `card-in` (entrance motion),
`marquee-track`, `no-scrollbar`.

Hairline grids use per-item borders (or overlapping 1px outlines in the service grid) rather
than 1px gaps — gaps round away at some device pixel ratios.

## The WebGL layer

A single fixed canvas sits behind every section at `z-0`, never takes pointer events, and is
`aria-hidden`. The DOM above it is ordinary, crawlable HTML — nothing lives inside the canvas.

**Six states, anchored to real sections.** Each page declares a *scene plan* — which of its
anchors map to which visual state — via `useScenePlan`. Scroll position is resolved against
those anchors into one continuous value `0…5` that every system reads, so the world and the
copy always agree. The canvas lives in `RootLayout`, above the router, so navigating moves
through one continuous world rather than tearing it down and rebuilding it.

Pages occupy the slice of the world that matches what they are about: `/services` sits in
structured systems, `/work` in selected systems, `/blog` in the open field. The full arc
through to convergence is reserved for the home page, `/method` and `/contact` — the system
resolves when you are ready to talk.

| Stage | Section | The world |
| --- | --- | --- |
| 0 | Hero | a wide computational field, offset clear of the headline |
| 1 | Services | the field separates into five discrete, loosely linked modules |
| 2 | AI | modules collapse into concentric shells; linking reach nearly doubles |
| 3 | Technology | particles string onto an explicit scaffold of x/y/z struts |
| 4 | Work | three clusters remain, three nodes light up, the rest recedes |
| 5 | Contact | everything converges into one shell with an orbital ring, and a lit core |

**How the morph works.** All six position sets are generated once from a seeded PRNG and
uploaded as six `vec3` attributes. The vertex shader blends them with a branch-free weight
per stage — only two are ever non-zero — and the fractional part is smoothstepped, so
transitions ease rather than ramp. The stage value itself is critically damped, so a flicked
scroll still resolves cinematically. Nodes run the same maths on the CPU and re-link by
distance every frame.

**Interaction.** The pointer is damped once per frame in `CameraRig` and read by every
system: the camera parallaxes, particles shift depth-weighted (near ones move more), and the
core drifts. Camera position interpolates between one authored transform per state, with a
very slow idle drift so a still page is never frozen.

**Performance.**

- Quality tier from viewport, pointer type, `hardwareConcurrency` and `deviceMemory`:
  2,200 / 4,600 / 7,200 particles and 34 / 54 / 72 nodes.
- DPR capped at 1 / 1.5 / 1.75 by tier, plus drei's `AdaptiveDpr` on sustained regression.
- The world is *scaled* to the viewport aspect rather than the camera retreating, so phones
  keep points inside the fog's usable range instead of shrinking into it.
- No post-processing: additive point sprites with a soft falloff produce the glow, which
  costs one pass instead of three.
- `frameloop` switches to `never` while the tab is hidden.
- three.js is a lazily-imported chunk. Devices without WebGL never download it; they get a
  static grid and an otherwise identical page.
- Measured 60fps at 1440×900 on SwiftShader (pure software rasteriser), so GPU headroom is
  not in question.

**Reduced motion.** `prefers-reduced-motion: reduce` skips Lenis entirely, zeroes every idle
amplitude and the pointer response, and leaves a still scene that only changes as the user
scrolls of their own accord.

**Readability first.** Sections sit on translucent `veil` gradients (soft-edged, so no
section announces itself with a hard band) and the hero adds a side scrim on desktop or an
even dim on phones. The world reads as depth behind the type, never through it.

## Accessibility

Semantic landmarks, exactly one `h1` per route, no skipped heading levels, skip link, visible
focus rings, `aria-expanded`/`aria-controls` and Escape-to-close on the mobile menu and mega
panels, `aria-pressed` filters with an `aria-live` result count, native `<details>` for every
FAQ, `aria-hidden` on decorative canvas/SVG/marquee duplicates, and a full
`prefers-reduced-motion` opt-out.

Verified across all 13 route templates at 390px and 1440px: no horizontal overflow, one `h1`,
no skipped heading levels, no unnamed links or images, structured data present, zero console
errors.

## SEO

`index.html` carries the title, description, keywords, canonical, Open Graph and X/Twitter
cards, plus JSON-LD for `Organization`, `WebSite` and `ProfessionalService` (with an
`OfferCatalog` of all ten services). `public/robots.txt` explicitly allows AI answer engines
(GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended) and points at
`public/sitemap.xml`.

## Before launch

Placeholders that need real values:

- **Canonical domain** — `https://www.ab19innovations.in` appears in `index.html`,
  `public/robots.txt`, `scripts/routes.mjs` and `src/data/site.ts`.
- **Contact details** live in `site` in `src/data/site.ts`: `founder@ab19innovations.com`
  and WhatsApp `+91 9026358544` (`whatsappUrl()` builds the wa.me links). They also appear in
  the JSON-LD in `index.html`, which is hand-maintained.
- **The contact brief has no backend.** It composes a message in the visitor's mail client and
  says so on screen. Point it at a real endpoint before launch if you want submissions stored.
- **Phone number** — none supplied; the footer renders `[ Phone number to be added ]` from
  `site.phone` in `src/data/site.ts`. Set `phone` to a real number to replace it.
- **Logo** — `public/logo.png` (512px master), with `logo-128.png` and `logo-64.png` for UI
  sizes, `favicon-32.png` and `apple-touch-icon.png`. Rendered by `components/ui/Logo.tsx`,
  which brightens the mark at small sizes because its fills are near-black on a near-black
  ground. All are generated from the 3D render — a flat SVG version would read sharper below
  32px if you ever have one.
- **Founder portrait** — `public/founder.jpg`, rendered by `components/ui/FounderPortrait.tsx`.
  Replace the file to change it; the 4:5 crop position is set there.
- **Metrics** — presented as *selected engineering experience* of the founding team, with a
  footnote saying so. Keep that framing unless the figures become company-wide.
