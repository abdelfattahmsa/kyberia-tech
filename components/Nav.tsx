'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function Nav() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [appsOpen, setAppsOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [lang, setLangState] = useState('EN')
  const [isLight, setIsLight] = useState(false)

  const navRef = useRef<HTMLElement>(null)

  // Restore theme from localStorage on mount
  useEffect(() => {
    try {
      if (localStorage.getItem('kt-theme') === 'light') {
        document.body.classList.add('light-mode')
        setIsLight(true)
      }
    } catch {}
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
    setMobileServicesOpen(false)
    setLangOpen(false)
    setAppsOpen(false)
    setServicesOpen(false)
  }, [pathname])

  // Toggle body class for nav-open
  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add('nav-open')
    } else {
      document.body.classList.remove('nav-open')
    }
  }, [mobileOpen])

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) {
        setLangOpen(false)
        setAppsOpen(false)
        setServicesOpen(false)
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  function toggleTheme() {
    const next = !isLight
    setIsLight(next)
    if (next) {
      document.body.classList.add('light-mode')
    } else {
      document.body.classList.remove('light-mode')
    }
    try { localStorage.setItem('kt-theme', next ? 'light' : 'dark') } catch {}
  }

  function setLang(code: string) {
    setLangState(code)
    document.documentElement.dir = code === 'AR' ? 'rtl' : 'ltr'
    document.documentElement.lang = code.toLowerCase()
    setLangOpen(false)
  }

  const isActive = (href: string) => {
    if (!pathname) return false
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <nav className="kt-nav" role="navigation" aria-label="Main navigation" ref={navRef}>
      <div className="kt-nav__inner">

        {/* Logo */}
        <Link className="kt-nav__logo" href="/" aria-label="Kyberia Tech — Home">
          <span className="logo-dot" />KYBERIA TECH
        </Link>

        {/* Desktop Links */}
        <ul className="kt-nav__links" role="list">
          <li>
            <Link href="/about" className={isActive('/about') ? 'active' : ''}>About</Link>
          </li>
          <li className={`has-submenu${servicesOpen ? ' open' : ''}`}>
            <a
              className={isActive('/services') ? 'active' : ''}
              onClick={(e) => {
                e.stopPropagation()
                setServicesOpen(v => !v)
                setLangOpen(false)
                setAppsOpen(false)
              }}
              style={{ cursor: 'pointer' }}
            >
              Services <span className="submenu-chevron">▾</span>
            </a>
            <div className="kt-submenu" role="menu" aria-label="Services submenu">
              <Link className="submenu-item" href="/services/branding" role="menuitem">
                <span className="si-num">01</span>
                <div className="si-text">
                  <span className="si-name">Branding &amp; Strategy</span>
                  <span className="si-desc">Positioning · Identity · Messaging</span>
                </div>
              </Link>
              <Link className="submenu-item" href="/services/design" role="menuitem">
                <span className="si-num">02</span>
                <div className="si-text">
                  <span className="si-name">Graphic Design</span>
                  <span className="si-desc">Logo · UI/UX · Motion · Print</span>
                </div>
              </Link>
              <Link className="submenu-item" href="/services/web" role="menuitem">
                <span className="si-num">03</span>
                <div className="si-text">
                  <span className="si-name">Web Design &amp; Development</span>
                  <span className="si-desc">Websites · Apps · E-commerce</span>
                </div>
              </Link>
            </div>
          </li>
          <li>
            <Link href="/work" className={isActive('/work') ? 'active' : ''}>Work</Link>
          </li>
          <li>
            <a href="https://store.kyberia.tech" target="_blank" rel="noopener">Store</a>
          </li>
          <li>
            <Link href="/contact" className={isActive('/contact') ? 'active' : ''}>Contact</Link>
          </li>
        </ul>

        {/* Right Controls */}
        <div className="kt-nav__right">

          {/* Language Switcher */}
          <div className={`nav-lang${langOpen ? ' open' : ''}`} id="navLang">
            <button
              className="nav-lang-btn"
              onClick={(e) => {
                e.stopPropagation()
                setLangOpen(v => !v)
                setAppsOpen(false)
                setServicesOpen(false)
              }}
              aria-label="Switch language"
              aria-expanded={langOpen}
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                <circle cx="8" cy="8" r="7"/><path d="M8 1c-2 3-2 11 0 14M8 1c2 3 2 11 0 14M1 8h14"/>
              </svg>
              <span id="langLabel">{lang}</span>
              <span className="nav-lang-arrow">▾</span>
            </button>
            <div className="nav-lang-dropdown" id="langDropdown" role="listbox" aria-label="Select language">
              <div
                className={`nav-lang-opt${lang === 'EN' ? ' active' : ''}`}
                onClick={() => setLang('EN')}
                role="option"
                tabIndex={0}
              >
                <span className="flag">🇬🇧</span>English
              </div>
              <div
                className={`nav-lang-opt${lang === 'AR' ? ' active' : ''}`}
                onClick={() => setLang('AR')}
                role="option"
                tabIndex={0}
              >
                <span className="flag">🇸🇦</span>العربية
              </div>
            </div>
          </div>

          {/* Theme Toggle */}
          <button className="nav-theme-btn" onClick={toggleTheme} aria-label="Toggle colour theme">
            <svg className="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
            <svg className="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/>
            </svg>
          </button>

          {/* Apps / Ecosystem Menu — Google-style 9-dot grid */}
          <div className={`nav-apps${appsOpen ? ' open' : ''}`} id="navApps">
            <button
              className="nav-apps-btn"
              onClick={(e) => {
                e.stopPropagation()
                setAppsOpen(v => !v)
                setLangOpen(false)
                setServicesOpen(false)
              }}
              aria-label="Kyberia ecosystem"
              aria-expanded={appsOpen}
            >
              {/* 3×3 dot grid SVG */}
              <svg viewBox="0 0 18 18" fill="currentColor" aria-hidden="true">
                <circle cx="2" cy="2" r="1.5"/>
                <circle cx="9" cy="2" r="1.5"/>
                <circle cx="16" cy="2" r="1.5"/>
                <circle cx="2" cy="9" r="1.5"/>
                <circle cx="9" cy="9" r="1.5"/>
                <circle cx="16" cy="9" r="1.5"/>
                <circle cx="2" cy="16" r="1.5"/>
                <circle cx="9" cy="16" r="1.5"/>
                <circle cx="16" cy="16" r="1.5"/>
              </svg>
            </button>
            <div className="nav-apps-dropdown" id="appsDropdown" role="menu" aria-label="Kyberia ecosystem">
              <div className="nav-apps-header">Kyberia Ecosystem</div>
              <div className="nav-apps-grid">
                <a className="nai-grid-item" href="https://labs.kyberia.tech" target="_blank" rel="noopener" role="menuitem">
                  <div className="nai-grid-icon">⚗</div>
                  <div className="nai-grid-name">Labs</div>
                </a>
                <a className="nai-grid-item" href="https://store.kyberia.tech" target="_blank" rel="noopener" role="menuitem">
                  <div className="nai-grid-icon">🛍</div>
                  <div className="nai-grid-name">Store</div>
                </a>
                <a className="nai-grid-item" href="https://studio.kyberia.tech" target="_blank" rel="noopener" role="menuitem">
                  <div className="nai-grid-icon">◈</div>
                  <div className="nai-grid-name">Studio</div>
                </a>
                <a className="nai-grid-item" href="https://blog.kyberia.tech" target="_blank" rel="noopener" role="menuitem">
                  <div className="nai-grid-icon">✦</div>
                  <div className="nai-grid-name">Blog</div>
                </a>
                <a className="nai-grid-item" href="https://portal.kyberia.tech" target="_blank" rel="noopener" role="menuitem">
                  <div className="nai-grid-icon">◉</div>
                  <div className="nai-grid-name">Portal</div>
                </a>
              </div>
              <div className="nav-apps-footer">Part of Peridot Holding</div>
            </div>
          </div>

          {/* Sign In */}
          <div className="kt-auth-area">
            <a className="nav-signin-btn" href="https://portal.kyberia.tech">Sign In</a>
          </div>

          {/* CTA */}
          <Link className="kt-nav__cta" href="/contact">Start a Project →</Link>
        </div>

        {/* Hamburger (mobile only) */}
        <button
          className="kt-nav__hamburger"
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Open navigation menu"
          aria-expanded={mobileOpen}
        >
          <span /><span /><span />
        </button>

      </div>

      {/* Mobile Menu */}
      <div className="kt-mobile-menu" role="dialog" aria-label="Mobile navigation" aria-modal="true">

        <div className="mobile-nav-section">
          <Link className="mobile-nav-link" href="/about">About</Link>
          <div className={`mobile-services-item${mobileServicesOpen ? ' open' : ''}`}>
            <div
              className="mobile-nav-link"
              onClick={() => setMobileServicesOpen(v => !v)}
              role="button"
              tabIndex={0}
            >
              Services <span className="chevron">▾</span>
            </div>
            <div className="mobile-submenu" role="list">
              <Link className="mobile-sub-link" href="/services/branding" role="listitem">
                <span className="mobile-sub-num">01</span> Branding &amp; Strategy
              </Link>
              <Link className="mobile-sub-link" href="/services/design" role="listitem">
                <span className="mobile-sub-num">02</span> Graphic Design
              </Link>
              <Link className="mobile-sub-link" href="/services/web" role="listitem">
                <span className="mobile-sub-num">03</span> Web Design &amp; Development
              </Link>
            </div>
          </div>
          <Link className="mobile-nav-link" href="/work">Work</Link>
          <Link className="mobile-nav-link" href="/contact">Contact</Link>
        </div>

        <div className="mobile-utils-section">
          <div className="mobile-utils-label">Language</div>
          <div className="mobile-lang-row">
            <button
              className={`mobile-lang-btn${lang === 'EN' ? ' active' : ''}`}
              onClick={() => setLang('EN')}
            >🇬🇧 EN</button>
            <button
              className={`mobile-lang-btn${lang === 'AR' ? ' active' : ''}`}
              onClick={() => setLang('AR')}
            >🇸🇦 AR</button>
          </div>
        </div>

        <div className="mobile-utils-section">
          <div className="mobile-utils-label">Kyberia Ecosystem</div>
          <div className="mobile-apps-row">
            <a className="mobile-app-link" href="https://labs.kyberia.tech" target="_blank" rel="noopener">
              <span className="mobile-app-icon">⚗</span>
              <div className="mobile-app-info">
                <span className="mobile-app-name">Kyberia Labs</span>
                <span className="mobile-app-desc">Experiments &amp; R&amp;D</span>
              </div>
            </a>
            <a className="mobile-app-link" href="https://studio.kyberia.tech" target="_blank" rel="noopener">
              <span className="mobile-app-icon">◈</span>
              <div className="mobile-app-info">
                <span className="mobile-app-name">Kyberia Studio</span>
                <span className="mobile-app-desc">Creative Production</span>
              </div>
            </a>
            <a className="mobile-app-link" href="https://blog.kyberia.tech" target="_blank" rel="noopener">
              <span className="mobile-app-icon">✦</span>
              <div className="mobile-app-info">
                <span className="mobile-app-name">Kyberia Blog</span>
                <span className="mobile-app-desc">Ideas &amp; Insights</span>
              </div>
            </a>
          </div>
        </div>

        <div className="mobile-utils-section">
          <div className="mobile-theme-row">
            <button className="mobile-theme-toggle" onClick={toggleTheme}>
              {isLight ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/>
                  </svg>
                  Switch to Dark
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                    <circle cx="12" cy="12" r="5"/>
                    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                  </svg>
                  Switch to Light
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mobile-cta-section">
          <a className="mobile-signin-btn" href="https://portal.kyberia.tech">Sign In</a>
          <Link className="mobile-cta-btn" href="/contact">Start a Project →</Link>
        </div>

      </div>
    </nav>
  )
}
