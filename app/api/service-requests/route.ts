import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

const PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_URL ?? 'https://portal.kyberia.tech'

export async function POST(req: NextRequest) {
  const { userId, getToken } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const token = await getToken()

  const formData = await req.formData()

  // Forward as JSON — strip File objects, send metadata only
  const payload: Record<string, unknown> = {
    source: 'kyberia.tech',
    serviceType: formData.get('serviceType'),
    projectName: formData.get('projectName'),
    description: formData.get('description'),
    budgetMin: formData.get('budgetMin') ? Number(formData.get('budgetMin')) : null,
    budgetMax: formData.get('budgetMax') ? Number(formData.get('budgetMax')) : null,
    deadline: formData.get('deadline') || null,
  }

  const files = formData.getAll('files').filter(v => v instanceof File && v.size > 0) as File[]
  if (files.length > 0) {
    payload.attachments = files.map(f => ({ name: f.name, size: f.size, type: f.type }))
  }

  const portalRes = await fetch(`${PORTAL_URL}/api/project-requests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
  return NextResponse.json({ id: data.id ?? data.requestId ?? 'submitted' }, { status: 201 })
}
