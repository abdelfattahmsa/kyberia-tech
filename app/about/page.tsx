import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Kyberia Tech | Creative Thinking. Engineering Discipline.',
  description: 'Kyberia Tech is a Cairo-based global creative studio founded in 2018. Strategy-first branding, graphic design, and web development for businesses across 9 countries.',
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="about-hero" aria-label="About hero">
        <div className="section-eyebrow">About the Studio</div>
        <h1 style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: 'clamp(40px,5vw,72px)', letterSpacing: '-.03em', lineHeight: .92, marginBottom: 24 }}>
          Creative thinking.<br /><em style={{ fontStyle: 'normal', color: 'var(--pink)' }}>Engineering discipline.</em>
        </h1>
        <p style={{ fontSize: 'clamp(15px,1.5vw,18px)', color: 'var(--g300)', maxWidth: 580, lineHeight: 1.75 }}>
          Kyberia Tech is a Cairo-based global studio founded in 2018. We build brands, design systems, and develop digital products for businesses across 9 countries. Strategy first. Always.
        </p>
      </section>

      {/* Studio section */}
      <section className="founder-section" aria-label="Our Studio">
        <div>
          <div className="section-eyebrow">How We Work</div>
          <h2 style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: 'clamp(28px,3.5vw,48px)', letterSpacing: '-.02em', lineHeight: 1.05, marginBottom: 24 }}>
            One team.<br /><em style={{ fontStyle: 'normal', color: 'var(--pink)' }}>Every discipline.</em>
          </h2>
          <p style={{ fontSize: 15, color: 'var(--g300)', lineHeight: 1.8, maxWidth: 500 }}>
            Most agencies split strategy, design, development, and business direction across teams. At Kyberia Tech, all disciplines are aligned under one unified approach — with direct accountability to you on every project.
          </p>
        </div>
        <div className="founder-card">
          <div className="founder-name">Kyberia Tech Studio</div>
          <div className="founder-title">Strategy · Design · Development · Brand</div>
          <p className="founder-bio">A creative and technology studio operating at the intersection of strategy, design, and engineering. We bring structured thinking to every engagement — from brand identity and visual systems to custom web products and digital experiences.</p>
          <div className="credentials">
            <div className="cred-item">
              <div className="cred-icon" aria-hidden="true">◈</div>
              <div className="cred-info">
                <strong>Strategy First</strong>
                <span>Every project starts with a business problem — not a design brief</span>
              </div>
            </div>
            <div className="cred-item">
              <div className="cred-icon" aria-hidden="true">◻</div>
              <div className="cred-info">
                <strong>Structured Execution</strong>
                <span>Engineering-grade project management applied to every engagement</span>
              </div>
            </div>
            <div className="cred-item">
              <div className="cred-icon" aria-hidden="true">◇</div>
              <div className="cred-info">
                <strong>100+ Projects Delivered</strong>
                <span>Across 9 countries and 3 service pillars since 2018</span>
              </div>
            </div>
            <div className="cred-item">
              <div className="cred-icon" aria-hidden="true">○</div>
              <div className="cred-info">
                <strong>Bilingual — English &amp; Arabic</strong>
                <span>Serving clients across MENA, Australia, Europe, and beyond</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: 'var(--section-py) var(--section-px)', width: '100%' }} aria-label="Studio values">
        <div className="section-eyebrow">Our Values</div>
        <h2 className="section-h2">What drives<br /><em>every decision.</em></h2>
        <div className="why-grid">
          <div className="why-right" style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {[
              { icon: '◈', title: 'Clarity over complexity', body: 'We believe the best creative work is clear, purposeful, and impossible to misread. We remove noise — not add to it.' },
              { icon: '◻', title: 'Accountability at every step', body: 'No hand-offs to junior staff mid-project. The team that scopes your work is the team that delivers it.' },
              { icon: '◇', title: 'Long-term thinking', body: 'We build brands and products that last — not campaigns that age badly. Every decision is made with longevity in mind.' },
              { icon: '○', title: 'Honesty about scope', body: 'We tell you what you need — and what you don\'t. No scope inflation, no unnecessary complexity.' },
            ].map(v => (
              <div key={v.title} className="why-item">
                <div className="why-item-icon" aria-hidden="true">{v.icon}</div>
                <div className="why-item-content">
                  <strong>{v.title}</strong>
                  <span>{v.body}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <div className="wf-strip" style={{ borderTop: '1px solid var(--br2)', borderBottom: '1px solid var(--br2)' }} aria-label="Studio stats">
        <div className="strip-label">By the numbers</div>
        <div className="strip-regions" style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'center' }}>
          {[
            { num: '7+', lbl: 'Years operating' },
            { num: '9', lbl: 'Countries served' },
            { num: '100+', lbl: 'Projects delivered' },
            { num: '3', lbl: 'Service pillars' },
          ].map(s => (
            <div key={s.lbl} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: 'clamp(20px,2.5vw,28px)', letterSpacing: '-.02em' }}>{s.num}</span>
              <span style={{ fontFamily: 'var(--fm)', fontSize: 9, color: 'var(--g500)', letterSpacing: '.12em', textTransform: 'uppercase' }}>{s.lbl}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <section className="wf-cta" aria-label="About CTA">
        <div className="cta-label">Part of Peridot Holding</div>
        <h2 className="cta-h2">Kyberia Tech operates<br />within a <em>holding group.</em></h2>
        <p className="cta-sub">Alongside a sister architecture and interior design studio — creative and spatial disciplines under one group. One standard of discipline across every project.</p>
        <Link href="/contact" className="btn-primary" style={{ margin: '0 auto', display: 'inline-flex' }}>Start a Project →</Link>
      </section>
    </>
  )
}
