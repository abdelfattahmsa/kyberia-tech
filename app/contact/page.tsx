'use client'

import { FormEvent, useRef } from 'react'

export default function ContactPage() {
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const companyRef = useRef<HTMLInputElement>(null)
  const serviceRef = useRef<HTMLSelectElement>(null)
  const budgetRef = useRef<HTMLSelectElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const name    = nameRef.current?.value.trim() || ''
    const email   = emailRef.current?.value.trim() || ''
    const service = serviceRef.current?.value || ''
    if (!name || !email || !service) {
      alert('Please fill in Name, Email, and Service to continue.')
      return
    }
    const subject = encodeURIComponent('Project Enquiry — Kyberia Tech')
    const body = encodeURIComponent(
      'Name: '    + name + '\n' +
      'Email: '   + email + '\n' +
      'Company: ' + (companyRef.current?.value || '—') + '\n' +
      'Service: ' + service + '\n' +
      'Budget: '  + (budgetRef.current?.value || '—') + '\n\n' +
      'Message:\n' + (messageRef.current?.value || '—')
    )
    window.location.href = 'mailto:hello@kyberia.tech?subject=' + subject + '&body=' + body
  }

  return (
    <section className="contact-hero" aria-label="Contact">
      <div className="contact-form" role="form" aria-label="Project enquiry form">
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
            <textarea ref={messageRef} className="form-textarea" id="cf-message" placeholder="What are you building? What&apos;s the problem you&apos;re solving?" rows={4} />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            Send Message →
          </button>
        </form>
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
              <strong>Location</strong>
              <span>Cairo, Egypt · Global since 2018</span>
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
