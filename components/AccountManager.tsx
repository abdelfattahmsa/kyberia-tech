'use client'

import { useUser, useClerk } from '@clerk/nextjs'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_URL ?? 'https://portal.kyberia.tech'

export default function AccountManager() {
  const { user, isLoaded } = useUser()
  const { signOut } = useClerk()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  // Placeholder width while Clerk loads — prevents layout shift
  if (!isLoaded) {
    return <div className="kt-account-area" style={{ width: 90 }} />
  }

  if (!user) {
    return (
      <div className="kt-account-area">
        <Link href="/sign-in" className="nav-signin-btn">Client Login</Link>
      </div>
    )
  }

  const initials = [user.firstName, user.lastName]
    .filter(Boolean)
    .map(n => n![0].toUpperCase())
    .join('') || user.emailAddresses[0]?.emailAddress[0]?.toUpperCase() || '?'

  const displayName =
    [user.firstName, user.lastName].filter(Boolean).join(' ') ||
    user.emailAddresses[0]?.emailAddress ||
    'User'

  return (
    <div className={`kt-account-area${open ? ' open' : ''}`} ref={ref}>
      <button
        className="kt-account-btn"
        onClick={(e) => { e.stopPropagation(); setOpen(v => !v) }}
        aria-label="Account menu"
        aria-expanded={open}
      >
        <span className="kt-account-avatar">
          {user.imageUrl
            ? <img src={user.imageUrl} alt={displayName} />
            : initials}
        </span>
      </button>

      <div className="kt-account-dropdown" role="menu">
        {/* User header */}
        <div className="kad-header">
          <div className="kad-avatar-lg">
            {user.imageUrl
              ? <img src={user.imageUrl} alt={displayName} />
              : initials}
          </div>
          <div className="kad-info">
            <span className="kad-name">{displayName}</span>
            <span className="kad-email">{user.emailAddresses[0]?.emailAddress}</span>
          </div>
        </div>

        {/* Links */}
        <div className="kad-links">
          <Link href="/request" className="kad-link" onClick={() => setOpen(false)} role="menuitem">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            New Service Request
          </Link>
          <a
            href={`${PORTAL_URL}/dashboard`}
            target="_blank"
            rel="noopener noreferrer"
            className="kad-link"
            role="menuitem"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
            My Portal
          </a>
          <a
            href={`${PORTAL_URL}/dashboard/projects`}
            target="_blank"
            rel="noopener noreferrer"
            className="kad-link"
            role="menuitem"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
              <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
            My Requests
          </a>
          <Link href="/account" className="kad-link" onClick={() => setOpen(false)} role="menuitem">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            Account Settings
          </Link>
        </div>

        {/* Sign out */}
        <button
          className="kad-signout"
          onClick={() => signOut({ redirectUrl: '/' })}
          role="menuitem"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16,17 21,12 16,7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Sign Out
        </button>
      </div>
    </div>
  )
}
