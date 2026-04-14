import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Web Design & Development | Kyberia Tech',
  description: 'Custom websites, e-commerce, mobile apps (iOS & Android), AR/VR experiences, and bespoke software. No templates. No shortcuts.',
}

export default function WebPage() {
  return (
    <>
      <section className="service-hero" aria-label="Web service hero">
        <div>
          <div className="sh-eyebrow">Web Design &amp; Development</div>
          <h1 className="sh-h1">Websites that<br /><em>work.</em></h1>
          <p className="sh-sub">Custom-built digital experiences — no templates, no shortcuts. UX-first design, engineered for performance and built to scale.</p>
          <Link href="/contact" className="btn-primary">Build your website →</Link>
        </div>
        <div className="sh-right">
          <div className="sh-proof"><div className="sp-num">50+</div><div className="sp-lbl">Digital products built</div></div>
          <div className="sh-proof"><div className="sp-num">0</div><div className="sp-lbl">Templates used</div></div>
          <div className="sh-proof"><div className="sp-num">100%</div><div className="sp-lbl">Custom architecture</div></div>
        </div>
      </section>

      <section className="service-section light" aria-label="What we build">
        <div className="ss-label">What We Build</div>
        <h2 className="ss-h2" style={{ color: 'var(--nb)' }}>Digital products for<br />every <em>purpose.</em></h2>
        <div className="deliverables-grid">
          <div className="del-item light">
            <div className="del-num">01</div>
            <div className="del-title dark">Custom Websites</div>
            <p className="del-desc dark">Bespoke websites for businesses of all sizes — from landing pages to complex multi-page platforms.</p>
          </div>
          <div className="del-item light">
            <div className="del-num">02</div>
            <div className="del-title dark">E-Commerce</div>
            <p className="del-desc dark">Custom online stores with performance-optimised product pages, checkout flows, and inventory systems.</p>
          </div>
          <div className="del-item light">
            <div className="del-num">03</div>
            <div className="del-title dark">Web Applications</div>
            <p className="del-desc dark">Full-stack web applications — dashboards, portals, SaaS products, and bespoke business tools.</p>
          </div>
          <div className="del-item light">
            <div className="del-num">04</div>
            <div className="del-title dark">Mobile Apps</div>
            <p className="del-desc dark">iOS and Android applications — native and cross-platform — designed for usability and performance.</p>
          </div>
          <div className="del-item light">
            <div className="del-num">05</div>
            <div className="del-title dark">AR / VR Experiences</div>
            <p className="del-desc dark">Immersive brand experiences for real estate, products, and interactive presentations.</p>
          </div>
          <div className="del-item light">
            <div className="del-num">06</div>
            <div className="del-title dark">Performance &amp; SEO</div>
            <p className="del-desc dark">Speed optimisation, technical SEO foundation, and analytics setup — built into every project from day one.</p>
          </div>
        </div>
      </section>

      <section className="wf-cta" aria-label="Web CTA">
        <div className="cta-label">Web &amp; Technology</div>
        <h2 className="cta-h2">Ready to build a website<br />that actually <em>converts?</em></h2>
        <p className="cta-sub">Custom-built. Performance-focused. No templates. No shortcuts.</p>
        <Link href="/contact" className="btn-primary" style={{ margin: '0 auto', display: 'inline-flex' }}>Build Your Website →</Link>
      </section>
    </>
  )
}
