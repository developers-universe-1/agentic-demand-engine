import { getLeadFeed, scanPipelineStream } from '@/lib/agent/scorer'

describe('Scorer', () => {
  it('returns a lead feed', async () => {
    const feed = await getLeadFeed()
    expect(feed.leads).toBeDefined()
    expect(feed.leads.length).toBeGreaterThan(0)
    expect(feed.watchlist).toBeDefined()
    expect(feed.stats.totalLeads).toBeGreaterThan(0)
  })

  it('streams scan progress', async () => {
    const chunks: any[] = []
    for await (const chunk of scanPipelineStream()) {
      chunks.push(chunk)
      if (chunk.stage === 'complete') break
    }
    expect(chunks.length).toBeGreaterThan(0)
    expect(chunks[0].stage).toBe('watch')
    expect(chunks[chunks.length - 1].stage).toBe('complete')
  })
})
