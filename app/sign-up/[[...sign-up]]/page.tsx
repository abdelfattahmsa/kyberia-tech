import ClerkSignUp from '@/components/ClerkSignUp'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Account — Kyberia Tech',
  robots: 'noindex',
}

export default function SignUpPage() {
  return (
    <div className="auth-page">
      <div className="auth-page__inner">
        <div className="auth-page__heading">
          <span className="auth-page__eyebrow">Client Access</span>
          <h1 className="auth-page__title">Create an account</h1>
          <p className="auth-page__sub">Access your projects, requests, and billing in one place</p>
        </div>
        <ClerkSignUp />
      </div>
    </div>
  )
}
