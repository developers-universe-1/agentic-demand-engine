export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getLeadFeed } from '@/lib/agent/scorer'

export async function GET(_req: NextRequest) {
  try {
    const feed = await getLeadFeed()
    return NextResponse.json(feed)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to load leads'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
