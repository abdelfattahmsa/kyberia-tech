import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Graphic Design | Kyberia Tech',
  description: 'Logo systems, UI/UX, motion, video production, photography, drone, animation, and print/digital collateral. Every asset built to system.',
}

export default function DesignPage() {
  return (
    <>
      <section className="service-hero" aria-label="Graphic Design hero">
        <div>
          <div className="sh-eyebrow">Graphic Design</div>
          <h1 className="sh-h1">Design with<br /><em>intent.</em></h1>
          <p className="sh-sub">Every visual element earns its place or doesn&apos;t make it in. Systems, not decoration. Purpose, not noise.</p>
          <Link href="/contact" className="btn-primary">Build your visual system →</Link>
        </div>
        <div className="sh-right">
          <div className="sh-proof"><div className="sp-num">40+</div><div className="sp-lbl">Design projects</div></div>
          <div className="sh-proof"><div className="sp-num">100%</div><div className="sp-lbl">Custom — no templates</div></div>
        </div>
      </section>

      <section className="service-section light" aria-label="Design scope">
        <div className="ss-label">What We Design</div>
        <h2 className="ss-h2" style={{ color: 'var(--nb)' }}>Visual systems for<br />every <em>touchpoint.</em></h2>
        <div className="deliverables-grid">
          <div className="del-item light">
            <div className="del-num">01</div>
            <div className="del-title dark">Logo &amp; Identity</div>
            <p className="del-desc dark">Primary mark, secondary marks, monogram, and icon suite — all built as a coherent system.</p>
          </div>
          <div className="del-item light">
            <div className="del-num">02</div>
            <div className="del-title dark">UI/UX Design</div>
            <p className="del-desc dark">Interface design for websites and applications — flows, wireframes, high-fidelity mockups.</p>
          </div>
          <div className="del-item light">
            <div className="del-num">03</div>
            <div className="del-title dark">Motion &amp; Video</div>
            <p className="del-desc dark">Animated brand elements, social motion graphics, explainer videos, drone footage, photography.</p>
          </div>
          <div className="del-item light">
            <div className="del-num">04</div>
            <div className="del-title dark">Print &amp; Digital</div>
            <p className="del-desc dark">Business collateral, presentations, marketing materials, social assets, and campaign visuals.</p>
          </div>
          <div className="del-item light">
            <div className="del-num">05</div>
            <div className="del-title dark">Campaign Design</div>
            <p className="del-desc dark">Integrated visual campaigns across digital and physical touchpoints — consistent and on-brand.</p>
          </div>
          <div className="del-item light">
            <div className="del-num">06</div>
            <div className="del-title dark">Packaging</div>
            <p className="del-desc dark">Product packaging, label design, and retail presence — designed to stand out and stand with the brand.</p>
          </div>
        </div>
      </section>

      <section className="wf-cta" aria-label="Design CTA">
        <div className="cta-label">Graphic Design</div>
        <h2 className="cta-h2">Build a visual system<br />that <em>performs.</em></h2>
        <p className="cta-sub">Every element designed with intent. Every system built to scale.</p>
        <Link href="/contact" className="btn-primary" style={{ margin: '0 auto', display: 'inline-flex' }}>Build Your Visual System →</Link>
      </section>
    </>
  )
}
