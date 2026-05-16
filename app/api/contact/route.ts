import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { clerkClient } from '@clerk/nextjs/server'

const PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_URL ?? 'https://portal.kyberia.tech'
const PORTAL_INTAKE_SECRET = process.env.PORTAL_INTAKE_SECRET ?? ''

const SERVICE_LABEL: Record<string, string> = {
  branding: 'Branding & Strategy',
  design:   'Graphic Design',
  web:      'Web Design & Development',
  bundle:   'Brand + Web Bundle',
  other:    'Other / Not sure yet',
}

const SERVICE_TYPE_MAP: Record<string, string> = {
  branding: 'BRANDING',
  design:   'OTHER',
  web:      'WEBSITE',
  bundle:   'BRANDING',
  other:    'OTHER',
}

const BUDGET_LABEL: Record<string, string> = {
  'under5k': 'Under $5,000',
  '5-10k':   '$5,000 – $10,000',
  '10-20k':  '$10,000 – $20,000',
  '20kplus': '$20,000+',
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, company, service, budget, message } = await req.json()

    if (!name || !email || !service) {
      return NextResponse.json({ error: 'Name, email and service are required.' }, { status: 400 })
    }

    const serviceLabel = SERVICE_LABEL[service] ?? service
    const budgetLabel  = budget ? (BUDGET_LABEL[budget] ?? budget) : 'Not specified'
    const portalType   = SERVICE_TYPE_MAP[service] ?? 'OTHER'

    // ── 1. Notify the team ──────────────────────────────────────────────────
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from:    'Kyberia Tech <hello@kyberia.tech>',
        to:      'hello@kyberia.tech',
        subject: `New Project Enquiry — ${serviceLabel}`,
        html: `
          <div style="font-family:sans-serif;max-width:560px;color:#111">
            <h2 style="color:#FF2F92;margin:0 0 20px">New Project Enquiry</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;color:#666;width:130px">Name</td><td style="padding:8px 0"><strong>${name}</strong></td></tr>
              <tr><td style="padding:8px 0;color:#666">Email</td><td style="padding:8px 0"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding:8px 0;color:#666">Company</td><td style="padding:8px 0">${company || '—'}</td></tr>
              <tr><td style="padding:8px 0;color:#666">Service</td><td style="padding:8px 0">${serviceLabel}</td></tr>
              <tr><td style="padding:8px 0;color:#666">Budget</td><td style="padding:8px 0">${budgetLabel}</td></tr>
            </table>
            <div style="margin-top:20px;padding:16px;background:#f5f5f5;border-left:3px solid #FF2F92">
              <p style="margin:0;color:#333">${message || '—'}</p>
            </div>
            <p style="margin-top:24px;font-size:12px;color:#999">
              View in portal → <a href="${PORTAL_URL}/dashboard/admin/requests">${PORTAL_URL}/dashboard/admin/requests</a>
            </p>
          </div>
        `,
      })
    }

    // ── 2. Create Clerk user / send invitation ──────────────────────────────
    let clerkUserId: string | null = null
    try {
      const client = await clerkClient()
      // Check if user already exists
      const existing = await client.users.getUserList({ emailAddress: [email] })
      if (existing.totalCount > 0) {
        clerkUserId = existing.data[0].id
      } else {
        const [firstName, ...rest] = name.split(' ')
        const newUser = await client.users.createUser({
          emailAddress: [email],
          firstName,
          lastName: rest.join(' ') || undefined,
          skipPasswordChecks: true,
          skipPasswordRequirement: true,
        })
        clerkUserId = newUser.id
        // Send them a sign-in magic link so they can access the portal
        await client.signInTokens.createSignInToken({ userId: clerkUserId, expiresInSeconds: 60 * 60 * 24 * 7 })
      }
    } catch {
      // Non-fatal — request still logged
    }

    // ── 3. Send confirmation to client ─────────────────────────────────────
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from:    'Kyberia Tech <hello@kyberia.tech>',
        to:      email,
        subject: 'We received your enquiry — Kyberia Tech',
        html: `
          <div style="font-family:sans-serif;max-width:560px;color:#111">
            <h2 style="color:#FF2F92;margin:0 0 16px">Thanks, ${name.split(' ')[0]}.</h2>
            <p style="color:#444;line-height:1.7">We received your project enquiry for <strong>${serviceLabel}</strong> and we'll get back to you within 24 hours with clarity about what you need — and what you don't.</p>
            <p style="color:#444;line-height:1.7">We've created a client account for you at <a href="https://portal.kyberia.tech" style="color:#FF2F92">portal.kyberia.tech</a> where you can track your request and communicate with our team. Check your inbox for a separate login link.</p>
            <hr style="border:none;border-top:1px solid #eee;margin:24px 0" />
            <p style="font-size:13px;color:#666">
              Kyberia Tech · Cairo, Egypt · <a href="https://kyberia.tech" style="color:#FF2F92">kyberia.tech</a>
            </p>
          </div>
        `,
      })
    }

    // ── 4. Create project request in portal ─────────────────────────────────
    if (PORTAL_INTAKE_SECRET) {
      await fetch(`${PORTAL_URL}/api/intake`, {
        method: 'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${PORTAL_INTAKE_SECRET}`,
        },
        body: JSON.stringify({
          clerkId:     clerkUserId,
          email,
          name,
          company:     company || null,
          type:        portalType,
          title:       `${serviceLabel} — ${company || name}`,
          description: message || `Enquiry for ${serviceLabel}. Budget: ${budgetLabel}.`,
          source:      'kyberia.tech/contact',
        }),
      }).catch(() => null) // Non-fatal
    }

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (err) {
    console.error('[/api/contact]', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
