'use client'

// Importing Three.js packages via next/dynamic or React.lazy still causes
// Turbopack to include the module in the server bundle, crashing the
// Vercel function (Three.js accesses WebGL / window at import-time).
//
// The ONLY reliable escape is to import() inside useEffect — code inside
// useEffect is never executed or bundled for the server.
import { ComponentType, useEffect, useState } from 'react'

export default function HeroSceneLoader() {
  const [Scene, setScene] = useState<ComponentType | null>(null)

  useEffect(() => {
    // Runs only in the browser — Three.js is never loaded on the server
    import('./HeroScene').then(mod => setScene(() => mod.default))
  }, [])

  if (!Scene) return null
  return <Scene />
}
