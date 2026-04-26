import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { PROJECTS } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Kyberia Tech | Strategy-Led Creative & Technology Studio',
  description: 'Cairo-based global creative and technology studio. Strategy-first branding, graphic design, and custom web development for businesses across 9 countries.',
}

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="wf-hero" aria-label="Hero">
        <div className="hero-eyebrow">Cairo-based · Globally delivered since 2018</div>
        <h1 className="hero-h1">We build brands<br />that <em>work.</em></h1>
        <p className="hero-sub">Strategy-led branding, graphic design, and web solutions for businesses across 9 countries. Creative thinking. Engineering discipline.</p>
        <div className="hero-ctas">
          <Link href="/contact" className="btn-primary">Start a Project →</Link>
          <Link href="/work" className="btn-ghost">View Our Work</Link>
        </div>
        <div className="hero-bottom">
          <div className="hero-stat"><div className="hero-stat-num">7+</div><div className="hero-stat-lbl">Years operating</div></div>
          <div className="hero-stat-div" aria-hidden="true" />
          <div className="hero-stat"><div className="hero-stat-num">9</div><div className="hero-stat-lbl">Countries served</div></div>
          <div className="hero-stat-div" aria-hidden="true" />
          <div className="hero-stat"><div className="hero-stat-num">100+</div><div className="hero-stat-lbl">Projects delivered</div></div>
          <div className="hero-stat-div" aria-hidden="true" />
          <div className="hero-stat"><div className="hero-stat-num">3</div><div className="hero-stat-lbl">Service pillars</div></div>
        </div>
      </section>

      {/* Credibility Strip */}
      <div className="wf-strip" aria-label="Global markets">
        <div className="strip-label">Serving clients globally</div>
        <div className="strip-regions">
          <span className="strip-region">Saudi Arabia</span><span className="strip-sep" aria-hidden="true">·</span>
          <span className="strip-region">South Korea</span><span className="strip-sep" aria-hidden="true">·</span>
          <span className="strip-region">Australia</span><span className="strip-sep" aria-hidden="true">·</span>
          <span className="strip-region">Germany</span><span className="strip-sep" aria-hidden="true">·</span>
          <span className="strip-region">USA</span><span className="strip-sep" aria-hidden="true">·</span>
          <span className="strip-region">Japan</span><span className="strip-sep" aria-hidden="true">·</span>
          <span className="strip-region">Egypt</span><span className="strip-sep" aria-hidden="true">·</span>
          <span className="strip-region">India</span><span className="strip-sep" aria-hidden="true">·</span>
          <span className="strip-region">UAE</span>
        </div>
      </div>

      {/* Services */}
      <section className="wf-services" aria-label="Services">
        <div className="section-eyebrow">What We Do</div>
        <h2 className="section-h2">Three services.<br />One <em>system.</em></h2>
        <div className="services-grid">
          <Link href="/services/branding" className="service-card" aria-label="Branding and Strategy service">
            <div className="sc-num">01</div>
            <div className="sc-icon" aria-hidden="true">◈</div>
            <div className="sc-title">Branding &amp; Strategy</div>
            <div className="sc-hook">Define clarity before execution.</div>
            <div className="sc-div" aria-hidden="true" />
            <p className="sc-body">We build brand identities that are strategic, consistent, and built to last. Positioning, naming, visual systems, and messaging — all aligned.</p>
            <div className="sc-link" aria-hidden="true">Explore service →</div>
          </Link>
          <Link href="/services/design" className="service-card" aria-label="Graphic Design service">
            <div className="sc-num">02</div>
            <div className="sc-icon" aria-hidden="true">◇</div>
            <div className="sc-title">Graphic Design</div>
            <div className="sc-hook">Systems, not decoration.</div>
            <div className="sc-div" aria-hidden="true" />
            <p className="sc-body">Logo systems, UI/UX, motion, video, print, and digital assets — every visual element is purposeful, scalable, and brand-consistent.</p>
            <div className="sc-link" aria-hidden="true">Explore service →</div>
          </Link>
          <Link href="/services/web" className="service-card" aria-label="Web Design and Development service">
            <div className="sc-num">03</div>
            <div className="sc-icon" aria-hidden="true">◻</div>
            <div className="sc-title">Web Design &amp; Development</div>
            <div className="sc-hook">Digital experiences that perform.</div>
            <div className="sc-div" aria-hidden="true" />
            <p className="sc-body">Custom websites and web applications — no templates, no shortcuts. Built for usability, performance, and long-term scalability.</p>
            <div className="sc-link" aria-hidden="true">Explore service →</div>
          </Link>
        </div>
      </section>

      {/* Process */}
      <section className="wf-process" aria-label="How we work">
        <div className="section-eyebrow">How We Work</div>
        <h2 className="section-h2">Engineering discipline.<br /><em>Creative output.</em></h2>
        <div className="process-steps">
          <div className="process-step">
            <div className="ps-num" aria-hidden="true">01</div>
            <div className="ps-phase">Initiation</div>
            <div className="ps-title">Discover</div>
            <p className="ps-body">Deep diagnostic before any design decision. Business goals, audience, and market position are defined.</p>
            <div className="ps-deliverables"><span className="ps-tag">Discovery Report</span><span className="ps-tag">Scope Doc</span></div>
          </div>
          <div className="process-step">
            <div className="ps-num" aria-hidden="true">02</div>
            <div className="ps-phase">Planning</div>
            <div className="ps-title">Strategy</div>
            <p className="ps-body">Scope, timeline, budget, and creative direction locked in writing before execution begins.</p>
            <div className="ps-deliverables"><span className="ps-tag">Project Plan</span><span className="ps-tag">Brief</span></div>
          </div>
          <div className="process-step">
            <div className="ps-num" aria-hidden="true">03</div>
            <div className="ps-phase">Execution</div>
            <div className="ps-title">Build</div>
            <p className="ps-body">Sprint-based execution with structured review cycles. Progress is visible. Scope changes are managed.</p>
            <div className="ps-deliverables"><span className="ps-tag">Sprints</span><span className="ps-tag">Reviews</span></div>
          </div>
          <div className="process-step">
            <div className="ps-num" aria-hidden="true">04</div>
            <div className="ps-phase">Handover</div>
            <div className="ps-title">Launch</div>
            <p className="ps-body">Structured handover package. Documentation. Post-delivery support. The relationship continues.</p>
            <div className="ps-deliverables"><span className="ps-tag">Handover Pack</span><span className="ps-tag">Support</span></div>
          </div>
        </div>
      </section>

      {/* Work Preview */}
      <section className="wf-work" aria-label="Selected work">
        <div className="section-eyebrow">Selected Work</div>
        <h2 className="section-h2">Built with strategy.<br /><em>Delivered with precision.</em></h2>
        <div className="work-grid">
          {PROJECTS.slice(0, 4).map(project => (
            <Link key={project.slug} href={`/work/${project.slug}`} className="work-card" aria-label={`${project.title} project`}>
              <div className="work-image">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover', objectPosition: 'top' }}
                />
                <div className="work-overlay" aria-hidden="true" />
                <div className="work-cat">{project.cat}</div>
              </div>
              <div className="work-body">
                <div className="work-meta">
                  <strong>{project.title}</strong>
                  <span>{project.subtitle}</span>
                </div>
                <div className="work-arrow" aria-hidden="true">→</div>
              </div>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link href="/work" className="btn-ghost">View All Projects →</Link>
        </div>
      </section>

      {/* Why Kyberia */}
      <section className="wf-why" aria-label="Why Kyberia Tech">
        <div className="section-eyebrow">Why Kyberia Tech</div>
        <div className="why-grid">
          <div className="why-left">
            <div className="why-statement">A studio that thinks<br />before it <em>designs.</em></div>
            <p>Kyberia Tech delivers creative and digital work with the structure and discipline most agencies are not built to provide — strategy first, execution second, always accountable.</p>
          </div>
          <div className="why-right">
            <div className="why-item">
              <div className="why-item-icon" aria-hidden="true">◈</div>
              <div className="why-item-content">
                <strong>Strategy first</strong>
                <span>Every project starts with a business problem — not a design brief. We define before we design.</span>
              </div>
            </div>
            <div className="why-item">
              <div className="why-item-icon" aria-hidden="true">◻</div>
              <div className="why-item-content">
                <strong>Structured execution</strong>
                <span>Engineering-grade project management applied to every creative and digital engagement.</span>
              </div>
            </div>
            <div className="why-item">
              <div className="why-item-icon" aria-hidden="true">◇</div>
              <div className="why-item-content">
                <strong>Global experience</strong>
                <span>7+ years. 9 countries. 100+ projects. A track record that speaks clearly.</span>
              </div>
            </div>
            <div className="why-item">
              <div className="why-item-icon" aria-hidden="true">○</div>
              <div className="why-item-content">
                <strong>Calm, reliable delivery</strong>
                <span>No surprises. Scopes are defined. Timelines are real. Deliverables arrive when they should.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="wf-cta" aria-label="Call to action">
        <div className="cta-label">Start a Conversation</div>
        <h2 className="cta-h2">Let&apos;s build something<br />that <em>lasts.</em></h2>
        <p className="cta-sub">Tell us about your project. We&apos;ll respond within 24 hours with clarity about what you need — and what you don&apos;t.</p>
        <Link href="/contact" className="btn-primary" style={{ margin: '0 auto', display: 'inline-flex' }}>Start a Project →</Link>
        <div className="cta-contact">Or email us: <a href="mailto:hello@kyberia.tech">hello@kyberia.tech</a></div>
      </section>
    </>
  )
}
