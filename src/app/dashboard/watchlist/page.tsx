'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, Users, MessageCircle, Repeat, Heart, MousePointer } from 'lucide-react'
import type { LeadFeed } from '@/lib/agent/scorer'

const engagementIcons: Record<string, typeof Heart> = {
  like: Heart,
  comment: MessageCircle,
  repost: Repeat,
  profile_view: MousePointer,
}

export default function WatchlistPage() {
  const [data, setData] = useState<LeadFeed | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/leads')
      .then(r => {
        if (!r.ok) throw new Error('Failed to load watchlist')
        return r.json()
      })
      .then(d => setData(d))
      .catch(e => setError(e.message || 'Something went wrong'))
  }, [])

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-red-400 font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 text-sm text-brand-400 hover:text-brand-300"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Eye className="w-6 h-6 text-brand-500" />
          Watchlist
        </h1>
        <p className="text-zinc-400 text-sm mt-1">
          LinkedIn profiles your buyers follow. We index every public post and the people engaging with them.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.watchlist.map((profile, i) => {
          const profileLeads = data.leads.filter(l => l.engagedProfile === profile.name)
          const engagementTypes = Array.from(new Set(profileLeads.map(l => l.engagementType)))

          return (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-medium text-lg">{profile.name}</p>
                  <p className="text-xs text-zinc-500">{profile.handle} • {profile.followers} followers</p>
                  <p className="text-xs text-zinc-400 mt-1">{profile.role}</p>
                </div>
                <span className="text-xs bg-brand-950/50 text-brand-400 px-2.5 py-1 rounded-full border border-brand-900">
                  {profile.category}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-zinc-800/30 rounded-lg p-3 text-center">
                  <p className="text-xl font-bold text-white">{profileLeads.length}</p>
                  <p className="text-[10px] text-zinc-500 uppercase">Qualified Leads</p>
                </div>
                <div className="bg-zinc-800/30 rounded-lg p-3 text-center">
                  <p className="text-xl font-bold text-white">
                    {Math.round(profileLeads.reduce((s, l) => s + l.icpScore, 0) / (profileLeads.length || 1))}
                  </p>
                  <p className="text-[10px] text-zinc-500 uppercase">Avg ICP Score</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-500">Signals caught:</span>
                <div className="flex gap-1.5">
                  {engagementTypes.map(type => {
                    const Icon = engagementIcons[type] || Heart
                    return (
                      <span key={type} className="bg-zinc-800 text-zinc-300 text-xs px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Icon className="w-3 h-3" />
                        {type.replace('_', ' ')}
                      </span>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
