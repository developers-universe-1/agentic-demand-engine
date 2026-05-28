import { logger } from '@/lib/logger'
import { leadCache } from '@/lib/cache'
import { mockLeads, mockWatchlist, type Lead } from '@/lib/demo'

export interface LeadFeed {
  leads: Lead[]
  watchlist: typeof mockWatchlist
  stats: {
    totalLeads: number
    enrichedCount: number
    avgIcpScore: number
    highIntentCount: number
  }
}

export async function getLeadFeed(): Promise<LeadFeed> {
  const cacheKey = 'leads:v1'
  const cached = leadCache.get(cacheKey) as LeadFeed | undefined
  if (cached) {
    logger.debug('scorer', 'Lead feed cache hit')
    return cached
  }

  logger.info('scorer', 'Building lead feed from mock data')

  const enriched = mockLeads.filter(l => l.enriched)
  const highIntent = mockLeads.filter(l => l.icpScore >= 90)
  const avgScore = Math.round(mockLeads.reduce((s, l) => s + l.icpScore, 0) / mockLeads.length)

  const feed: LeadFeed = {
    leads: mockLeads,
    watchlist: mockWatchlist,
    stats: {
      totalLeads: mockLeads.length,
      enrichedCount: enriched.length,
      avgIcpScore: avgScore,
      highIntentCount: highIntent.length,
    },
  }

  leadCache.set(cacheKey, feed, 60 * 1000)
  return feed
}

export interface LeadProgress {
  stage: string
  message: string
  progress: number
  data?: Partial<LeadFeed>
}

export async function* scanPipelineStream(): AsyncGenerator<LeadProgress> {
  logger.info('scorer', 'Starting lead scan stream')

  yield { stage: 'watch', message: 'Scanning 4 watched LinkedIn profiles', progress: 15 }
  await delay(400)

  yield { stage: 'watch', message: 'Indexed 1,247 public engagements', progress: 35, data: { watchlist: mockWatchlist } }
  await delay(400)

  yield { stage: 'score', message: 'Scoring engagers against ICP criteria', progress: 55, data: { leads: mockLeads } }
  await delay(500)

  yield { stage: 'enrich', message: 'Enriching high-fit leads via Apollo + Clearbit', progress: 80, data: { leads: mockLeads } }
  await delay(400)

  const feed = await getLeadFeed()
  yield { stage: 'complete', message: `Surfaced ${feed.stats.totalLeads} qualified leads`, progress: 100, data: feed }

  logger.info('scorer', 'Lead scan stream complete')
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
