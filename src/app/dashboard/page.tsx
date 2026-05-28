'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Eye, Zap, Mail, Phone, ArrowUpRight } from 'lucide-react'
import type { LeadFeed } from '@/lib/agent/scorer'

export default function DashboardOverview() {
  const [data, setData] = useState<LeadFeed | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/leads')
      .then(r => {
        if (!r.ok) throw new Error('Failed to load leads')
        return r.json()
      })
      .then(d => { setData(d); setLoading(false) })
      .catch(e => { setError(e.message || 'Something went wrong'); setLoading(false) })
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500" />
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-red-400 font-medium">{error || 'Failed to load dashboard'}</p>
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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-zinc-400 text-sm mt-1">
          Monitoring {data.watchlist.length} LinkedIn profiles • {data.stats.totalLeads} qualified leads surfaced
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Leads', value: String(data.stats.totalLeads), sub: 'From 4 watched profiles', icon: Users, color: 'text-brand-400' },
          { label: 'Enriched', value: String(data.stats.enrichedCount), sub: 'With email or phone', icon: Mail, color: 'text-emerald-400' },
          { label: 'Avg ICP Score', value: String(data.stats.avgIcpScore), sub: 'Out of 100', icon: Zap, color: 'text-amber-400' },
          { label: 'High Intent', value: String(data.stats.highIntentCount), sub: 'Score 90+', icon: Eye, color: 'text-rose-400' },
        ].map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wide">{m.label}</span>
              <div className={`bg-zinc-800/50 w-8 h-8 rounded-lg flex items-center justify-center ${m.color}`}>
                <m.icon className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{m.value}</div>
            <p className="text-xs text-zinc-500 mt-1">{m.sub}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Watched Profiles</h2>
            <a href="/dashboard/watchlist" className="text-xs text-brand-400 hover:text-brand-300 flex items-center gap-0.5">
              Manage <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
          <div className="space-y-3">
            {data.watchlist.map(w => (
              <div key={w.id} className="flex items-center justify-between py-2 border-b border-zinc-800/50 last:border-0">
                <div>
                  <p className="text-sm font-medium">{w.name}</p>
                  <p className="text-xs text-zinc-500">{w.handle} • {w.followers} followers</p>
                </div>
                <span className="text-xs bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-full">{w.category}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Top Leads</h2>
            <a href="/dashboard/leads" className="text-xs text-brand-400 hover:text-brand-300 flex items-center gap-0.5">
              View all <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
          <div className="space-y-3">
            {data.leads.slice(0, 4).map(lead => (
              <div key={lead.id} className="flex items-center justify-between py-2 border-b border-zinc-800/50 last:border-0">
                <div>
                  <p className="text-sm font-medium">{lead.name}</p>
                  <p className="text-xs text-zinc-500">{lead.title} at {lead.company}</p>
                </div>
                <div className="flex items-center gap-2">
                  {lead.enriched && <Phone className="w-3 h-3 text-emerald-400" />}
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    lead.icpScore >= 90 ? 'bg-rose-950/50 text-rose-400' :
                    lead.icpScore >= 80 ? 'bg-amber-950/50 text-amber-400' :
                    'bg-zinc-800 text-zinc-400'
                  }`}>
                    {lead.icpScore}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
