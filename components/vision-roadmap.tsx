'use client'

import { DollarSign, GraduationCap, Share2, ArrowRight } from 'lucide-react'

const pillars = [
  {
    icon: DollarSign,
    label: 'Revenue Stream 1',
    title: 'AI Course Generator',
    subtitle: 'MSME SaaS Subscription',
    description:
      'MSMEs pay a monthly subscription to instantly generate custom training courses by uploading raw PDFs, SOPs, or job descriptions. The AI parses the document and delivers a fully structured academy in under 2 minutes — no curriculum designers needed.',
    color: '#a7c7e7',
    lightColor: '#e8f3fb',
    tag: 'B2B SaaS',
  },
  {
    icon: GraduationCap,
    label: 'Revenue Stream 2',
    title: 'Commitment Exam Filter',
    subtitle: 'B2C Freemium Model',
    description:
      'Learning is 100% free for workers — we remove every financial barrier to knowledge. A small micro-fee is charged only when a worker chooses to take the final AI-proctored certification exam, acting as an active commitment signal to employers.',
    color: '#c1e1c1',
    lightColor: '#eaf6ea',
    tag: 'Freemium',
  },
  {
    icon: Share2,
    label: 'Network Effect',
    title: 'Cross-Company Portability',
    subtitle: 'Standardized Skill Assets',
    description:
      "Certified badges issued by SkillBridge act as standardized, verifiable skill assets. A worker certified on one MSME's academy can use that badge across all partner companies on the platform — building a portable, decentralized competency passport.",
    color: '#ffb7b2',
    lightColor: '#fff0ef',
    tag: 'Platform Value',
  },
]

const roadmapPhases = [
  { phase: 'Phase 1', label: 'MVP & Pilot', items: ['Core AI course generator', 'Worker onboarding flow', 'First 10 MSME partners'], color: '#a7c7e7' },
  { phase: 'Phase 2', label: 'Scale', items: ['Exam micro-payment system', 'Badge portability network', 'Multi-language support'], color: '#c1e1c1' },
  { phase: 'Phase 3', label: 'Expand', items: ['Regional MSME coalitions', 'Government partnerships', 'Open badge API'], color: '#ffb7b2' },
]

export default function VisionRoadmap() {
  return (
    <section id="vision-roadmap" className="py-24 px-6 bg-[#f5f0e8]/40">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white border border-[#e8e2da] rounded-full px-4 py-2 mb-6 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-[#a7c7e7]" />
            <span className="text-xs font-semibold text-[#6b5b4e] uppercase tracking-widest">
              Strategy & Roadmap
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#2c3e5a] mb-4 text-balance">
            Business Model & Vision
          </h2>
          <p className="text-lg text-[#7a6e65] max-w-2xl mx-auto leading-relaxed text-balance">
            Three interconnected pillars that create a self-sustaining, decentralized upskilling economy.
          </p>
        </div>

        {/* Pillar cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {pillars.map((p, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-7 border border-[#e8e2da] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-start justify-between mb-5">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: p.lightColor }}
                >
                  <p.icon className="w-6 h-6" style={{ color: p.color }} />
                </div>
                <span
                  className="text-[10px] font-bold uppercase tracking-widest rounded-full px-2.5 py-1"
                  style={{ background: p.lightColor, color: '#2c3e5a' }}
                >
                  {p.tag}
                </span>
              </div>

              <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: p.color }}>
                {p.label}
              </p>
              <h3 className="text-xl font-bold text-[#2c3e5a] mb-0.5">{p.title}</h3>
              <p className="text-sm font-semibold text-[#7a6e65] mb-4">{p.subtitle}</p>
              <p className="text-sm text-[#7a6e65] leading-relaxed flex-1">{p.description}</p>

              {i < 2 && (
                <div className="mt-5 flex items-center gap-1.5 text-xs font-bold" style={{ color: p.color }}>
                  <span>Feeds into Stream {i + 2}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Roadmap timeline */}
        <div className="bg-[#2c3e5a] rounded-3xl p-8 md:p-10">
          <h3 className="text-xl font-bold text-[#faf8f5] mb-8 text-center">Product Roadmap</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roadmapPhases.map((phase, i) => (
              <div key={i} className="relative">
                {i < roadmapPhases.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="hidden md:block absolute top-5 left-full w-full h-px opacity-20 z-0"
                    style={{ background: phase.color }}
                  />
                )}
                <div className="relative z-10">
                  <div
                    className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-4"
                    style={{ background: phase.color + '20' }}
                  >
                    <div className="w-2 h-2 rounded-full" style={{ background: phase.color }} />
                    <span className="text-xs font-bold text-[#faf8f5]">{phase.phase}</span>
                    <span className="text-xs text-[#faf8f5]/60">— {phase.label}</span>
                  </div>
                  <ul className="space-y-2.5">
                    {phase.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2.5">
                        <div
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: phase.color }}
                        />
                        <span className="text-sm text-[#faf8f5]/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
