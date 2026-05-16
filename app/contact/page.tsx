'use client'

import { FormEvent, useRef, useState } from 'react'

export default function ContactPage() {
  const nameRef    = useRef<HTMLInputElement>(null)
  const emailRef   = useRef<HTMLInputElement>(null)
  const companyRef = useRef<HTMLInputElement>(null)
  const serviceRef = useRef<HTMLSelectElement>(null)
  const budgetRef  = useRef<HTMLSelectElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)

  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess]       = useState(false)
  const [error, setError]           = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const name    = nameRef.current?.value.trim() || ''
    const email   = emailRef.current?.value.trim() || ''
    const service = serviceRef.current?.value || ''
    if (!name || !email || !service) {
      setError('Please fill in Name, Email, and Service to continue.')
      return
    }
    setError(null)
    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          company: companyRef.current?.value.trim() || '',
          service,
          budget:  budgetRef.current?.value || '',
          message: messageRef.current?.value.trim() || '',
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong.')
      setSuccess(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="contact-hero" aria-label="Contact">
      <div className="contact-form" role="form" aria-label="Project enquiry form">
        {success ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '40px 0' }}>
            <div style={{ fontSize: 32 }} aria-hidden="true">◈</div>
            <h2 style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: 'clamp(20px,2.5vw,28px)', letterSpacing: '-.02em' }}>
              Message received.
            </h2>
            <p style={{ fontSize: 14, color: 'var(--g300)', lineHeight: 1.8 }}>
              Thanks for reaching out. We&apos;ll get back to you within 24 hours with a clear plan for your project.<br /><br />
              Check your inbox — we&apos;ve sent you a confirmation and created a client account so you can track your request at <a href="https://portal.kyberia.tech" target="_blank" rel="noopener" style={{ color: 'var(--pink)' }}>portal.kyberia.tech</a>.
            </p>
          </div>
        ) : (
          <>
            <h2 style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: 'clamp(20px,2.5vw,28px)', letterSpacing: '-.02em', marginBottom: 24 }}>
              Start a Project
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label req" htmlFor="cf-name">Full Name</label>
                <input ref={nameRef} className="form-input" id="cf-name" type="text" placeholder="Your full name" autoComplete="name" required />
              </div>
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label req" htmlFor="cf-email">Email</label>
                  <input ref={emailRef} className="form-input" id="cf-email" type="email" placeholder="hello@company.com" autoComplete="email" required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="cf-company">Company</label>
                  <input ref={companyRef} className="form-input" id="cf-company" type="text" placeholder="Company name" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label req" htmlFor="cf-service">Service Needed</label>
                <select ref={serviceRef} className="form-select" id="cf-service" required defaultValue="">
                  <option value="" disabled>Select a service</option>
                  <option value="branding">Branding &amp; Strategy</option>
                  <option value="design">Graphic Design</option>
                  <option value="web">Web Design &amp; Development</option>
                  <option value="bundle">Brand + Web Bundle</option>
                  <option value="other">Other / Not sure yet</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="cf-budget">Budget Range</label>
                <select ref={budgetRef} className="form-select" id="cf-budget" defaultValue="">
                  <option value="" disabled>Select a range</option>
                  <option value="under5k">Under $5,000</option>
                  <option value="5-10k">$5,000 – $10,000</option>
                  <option value="10-20k">$10,000 – $20,000</option>
                  <option value="20kplus">$20,000+</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="cf-message">Tell us about your project</label>
                <textarea ref={messageRef} className="form-textarea" id="cf-message" placeholder="What are you building? What's the problem you're solving?" rows={4} />
              </div>
              {error && (
                <div style={{ fontSize: 13, color: '#f87171', padding: '10px 14px', background: 'rgba(248,113,113,.08)', border: '1px solid rgba(248,113,113,.2)', marginBottom: 16 }} role="alert">
                  {error}
                </div>
              )}
              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={submitting}>
                {submitting ? 'Sending…' : 'Send Message →'}
              </button>
            </form>
          </>
        )}
      </div>

      <div className="contact-info">
        <h2 className="ci-title">Let&apos;s build<br />something that <em>lasts.</em></h2>
        <p className="ci-body">Tell us about your project. We&apos;ll respond within 24 hours with clarity about what you need — and what you don&apos;t.</p>
        <div className="contact-details">
          <div className="cd-item">
            <div className="cd-icon" aria-hidden="true">✉</div>
            <div className="cd-text">
              <strong>Email</strong>
              <span><a href="mailto:hello@kyberia.tech" style={{ color: 'var(--g300)' }}>hello@kyberia.tech</a></span>
            </div>
          </div>
          <div className="cd-item">
            <div className="cd-icon" aria-hidden="true">◎</div>
            <div className="cd-text">
              <strong>WhatsApp</strong>
              <span><a href="https://wa.me/message/SJXEXHUQIVT5C1" target="_blank" rel="noopener" style={{ color: 'var(--g300)' }}>+20 11 2890 5160</a></span>
            </div>
          </div>
          <div className="cd-item">
            <div className="cd-icon" aria-hidden="true">☏</div>
            <div className="cd-text">
              <strong>Phone</strong>
              <span><a href="tel:+201128905160" style={{ color: 'var(--g300)' }}>+20 11 2890 5160</a></span>
            </div>
          </div>
          <div className="cd-item">
            <div className="cd-icon" aria-hidden="true">◇</div>
            <div className="cd-text">
              <strong>Response Time</strong>
              <span>Within 24 hours, guaranteed</span>
            </div>
          </div>
          <div className="cd-item">
            <div className="cd-icon" aria-hidden="true">◈</div>
            <div className="cd-text">
              <strong>LinkedIn</strong>
              <span><a href="https://linkedin.com/company/kyberiatech" target="_blank" rel="noopener" style={{ color: 'var(--g300)' }}>@kyberiatech</a></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
