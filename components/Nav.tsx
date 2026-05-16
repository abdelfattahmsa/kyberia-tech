'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState, FormEvent } from 'react'
import AccountManager from '@/components/AccountManager'
import { PROJECTS } from '@/lib/projects'

// ── Search index ──────────────────────────────────────────────────────────────
const SEARCH_INDEX = [
  ...PROJECTS.map(p => ({ title: p.title, subtitle: p.subtitle, href: `/work/${p.slug}`, type: 'Project' })),
  { title: 'Branding & Strategy', subtitle: 'Positioning · Identity · Messaging', href: '/services/branding', type: 'Service' },
  { title: 'Graphic Design', subtitle: 'Logo · UI/UX · Motion · Print', href: '/services/design', type: 'Service' },
  { title: 'Web Design & Development', subtitle: 'Websites · Apps · E-commerce', href: '/services/web', type: 'Service' },
  { title: 'About', subtitle: 'Our studio story and values', href: '/about', type: 'Page' },
  { title: 'Contact', subtitle: 'Get in touch or start a project', href: '/contact', type: 'Page' },
  { title: 'Work', subtitle: 'All case studies and projects', href: '/work', type: 'Page' },
]

const APPS: Array<{ name: string; href: string; type: 'asterisk' | 'letter'; letter?: string; color: string }> = [
  { name: 'Store',  href: 'https://store.kyberia.tech',  type: 'letter',   letter: 'S', color: '#FF2F92' },
  { name: 'Blog',   href: 'https://blog.kyberia.tech',   type: 'letter',   letter: 'B', color: '#FF2F92' },
  { name: 'Studio', href: 'https://studio.kyberia.tech', type: 'asterisk',              color: '#F97316' },
  { name: 'Labs',   href: 'https://labs.kyberia.tech',   type: 'asterisk',              color: '#3B82F6' },
  { name: 'Portal', href: 'https://portal.kyberia.tech', type: 'letter',   letter: 'P', color: '#FF2F92' },
]

const SERVICE_LABEL: Record<string, string> = {
  branding: 'Branding & Strategy', design: 'Graphic Design',
  web: 'Web Design & Development', bundle: 'Brand + Web Bundle', other: 'Other / Not sure yet',
}

function AppIcon({ type, letter }: { type: 'asterisk' | 'letter'; letter?: string }) {
  if (type === 'asterisk') {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        {Array.from({ length: 10 }, (_, i) => (
          <rect key={i} x="10.8" y="2" width="2.4" height="8" rx="1.1" fill="white"
            transform={`rotate(${i * 36} 12 12)`} />
        ))}
        <circle cx="12" cy="12" r="2.5" fill="white" />
      </svg>
    )
  }
  return (
    <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: 16, color: '#fff', lineHeight: 1 }}>
        {letter}
      </span>
      <svg viewBox="0 0 10 10" width="10" height="10" aria-hidden="true"
        style={{ position: 'absolute', top: -5, right: -8 }}>
        {Array.from({ length: 6 }, (_, i) => (
          <rect key={i} x="4.2" y="0.5" width="1.6" height="4" rx="0.65" fill="white"
            transform={`rotate(${i * 60} 5 5)`} />
        ))}
        <circle cx="5" cy="5" r="1.2" fill="white" />
      </svg>
    </span>
  )
}

// ── New Project Modal ─────────────────────────────────────────────────────────
function NewProjectModal({ onClose }: { onClose: () => void }) {
  const nameRef    = useRef<HTMLInputElement>(null)
  const emailRef   = useRef<HTMLInputElement>(null)
  const companyRef = useRef<HTMLInputElement>(null)
  const serviceRef = useRef<HTMLSelectElement>(null)
  const budgetRef  = useRef<HTMLSelectElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)

  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess]       = useState(false)
  const [error, setError]           = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const name    = nameRef.current?.value.trim() || ''
    const email   = emailRef.current?.value.trim() || ''
    const service = serviceRef.current?.value || ''
    if (!name || !email || !service) {
      setError('Please fill in Name, Email, and Service.')
      return
    }
    setError(null)
    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email,
          company: companyRef.current?.value.trim() || '',
          service,
          budget:  budgetRef.current?.value || '',
          message: messageRef.current?.value.trim() || '',
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong.')
      setSuccess(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="np-overlay" role="dialog" aria-modal="true" aria-label="New project enquiry">
      <div className="np-backdrop" onClick={onClose} />
      <div className="np-modal">
        <button className="np-close" onClick={onClose} aria-label="Close">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>

        {success ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '20px 0' }}>
            <div style={{ fontSize: 28, color: 'var(--pink)' }} aria-hidden="true">◈</div>
            <h2 style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: 22, letterSpacing: '-.02em' }}>
              Request received.
            </h2>
            <p style={{ fontSize: 14, color: 'var(--g300)', lineHeight: 1.8 }}>
              We&apos;ll get back to you within 24 hours. Check your inbox — we&apos;ve sent a confirmation and set up your client account at{' '}
              <a href="https://portal.kyberia.tech" target="_blank" rel="noopener" style={{ color: 'var(--pink)' }}>portal.kyberia.tech</a>.
            </p>
            <button className="btn-primary" onClick={onClose} style={{ marginTop: 8, alignSelf: 'flex-start' }}>
              Close →
            </button>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 24 }}>
              <div className="section-eyebrow" style={{ marginBottom: 6 }}>New Project</div>
              <h2 style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: 22, letterSpacing: '-.02em', lineHeight: 1.1 }}>
                Tell us what you&apos;re building.
              </h2>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="form-group">
                <label className="form-label req" htmlFor="np-name">Full Name</label>
                <input ref={nameRef} className="form-input" id="np-name" type="text" placeholder="Your full name" autoComplete="name" required />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label req" htmlFor="np-email">Email</label>
                  <input ref={emailRef} className="form-input" id="np-email" type="email" placeholder="hello@company.com" autoComplete="email" required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="np-company">Company</label>
                  <input ref={companyRef} className="form-input" id="np-company" type="text" placeholder="Company name" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label req" htmlFor="np-service">Service Needed</label>
                <select ref={serviceRef} className="form-select" id="np-service" required defaultValue="">
                  <option value="" disabled>Select a service</option>
                  {Object.entries(SERVICE_LABEL).map(([v, l]) => (
                    <option key={v} value={v}>{l}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="np-budget">Budget Range</label>
                <select ref={budgetRef} className="form-select" id="np-budget" defaultValue="">
                  <option value="" disabled>Select a range</option>
                  <option value="under5k">Under $5,000</option>
                  <option value="5-10k">$5,000 – $10,000</option>
                  <option value="10-20k">$10,000 – $20,000</option>
                  <option value="20kplus">$20,000+</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="np-message">Project Brief</label>
                <textarea ref={messageRef} className="form-textarea" id="np-message"
                  placeholder="What are you building? What problem does it solve?" rows={3} />
              </div>

              {error && (
                <div style={{ fontSize: 13, color: '#f87171', padding: '10px 14px', background: 'rgba(248,113,113,.08)', border: '1px solid rgba(248,113,113,.2)' }} role="alert">
                  {error}
                </div>
              )}

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={submitting}>
                {submitting ? 'Submitting…' : 'Submit Request →'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

// ── Main Nav ──────────────────────────────────────────────────────────────────
export default function Nav() {
  const pathname = usePathname()
  const router   = useRouter()

  const [mobileOpen,        setMobileOpen]        = useState(false)
  const [mobileServicesOpen,setMobileServicesOpen] = useState(false)
  const [servicesOpen,      setServicesOpen]       = useState(false)
  const [appsOpen,          setAppsOpen]           = useState(false)
  const [searchOpen,        setSearchOpen]         = useState(false)
  const [searchQuery,       setSearchQuery]        = useState('')
  const [lang,              setLangState]          = useState('EN')
  const [isLight,           setIsLight]            = useState(false)
  const [projectOpen,       setProjectOpen]        = useState(false)

  const navRef        = useRef<HTMLElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    try {
      if (localStorage.getItem('kt-theme') === 'light') {
        document.body.classList.add('light-mode')
        setIsLight(true)
      }
    } catch {}
  }, [])

  useEffect(() => {
    setMobileOpen(false); setMobileServicesOpen(false)
    setServicesOpen(false); setSearchOpen(false)
    setAppsOpen(false); setProjectOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = (mobileOpen || projectOpen) ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen, projectOpen])

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchInputRef.current?.focus(), 60)
    else setSearchQuery('')
  }, [searchOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchOpen(false); setAppsOpen(false)
        setServicesOpen(false); setMobileOpen(false)
        setProjectOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) {
        setAppsOpen(false); setServicesOpen(false)
      }
    }
    document.addEventListener('click', handle)
    return () => document.removeEventListener('click', handle)
  }, [])

  function toggleTheme() {
    const next = !isLight
    setIsLight(next)
    document.body.classList.toggle('light-mode', next)
    try { localStorage.setItem('kt-theme', next ? 'light' : 'dark') } catch {}
  }

  function toggleLang() {
    const next = lang === 'EN' ? 'AR' : 'EN'
    setLangState(next)
    document.documentElement.dir  = next === 'AR' ? 'rtl' : 'ltr'
    document.documentElement.lang = next.toLowerCase()
  }

  const isActive = (href: string) => {
    if (!pathname) return false
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const searchResults = searchQuery.trim().length > 0
    ? SEARCH_INDEX.filter(i =>
        i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8)
    : []

  return (
    <>
      {/* ── Header ─────────────────────────────────────────────────── */}
      <header className="kt-nav" role="banner" ref={navRef}>
        <div className="kt-nav__inner">

          {/* Col 1: Logo */}
          <div className="kt-nav__left">
            <Link className="kt-nav__logo" href="/" aria-label="Kyberia Tech — Home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icon.svg" alt="" width={26} height={26} className="kt-logo-img" aria-hidden="true" />
              <span>Kyberia Tech</span>
            </Link>
          </div>

          {/* Col 2: Nav links (centered) */}
          <nav className="kt-nav__links" aria-label="Main navigation">
            <Link href="/about" className={isActive('/about') ? 'active' : ''}>About</Link>

            <div className={`kt-sdrop${servicesOpen ? ' open' : ''}`}>
              <a
                className={isActive('/services') ? 'active' : ''}
                onClick={e => { e.stopPropagation(); setServicesOpen(v => !v); setAppsOpen(false) }}
              >
                Services <span className="kt-chev">▾</span>
              </a>
              <div className="kt-submenu" role="menu" aria-label="Services submenu">
                <Link className="submenu-item" href="/services/branding" role="menuitem">
                  <span className="si-num">01</span>
                  <div className="si-text"><span className="si-name">Branding &amp; Strategy</span><span className="si-desc">Positioning · Identity · Messaging</span></div>
                </Link>
                <Link className="submenu-item" href="/services/design" role="menuitem">
                  <span className="si-num">02</span>
                  <div className="si-text"><span className="si-name">Graphic Design</span><span className="si-desc">Logo · UI/UX · Motion · Print</span></div>
                </Link>
                <Link className="submenu-item" href="/services/web" role="menuitem">
                  <span className="si-num">03</span>
                  <div className="si-text"><span className="si-name">Web Design &amp; Development</span><span className="si-desc">Websites · Apps · E-commerce</span></div>
                </Link>
              </div>
            </div>

            <Link href="/work"  className={isActive('/work')    ? 'active' : ''}>Work</Link>
            <a href="https://store.kyberia.tech" target="_blank" rel="noopener">Store</a>
            <Link href="/contact" className={isActive('/contact') ? 'active' : ''}>Contact</Link>
          </nav>

          {/* Col 3: Right controls */}
          <div className="kt-nav__right">

            {/* New Project CTA */}
            <button
              className="kt-nav__new-btn"
              onClick={() => { setProjectOpen(true); setAppsOpen(false); setServicesOpen(false) }}
              aria-label="Start a new project"
            >
              New Project →
            </button>

            {/* Apps grid */}
            <div className="kt-apps-wrap" style={{ position: 'relative' }}>
              <button
                className="kt-nbtn"
                onClick={e => { e.stopPropagation(); setAppsOpen(v => !v); setServicesOpen(false) }}
                aria-label="Kyberia ecosystem" aria-expanded={appsOpen}
              >
                <svg width="15" height="15" viewBox="0 0 18 18" fill="currentColor" aria-hidden="true">
                  <circle cx="2.5" cy="2.5" r="1.5"/><circle cx="9" cy="2.5" r="1.5"/><circle cx="15.5" cy="2.5" r="1.5"/>
                  <circle cx="2.5" cy="9"   r="1.5"/><circle cx="9" cy="9"   r="1.5"/><circle cx="15.5" cy="9"   r="1.5"/>
                  <circle cx="2.5" cy="15.5" r="1.5"/><circle cx="9" cy="15.5" r="1.5"/><circle cx="15.5" cy="15.5" r="1.5"/>
                </svg>
              </button>
              {appsOpen && (
                <div className="kt-apps-dd" role="menu" aria-label="Kyberia ecosystem">
                  <div className="kt-apps-dd__label">Kyberia Ecosystem</div>
                  <div className="kt-apps-dd__grid">
                    {APPS.map(app => (
                      <a key={app.href} href={app.href} target="_blank" rel="noopener noreferrer"
                        onClick={() => setAppsOpen(false)} className="kt-app-tile" role="menuitem">
                        <div className="kt-app-tile__badge" style={{ background: app.color }}>
                          <AppIcon type={app.type} letter={app.letter} />
                        </div>
                        <span className="kt-app-tile__name">{app.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Theme */}
            <button className="kt-nbtn" onClick={toggleTheme} aria-label="Toggle theme">
              {isLight
                ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg>
                : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              }
            </button>

            {/* Language */}
            <button className="kt-nbtn kt-nbtn--lang" onClick={toggleLang} aria-label="Switch language">
              {lang === 'EN' ? 'AR' : 'EN'}
            </button>

            {/* Search */}
            <button
              className="kt-nbtn"
              onClick={e => { e.stopPropagation(); setSearchOpen(v => !v); setAppsOpen(false) }}
              aria-label="Search" aria-expanded={searchOpen}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>

            {/* Account (desktop only) */}
            <div className="kt-nav__account">
              <AccountManager />
            </div>

            {/* Hamburger — mobile only */}
            <button
              className="kt-hamburger"
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                {mobileOpen
                  ? <path d="M4 4l12 12M16 4l-12 12"/>
                  : <><line x1="3" y1="6"  x2="17" y2="6"/><line x1="3" y1="10" x2="17" y2="10"/><line x1="3" y1="14" x2="17" y2="14"/></>
                }
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile floating card ────────────────────────────────────── */}
      {mobileOpen && (
        <div
          className="kt-mob-overlay"
          onClick={() => setMobileOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="kt-mob-card" onClick={e => e.stopPropagation()}>

            <div className="kmc-header">
              <Link href="/" className="kmc-logo" onClick={() => setMobileOpen(false)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icon.svg" alt="" width={22} height={22} aria-hidden="true" />
                <span>Kyberia Tech</span>
              </Link>
              <button className="kmc-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* New Project button — mobile */}
            <button
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', margin: '0 0 4px' }}
              onClick={() => { setMobileOpen(false); setProjectOpen(true) }}
            >
              New Project →
            </button>

            <nav className="kmc-nav">
              <Link className={`kmc-link${isActive('/about') ? ' active' : ''}`} href="/about" onClick={() => setMobileOpen(false)}>About</Link>

              <div className={`kmc-sdrop${mobileServicesOpen ? ' open' : ''}`}>
                <button className="kmc-link kmc-sdrop__btn" onClick={() => setMobileServicesOpen(v => !v)}>
                  Services <span className="kmc-chev">▾</span>
                </button>
                <div className="kmc-sub">
                  <Link className="kmc-sub-link" href="/services/branding" onClick={() => setMobileOpen(false)}>Branding &amp; Strategy</Link>
                  <Link className="kmc-sub-link" href="/services/design"   onClick={() => setMobileOpen(false)}>Graphic Design</Link>
                  <Link className="kmc-sub-link" href="/services/web"      onClick={() => setMobileOpen(false)}>Web Design &amp; Development</Link>
                </div>
              </div>

              <Link className={`kmc-link${isActive('/work') ? ' active' : ''}`} href="/work" onClick={() => setMobileOpen(false)}>Work</Link>
              <a className="kmc-link" href="https://store.kyberia.tech" target="_blank" rel="noopener" onClick={() => setMobileOpen(false)}>
                Store <span style={{ fontSize: 10, opacity: .6 }}>↗</span>
              </a>
              <Link className={`kmc-link${isActive('/contact') ? ' active' : ''}`} href="/contact" onClick={() => setMobileOpen(false)}>Contact</Link>
            </nav>

            <div className="kmc-apps">
              <div className="kmc-apps__label">Kyberia Ecosystem</div>
              <div className="kmc-apps__grid">
                {APPS.map(app => (
                  <a key={app.href} href={app.href} target="_blank" rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)} className="kmc-app">
                    <div className="kmc-app__badge" style={{ background: app.color }}>
                      <AppIcon type={app.type} letter={app.letter} />
                    </div>
                    <span className="kmc-app__name">{app.name}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="kmc-footer">
              <AccountManager />
              <div className="kmc-footer__btns">
                <button className="kmc-fbtn" onClick={toggleTheme} aria-label="Toggle theme">
                  {isLight
                    ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg>
                    : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></svg>
                  }
                </button>
                <button className="kmc-fbtn kmc-fbtn--lang" onClick={toggleLang} aria-label="Switch language">
                  {lang === 'EN' ? 'AR' : 'EN'}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ── Search overlay ─────────────────────────────────────────── */}
      {searchOpen && (
        <div className="search-overlay" role="dialog" aria-label="Search" aria-modal="true">
          <div className="search-backdrop" onClick={() => setSearchOpen(false)} />
          <div className="search-panel">
            <div className="search-input-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" style={{ flexShrink: 0, opacity: .5 }}>
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                ref={searchInputRef}
                type="search"
                className="search-input"
                placeholder="Search projects, services, pages…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && searchResults.length > 0) {
                    router.push(searchResults[0].href)
                    setSearchOpen(false)
                  }
                }}
              />
              <button className="search-close-btn" onClick={() => setSearchOpen(false)} aria-label="Close search">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {searchResults.length > 0 ? (
              <div className="search-results">
                {searchResults.map((r, i) => (
                  <Link key={i} href={r.href} className="search-result-item" onClick={() => setSearchOpen(false)}>
                    <span className="sri-type">{r.type}</span>
                    <div className="sri-text">
                      <span className="sri-title">{r.title}</span>
                      <span className="sri-sub">{r.subtitle}</span>
                    </div>
                    <span className="sri-arrow">→</span>
                  </Link>
                ))}
              </div>
            ) : searchQuery.trim().length > 0 ? (
              <div className="search-empty">
                <span>No results for &ldquo;{searchQuery}&rdquo;</span>
              </div>
            ) : (
              <div className="search-hints">
                <div className="sh-label">Quick links</div>
                {[
                  { title: 'View all work',       href: '/work' },
                  { title: 'Branding & Strategy', href: '/services/branding' },
                  { title: 'Web Development',     href: '/services/web' },
                  { title: 'Start a project',     href: '/contact' },
                ].map(l => (
                  <Link key={l.href} href={l.href} className="sh-link" onClick={() => setSearchOpen(false)}>
                    {l.title} →
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── New Project Modal ───────────────────────────────────────── */}
      {projectOpen && <NewProjectModal onClose={() => setProjectOpen(false)} />}
    </>
  )
}
