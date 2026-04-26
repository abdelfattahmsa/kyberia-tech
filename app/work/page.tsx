'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PROJECTS } from '@/lib/projects'

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = PROJECTS.filter(item =>
    activeFilter === 'all' || item.category.includes(activeFilter)
  )

  return (
    <>
      <section className="work-hero" aria-label="Work hero">
        <div className="section-eyebrow">Selected Work</div>
        <h1 style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: 'clamp(40px,5vw,72px)', letterSpacing: '-.03em', lineHeight: .92, marginBottom: 24 }}>
          100+ projects.<br /><em style={{ fontStyle: 'normal', color: 'var(--pink)' }}>9 countries.</em>
        </h1>
        <p style={{ fontSize: 'clamp(15px,1.5vw,18px)', color: 'var(--g300)', maxWidth: 540, lineHeight: 1.75 }}>
          Work delivered across branding, design, and digital — from Cairo to Sydney to Berlin. Every project defined, managed, and delivered with engineering discipline.
        </p>
        <div className="work-filters" role="group" aria-label="Filter projects">
          <button
            className={`filter-btn${activeFilter === 'all' ? ' active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >All Projects</button>
          <button
            className={`filter-btn${activeFilter === 'branding' ? ' active' : ''}`}
            onClick={() => setActiveFilter('branding')}
          >Branding &amp; Strategy</button>
          <button
            className={`filter-btn${activeFilter === 'design' ? ' active' : ''}`}
            onClick={() => setActiveFilter('design')}
          >Graphic Design</button>
          <button
            className={`filter-btn${activeFilter === 'web' ? ' active' : ''}`}
            onClick={() => setActiveFilter('web')}
          >Web &amp; Technology</button>
        </div>
      </section>

      <div className="work-full-grid" id="workGrid">
        {filtered.map(item => (
          <Link
            key={item.slug}
            href={`/work/${item.slug}`}
            className="work-card"
            role="article"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className="work-image">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'cover', objectPosition: 'top' }}
              />
              <div className="work-overlay" aria-hidden="true" />
              <div className="work-cat">{item.cat}</div>
            </div>
            <div className="work-body">
              <div className="work-meta">
                <strong>{item.title}</strong>
                <span>{item.subtitle}</span>
              </div>
              <div className="work-arrow" aria-hidden="true">→</div>
            </div>
          </Link>
        ))}
      </div>

      {/* ── CTA row ── */}
      <div style={{
        borderTop: '1px solid var(--br)',
        padding: 'clamp(40px,5vw,64px) var(--section-px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
        flexWrap: 'wrap',
      }}>
        <div>
          <p style={{
            fontFamily: 'var(--fm)',
            fontSize: '9px',
            letterSpacing: '.18em',
            textTransform: 'uppercase',
            color: 'var(--pink)',
            marginBottom: 8,
          }}>
            Your project next?
          </p>
          <h2 style={{
            fontFamily: 'var(--fd)',
            fontWeight: 700,
            fontSize: 'clamp(22px,3vw,36px)',
            letterSpacing: '-.02em',
          }}>
            Let&apos;s build something great.
          </h2>
        </div>
        <Link
          href="/request"
          style={{
            display: 'inline-block',
            background: 'var(--pink)',
            color: 'var(--white)',
            fontFamily: 'var(--fm)',
            fontSize: '10px',
            letterSpacing: '.12em',
            textTransform: 'uppercase',
            padding: '14px 32px',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          Start a Project
        </Link>
      </div>
    </>
  )
}
