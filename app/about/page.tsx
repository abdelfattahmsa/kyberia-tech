import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Kyberia Tech | Creative Thinking. Engineering Discipline.',
  description: 'Founded in 2018 by Abdelfattah Mohammed. A strategy-first creative studio combining civil engineering discipline with creative direction.',
}

export default function AboutPage() {
  return (
    <>
      <section className="about-hero" aria-label="About hero">
        <div className="section-eyebrow">About the Studio</div>
        <h1 style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: 'clamp(40px,5vw,72px)', letterSpacing: '-.03em', lineHeight: .92, marginBottom: 24 }}>
          Creative thinking.<br /><em style={{ fontStyle: 'normal', color: 'var(--pink)' }}>Engineering discipline.</em>
        </h1>
        <p style={{ fontSize: 'clamp(15px,1.5vw,18px)', color: 'var(--g300)', maxWidth: 580, lineHeight: 1.75 }}>
          Kyberia Tech is a Cairo-based global studio founded in 2018. We build brands, design systems, and develop digital products for businesses across 9 countries. Strategy first. Always.
        </p>
      </section>

      <section className="founder-section" aria-label="Founder">
        <div>
          <div className="section-eyebrow">The Founder</div>
          <h2 style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: 'clamp(28px,3.5vw,48px)', letterSpacing: '-.02em', lineHeight: 1.05, marginBottom: 24 }}>
            One mind.<br /><em style={{ fontStyle: 'normal', color: 'var(--pink)' }}>Every discipline.</em>
          </h2>
          <p style={{ fontSize: 15, color: 'var(--g300)', lineHeight: 1.8, maxWidth: 500 }}>
            Most agencies split strategy, design, development, and business direction across teams. Kyberia Tech has all of them aligned in one founding mind — with direct accountability to you on every project.
          </p>
        </div>
        <div className="founder-card">
          <div className="founder-name">Abdelfattah Mohammed</div>
          <div className="founder-title">Founder · Lead Web Developer · Business Developer</div>
          <p className="founder-bio">Civil Engineer with professional project controls background in schedule, cost, and management consultancy. Finalizing an MSc in Project Management at Liverpool John Moores University. Leading Kyberia Tech from Day 1 across every client engagement.</p>
          <div className="credentials">
            <div className="cred-item">
              <div className="cred-icon" aria-hidden="true">◈</div>
              <div className="cred-info">
                <strong>Civil Engineering</strong>
                <span>Professional background in construction &amp; infrastructure</span>
              </div>
            </div>
            <div className="cred-item">
              <div className="cred-icon" aria-hidden="true">◻</div>
              <div className="cred-info">
                <strong>Project Controls</strong>
                <span>Schedule, Cost &amp; Management Consultancy</span>
              </div>
            </div>
            <div className="cred-item">
              <div className="cred-icon" aria-hidden="true">◇</div>
              <div className="cred-info">
                <strong>MSc Project Management</strong>
                <span>Liverpool John Moores University</span>
              </div>
            </div>
            <div className="cred-item">
              <div className="cred-icon" aria-hidden="true">○</div>
              <div className="cred-info">
                <strong>Lead Web Developer</strong>
                <span>Kyberia Tech since 2018</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="wf-cta" aria-label="About CTA">
        <div className="cta-label">Part of Peridot Holding</div>
        <h2 className="cta-h2">Kyberia Tech operates<br />within a <em>holding group.</em></h2>
        <p className="cta-sub">Alongside a sister architecture and interior design studio — creative and spatial disciplines under one group. One standard of discipline across every project.</p>
        <Link href="/contact" className="btn-primary" style={{ margin: '0 auto', display: 'inline-flex' }}>Start a Project →</Link>
      </section>
    </>
  )
}
