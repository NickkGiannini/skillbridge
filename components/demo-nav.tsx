'use client'

import { Home, Building2, HardHat } from 'lucide-react'

type View = 'landing' | 'worker-dashboard' | 'company-dashboard'

interface DemoNavProps {
  view: View
  onChange: (view: View) => void
}

const tabs: { id: View; label: string; icon: typeof Home }[] = [
  { id: 'landing', label: 'Public Landing', icon: Home },
  { id: 'company-dashboard', label: 'Company Dashboard', icon: Building2 },
  { id: 'worker-dashboard', label: 'Worker Dashboard', icon: HardHat },
]

export default function DemoNav({ view, onChange }: DemoNavProps) {
  return (
    <div className="sticky top-0 z-[60] bg-[#2c3e5a] px-4 py-2">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        <span className="hidden sm:flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-[#faf8f5]/50">
          <span className="w-2 h-2 rounded-full bg-[#c1e1c1] animate-pulse" />
          Demo Preview
        </span>
        <div className="flex items-center gap-1 bg-[#faf8f5]/5 rounded-2xl p-1 mx-auto sm:mx-0">
          {tabs.map((tab) => {
            const active = view === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => onChange(tab.id)}
                className={`flex items-center gap-2 rounded-xl px-3 sm:px-4 py-2 text-xs font-bold transition-all ${
                  active
                    ? 'bg-[#a7c7e7] text-[#2c3e5a] shadow-sm'
                    : 'text-[#faf8f5]/60 hover:text-[#faf8f5] hover:bg-white/5'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            )
          })}
        </div>
        <span className="hidden sm:block text-[11px] text-[#faf8f5]/40 font-medium">
          ICSB Academy Cup 2026
        </span>
      </div>
    </div>
  )
}
