import { SignUp } from '@clerk/nextjs'
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
        <SignUp
          appearance={{
            variables: {
              colorPrimary:         '#ff0099',
              colorBackground:      '#111111',
              colorText:            '#FFFFFF',
              colorTextSecondary:   '#AAAAAA',
              colorInputBackground: '#181818',
              colorInputText:       '#FFFFFF',
              colorNeutral:         '#AAAAAA',
              borderRadius:         '0px',
              fontFamily:           'var(--font-spline-sans, "Spline Sans", system-ui, sans-serif)',
              fontFamilyButtons:    'var(--font-spline-sans, "Spline Sans", system-ui, sans-serif)',
              fontSize:             '14px',
            },
          }}
        />
      </div>
    </div>
  )
}
