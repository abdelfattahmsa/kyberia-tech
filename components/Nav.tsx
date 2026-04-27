'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
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

const APPS = [
  { name: 'Store',  href: 'https://store.kyberia.tech',  initial: 'S',  color: '#FF2F92' },
  { name: 'Blog',   href: 'https://blog.kyberia.tech',   initial: 'B',  color: '#3B82F6' },
  { name: 'Studio', href: 'https://studio.kyberia.tech', initial: 'St', color: '#10B981' },
  { name: 'Labs',   href: 'https://labs.kyberia.tech',   initial: 'L',  color: '#F97316' },
  { name: 'Portal', href: 'https://portal.kyberia.tech', initial: 'P',  color: '#8B5CF6' },
]

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

  const navRef        = useRef<HTMLElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Restore theme on mount
  useEffect(() => {
    try {
      if (localStorage.getItem('kt-theme') === 'light') {
        document.body.classList.add('light-mode')
        setIsLight(true)
      }
    } catch {}
  }, [])

  // Close everything on route change
  useEffect(() => {
    setMobileOpen(false)
    setMobileServicesOpen(false)
    setServicesOpen(false)
    setSearchOpen(false)
    setAppsOpen(false)
  }, [pathname])

  // Lock body scroll when mobile open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Auto-focus search input
  useEffect(() => {
    if (searchOpen) setTimeout(() => searchInputRef.current?.focus(), 60)
    else setSearchQuery('')
  }, [searchOpen])

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchOpen(false); setAppsOpen(false)
        setServicesOpen(false); setMobileOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // Close dropdowns on outside click
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

          {/* Left: logo + desktop nav */}
          <div className="kt-nav__left">
            <Link className="kt-nav__logo" href="/" aria-label="Kyberia Tech — Home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icon.svg" alt="" width={26} height={26} className="kt-logo-img" aria-hidden="true" />
              <span>Kyberia Tech</span>
            </Link>

            <nav className="kt-nav__links" aria-label="Main navigation">
              <Link href="/about"   className={isActive('/about')    ? 'active' : ''}>About</Link>

              {/* Services dropdown */}
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

              <Link href="/work"    className={isActive('/work')     ? 'active' : ''}>Work</Link>
              <a    href="https://store.kyberia.tech" target="_blank" rel="noopener">Store</a>
              <Link href="/contact" className={isActive('/contact')  ? 'active' : ''}>Contact</Link>
            </nav>
          </div>

          {/* Right controls */}
          <div className="kt-nav__right">

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
                        <div className="kt-app-tile__badge" style={{ background: app.color }}>{app.initial}</div>
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

            {/* Card header */}
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

            {/* Nav links */}
            <nav className="kmc-nav">
              <Link
                className={`kmc-link${isActive('/about') ? ' active' : ''}`}
                href="/about"
                onClick={() => setMobileOpen(false)}
              >About</Link>

              <div className={`kmc-sdrop${mobileServicesOpen ? ' open' : ''}`}>
                <button
                  className="kmc-link kmc-sdrop__btn"
                  onClick={() => setMobileServicesOpen(v => !v)}
                >
                  Services <span className="kmc-chev">▾</span>
                </button>
                <div className="kmc-sub">
                  <Link className="kmc-sub-link" href="/services/branding" onClick={() => setMobileOpen(false)}>Branding &amp; Strategy</Link>
                  <Link className="kmc-sub-link" href="/services/design"   onClick={() => setMobileOpen(false)}>Graphic Design</Link>
                  <Link className="kmc-sub-link" href="/services/web"      onClick={() => setMobileOpen(false)}>Web Design &amp; Development</Link>
                </div>
              </div>

              <Link
                className={`kmc-link${isActive('/work') ? ' active' : ''}`}
                href="/work"
                onClick={() => setMobileOpen(false)}
              >Work</Link>
              <a
                className="kmc-link"
                href="https://store.kyberia.tech"
                target="_blank"
                rel="noopener"
                onClick={() => setMobileOpen(false)}
              >Store <span style={{ fontSize: 10, opacity: .6 }}>↗</span></a>
              <Link
                className={`kmc-link${isActive('/contact') ? ' active' : ''}`}
                href="/contact"
                onClick={() => setMobileOpen(false)}
              >Contact</Link>
            </nav>

            {/* Ecosystem apps */}
            <div className="kmc-apps">
              <div className="kmc-apps__label">Kyberia Ecosystem</div>
              <div className="kmc-apps__grid">
                {APPS.map(app => (
                  <a
                    key={app.href}
                    href={app.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="kmc-app"
                  >
                    <div className="kmc-app__badge" style={{ background: app.color }}>{app.initial}</div>
                    <span className="kmc-app__name">{app.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Footer: account + theme + lang */}
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
    </>
  )
}
