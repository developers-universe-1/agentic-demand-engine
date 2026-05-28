'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Mail, Phone, ExternalLink, Heart, MessageCircle, Repeat, MousePointer, Filter, ChevronDown, ChevronUp, Clock } from 'lucide-react'
import type { Lead } from '@/lib/demo'

const engagementIcons: Record<string, { icon: typeof Heart; color: string }> = {
  like: { icon: Heart, color: 'text-rose-400' },
  comment: { icon: MessageCircle, color: 'text-sky-400' },
  repost: { icon: Repeat, color: 'text-emerald-400' },
  profile_view: { icon: MousePointer, color: 'text-zinc-400' },
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [filter, setFilter] = useState<'all' | 'enriched' | 'high-intent'>('all')
  const [expandedLead, setExpandedLead] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/leads')
      .then(r => r.json())
      .then(d => setLeads(d.leads || []))
  }, [])

  const filtered = leads.filter(l => {
    if (filter === 'enriched') return l.enriched
    if (filter === 'high-intent') return l.icpScore >= 90
    return true
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Users className="w-6 h-6 text-brand-500" />
          Lead Feed
        </h1>
        <p className="text-zinc-400 text-sm mt-1">
          Every engager scored 0–100 against your ICP. Sorted, filtered, and ready to outreach.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-zinc-500" />
        {(['all', 'enriched', 'high-intent'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
              filter === f
                ? 'bg-brand-500/10 text-brand-400 border-brand-500/20'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'
            }`}
          >
            {f.replace('-', ' ')}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((lead, i) => {
          const eg = engagementIcons[lead.engagementType] || engagementIcons.like
          const EgIcon = eg.icon
          const isExpanded = expandedLead === lead.id

          return (
            <motion.div
              key={lead.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="bg-zinc-800 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-zinc-300">
                    {lead.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium">{lead.name}</p>
                    <p className="text-xs text-zinc-500">{lead.title} at {lead.company}</p>
                    <p className="text-xs text-zinc-600 mt-0.5">{lead.location} • {lead.companySize} • {lead.industry}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {lead.tags.map(tag => (
                        <span key={tag} className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`text-2xl font-bold ${
                    lead.icpScore >= 90 ? 'text-rose-400' :
                    lead.icpScore >= 80 ? 'text-amber-400' :
                    'text-zinc-400'
                  }`}>
                    {lead.icpScore}
                  </div>
                  <p className="text-[10px] text-zinc-500 uppercase">ICP Score</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-zinc-800/50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-xs text-zinc-500 flex items-center gap-1">
                    <EgIcon className={`w-3.5 h-3.5 ${eg.color}`} />
                    {lead.engagementType.replace('_', ' ')} on {lead.engagedProfile}
                  </span>
                  {lead.enriched && (
                    <span className="text-xs text-emerald-400 flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      Enriched
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {lead.email && (
                    <span className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded-md flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {lead.email}
                    </span>
                  )}
                  {lead.phone && (
                    <span className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded-md flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {lead.phone}
                    </span>
                  )}
                  <a
                    href={lead.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs bg-brand-950/50 text-brand-400 px-2 py-1 rounded-md flex items-center gap-1 hover:bg-brand-900/50"
                  >
                    <ExternalLink className="w-3 h-3" />
                    LinkedIn
                  </a>
                  <button
                    onClick={() => setExpandedLead(isExpanded ? null : lead.id)}
                    className="text-xs text-zinc-500 hover:text-zinc-300 flex items-center gap-0.5 ml-2 transition-colors"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="w-3.5 h-3.5" />
                        Hide
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-3.5 h-3.5" />
                        Timeline
                      </>
                    )}
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {isExpanded && lead.timeline && lead.timeline.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pt-4 border-t border-zinc-800/50">
                      <h4 className="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-3 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        Engagement Timeline
                      </h4>
                      <div className="relative pl-3">
                        <div className="absolute left-[7px] top-1 bottom-1 w-px bg-zinc-800" />
                        <div className="space-y-3">
                          {lead.timeline.map((event, idx) => {
                            const ev = engagementIcons[event.type] || engagementIcons.like
                            const EvIcon = ev.icon
                            return (
                              <div key={idx} className="flex items-start gap-3 relative">
                                <div className={`w-3.5 h-3.5 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center mt-0.5 flex-shrink-0 z-10`}>
                                  <div className={`w-1.5 h-1.5 rounded-full ${
                                    event.type === 'like' ? 'bg-rose-400' :
                                    event.type === 'comment' ? 'bg-sky-400' :
                                    event.type === 'repost' ? 'bg-emerald-400' :
                                    'bg-zinc-400'
                                  }`} />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm text-zinc-300">
                                    <span className="font-medium">{event.action}</span>{' '}
                                    by <span className="text-zinc-200">{lead.name.split(' ')[0]}</span>
                                  </p>
                                  <p className="text-[11px] text-zinc-500 mt-0.5 flex items-center gap-2">
                                    <span className="flex items-center gap-1">
                                      <EvIcon className={`w-3 h-3 ${ev.color}`} />
                                      {event.target}
                                    </span>
                                    <span>• {formatDate(event.date)}</span>
                                  </p>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
