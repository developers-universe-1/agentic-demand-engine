'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Target, Check, X } from 'lucide-react'
import { icpTemplate } from '@/lib/demo'

export default function IcpPage() {
  const [selectedTitles, setSelectedTitles] = useState<string[]>(['VP', 'Director', 'Head of'])
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>(['SaaS', 'Fintech'])
  const [selectedSizes, setSelectedSizes] = useState<string[]>(['50-200', '200-1,000', '1,000-5,000'])

  const toggle = (item: string, list: string[], setList: (v: string[]) => void) => {
    if (list.includes(item)) setList(list.filter(i => i !== item))
    else setList([...list, item])
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Target className="w-6 h-6 text-brand-500" />
          ICP Builder
        </h1>
        <p className="text-zinc-400 text-sm mt-1">
          Describe your buyer in plain English. We turn it into scoring rules — titles, industries, company size, geo.
        </p>
      </div>

      <div className="grid gap-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="font-semibold mb-4">Job Titles</h2>
          <div className="flex flex-wrap gap-2">
            {icpTemplate.titles.map(title => (
              <button
                key={title}
                onClick={() => toggle(title, selectedTitles, setSelectedTitles)}
                className={`text-sm px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-1.5 ${
                  selectedTitles.includes(title)
                    ? 'bg-brand-500/10 text-brand-400 border-brand-500/20'
                    : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:border-zinc-600'
                }`}
              >
                {selectedTitles.includes(title) ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5 opacity-0" />}
                {title}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="font-semibold mb-4">Industries</h2>
          <div className="flex flex-wrap gap-2">
            {icpTemplate.industries.map(ind => (
              <button
                key={ind}
                onClick={() => toggle(ind, selectedIndustries, setSelectedIndustries)}
                className={`text-sm px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-1.5 ${
                  selectedIndustries.includes(ind)
                    ? 'bg-brand-500/10 text-brand-400 border-brand-500/20'
                    : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:border-zinc-600'
                }`}
              >
                {selectedIndustries.includes(ind) ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5 opacity-0" />}
                {ind}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="font-semibold mb-4">Company Size</h2>
          <div className="flex flex-wrap gap-2">
            {icpTemplate.companySizes.map(size => (
              <button
                key={size}
                onClick={() => toggle(size, selectedSizes, setSelectedSizes)}
                className={`text-sm px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-1.5 ${
                  selectedSizes.includes(size)
                    ? 'bg-brand-500/10 text-brand-400 border-brand-500/20'
                    : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:border-zinc-600'
                }`}
              >
                {selectedSizes.includes(size) ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5 opacity-0" />}
                {size}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-brand-950/30 border border-brand-900/50 rounded-xl p-6">
          <h2 className="font-semibold text-brand-300 mb-2">Active ICP Summary</h2>
          <p className="text-sm text-brand-200/80">
            Scoring leads who match <span className="font-medium text-white">{selectedTitles.join(', ')}</span> titles
            in <span className="font-medium text-white">{selectedIndustries.join(', ')}</span> industries
            at companies sized <span className="font-medium text-white">{selectedSizes.join(', ')}</span> employees.
          </p>
          <p className="text-xs text-brand-300/60 mt-3">
            ICP scoring updates in real-time as new engagements are detected.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
