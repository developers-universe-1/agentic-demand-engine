'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Eye, Users, Target, LayoutDashboard, Radar, Bell, Database } from 'lucide-react'

const nav = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/watchlist', label: 'Watchlist', icon: Eye },
  { href: '/dashboard/leads', label: 'Lead Feed', icon: Users },
  { href: '/dashboard/icp', label: 'ICP Builder', icon: Target },
  { href: '/dashboard/pipeline', label: 'Pipeline', icon: Database },
  { href: '/dashboard/notifications', label: 'Notifications', icon: Bell },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-zinc-900 border-r border-zinc-800 min-h-screen flex flex-col sticky top-0">
      <div className="p-6 border-b border-zinc-800">
        <Link href="/" className="flex items-center gap-2">
          <Radar className="w-6 h-6 text-brand-500" />
          <span className="font-bold text-lg tracking-tight">LeadFinder</span>
        </Link>
        <p className="text-xs text-zinc-500 mt-1">Open-source lead intelligence</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {nav.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20'
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-zinc-800">
        <div className="bg-zinc-800/50 rounded-lg p-3">
          <p className="text-xs font-medium text-zinc-300">Demo Mode</p>
          <p className="text-xs text-zinc-500 mt-0.5">Mock data — no API keys needed</p>
        </div>
      </div>
    </aside>
  )
}
