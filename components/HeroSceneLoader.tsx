'use client'

import { useEffect, useState } from 'react'

export default function HeroSceneLoader() {
  // Render only on the client — no server HTML for the iframe
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <iframe
      src="/hero-canvas.html"
      style={{
        width: '100%',
        height: '100%',
        border: 'none',
        background: 'transparent',
        display: 'block',
      }}
      // allow transparency on the iframe
      allowTransparency={true}
      scrolling="no"
      title=""
      aria-hidden="true"
      tabIndex={-1}
    />
  )
}
