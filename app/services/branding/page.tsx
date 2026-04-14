import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Branding & Strategy | Kyberia Tech',
  description: 'Positioning, naming, visual identity, messaging architecture, and brand guidelines. We build the foundation others build on.',
}

export default function BrandingPage() {
  return (
    <>
      <section className="service-hero" aria-label="Branding service hero">
        <div>
          <div className="sh-eyebrow">Branding &amp; Strategy</div>
          <h1 className="sh-h1">Build the<br /><em>foundation first.</em></h1>
          <p className="sh-sub">Strategy before execution. Every brand engagement starts with a structured discovery process — not a brief. We diagnose the business before we prescribe the brand.</p>
          <Link href="/contact" className="btn-primary">Start with Strategy →</Link>
        </div>
        <div className="sh-right">
          <div className="sh-proof"><div className="sp-num">40+</div><div className="sp-lbl">Brand projects delivered</div></div>
          <div className="sh-proof"><div className="sp-num">9</div><div className="sp-lbl">Countries &amp; markets</div></div>
        </div>
      </section>

      <section className="service-section" aria-label="Branding approach">
        <div className="ss-label">The Problem</div>
        <h2 className="ss-h2">Most brands are built<br />on <em>assumptions.</em></h2>
        <p className="ss-body">Agencies jump to logos before understanding the business. The result is visual identity without strategic foundation — work that looks good but doesn&apos;t hold. We start with strategy. Design follows.</p>
      </section>

      <section className="service-section light" aria-label="Branding process">
        <div className="ss-label">Our Approach</div>
        <h2 className="ss-h2" style={{ color: 'var(--nb)' }}>Strategy first.<br /><em>Always.</em></h2>
        <p className="ss-body dark-text">We begin every brand engagement with a structured discovery process. We diagnose the business before we prescribe the brand.</p>
        <div className="deliverables-grid">
          <div className="del-item light">
            <div className="del-num">Step 01</div>
            <div className="del-title dark">Discovery &amp; Diagnosis</div>
            <p className="del-desc dark">Deep dive into your business, market, audience, and competitive landscape. We find the gaps before we fill them.</p>
          </div>
          <div className="del-item light">
            <div className="del-num">Step 02</div>
            <div className="del-title dark">Positioning &amp; Architecture</div>
            <p className="del-desc dark">Define your brand&apos;s position, personality, voice, and messaging framework. This is the strategic foundation.</p>
          </div>
          <div className="del-item light">
            <div className="del-num">Step 03</div>
            <div className="del-title dark">Visual Identity System</div>
            <p className="del-desc dark">Translate strategy into a complete visual language — mark, typography, colour, grid, and usage rules.</p>
          </div>
        </div>
      </section>

      <section className="service-section" aria-label="Branding deliverables">
        <div className="ss-label">What You Get</div>
        <h2 className="ss-h2">A complete brand<br /><em>system.</em></h2>
        <div className="deliverables-grid">
          <div className="del-item">
            <div className="del-num">01</div>
            <div className="del-title">Brand Strategy Document</div>
            <p className="del-desc">Positioning, audience definition, competitive analysis, brand personality, and messaging framework.</p>
          </div>
          <div className="del-item">
            <div className="del-num">02</div>
            <div className="del-title">Visual Identity System</div>
            <p className="del-desc">Logo suite, colour palette, typography, iconography, and photography direction.</p>
          </div>
          <div className="del-item">
            <div className="del-num">03</div>
            <div className="del-title">Brand Guidelines</div>
            <p className="del-desc">A comprehensive document governing how the brand looks, sounds, and behaves across every touchpoint.</p>
          </div>
        </div>
      </section>

      <section className="wf-cta" aria-label="Branding CTA">
        <div className="cta-label">Branding &amp; Strategy</div>
        <h2 className="cta-h2">Ready to define<br />your <em>brand?</em></h2>
        <p className="cta-sub">Start with strategy. Everything else follows.</p>
        <Link href="/contact" className="btn-primary" style={{ margin: '0 auto', display: 'inline-flex' }}>Start with Strategy →</Link>
      </section>
    </>
  )
}
