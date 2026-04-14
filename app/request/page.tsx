'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

const SERVICE_TYPES = [
  'Branding & Strategy',
  'Logo Design',
  'Graphic Design',
  'UI/UX Design',
  'Web Design',
  'Web Development',
  'E-commerce',
  'Motion & Video',
  'Social Media',
  'Other',
]

type FormState = {
  serviceType: string
  projectName: string
  description: string
  budgetMin: string
  budgetMax: string
  deadline: string
  files: File[]
}

export default function RequestPage() {
  const router = useRouter()
  const [form, setForm] = useState<FormState>({
    serviceType: '',
    projectName: '',
    description: '',
    budgetMin: '',
    budgetMax: '',
    deadline: '',
    files: [],
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successId, setSuccessId] = useState<string | null>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(f => ({ ...f, files: Array.from(e.target.files ?? []) }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    try {
      const body = new FormData()
      body.append('serviceType', form.serviceType)
      body.append('projectName', form.projectName)
      body.append('description', form.description)
      body.append('budgetMin', form.budgetMin)
      body.append('budgetMax', form.budgetMax)
      body.append('deadline', form.deadline)
      form.files.forEach(f => body.append('files', f))

      const res = await fetch('/api/service-requests', { method: 'POST', body })
      const data = await res.json()

      if (!res.ok) throw new Error(data.error ?? 'Something went wrong')
      setSuccessId(data.id ?? 'submitted')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  if (successId) {
    return (
      <div className="request-page">
        <div className="request-page__inner">
          <div className="request-success">
            <div className="request-success__icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22,4 12,14.01 9,11.01"/>
              </svg>
            </div>
            <h1 className="request-success__title">Request Submitted</h1>
            <p className="request-success__sub">
              Your service request has been received. Our team will review it and get back to you shortly.
            </p>
            <p className="request-success__ref">Reference: <code>{successId}</code></p>
            <div className="request-success__actions">
              <a
                href={`${process.env.NEXT_PUBLIC_PORTAL_URL ?? 'https://portal.kyberia.tech'}/dashboard/projects`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                View in Portal →
              </a>
              <Link href="/account" className="btn-ghost">Back to Account</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="request-page">
      <div className="request-page__inner">

        <div className="request-heading">
          <span className="request-eyebrow">Client Access</span>
          <h1 className="request-title">Request a Service</h1>
          <p className="request-sub">Tell us about your project and we&apos;ll get back to you within 24 hours.</p>
        </div>

        <form className="request-form" onSubmit={handleSubmit} noValidate>

          <div className="rf-row">
            <div className="rf-field">
              <label htmlFor="serviceType" className="rf-label">Service Type <span aria-hidden="true">*</span></label>
              <select
                id="serviceType"
                name="serviceType"
                className="rf-select"
                value={form.serviceType}
                onChange={handleChange}
                required
              >
                <option value="">Select a service…</option>
                {SERVICE_TYPES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="rf-field">
              <label htmlFor="projectName" className="rf-label">Project Name <span aria-hidden="true">*</span></label>
              <input
                type="text"
                id="projectName"
                name="projectName"
                className="rf-input"
                placeholder="e.g. Brand identity for Acme Corp"
                value={form.projectName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="rf-field">
            <label htmlFor="description" className="rf-label">Project Description <span aria-hidden="true">*</span></label>
            <textarea
              id="description"
              name="description"
              className="rf-textarea"
              rows={5}
              placeholder="Describe your project goals, target audience, inspiration, deliverables…"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="rf-row">
            <div className="rf-field">
              <label htmlFor="budgetMin" className="rf-label">Budget Min (USD)</label>
              <input
                type="number"
                id="budgetMin"
                name="budgetMin"
                className="rf-input"
                placeholder="500"
                min="0"
                value={form.budgetMin}
                onChange={handleChange}
              />
            </div>
            <div className="rf-field">
              <label htmlFor="budgetMax" className="rf-label">Budget Max (USD)</label>
              <input
                type="number"
                id="budgetMax"
                name="budgetMax"
                className="rf-input"
                placeholder="5000"
                min="0"
                value={form.budgetMax}
                onChange={handleChange}
              />
            </div>
            <div className="rf-field">
              <label htmlFor="deadline" className="rf-label">Deadline</label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                className="rf-input"
                value={form.deadline}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="rf-field">
            <label htmlFor="files" className="rf-label">Attachments</label>
            <div className="rf-file-area">
              <input
                type="file"
                id="files"
                name="files"
                className="rf-file-input"
                multiple
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.gif,.zip,.ai,.eps,.sketch,.fig"
                onChange={handleFiles}
              />
              <label htmlFor="files" className="rf-file-label">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17,8 12,3 7,8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                {form.files.length > 0
                  ? `${form.files.length} file${form.files.length > 1 ? 's' : ''} selected`
                  : 'Choose files or drag & drop'}
              </label>
              <p className="rf-file-hint">PDF, DOC, PNG, JPG, ZIP, AI, FIG — max 20 MB each</p>
            </div>
          </div>

          {error && (
            <div className="rf-error" role="alert">{error}</div>
          )}

          <div className="rf-actions">
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? 'Submitting…' : 'Submit Request →'}
            </button>
            <Link href="/account" className="btn-ghost">Cancel</Link>
          </div>

        </form>
      </div>
    </div>
  )
}
