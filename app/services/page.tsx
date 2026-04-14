import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Services | Kyberia Tech — Branding, Design & Web',
  description: 'Three core service pillars: Branding & Strategy, Graphic Design, and Web Design & Development. Delivered with engineering discipline.',
}

export default function ServicesPage() {
  return (
    <>
      <section className="about-hero" aria-label="Services hero">
        <div className="section-eyebrow">Services</div>
        <h1 style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: 'clamp(40px,5vw,72px)', letterSpacing: '-.03em', lineHeight: .92, marginBottom: 24 }}>
          Three pillars.<br /><em style={{ fontStyle: 'normal', color: 'var(--pink)' }}>One system.</em>
        </h1>
        <p style={{ fontSize: 'clamp(15px,1.5vw,18px)', color: 'var(--g300)', maxWidth: 540, lineHeight: 1.75 }}>
          Every service we offer is part of one coherent system. Branding informs design. Design shapes the web. The web serves the brand. No silos. No handoff gaps.
        </p>
      </section>

      <section className="wf-services" aria-label="Service overview">
        <div className="services-grid">
          <Link href="/services/branding" className="service-card">
            <div className="sc-num">01</div>
            <div className="sc-icon" aria-hidden="true">◈</div>
            <div className="sc-title">Branding &amp; Strategy</div>
            <div className="sc-hook">Define clarity before execution.</div>
            <div className="sc-div" aria-hidden="true" />
            <p className="sc-body">Positioning, naming, visual identity, messaging architecture, and brand guidelines. We build the foundation others build on.</p>
            <div className="sc-link" aria-hidden="true">Explore service →</div>
          </Link>
          <Link href="/services/design" className="service-card">
            <div className="sc-num">02</div>
            <div className="sc-icon" aria-hidden="true">◇</div>
            <div className="sc-title">Graphic Design</div>
            <div className="sc-hook">Systems, not decoration.</div>
            <div className="sc-div" aria-hidden="true" />
            <p className="sc-body">Logo design, UI/UX, video, photography, drone, motion, animation, and print/digital collateral. Every asset built to system.</p>
            <div className="sc-link" aria-hidden="true">Explore service →</div>
          </Link>
          <Link href="/services/web" className="service-card">
            <div className="sc-num">03</div>
            <div className="sc-icon" aria-hidden="true">◻</div>
            <div className="sc-title">Web Design &amp; Development</div>
            <div className="sc-hook">Digital experiences that perform.</div>
            <div className="sc-div" aria-hidden="true" />
            <p className="sc-body">Custom websites, e-commerce, mobile apps (iOS &amp; Android), AR/VR experiences, and bespoke software. From concept to deployment.</p>
            <div className="sc-link" aria-hidden="true">Explore service →</div>
          </Link>
        </div>
      </section>

      <section className="wf-cta" aria-label="Services CTA">
        <div className="cta-label">Ready to start?</div>
        <h2 className="cta-h2">Tell us what you<br />need to <em>build.</em></h2>
        <p className="cta-sub">We scope every engagement from scratch. No packages, no guesswork. Start with a conversation.</p>
        <Link href="/contact" className="btn-primary" style={{ margin: '0 auto', display: 'inline-flex' }}>Start a Project →</Link>
      </section>
    </>
  )
}
