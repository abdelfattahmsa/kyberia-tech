import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Account — Kyberia Tech',
  robots: 'noindex',
}

const PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_URL ?? 'https://portal.kyberia.tech'

export default async function AccountPage() {
  const user = await currentUser()
  if (!user) redirect('/sign-in')

  const displayName =
    [user.firstName, user.lastName].filter(Boolean).join(' ') ||
    user.emailAddresses[0]?.emailAddress ||
    'there'

  return (
    <div className="account-page">
      <div className="account-page__inner">

        <div className="account-hero">
          <span className="account-eyebrow">Client Portal</span>
          <h1 className="account-title">Welcome back, {displayName}</h1>
          <p className="account-sub">{user.emailAddresses[0]?.emailAddress}</p>
        </div>

        <div className="account-cards">
          <a
            href={`${PORTAL_URL}/dashboard`}
            target="_blank"
            rel="noopener noreferrer"
            className="account-card"
          >
            <div className="account-card__icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
              </svg>
            </div>
            <div className="account-card__text">
              <span className="account-card__title">Dashboard</span>
              <span className="account-card__desc">Overview of your projects and activity</span>
            </div>
            <svg className="account-card__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M7 17L17 7M17 7H7M17 7v10"/>
            </svg>
          </a>

          <a
            href={`${PORTAL_URL}/dashboard/projects`}
            target="_blank"
            rel="noopener noreferrer"
            className="account-card"
          >
            <div className="account-card__icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
            </div>
            <div className="account-card__text">
              <span className="account-card__title">My Requests</span>
              <span className="account-card__desc">Track the status of your service requests</span>
            </div>
            <svg className="account-card__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M7 17L17 7M17 7H7M17 7v10"/>
            </svg>
          </a>

          <a
            href={`${PORTAL_URL}/dashboard/billing`}
            target="_blank"
            rel="noopener noreferrer"
            className="account-card"
          >
            <div className="account-card__icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                <line x1="1" y1="10" x2="23" y2="10"/>
              </svg>
            </div>
            <div className="account-card__text">
              <span className="account-card__title">Billing</span>
              <span className="account-card__desc">Invoices, payments, and subscriptions</span>
            </div>
            <svg className="account-card__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M7 17L17 7M17 7H7M17 7v10"/>
            </svg>
          </a>

          <a
            href={`${PORTAL_URL}/dashboard/support`}
            target="_blank"
            rel="noopener noreferrer"
            className="account-card"
          >
            <div className="account-card__icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <div className="account-card__text">
              <span className="account-card__title">Support</span>
              <span className="account-card__desc">Get help with your projects</span>
            </div>
            <svg className="account-card__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M7 17L17 7M17 7H7M17 7v10"/>
            </svg>
          </a>
        </div>

        <div className="account-cta">
          <Link href="/request" className="btn-primary">
            + New Service Request
          </Link>
        </div>

      </div>
    </div>
  )
}
