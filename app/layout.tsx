import type { Metadata } from 'next'
import { Spline_Sans, Spline_Sans_Mono } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import Nav from '@/components/Nav'
import ChatBubble from '@/components/ChatBubble'
import BackToTop from '@/components/BackToTop'
import Footer from '@/components/Footer'

const splineSans = Spline_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-spline-sans',
  display: 'swap',
})

const splineSansMono = Spline_Sans_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-spline-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Kyberia Tech | Strategy-Led Creative & Technology Studio',
  description: 'Cairo-based global creative and technology studio. Strategy-first branding, graphic design, and custom web development for businesses across 9 countries.',
  keywords: 'creative agency Cairo, branding studio Egypt, web design Cairo, digital agency Middle East',
  authors: [{ name: 'Kyberia Tech' }],
  openGraph: {
    title: 'Kyberia Tech | Strategy-Led Creative & Technology Studio',
    description: 'Cairo-based global creative and technology studio. Strategy-first branding, graphic design, and custom web development for businesses across 9 countries.',
    type: 'website',
    url: 'https://kyberia.tech',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" dir="ltr">
        <head>
          <meta name="color-scheme" content="dark light" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700&family=Spline+Sans+Mono:wght@300;400;500&display=swap"
          />
        </head>
        <body className={`${splineSans.variable} ${splineSansMono.variable}`}>
          <Nav />
          <main>
            {children}
          </main>
          <Footer />
          <ChatBubble />
          <BackToTop />
        </body>
      </html>
    </ClerkProvider>
  )
}
