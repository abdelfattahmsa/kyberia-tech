'use client'

import { SignIn } from '@clerk/nextjs'

const appearance = {
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
}

export default function ClerkSignIn() {
  return <SignIn appearance={appearance} />
}
