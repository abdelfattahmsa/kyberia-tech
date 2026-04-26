import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getProject, getAllSlugs } from '@/lib/projects'

// ── Static params ──────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

// ── Metadata ───────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return {
    title: `${project.title} — Case Study | Kyberia Tech`,
    description: project.summary,
  }
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  return (
    <>
      {/* ── Back nav ── */}
      <div style={{
        padding: '24px var(--section-px) 0',
        borderBottom: '1px solid var(--br)',
      }}>
        <Link
          href="/work"
          style={{
            fontFamily: 'var(--fm)',
            fontSize: '9.5px',
            letterSpacing: '.12em',
            textTransform: 'uppercase',
            color: 'var(--g500)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            paddingBottom: 20,
            transition: 'color .2s',
          }}
          className="case-back-link"
        >
          ← All Projects
        </Link>
      </div>

      {/* ── Hero image ── */}
      <div style={{
        width: '100%',
        aspectRatio: '21/9',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--s2)',
        borderBottom: '1px solid var(--br)',
      }}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'top' }}
          priority
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,.7) 100%)',
        }} />
        {/* Category badge */}
        <div className="work-cat" style={{ top: 24, left: 24, fontSize: '9px' }}>
          {project.cat}
        </div>
      </div>

      {/* ── Content ── */}
      <div
        className="case-layout"
        style={{
          maxWidth: 'var(--content-max)',
          margin: '0 auto',
          padding: 'clamp(40px,6vw,80px) var(--section-px)',
        }}
      >

        {/* ── Main content ── */}
        <div>
          {/* Title */}
          <div className="section-eyebrow" style={{ marginBottom: 16 }}>Case Study</div>
          <h1 style={{
            fontFamily: 'var(--fd)',
            fontWeight: 700,
            fontSize: 'clamp(32px,4vw,56px)',
            letterSpacing: '-.03em',
            lineHeight: .95,
            marginBottom: 16,
          }}>
            {project.title}
          </h1>
          <p style={{
            fontFamily: 'var(--fm)',
            fontSize: '11px',
            color: 'var(--g500)',
            letterSpacing: '.1em',
            textTransform: 'uppercase',
            marginBottom: 32,
          }}>
            {project.subtitle}
          </p>

          {/* Summary */}
          <p style={{
            fontSize: 'clamp(15px,1.4vw,18px)',
            color: 'var(--g300)',
            lineHeight: 1.75,
            marginBottom: 48,
            maxWidth: 600,
          }}>
            {project.summary}
          </p>

          {/* Challenge */}
          <div style={{ marginBottom: 40 }}>
            <h2 style={{
              fontFamily: 'var(--fd)',
              fontWeight: 600,
              fontSize: 'clamp(18px,2vw,22px)',
              marginBottom: 12,
            }}>
              The Challenge
            </h2>
            <p style={{ color: 'var(--g300)', lineHeight: 1.75 }}>
              {project.challenge}
            </p>
          </div>

          {/* Solution */}
          <div style={{ marginBottom: 40 }}>
            <h2 style={{
              fontFamily: 'var(--fd)',
              fontWeight: 600,
              fontSize: 'clamp(18px,2vw,22px)',
              marginBottom: 12,
            }}>
              What We Built
            </h2>
            <p style={{ color: 'var(--g300)', lineHeight: 1.75 }}>
              {project.solution}
            </p>
          </div>

          {/* Results */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={{
              fontFamily: 'var(--fd)',
              fontWeight: 600,
              fontSize: 'clamp(18px,2vw,22px)',
              marginBottom: 16,
            }}>
              Results
            </h2>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {project.results.map((r, i) => (
                <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{
                    color: 'var(--pink)',
                    fontFamily: 'var(--fm)',
                    fontSize: '12px',
                    marginTop: 2,
                    flexShrink: 0,
                  }}>✦</span>
                  <span style={{ color: 'var(--g300)', lineHeight: 1.6 }}>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: 'var(--fm)',
                fontSize: '10px',
                letterSpacing: '.12em',
                textTransform: 'uppercase',
                color: 'var(--pink)',
                border: '1px solid var(--pink-bd)',
                padding: '10px 20px',
                transition: 'background .2s, color .2s',
              }}
              className="case-visit-btn"
            >
              Visit Live Site →
            </a>
          )}
        </div>

        {/* ── Sidebar ── */}
        <aside>
          <div style={{
            background: 'var(--s1)',
            border: '1px solid var(--br2)',
            padding: 24,
          }}>
            <div style={{
              fontFamily: 'var(--fm)',
              fontSize: '8.5px',
              letterSpacing: '.18em',
              textTransform: 'uppercase',
              color: 'var(--pink)',
              marginBottom: 20,
              paddingBottom: 16,
              borderBottom: '1px solid var(--br)',
            }}>
              Project Details
            </div>

            {[
              { label: 'Industry', value: project.industry },
              { label: 'Country', value: project.country },
              { label: 'Year', value: project.year },
            ].map(({ label, value }) => (
              <div key={label} style={{ marginBottom: 16 }}>
                <div style={{
                  fontFamily: 'var(--fm)',
                  fontSize: '9px',
                  color: 'var(--g500)',
                  letterSpacing: '.1em',
                  textTransform: 'uppercase',
                  marginBottom: 4,
                }}>
                  {label}
                </div>
                <div style={{ fontFamily: 'var(--fd)', fontWeight: 500, fontSize: 14 }}>
                  {value}
                </div>
              </div>
            ))}

            {/* Stack */}
            <div style={{ marginBottom: 20 }}>
              <div style={{
                fontFamily: 'var(--fm)',
                fontSize: '9px',
                color: 'var(--g500)',
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                marginBottom: 8,
              }}>
                Tech Stack
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {project.stack.map(s => (
                  <span key={s} style={{
                    fontFamily: 'var(--fm)',
                    fontSize: '9px',
                    letterSpacing: '.08em',
                    color: 'var(--g300)',
                    border: '1px solid var(--br2)',
                    padding: '4px 8px',
                  }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <div style={{
                fontFamily: 'var(--fm)',
                fontSize: '9px',
                color: 'var(--g500)',
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                marginBottom: 8,
              }}>
                Services
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {project.tags.map(t => (
                  <span key={t} style={{
                    fontFamily: 'var(--fm)',
                    fontSize: '9px',
                    letterSpacing: '.08em',
                    color: 'var(--pink)',
                    border: '1px solid var(--pink-bd)',
                    padding: '4px 8px',
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Next project */}
          <div style={{ marginTop: 24 }}>
            <Link
              href="/work"
              style={{
                display: 'block',
                background: 'var(--pink)',
                color: 'var(--white)',
                fontFamily: 'var(--fm)',
                fontSize: '9.5px',
                letterSpacing: '.12em',
                textTransform: 'uppercase',
                padding: '14px 20px',
                textAlign: 'center',
                transition: 'opacity .2s',
              }}
            >
              ← View All Projects
            </Link>
          </div>
        </aside>
      </div>

      {/* ── Start a project CTA ── */}
      <div style={{
        borderTop: '1px solid var(--br)',
        padding: 'clamp(48px,6vw,80px) var(--section-px)',
        textAlign: 'center',
        background: 'var(--nb)',
      }}>
        <p style={{
          fontFamily: 'var(--fm)',
          fontSize: '9px',
          letterSpacing: '.18em',
          textTransform: 'uppercase',
          color: 'var(--pink)',
          marginBottom: 16,
        }}>
          Ready to start?
        </p>
        <h2 style={{
          fontFamily: 'var(--fd)',
          fontWeight: 700,
          fontSize: 'clamp(28px,3.5vw,48px)',
          letterSpacing: '-.03em',
          marginBottom: 24,
        }}>
          Let&apos;s build something together.
        </h2>
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
            transition: 'opacity .2s',
          }}
        >
          Start a Project
        </Link>
      </div>
    </>
  )
}
