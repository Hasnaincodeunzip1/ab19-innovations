import { Link } from 'react-router-dom'
import { footerColumns, site, whatsappUrl } from '../data/site'
import { WhatsAppIcon } from './ui/WhatsAppIcon'
import { Logo } from './ui/Logo'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line bg-ink-sunken/94">
      <div className="shell grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-5">
          <Link
            to="/"
            className="group/brand flex items-center gap-3 text-base font-medium tracking-[-0.015em]"
          >
            <Logo className="size-8 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/brand:scale-110" />
            {site.name}
          </Link>
          <p className="mt-6 max-w-[34ch] text-sm leading-relaxed text-fg-muted">
            AI, software and data engineering for the businesses building what&rsquo;s next.
          </p>
        </div>

        <nav aria-label="Footer" className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
          {footerColumns.map((column) => (
            <div key={column.heading}>
              <h2 className="label text-fg-faint">{column.heading}</h2>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.href.endsWith('.xml') ? (
                      <a
                        href={link.href}
                        className="text-sm text-fg-muted transition-colors duration-300 hover:text-fg"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-sm text-fg-muted transition-colors duration-300 hover:text-fg"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="shell border-t border-line py-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-8">
            <a
              href={`mailto:${site.email}`}
              className="font-mono text-sm text-fg transition-colors duration-300 hover:text-accent"
            >
              {site.email}
            </a>
            <a
              href={whatsappUrl(`Hi AB19 Innovations — I found you via the website.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="group/wa inline-flex items-center gap-2 text-sm text-fg-muted transition-colors duration-300 hover:text-accent"
            >
              <WhatsAppIcon className="size-3.5" />
              <span className="font-mono">{site.phone}</span>
            </a>
          </div>

          <p className="text-xs text-fg-faint">
            © {year} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
