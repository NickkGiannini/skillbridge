'use client'

import { Briefcase, Users, Sparkles, ArrowRight, Star, TrendingUp } from 'lucide-react'

interface HeroSectionProps {
  onWorkerClick: () => void
  onCompanyClick: () => void
}

const statsData = [
  { value: '12,000+', label: 'Workers Placed' },
  { value: '800+', label: 'Partner MSMEs' },
  { value: '95%', label: 'Hire Rate' },
]

export default function HeroSection({ onWorkerClick, onCompanyClick }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-16 px-6">
      {/* Background decorative blobs */}
      <div
        aria-hidden="true"
        className="absolute top-20 -left-32 w-96 h-96 rounded-full opacity-30"
        style={{ background: '#a7c7e7', filter: 'blur(80px)' }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-10 -right-32 w-80 h-80 rounded-full opacity-25"
        style={{ background: '#c1e1c1', filter: 'blur(80px)' }}
      />
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
        style={{ background: '#ffb7b2', filter: 'blur(120px)' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Main Headline */}
        <h1
          className="text-5xl md:text-7xl font-bold text-[#2c3e5a] leading-tight tracking-tight mb-6 animate-fade-up opacity-0 animation-delay-200 text-balance"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          Empowering Futures{' '}
          <span
            className="relative inline-block"
            style={{ color: '#a7c7e7' }}
          >
            with AI
            <span
              aria-hidden="true"
              className="absolute -bottom-1 left-0 right-0 h-1 rounded-full opacity-60"
              style={{ background: '#a7c7e7' }}
            />
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-[#7a6e65] max-w-2xl mx-auto leading-relaxed mb-12 animate-fade-up opacity-0 animation-delay-300 text-balance">
          A direct-to-hire upskilling platform connecting vulnerable workers with MSMEs
          through AI-generated corporate academies.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up opacity-0 animation-delay-400">
          {/* Worker CTA */}
          <button
            onClick={onWorkerClick}
            className="group relative flex items-center gap-3 bg-[#2c3e5a] text-[#faf8f5] px-8 py-4 rounded-3xl font-semibold text-base shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
          >
            <div className="w-8 h-8 rounded-2xl bg-[#a7c7e7]/20 flex items-center justify-center group-hover:bg-[#a7c7e7]/30 transition-colors">
              <Users className="w-4 h-4 text-[#a7c7e7]" />
            </div>
            <div className="text-left">
              <div className="text-xs text-[#a7c7e7] font-medium mb-0.5">Job Seeker</div>
              <div>I am a Worker</div>
            </div>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Company CTA */}
          <button
            onClick={onCompanyClick}
            className="group relative flex items-center gap-3 bg-[#ffb7b2] text-[#2c3e5a] px-8 py-4 rounded-3xl font-semibold text-base shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto border-2 border-[#ffb7b2] hover:bg-[#ffa09a] hover:border-[#ffa09a]"
          >
            <div className="w-8 h-8 rounded-2xl bg-[#2c3e5a]/10 flex items-center justify-center group-hover:bg-[#2c3e5a]/15 transition-colors">
              <Briefcase className="w-4 h-4 text-[#2c3e5a]" />
            </div>
            <div className="text-left">
              <div className="text-xs text-[#2c3e5a]/70 font-medium mb-0.5">MSME</div>
              <div>I am a Hiring Company</div>
            </div>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Stats Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 animate-fade-up opacity-0 animation-delay-500">
          {statsData.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="flex items-center gap-1.5 mb-0.5">
                <TrendingUp className="w-3.5 h-3.5 text-[#c1e1c1]" />
                <span className="text-2xl font-bold text-[#2c3e5a]">{stat.value}</span>
              </div>
              <span className="text-xs text-[#7a6e65] font-medium">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Testimonial Card */}
      <div
        className="absolute bottom-24 right-8 hidden xl:block animate-float"
        aria-hidden="true"
      >
        <div className="bg-white rounded-3xl shadow-xl border border-[#e8e2da] p-4 max-w-[220px]">
          <div className="flex items-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-3 h-3 fill-[#ffb7b2] text-[#ffb7b2]" />
            ))}
          </div>
          <p className="text-xs text-[#6b5b4e] leading-relaxed mb-3">
            &ldquo;Got hired 2 weeks after completing my AI-generated course!&rdquo;
          </p>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#a7c7e7] flex items-center justify-center">
              <span className="text-xs font-bold text-[#2c3e5a]">M</span>
            </div>
            <div>
              <div className="text-xs font-semibold text-[#2c3e5a]">Maria S.</div>
              <div className="text-[10px] text-[#7a6e65]">Now: Junior Accountant</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating AI Card */}
      <div
        className="absolute top-32 right-8 hidden xl:block animate-float animation-delay-300"
        aria-hidden="true"
        style={{ animationDelay: '1.5s' }}
      >
        <div className="bg-white rounded-3xl shadow-xl border border-[#e8e2da] p-4 max-w-[200px]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-2xl bg-[#c1e1c1] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#2c3e5a]" />
            </div>
            <div>
              <div className="text-xs font-semibold text-[#2c3e5a]">AI Course Ready</div>
              <div className="text-[10px] text-[#7a6e65]">Generated in 2 min</div>
            </div>
          </div>
          <div className="w-full bg-[#f5f0e8] rounded-full h-1.5">
            <div className="bg-[#a7c7e7] h-1.5 rounded-full w-4/5 transition-all" />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-[#7a6e65]">Course completion</span>
            <span className="text-[10px] font-semibold text-[#2c3e5a]">80%</span>
          </div>
        </div>
      </div>
    </section>
  )
}
