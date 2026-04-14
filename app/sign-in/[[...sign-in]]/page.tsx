import { SignIn } from '@clerk/nextjs'
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
        <SignIn
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
              fontFamily:           'var(--font-satoshi, Satoshi, system-ui, sans-serif)',
              fontFamilyButtons:    'var(--font-spline-sans, "Spline Sans", system-ui, sans-serif)',
              fontSize:             '14px',
            },
          }}
        />
      </div>
    </div>
  )
}
