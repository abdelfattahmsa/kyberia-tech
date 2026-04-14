import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Work | Kyberia Tech — Portfolio & Case Studies',
  description: '100+ projects delivered across 9 countries. Branding, design, and web projects for clients in real estate, fintech, tech, and more.',
}

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
