'use client'

import { lazy, Suspense, useEffect, useState } from 'react'

// Lazy-load the Three.js scene — never imported on the server
const HeroScene = lazy(() => import('./HeroScene'))

export default function HeroSceneLoader() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // Return nothing on the server — no dynamic/bailout errors
  if (!mounted) return null

  return (
    <Suspense fallback={null}>
      <HeroScene />
    </Suspense>
  )
}
