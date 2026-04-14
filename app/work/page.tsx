'use client'

import { useState } from 'react'

const WORK_ITEMS = [
  { id: 1, category: 'branding', cat: 'Branding & Strategy', title: 'AMC Group', subtitle: 'Real Estate · Cairo, Egypt · 2024' },
  { id: 2, category: 'web', cat: 'Web & Technology', title: 'SA Industrial Development', subtitle: 'Infrastructure · Saudi Arabia · 2024' },
  { id: 3, category: 'design', cat: 'Graphic Design', title: 'Fintech Client', subtitle: 'Fintech · Germany · 2023' },
  { id: 4, category: 'branding web', cat: 'Branding & Web', title: 'Tech Startup', subtitle: 'SaaS · South Korea · 2023' },
  { id: 5, category: 'branding', cat: 'Branding & Strategy', title: 'Logistics Group', subtitle: 'Logistics · UAE · 2023' },
  { id: 6, category: 'web', cat: 'Web & Technology', title: 'E-Commerce Platform', subtitle: 'Retail · Australia · 2023' },
]

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = WORK_ITEMS.filter(item =>
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
          Work delivered across branding, design, and digital — from Cairo to Seoul to Berlin. Every project defined, managed, and delivered with engineering discipline.
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
          <div key={item.id} className="work-card" role="article">
            <div className="work-image">
              <div className="work-image-placeholder">Project Visual</div>
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
          </div>
        ))}
      </div>
    </>
  )
}
