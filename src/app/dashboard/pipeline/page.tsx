'use client'

import { useState } from 'react'
import { Database, ArrowRight, CheckCircle, AlertCircle, RefreshCw, Zap, Users, Mail, Globe, FileText } from 'lucide-react'

const sources = [
  { name: 'LinkedIn', icon: Globe, records: 2840, status: 'syncing', lastSync: '2 min ago', matchRate: 94 },
  { name: 'Apollo', icon: Users, records: 1520, status: 'synced', lastSync: '15 min ago', matchRate: 91 },
  { name: 'Clearbit', icon: Zap, records: 980, status: 'synced', lastSync: '1 hr ago', matchRate: 88 },
  { name: 'CSV Upload', icon: FileText, records: 340, status: 'queued', lastSync: '—', matchRate: 0 },
]

const pipelineSteps = [
  { name: 'Extract', description: 'Pull raw profiles from sources', status: 'done', records: 5680, duration: '45s' },
  { name: 'Clean', description: 'Deduplicate, validate emails', status: 'done', records: 5420, duration: '12s' },
  { name: 'Enrich', description: 'Add title, company, phone', status: 'active', records: 4890, duration: 'running' },
  { name: 'Score', description: 'Run ICP model (0-100)', status: 'pending', records: 0, duration: '—' },
  { name: 'Route', description: 'Push to CRM / sequencer', status: 'pending', records: 0, duration: '—' },
]

export default function PipelinePage() {
  const [refreshing, setRefreshing] = useState(false)

  const runRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1500)
  }

  return (
    <div className="max-w-5xl">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Enrichment Pipeline</h1>
          <p className="text-sm text-zinc-400 mt-1">Extract, clean, enrich, score, and route leads</p>
        </div>
        <button
          onClick={runRefresh}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm font-medium transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Syncing...' : 'Sync Now'}
        </button>
      </header>

      {/* Data Sources */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-4">Data Sources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sources.map((s) => {
            const Icon = s.icon
            return (
              <div key={s.name} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-brand-400" />
                    <span className="font-medium text-sm">{s.name}</span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    s.status === 'synced' ? 'bg-emerald-500/10 text-emerald-400' :
                    s.status === 'syncing' ? 'bg-amber-500/10 text-amber-400' :
                    'bg-zinc-500/10 text-zinc-400'
                  }`}>
                    {s.status}
                  </span>
                </div>
                <div className="text-2xl font-bold">{s.records.toLocaleString()}</div>
                <div className="text-xs text-zinc-500 mt-1">records · {s.lastSync}</div>
                {s.matchRate > 0 && (
                  <div className="text-xs text-emerald-400 mt-2">{s.matchRate}% match rate</div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Pipeline Flow */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-4">Pipeline Flow</h2>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            {pipelineSteps.map((step, i) => (
              <div key={step.name} className="flex items-center gap-3 md:gap-4 w-full md:w-auto">
                <div className="flex-1 min-w-[140px]">
                  <div className="flex items-center gap-2 mb-1">
                    {step.status === 'done' && <CheckCircle className="w-4 h-4 text-emerald-400" />}
                    {step.status === 'active' && <RefreshCw className="w-4 h-4 text-amber-400 animate-spin" />}
                    {step.status === 'pending' && <div className="w-4 h-4 rounded-full border-2 border-zinc-600" />}
                    <span className={`text-sm font-medium ${
                      step.status === 'done' ? 'text-zinc-200' :
                      step.status === 'active' ? 'text-amber-400' :
                      'text-zinc-500'
                    }`}>
                      {step.name}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500">{step.description}</p>
                  {step.records > 0 && (
                    <p className="text-xs text-zinc-400 mt-1">{step.records.toLocaleString()} records · {step.duration}</p>
                  )}
                </div>
                {i < pipelineSteps.length - 1 && (
                  <ArrowRight className="hidden md:block w-4 h-4 text-zinc-600" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Quality */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-4">Data Quality</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <div className="text-sm text-zinc-400 mb-1">Email Validity</div>
            <div className="text-2xl font-bold text-emerald-400">96.2%</div>
            <div className="text-xs text-zinc-500 mt-1">5,213 valid · 208 bounced</div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <div className="text-sm text-zinc-400 mb-1">Field Completeness</div>
            <div className="text-2xl font-bold text-emerald-400">91.4%</div>
            <div className="text-xs text-zinc-500 mt-1">Title, company, industry filled</div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <div className="text-sm text-zinc-400 mb-1">Deduplication</div>
            <div className="text-2xl font-bold text-amber-400">260</div>
            <div className="text-xs text-zinc-500 mt-1">duplicates merged this run</div>
          </div>
        </div>
      </section>

      {/* Output */}
      <section>
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-4">Output</h2>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-brand-400" />
              <div>
                <div className="font-medium">Lead Feed Queue</div>
                <div className="text-xs text-zinc-400">Ready for review and outreach</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">4,890</div>
              <div className="text-xs text-zinc-500">enriched leads</div>
            </div>
          </div>
          <div className="border-t border-zinc-800 pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">Hot (score 80+)</span>
              <span className="font-medium text-emerald-400">1,247</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-zinc-400">Warm (score 60-79)</span>
              <span className="font-medium text-amber-400">2,156</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-zinc-400">Cool (score 40-59)</span>
              <span className="font-medium text-zinc-300">1,487</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center gap-2 text-xs text-zinc-500">
            <AlertCircle className="w-3 h-3" />
            <span>Last full pipeline run: 15 min ago · Next scheduled: 45 min</span>
          </div>
        </div>
      </section>
    </div>
  )
}
