import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Kyberia Tech | Start a Project',
  description: 'Ready to build something that lasts? Tell us about your project. Based in Cairo — serving clients globally.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
