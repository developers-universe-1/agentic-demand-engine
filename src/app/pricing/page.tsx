import Link from 'next/link'
import { Check, X, Radar, ArrowRight, Zap, Users, Globe } from 'lucide-react'

const tiers = [
  {
    name: 'Starter',
    icon: Zap,
    price: '$49',
    period: '/ month',
    description: 'For solo founders and early-stage teams validating their ICP.',
    cta: 'Start Free Trial',
    href: '/dashboard',
    featured: false,
    limits: {
      profiles: '3 watched profiles',
      leads: '250 leads / month',
      enrichment: '50 enrichments',
      seats: '1 seat',
    },
    features: [
      { label: 'LinkedIn engagement monitoring', included: true },
      { label: 'ICP scoring engine', included: true },
      { label: 'Slack notifications', included: true },
      { label: 'Webhook routing', included: true },
      { label: 'Apollo + Clearbit enrichment', included: false },
      { label: 'CRM sync (Salesforce, HubSpot)', included: false },
      { label: 'Sequencer push (Outreach, Salesloft)', included: false },
      { label: 'Team analytics & reporting', included: false },
      { label: 'SSO & SAML', included: false },
      { label: 'Dedicated success manager', included: false },
    ],
  },
  {
    name: 'Team',
    icon: Users,
    price: '$149',
    period: '/ month',
    description: 'For growing GTM teams scaling outbound with signal-driven plays.',
    cta: 'Start Free Trial',
    href: '/dashboard',
    featured: true,
    limits: {
      profiles: '10 watched profiles',
      leads: '2,500 leads / month',
      enrichment: '500 enrichments',
      seats: '5 seats',
    },
    features: [
      { label: 'LinkedIn engagement monitoring', included: true },
      { label: 'ICP scoring engine', included: true },
      { label: 'Slack notifications', included: true },
      { label: 'Webhook routing', included: true },
      { label: 'Apollo + Clearbit enrichment', included: true },
      { label: 'CRM sync (Salesforce, HubSpot)', included: true },
      { label: 'Sequencer push (Outreach, Salesloft)', included: true },
      { label: 'Team analytics & reporting', included: true },
      { label: 'SSO & SAML', included: false },
      { label: 'Dedicated success manager', included: false },
    ],
  },
  {
    name: 'Scale',
    icon: Globe,
    price: '$399',
    period: '/ month',
    description: 'For enterprise teams with complex routing and compliance needs.',
    cta: 'Contact Sales',
    href: '#',
    featured: false,
    limits: {
      profiles: 'Unlimited profiles',
      leads: 'Unlimited leads',
      enrichment: 'Unlimited enrichments',
      seats: 'Unlimited seats',
    },
    features: [
      { label: 'LinkedIn engagement monitoring', included: true },
      { label: 'ICP scoring engine', included: true },
      { label: 'Slack notifications', included: true },
      { label: 'Webhook routing', included: true },
      { label: 'Apollo + Clearbit enrichment', included: true },
      { label: 'CRM sync (Salesforce, HubSpot)', included: true },
      { label: 'Sequencer push (Outreach, Salesloft)', included: true },
      { label: 'Team analytics & reporting', included: true },
      { label: 'SSO & SAML', included: true },
      { label: 'Dedicated success manager', included: true },
    ],
  },
]

const comparison = [
  { feature: 'Watched profiles', starter: '3', team: '10', scale: 'Unlimited' },
  { feature: 'Leads per month', starter: '250', team: '2,500', scale: 'Unlimited' },
  { feature: 'Contact enrichments', starter: '50', team: '500', scale: 'Unlimited' },
  { feature: 'Seats', starter: '1', team: '5', scale: 'Unlimited' },
  { feature: 'ICP scoring', starter: true, team: true, scale: true },
  { feature: 'Slack alerts', starter: true, team: true, scale: true },
  { feature: 'Webhook routing', starter: true, team: true, scale: true },
  { feature: 'CRM sync', starter: false, team: true, scale: true },
  { feature: 'Sequencer push', starter: false, team: true, scale: true },
  { feature: 'Team analytics', starter: false, team: true, scale: true },
  { feature: 'SSO / SAML', starter: false, team: false, scale: true },
  { feature: 'Success manager', starter: false, team: false, scale: true },
]

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="border-b border-zinc-900">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Radar className="w-6 h-6 text-brand-500" />
            <span className="font-bold text-lg tracking-tight">LeadFinder</span>
          </Link>
          <Link
            href="/"
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Back to home
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/20 via-zinc-950 to-zinc-950" />
        <div className="max-w-5xl mx-auto px-6 py-20 relative text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-br from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            Simple, transparent pricing
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Start free for 14 days. No credit card required. Upgrade or downgrade anytime.
          </p>
        </div>
      </section>

      {/* Tiers */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-xl border p-6 flex flex-col ${
                tier.featured
                  ? 'bg-brand-950/20 border-brand-500/30 ring-1 ring-brand-500/20'
                  : 'bg-zinc-900 border-zinc-800'
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-brand-600 text-white text-[10px] font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
                  tier.featured ? 'bg-brand-500/10' : 'bg-zinc-800/50'
                }`}>
                  <tier.icon className={`w-5 h-5 ${tier.featured ? 'text-brand-400' : 'text-zinc-400'}`} />
                </div>
                <h3 className="text-xl font-semibold">{tier.name}</h3>
                <p className="text-zinc-500 text-sm mt-1 leading-relaxed">{tier.description}</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{tier.price}</span>
                  <span className="text-sm text-zinc-500">{tier.period}</span>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                {Object.entries(tier.limits).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between text-sm">
                    <span className="text-zinc-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="text-zinc-300 font-medium">{value}</span>
                  </div>
                ))}
              </div>

              <div className="flex-1 space-y-2.5 mb-6">
                {tier.features.map((f) => (
                  <div key={f.label} className="flex items-center gap-2 text-sm">
                    {f.included ? (
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    ) : (
                      <X className="w-4 h-4 text-zinc-600 flex-shrink-0" />
                    )}
                    <span className={f.included ? 'text-zinc-300' : 'text-zinc-600'}>{f.label}</span>
                  </div>
                ))}
              </div>

              <Link
                href={tier.href}
                className={`mt-auto inline-flex items-center justify-center gap-2 font-medium px-5 py-2.5 rounded-lg transition-colors text-sm ${
                  tier.featured
                    ? 'bg-brand-600 hover:bg-brand-500 text-white'
                    : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
                }`}
              >
                {tier.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-semibold mb-8 text-center">Feature comparison</h2>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="grid grid-cols-4 text-sm border-b border-zinc-800">
            <div className="px-5 py-3 text-zinc-500 font-medium">Feature</div>
            <div className="px-5 py-3 text-zinc-400 font-medium text-center">Starter</div>
            <div className="px-5 py-3 text-brand-300 font-medium text-center">Team</div>
            <div className="px-5 py-3 text-zinc-400 font-medium text-center">Scale</div>
          </div>
          {comparison.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-4 text-sm ${i % 2 === 0 ? 'bg-zinc-800/20' : ''}`}
            >
              <div className="px-5 py-3 text-zinc-300">{row.feature}</div>
              <div className="px-5 py-3 text-center">
                {typeof row.starter === 'boolean' ? (
                  row.starter ? (
                    <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                  ) : (
                    <X className="w-4 h-4 text-zinc-600 mx-auto" />
                  )
                ) : (
                  <span className="text-zinc-400">{row.starter}</span>
                )}
              </div>
              <div className="px-5 py-3 text-center bg-brand-950/10">
                {typeof row.team === 'boolean' ? (
                  row.team ? (
                    <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                  ) : (
                    <X className="w-4 h-4 text-zinc-600 mx-auto" />
                  )
                ) : (
                  <span className="text-zinc-300 font-medium">{row.team}</span>
                )}
              </div>
              <div className="px-5 py-3 text-center">
                {typeof row.scale === 'boolean' ? (
                  row.scale ? (
                    <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                  ) : (
                    <X className="w-4 h-4 text-zinc-600 mx-auto" />
                  )
                ) : (
                  <span className="text-zinc-400">{row.scale}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ / CTA */}
      <section className="border-t border-zinc-900 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-semibold mb-4">Questions?</h2>
          <p className="text-zinc-400 leading-relaxed mb-8">
            All plans include a 14-day free trial with full access to the dashboard, mock data, and notification rules.
            No API keys required to explore.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Open Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors px-4 py-3"
            >
              Learn more
            </Link>
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
