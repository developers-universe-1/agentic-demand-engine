'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bell,
  MessageSquare,
  Webhook,
  Plus,
  Trash2,
  Check,
  X,
  AlertTriangle,
  Send,
  Clock,
  ChevronDown,
  ChevronUp,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react'

interface WebhookConfig {
  id: string
  name: string
  url: string
  type: 'slack' | 'generic'
  active: boolean
}

interface NotificationRule {
  id: string
  name: string
  condition: string
  channel: string
  active: boolean
}

interface NotificationHistory {
  id: string
  rule: string
  message: string
  channel: string
  status: 'delivered' | 'failed' | 'pending'
  timestamp: string
}

const initialWebhooks: WebhookConfig[] = [
  {
    id: 'wh-1',
    name: '#sales-alerts',
    url: 'https://hooks.slack.example/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX',
    type: 'slack',
    active: true,
  },
  {
    id: 'wh-2',
    name: '#product-high-intent',
    url: 'https://hooks.slack.example/T00000000/B00000000/YYYYYYYYYYYYYYYYYYYYYYYY',
    type: 'slack',
    active: true,
  },
  {
    id: 'wh-3',
    name: 'Zapier Catch Hook',
    url: 'https://hooks.zapier.com/hooks/catch/123456/abcdef/',
    type: 'generic',
    active: false,
  },
]

const initialRules: NotificationRule[] = [
  {
    id: 'rule-1',
    name: 'High ICP Alert',
    condition: 'ICP score > 90',
    channel: '#sales-alerts',
    active: true,
  },
  {
    id: 'rule-2',
    name: 'C-Level Engaged',
    condition: 'Title contains CEO, CTO, or VP',
    channel: '#sales-alerts',
    active: true,
  },
  {
    id: 'rule-3',
    name: 'Product Team Signals',
    condition: 'Tag = product AND ICP score >= 80',
    channel: '#product-high-intent',
    active: true,
  },
  {
    id: 'rule-4',
    name: 'Fintech Leads',
    condition: 'Industry = Fintech',
    channel: '#sales-alerts',
    active: false,
  },
]

const initialHistory: NotificationHistory[] = [
  {
    id: 'hist-1',
    rule: 'High ICP Alert',
    message: 'Ryan Torres (Kinetic AI) scored 96 — Founder & CEO in AI / ML',
    channel: '#sales-alerts',
    status: 'delivered',
    timestamp: '2026-05-26T13:12:00Z',
  },
  {
    id: 'hist-2',
    rule: 'High ICP Alert',
    message: 'Alexandra Chen (Stripe) scored 94 — VP of Engineering in Fintech',
    channel: '#sales-alerts',
    status: 'delivered',
    timestamp: '2026-05-27T14:35:00Z',
  },
  {
    id: 'hist-3',
    rule: 'C-Level Engaged',
    message: 'Sarah Johnson (Plaid) commented on Sam Altman thread — CTO in Fintech',
    channel: '#sales-alerts',
    status: 'delivered',
    timestamp: '2026-05-24T10:18:00Z',
  },
  {
    id: 'hist-4',
    rule: 'Product Team Signals',
    message: 'Emily Park (Linear) viewed your profile — Senior Product Manager in SaaS',
    channel: '#product-high-intent',
    status: 'failed',
    timestamp: '2026-05-25T09:00:00Z',
  },
  {
    id: 'hist-5',
    rule: 'High ICP Alert',
    message: 'Priya Sharma (Vercel) scored 91 — CTO in DevTools',
    channel: '#sales-alerts',
    status: 'pending',
    timestamp: '2026-05-27T09:47:00Z',
  },
]

function formatTimeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}

export default function NotificationsPage() {
  const [webhooks, setWebhooks] = useState<WebhookConfig[]>(initialWebhooks)
  const [rules, setRules] = useState<NotificationRule[]>(initialRules)
  const [history] = useState<NotificationHistory[]>(initialHistory)
  const [showAddWebhook, setShowAddWebhook] = useState(false)
  const [showAddRule, setShowAddRule] = useState(false)
  const [newWebhook, setNewWebhook] = useState({ name: '', url: '', type: 'slack' as 'slack' | 'generic' })
  const [newRule, setNewRule] = useState({ name: '', condition: '', channel: '' })
  const [expandedHistory, setExpandedHistory] = useState(true)

  const addWebhook = () => {
    if (!newWebhook.name || !newWebhook.url) return
    setWebhooks([
      ...webhooks,
      { id: `wh-${Date.now()}`, ...newWebhook, active: true },
    ])
    setNewWebhook({ name: '', url: '', type: 'slack' })
    setShowAddWebhook(false)
  }

  const removeWebhook = (id: string) => setWebhooks(webhooks.filter(w => w.id !== id))
  const toggleWebhook = (id: string) =>
    setWebhooks(webhooks.map(w => (w.id === id ? { ...w, active: !w.active } : w)))

  const addRule = () => {
    if (!newRule.name || !newRule.condition || !newRule.channel) return
    setRules([...rules, { id: `rule-${Date.now()}`, ...newRule, active: true }])
    setNewRule({ name: '', condition: '', channel: '' })
    setShowAddRule(false)
  }

  const removeRule = (id: string) => setRules(rules.filter(r => r.id !== id))
  const toggleRule = (id: string) =>
    setRules(rules.map(r => (r.id === id ? { ...r, active: !r.active } : r)))

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Bell className="w-6 h-6 text-brand-500" />
          Notifications
        </h1>
        <p className="text-zinc-400 text-sm mt-1">
          Configure Slack webhooks, alert rules, and review delivery history.
        </p>
      </div>

      {/* Webhooks */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold flex items-center gap-2">
            <Webhook className="w-4 h-4 text-brand-400" />
            Webhook Destinations
          </h2>
          <button
            onClick={() => setShowAddWebhook(!showAddWebhook)}
            className="text-xs bg-brand-600 hover:bg-brand-500 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
          >
            <Plus className="w-3 h-3" />
            Add
          </button>
        </div>

        <AnimatePresence>
          {showAddWebhook && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-4"
            >
              <div className="bg-zinc-800/50 rounded-lg p-4 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input
                    value={newWebhook.name}
                    onChange={e => setNewWebhook({ ...newWebhook, name: e.target.value })}
                    placeholder="Channel name"
                    className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-brand-500"
                  />
                  <input
                    value={newWebhook.url}
                    onChange={e => setNewWebhook({ ...newWebhook, url: e.target.value })}
                    placeholder="Webhook URL"
                    className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-brand-500"
                  />
                  <select
                    value={newWebhook.type}
                    onChange={e => setNewWebhook({ ...newWebhook, type: e.target.value as 'slack' | 'generic' })}
                    className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-brand-500"
                  >
                    <option value="slack">Slack</option>
                    <option value="generic">Generic</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={addWebhook}
                    className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                  >
                    <Check className="w-3 h-3" />
                    Save
                  </button>
                  <button
                    onClick={() => setShowAddWebhook(false)}
                    className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                  >
                    <X className="w-3 h-3" />
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-2">
          {webhooks.map(w => (
            <div
              key={w.id}
              className="flex items-center justify-between bg-zinc-800/30 border border-zinc-800 rounded-lg px-4 py-3"
            >
              <div className="flex items-center gap-3">
                {w.type === 'slack' ? (
                  <MessageSquare className="w-4 h-4 text-sky-400" />
                ) : (
                  <Webhook className="w-4 h-4 text-amber-400" />
                )}
                <div>
                  <p className="text-sm font-medium text-zinc-200">{w.name}</p>
                  <p className="text-[11px] text-zinc-600 font-mono">{w.url.slice(0, 48)}…</p>
                </div>
                <span className="text-[10px] bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded-full uppercase">
                  {w.type}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleWebhook(w.id)}
                  className="text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {w.active ? (
                    <ToggleRight className="w-5 h-5 text-brand-400" />
                  ) : (
                    <ToggleLeft className="w-5 h-5" />
                  )}
                </button>
                <button
                  onClick={() => removeWebhook(w.id)}
                  className="text-zinc-600 hover:text-rose-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Rules */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            Notification Rules
          </h2>
          <button
            onClick={() => setShowAddRule(!showAddRule)}
            className="text-xs bg-brand-600 hover:bg-brand-500 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
          >
            <Plus className="w-3 h-3" />
            Add Rule
          </button>
        </div>

        <AnimatePresence>
          {showAddRule && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-4"
            >
              <div className="bg-zinc-800/50 rounded-lg p-4 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input
                    value={newRule.name}
                    onChange={e => setNewRule({ ...newRule, name: e.target.value })}
                    placeholder="Rule name"
                    className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-brand-500"
                  />
                  <input
                    value={newRule.condition}
                    onChange={e => setNewRule({ ...newRule, condition: e.target.value })}
                    placeholder="Condition, e.g. ICP score > 90"
                    className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-brand-500"
                  />
                  <input
                    value={newRule.channel}
                    onChange={e => setNewRule({ ...newRule, channel: e.target.value })}
                    placeholder="Channel, e.g. #sales-alerts"
                    className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={addRule}
                    className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                  >
                    <Check className="w-3 h-3" />
                    Save
                  </button>
                  <button
                    onClick={() => setShowAddRule(false)}
                    className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                  >
                    <X className="w-3 h-3" />
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-2">
          {rules.map(r => (
            <div
              key={r.id}
              className="flex items-center justify-between bg-zinc-800/30 border border-zinc-800 rounded-lg px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${r.active ? 'bg-emerald-400' : 'bg-zinc-600'}`} />
                <div>
                  <p className="text-sm font-medium text-zinc-200">{r.name}</p>
                  <p className="text-[11px] text-zinc-500">
                    When {r.condition} → {r.channel}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleRule(r.id)}
                  className="text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {r.active ? (
                    <ToggleRight className="w-5 h-5 text-brand-400" />
                  ) : (
                    <ToggleLeft className="w-5 h-5" />
                  )}
                </button>
                <button
                  onClick={() => removeRule(r.id)}
                  className="text-zinc-600 hover:text-rose-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* History */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"
      >
        <button
          onClick={() => setExpandedHistory(!expandedHistory)}
          className="flex items-center justify-between w-full"
        >
          <h2 className="font-semibold flex items-center gap-2">
            <Send className="w-4 h-4 text-brand-400" />
            Recent Notification History
          </h2>
          {expandedHistory ? (
            <ChevronUp className="w-4 h-4 text-zinc-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-zinc-500" />
          )}
        </button>

        <AnimatePresence>
          {expandedHistory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-2">
                {history.map(h => (
                  <div
                    key={h.id}
                    className="flex items-start justify-between bg-zinc-800/30 border border-zinc-800 rounded-lg px-4 py-3"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${
                          h.status === 'delivered'
                            ? 'bg-emerald-400'
                            : h.status === 'failed'
                            ? 'bg-rose-400'
                            : 'bg-amber-400'
                        }`}
                      />
                      <div>
                        <p className="text-sm text-zinc-200">{h.message}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[11px] text-zinc-500 flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            {h.channel}
                          </span>
                          <span className="text-[11px] text-zinc-600">{h.rule}</span>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full uppercase ${
                              h.status === 'delivered'
                                ? 'bg-emerald-950/40 text-emerald-400'
                                : h.status === 'failed'
                                ? 'bg-rose-950/40 text-rose-400'
                                : 'bg-amber-950/40 text-amber-400'
                            }`}
                          >
                            {h.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] text-zinc-600 flex items-center gap-1 flex-shrink-0">
                      <Clock className="w-3 h-3" />
                      {formatTimeAgo(h.timestamp)}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
