import ClerkSignIn from '@/components/ClerkSignIn'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In — Kyberia Tech',
  robots: 'noindex',
}

export default function SignInPage() {
  return (
    <div className="auth-page">
      <div className="auth-page__inner">
        <div className="auth-page__heading">
          <span className="auth-page__eyebrow">Client Access</span>
          <h1 className="auth-page__title">Welcome back</h1>
          <p className="auth-page__sub">Sign in to manage your projects and requests</p>
        </div>
        <ClerkSignIn />
      </div>
    </div>
  )
}
