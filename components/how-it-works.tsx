'use client'

import { Upload, BookOpen, BadgeCheck, ArrowRight, FileText, Brain, Trophy } from 'lucide-react'

const steps = [
  {
    step: '01',
    icon: Upload,
    secondaryIcon: FileText,
    title: 'Upload Manuals',
    headline: 'Companies Upload Docs',
    description:
      'Hiring companies upload their operations manuals, SOPs, and training materials. Our AI instantly generates a custom, structured course tailored to their exact workflow.',
    color: '#a7c7e7',
    lightColor: '#e8f3fb',
    tag: 'For Companies',
    tagColor: '#a7c7e7',
    tagTextColor: '#2c3e5a',
    features: ['SOP & Manual parsing', 'AI course generation', 'Custom assessments'],
  },
  {
    step: '02',
    icon: BookOpen,
    secondaryIcon: Brain,
    title: 'Learn for Free',
    headline: 'Workers Study for Free',
    description:
      'Registered workers gain free access to the exact training materials their future employer uses. Learn at your own pace with AI-powered guidance and real-world scenarios.',
    color: '#c1e1c1',
    lightColor: '#eaf6ea',
    tag: 'For Workers',
    tagColor: '#c1e1c1',
    tagTextColor: '#2c3e5a',
    features: ['100% free access', 'AI learning coach', 'Self-paced modules'],
  },
  {
    step: '03',
    icon: BadgeCheck,
    secondaryIcon: Trophy,
    title: 'Get Certified & Hired',
    headline: 'Pass Exam. Get Hired.',
    description:
      'Workers who pass the AI-proctored exam receive a verified certificate and are automatically entered into the direct-hire pipeline for their target companies.',
    color: '#ffb7b2',
    lightColor: '#fff0ef',
    tag: 'Milestone',
    tagColor: '#ffb7b2',
    tagTextColor: '#2c3e5a',
    features: ['AI-proctored exams', 'Verified certificates', 'Direct hire pipeline'],
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-[#f5f0e8]/50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white border border-[#e8e2da] rounded-full px-4 py-2 mb-6 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-[#c1e1c1]" />
            <span className="text-xs font-semibold text-[#6b5b4e] uppercase tracking-widest">
              The Process
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#2c3e5a] mb-4 text-balance">
            How ICSB Academy Works
          </h2>
          <p className="text-lg text-[#7a6e65] max-w-xl mx-auto leading-relaxed text-balance">
            Three simple steps that transform a worker&apos;s potential into a company&apos;s hire — powered by AI.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connector line (desktop) */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-16 left-1/3 right-1/3 h-0.5 opacity-30"
            style={{ background: `linear-gradient(to right, #a7c7e7, #c1e1c1, #ffb7b2)` }}
          />

          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl p-7 border border-[#e8e2da] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-default"
            >
              {/* Step number */}
              <div className="flex items-start justify-between mb-6">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300"
                  style={{ background: step.lightColor }}
                >
                  <step.icon className="w-6 h-6" style={{ color: step.color }} />
                </div>
                <span
                  className="text-4xl font-black opacity-15 select-none"
                  style={{ color: step.color }}
                >
                  {step.step}
                </span>
              </div>

              {/* Tag */}
              <div
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 mb-4"
                style={{ background: step.lightColor }}
              >
                <step.secondaryIcon className="w-3 h-3" style={{ color: step.color }} />
                <span
                  className="text-[11px] font-semibold uppercase tracking-wide"
                  style={{ color: step.tagTextColor }}
                >
                  {step.tag}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-[#2c3e5a] mb-1">{step.title}</h3>
              <p className="text-sm font-semibold mb-3" style={{ color: step.color }}>
                {step.headline}
              </p>

              {/* Description */}
              <p className="text-sm text-[#7a6e65] leading-relaxed mb-5">
                {step.description}
              </p>

              {/* Feature list */}
              <ul className="space-y-2">
                {step.features.map((feature, fi) => (
                  <li key={fi} className="flex items-center gap-2.5">
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: step.color }}
                    />
                    <span className="text-xs text-[#6b5b4e] font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Arrow connector */}
              {index < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white rounded-full shadow-md border border-[#e8e2da] items-center justify-center"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#a7c7e7]" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 bg-[#2c3e5a] rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-[#faf8f5] mb-1">
              Ready to start your journey?
            </h3>
            <p className="text-sm text-[#a7c7e7]">
              Join thousands of workers and companies already on ICSB Academy.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="flex -space-x-2">
              {['A', 'J', 'M', 'R'].map((initial, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-[#2c3e5a] flex items-center justify-center text-xs font-bold text-[#2c3e5a]"
                  style={{
                    background: ['#a7c7e7', '#c1e1c1', '#ffb7b2', '#ffd5c8'][i],
                  }}
                >
                  {initial}
                </div>
              ))}
            </div>
            <span className="text-sm text-[#faf8f5]/80 font-medium">
              +12,000 workers placed
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
