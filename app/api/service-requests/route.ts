import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_URL ?? 'https://portal.kyberia.tech'

// Map the friendly service labels shown in the UI to the portal's ProjectType enum
const SERVICE_TYPE_MAP: Record<string, string> = {
  'Branding & Strategy': 'BRANDING',
  'Logo Design':         'BRANDING',
  'Graphic Design':      'OTHER',
  'UI/UX Design':        'OTHER',
  'Web Design':          'WEBSITE',
  'Web Development':     'WEBSITE',
  'E-commerce':          'ECOMMERCE',
  'Motion & Video':      'OTHER',
  'Social Media':        'OTHER',
  'Other':               'OTHER',
}

export async function POST(req: NextRequest) {
  const { userId, getToken } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const token    = await getToken()
  const formData = await req.formData()

  const rawServiceType = (formData.get('serviceType') as string) || ''
  const type           = SERVICE_TYPE_MAP[rawServiceType] ?? 'OTHER'
  const title          = (formData.get('projectName') as string) || rawServiceType
  const description    = (formData.get('description') as string) || ''
  const budgetMin      = formData.get('budgetMin') ? Number(formData.get('budgetMin')) : null
  const budgetMax      = formData.get('budgetMax') ? Number(formData.get('budgetMax')) : null
  const deadline       = (formData.get('deadline') as string) || null

  const payload: Record<string, unknown> = {
    source:  'kyberia.tech',
    type,
    title,
    description,
    budgetMin,
    budgetMax,
    deadline: deadline || null,
  }

  const files = formData.getAll('files').filter(v => v instanceof File && v.size > 0) as File[]
  if (files.length > 0) {
    payload.attachments = files.map(f => ({ name: f.name, size: f.size, type: f.type }))
  }

  const portalRes = await fetch(`${PORTAL_URL}/api/project-requests`, {
    method:  'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })

  if (!portalRes.ok) {
    const text = await portalRes.text().catch(() => '')
    return NextResponse.json(
      { error: 'Failed to submit request to portal', detail: text },
      { status: portalRes.status },
    )
  }

  const data = await portalRes.json().catch(() => ({}))

  // ── Email notification to team ──────────────────────────────────────────
  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from:    'Kyberia Tech <hello@kyberia.tech>',
      to:      'hello@kyberia.tech',
      subject: `New Service Request — ${rawServiceType || type}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;color:#111">
          <h2 style="color:#FF2F92;margin:0 0 20px">New Service Request (Portal)</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#666;width:130px">Service</td><td style="padding:8px 0"><strong>${rawServiceType}</strong></td></tr>
            <tr><td style="padding:8px 0;color:#666">Project</td><td style="padding:8px 0">${title}</td></tr>
            <tr><td style="padding:8px 0;color:#666">Budget</td><td style="padding:8px 0">${budgetMin && budgetMax ? `$${budgetMin} – $${budgetMax}` : '—'}</td></tr>
            <tr><td style="padding:8px 0;color:#666">Deadline</td><td style="padding:8px 0">${deadline || '—'}</td></tr>
          </table>
          <div style="margin-top:20px;padding:16px;background:#f5f5f5;border-left:3px solid #FF2F92">
            <p style="margin:0;color:#333">${description}</p>
          </div>
          <p style="margin-top:24px;font-size:12px;color:#999">
            Review in portal → <a href="${PORTAL_URL}/dashboard/admin/requests">${PORTAL_URL}/dashboard/admin/requests</a>
          </p>
        </div>
      `,
    }).catch(() => null) // Non-fatal
  }

  return NextResponse.json({ id: data.id ?? data.requestId ?? 'submitted' }, { status: 201 })
}
