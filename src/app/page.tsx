import Link from 'next/link'
import {
  Eye,
  Users,
  Target,
  Mail,
  Radar,
  ArrowRight,
  Code2,
  CheckCircle2,
  Plug,
  Zap,
  Shield,
} from 'lucide-react'

const features = [
  {
    icon: Eye,
    title: 'Watchlist',
    desc: 'Pin competitors, partners, and thought leaders. We index every public post and the people engaging with them.',
  },
  {
    icon: Zap,
    title: 'Signal Detection',
    desc: 'Likes, comments, reposts, profile visits, mentions. Every engagement is a buying signal — caught in real time.',
  },
  {
    icon: Target,
    title: 'ICP Match Score',
    desc: 'Every engager is scored 0–100 against your ICP. Sort, filter, snooze. Only chase fits above your threshold.',
  },
  {
    icon: Mail,
    title: 'Contact Enrichment',
    desc: 'One click for verified email and direct dial via Apollo and Clearbit. Ship straight to your CRM or sequencer.',
  },
  {
    icon: Users,
    title: 'Lead Feed',
    desc: 'Qualified leads surface automatically — enriched, scored, and ready to outreach. No manual prospecting.',
  },
  {
    icon: Shield,
    title: 'No Browser Extension',
    desc: 'We read public LinkedIn engagement through our own data layer. You never hand over your login or install anything.',
  },
]

const integrations = [
  { category: 'Data Sources', items: ['LinkedIn', 'Apollo.io', 'Clearbit', 'ZoomInfo'] },
  { category: 'CRM', items: ['Salesforce', 'HubSpot'] },
  { category: 'Sequencers', items: ['Outreach', 'Salesloft'] },
  { category: 'Notifications', items: ['Slack', 'Webhooks'] },
]

const tech = [
  'Next.js 15 App Router',
  'TypeScript',
  'Tailwind CSS',
  'Zod structured output',
  'OpenAI GPT-4o',
  'Framer Motion',
  'Jest',
]

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/20 via-zinc-950 to-zinc-950" />
        <div className="max-w-5xl mx-auto px-6 py-24 relative">
          <div className="flex items-center gap-2 mb-6">
            <span className="bg-brand-500/10 text-brand-400 text-xs font-medium px-3 py-1 rounded-full border border-brand-500/20">
              Open Source — v1.0
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-br from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            LeadFinder
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed mb-10">
            An AI agent for lead intelligence. Monitors LinkedIn engagement, scores prospects against your ICP,
            enriches contacts via Apollo and Clearbit, and routes qualified leads to your CRM —
            with full architectural transparency.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Open Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Pricing
            </Link>
            <a
              href="https://github.com/developers-universe-1/leadfinder"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors px-4 py-3"
            >
              <Code2 className="w-4 h-4" />
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="border-t border-zinc-900 py-16">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5 text-brand-400" />
              For Revenue Leaders
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Replace manual LinkedIn prospecting. Save every SDR 6+ hours per week.
              Get Slack alerts the moment a high-fit lead engages. Stop chasing cold — start closing warm.
            </p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-brand-400" />
              For Engineering Leaders
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Production-grade AI agent architecture with real-time ICP scoring, SSE streaming,
              typed error hierarchy, and zero-config demo mode. Fork it, extend it, or use it as a reference.
            </p>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="border-t border-zinc-900 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm px-4 py-2 rounded-full mb-4">
              <Plug className="w-4 h-4 text-brand-400" />
              Plugs into the stack you already use
            </div>
            <p className="text-zinc-400">Enrichment via Apollo and Clearbit. Push to Salesforce, HubSpot, Outreach, or Slack.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {integrations.map((group) => (
              <div key={group.category} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-3">{group.category}</p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="bg-zinc-800 text-zinc-300 text-xs px-2.5 py-1 rounded-md">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-semibold mb-10 text-center">Five capabilities. One agent.</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors group"
            >
              <div className="bg-zinc-800/50 w-10 h-10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-500/10 transition-colors">
                <f.icon className="w-5 h-5 text-zinc-300 group-hover:text-brand-400 transition-colors" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-semibold mb-10 text-center">Architecture</h2>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 overflow-x-auto">
          <div className="flex items-center justify-center min-w-[700px]">
            <div className="flex items-center gap-4">
              {[
                { label: 'LinkedIn', sub: 'Public Data', color: 'bg-zinc-800 text-zinc-300' },
                { label: 'Watch', sub: 'Profile Index', color: 'bg-zinc-800 text-zinc-300' },
                { label: 'Score', sub: 'ICP Engine', color: 'bg-brand-950/40 text-brand-400' },
                { label: 'Enrich', sub: 'Apollo + Clearbit', color: 'bg-brand-950/40 text-brand-400' },
                { label: 'Route', sub: 'CRM / Sequencer', color: 'bg-brand-950/40 text-brand-400' },
                { label: 'Notify', sub: 'Slack + Webhooks', color: 'bg-zinc-800 text-zinc-300' },
              ].map((step, i) => (
                <div key={step.label} className="flex items-center gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-28 h-12 rounded-lg flex items-center justify-center text-xs font-mono border border-zinc-700 ${step.color}`}>
                      {step.label}
                    </div>
                    <span className="text-xs text-zinc-500">{step.sub}</span>
                  </div>
                  {i < 5 && <div className="w-8 h-px bg-zinc-700" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="border-t border-zinc-900 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-8 text-center">Built with</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {tech.map((t) => (
              <span
                key={t}
                className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm px-4 py-2 rounded-lg"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Why open source */}
      <section className="border-t border-zinc-900 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-semibold mb-4">Why open source?</h2>
          <p className="text-zinc-400 leading-relaxed mb-8">
            Lead intelligence should be transparent. This project documents the full architecture of an AI-powered
            lead scoring and enrichment platform — from social signal detection to structured output parsing.
            Fork it, extend it, or use it as a reference for your own implementation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            {[
              { title: 'Structured Output', desc: 'Zod schemas guarantee valid, typed data from every LLM call. No free-form JSON parsing.' },
              { title: 'Streaming Pipeline', desc: 'Real-time SSE progress updates from the scoring engine to the UI.' },
              { title: 'Demo Mode', desc: 'Works without API keys. Rich mock data lets anyone explore the full dashboard instantly.' },
            ].map((item) => (
              <div key={item.title} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-400" />
                  <h3 className="font-medium text-sm">{item.title}</h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-8">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radar className="w-5 h-5 text-brand-500" />
            <span className="font-semibold">LeadFinder</span>
          </div>
          <p className="text-sm text-zinc-500">
            Open-source lead intelligence — MIT License
          </p>
        </div>
      </footer>
    </main>
  )
}
