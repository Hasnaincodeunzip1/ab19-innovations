import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { nav, site, whatsappUrl } from '../data/site'
import { serviceBySlug, serviceGroups, services } from '../data/services'
import { caseStudies, industries } from '../data/work'
import { posts } from '../data/posts'
import { useScrolled } from '../hooks/useScrolled'
import { getLenis } from '../hooks/useSmoothScroll'
import { Arrow } from './ui/Arrow'
import { Logo } from './ui/Logo'
import { WhatsAppIcon } from './ui/WhatsAppIcon'
import { cn } from '../lib/cn'

function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className="group/mark -ml-1 inline-flex items-center gap-2.5 px-1 py-1 text-[0.9375rem] font-medium tracking-[-0.015em] text-fg"
    >
      <Logo className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/mark:scale-110" />
      <span>
        AB19{' '}
        <span className="text-fg-muted transition-colors duration-300 group-hover/mark:text-fg">
          Innovations
        </span>
      </span>
    </Link>
  )
}

function PanelLink({
  to,
  title,
  body,
  onNavigate,
}: {
  to: string
  title: string
  body: string
  onNavigate: () => void
}) {
  return (
    <Link
      to={to}
      onClick={onNavigate}
      className="group/panel block border-t border-line py-3 transition-colors duration-300 hover:border-line-strong"
    >
      <span className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-fg transition-colors duration-300 group-hover/panel:text-accent">
          {title}
        </span>
        <Arrow className="size-3.5 shrink-0 text-fg-faint transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/panel:translate-x-1 group-hover/panel:text-accent" />
      </span>
      <span className="mt-1.5 block max-w-[34ch] text-xs leading-relaxed text-fg-faint">
        {body}
      </span>
    </Link>
  )
}

function ServicesPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="grid gap-x-10 gap-y-8 lg:grid-cols-4">
      {serviceGroups.map((group) => (
        <div key={group.heading}>
          <p className="label mb-3 text-fg-faint">{group.heading}</p>
          {group.slugs.map((slug) => {
            const service = serviceBySlug.get(slug)
            if (!service) return null
            return (
              <PanelLink
                key={slug}
                to={`/services/${slug}`}
                title={service.title}
                body={service.description}
                onNavigate={onNavigate}
              />
            )
          })}
        </div>
      ))}

      <div className="border-t border-line pt-5 lg:col-span-4">
        <Link
          to="/services"
          onClick={onNavigate}
          className="group/all inline-flex items-center gap-2.5 text-sm font-medium text-accent"
        >
          All {services.length} services
          <Arrow className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/all:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}

function WorkPanel({ onNavigate }: { onNavigate: () => void }) {
  const featured = caseStudies[0]
  return (
    <div className="grid gap-x-10 gap-y-8 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <p className="label mb-3 text-fg-faint">Domains</p>
        {industries.map((industry) => (
          <PanelLink
            key={industry.slug}
            to={`/work/${industry.slug}`}
            title={industry.name}
            body={industry.challenges[0].title}
            onNavigate={onNavigate}
          />
        ))}
      </div>

      <div className="lg:col-span-4">
        <p className="label mb-3 text-fg-faint">Case studies</p>
        {caseStudies.map((study) => (
          <PanelLink
            key={study.slug}
            to={`/work/${study.industry}/${study.slug}`}
            title={study.title}
            body={study.capabilities.join(' · ')}
            onNavigate={onNavigate}
          />
        ))}
      </div>

      <div className="lg:col-span-3">
        <p className="label mb-3 text-fg-faint">Featured</p>
        <Link
          to={`/work/${featured.industry}/${featured.slug}`}
          onClick={onNavigate}
          className="group/feature block border border-line p-5 transition-colors duration-300 hover:border-line-strong hover:bg-ink-raised/60"
        >
          <span className="label font-mono text-accent">Case study {featured.index}</span>
          <span className="mt-4 block text-base font-medium tracking-[-0.02em]">
            {featured.title}
          </span>
          <span className="mt-2 block text-xs leading-relaxed text-fg-faint">
            {featured.summary}
          </span>
          <span className="mt-4 flex items-center gap-2 text-xs text-fg-muted transition-colors duration-300 group-hover/feature:text-accent">
            Read the story
            <Arrow className="size-3.5 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/feature:translate-x-1" />
          </span>
        </Link>
      </div>
    </div>
  )
}

const PANELS = {
  services: ServicesPanel,
  work: WorkPanel,
  insights: null,
} as const

export function Navbar() {
  const scrolled = useScrolled(16)
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [panel, setPanel] = useState<string | null>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const headerRef = useRef<HTMLElement>(null)

  const closeAll = () => {
    setOpen(false)
    setPanel(null)
  }

  // Any navigation closes whatever is open. Links call closeAll themselves;
  // adjusting during render also covers back/forward, where no handler of ours
  // runs. This is the documented way to reset state when an input changes.
  const [lastPath, setLastPath] = useState(location.pathname)
  if (lastPath !== location.pathname) {
    setLastPath(location.pathname)
    setOpen(false)
    setPanel(null)
  }

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    getLenis()?.stop()
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      getLenis()?.start()
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  // A mega panel closes on Escape or when focus leaves the header entirely.
  useEffect(() => {
    if (!panel) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPanel(null)
    }
    const onFocusIn = (event: FocusEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setPanel(null)
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('focusin', onFocusIn)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('focusin', onFocusIn)
    }
  }, [panel])

  const ActivePanel = panel ? PANELS[panel as keyof typeof PANELS] : null

  return (
    <header
      ref={headerRef}
      onMouseLeave={() => setPanel(null)}
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500',
        scrolled || open || panel
          ? 'border-line bg-ink/85 backdrop-blur-xl'
          : 'border-transparent bg-transparent',
      )}
    >
      <div className="shell flex h-16 items-center justify-between gap-6 md:h-20">
        <Wordmark onClick={closeAll} />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7 xl:gap-9">
            {nav.map((item) => (
              <li key={item.label} onMouseEnter={() => setPanel(item.panel ?? null)}>
                <NavLink
                  to={item.href}
                  aria-expanded={item.panel ? panel === item.panel : undefined}
                  onFocus={() => setPanel(item.panel ?? null)}
                  className={({ isActive }) =>
                    cn(
                      'relative inline-flex items-center gap-1.5 py-1 text-sm transition-colors duration-300',
                      isActive || panel === item.panel
                        ? 'text-fg'
                        : 'text-fg-muted hover:text-fg',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {item.panel && (
                        <span
                          aria-hidden="true"
                          className={cn(
                            'block size-1 bg-current transition-opacity duration-300',
                            panel === item.panel ? 'opacity-100' : 'opacity-40',
                          )}
                        />
                      )}
                      <span
                        aria-hidden="true"
                        className={cn(
                          'absolute -bottom-0.5 left-0 h-px w-full origin-left bg-accent transition-transform duration-500 ease-[var(--ease-out-expo)]',
                          isActive ? 'scale-x-100' : 'scale-x-0',
                        )}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/contact"
            onClick={closeAll}
            className="group/cta hidden items-center gap-2.5 border border-line px-5 py-2.5 text-sm font-medium text-fg transition-colors duration-300 hover:border-accent hover:text-accent sm:inline-flex"
          >
            Let&rsquo;s talk
            <Arrow className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/cta:translate-x-1" />
          </Link>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="-mr-2 grid size-11 place-items-center lg:hidden"
          >
            <span className="relative block h-3 w-6">
              <span
                aria-hidden="true"
                className={cn(
                  'absolute left-0 block h-px w-full bg-fg transition-transform duration-400 ease-[var(--ease-out-expo)]',
                  open ? 'top-1.5 rotate-45' : 'top-0',
                )}
              />
              <span
                aria-hidden="true"
                className={cn(
                  'absolute left-0 block h-px w-full bg-fg transition-transform duration-400 ease-[var(--ease-out-expo)]',
                  open ? 'top-1.5 -rotate-45' : 'top-3',
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mega panel */}
      {ActivePanel && (
        <div className="hidden border-t border-line bg-ink/95 backdrop-blur-xl lg:block">
          <div className="shell py-10">
            <ActivePanel onNavigate={closeAll} />
          </div>
        </div>
      )}

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-ink/95 lg:hidden"
      >
        <nav aria-label="Mobile" className="shell py-4">
          <ul>
            {nav.map((item, i) => (
              <li key={item.label} className={cn(i > 0 && 'border-t border-line')}>
                <Link
                  to={item.href}
                  onClick={closeAll}
                  className="flex items-center justify-between py-5 text-2xl font-medium tracking-[-0.02em] text-fg"
                >
                  {item.label}
                  <Arrow direction="up-right" className="size-5 text-fg-faint" />
                </Link>
              </li>
            ))}
          </ul>

          <p className="label mt-10 text-fg-faint">Latest insight</p>
          <Link
            to={`/blog/${posts[0].slug}`}
            onClick={closeAll}
            className="mt-3 block border border-line p-4 text-sm leading-relaxed text-fg-muted"
          >
            {posts[0].title}
          </Link>

          <Link
            to="/contact"
            onClick={closeAll}
            className="mt-8 flex items-center justify-center gap-3 bg-accent px-6 py-4 text-sm font-medium text-ink"
          >
            Let&rsquo;s talk
            <Arrow />
          </Link>

          <a
            href={whatsappUrl('Hi AB19 Innovations — I have a project in mind.')}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-2.5 border border-line px-6 py-4 text-sm font-medium text-fg-muted"
          >
            <WhatsAppIcon className="size-4" />
            WhatsApp {site.phone}
          </a>

          <p className="mt-8 pb-10 text-sm text-fg-faint">
            <a href={`mailto:${site.email}`} className="transition-colors hover:text-fg">
              {site.email}
            </a>
          </p>
        </nav>
      </div>
    </header>
  )
}
