import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

const PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_URL ?? 'https://portal.kyberia.tech'

export async function POST(req: NextRequest) {
  const secret = process.env.CLERK_WEBHOOK_SECRET
  if (!secret) {
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
  }

  const headersList = await headers()
  const svixId        = headersList.get('svix-id')
  const svixTimestamp = headersList.get('svix-timestamp')
  const svixSignature = headersList.get('svix-signature')

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ error: 'Missing svix headers' }, { status: 400 })
  }

  const payload = await req.text()

  const wh = new Webhook(secret)
  let event: { type: string; data: Record<string, unknown> }

  try {
    event = wh.verify(payload, {
      'svix-id':        svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as { type: string; data: Record<string, unknown> }
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const forwardEvents = ['user.created', 'user.updated', 'user.deleted']
  if (!forwardEvents.includes(event.type)) {
    return NextResponse.json({ received: true })
  }

  try {
    await fetch(`${PORTAL_URL}/api/webhooks/clerk`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: event.type, data: event.data }),
    })
  } catch {
    // Non-fatal — portal sync failure shouldn't break webhook ack
  }

  return NextResponse.json({ received: true })
}
