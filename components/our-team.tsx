'use client'

import { Link } from 'lucide-react'

const team = [
  {
    name: 'Nicolò Giannini',
    role: 'Lead Data Scientist & Founder',
    country: 'Italy',
    flag: '🇮🇹',
    photo: '/team/nicolo.jpg',
    initials: 'NG',
    gradient: 'from-[#a7c7e7] to-[#7aafd4]',
  },
  {
    name: 'Miriana Di Bari',
    role: 'Business Development & Strategy Lead',
    country: 'Italy',
    flag: '🇮🇹',
    photo: '/team/miriana.jpg',
    initials: 'MB',
    gradient: 'from-[#ffb7b2] to-[#f99087]',
  },
  {
    name: 'Valentin Drettas',
    role: 'International Operations & Business Analyst',
    country: 'Germany',
    flag: '🇩🇪',
    photo: '/team/valentin.jpg',
    initials: 'VD',
    gradient: 'from-[#c1e1c1] to-[#8fcf8f]',
  },
  {
    name: 'Jad',
    role: 'Market Research & Local Partnerships',
    country: 'USA',
    flag: '🇺🇸',
    photo: '/team/jad.jpg',
    initials: 'JD',
    gradient: 'from-[#ffd5c8] to-[#f5b09a]',
  },
  {
    name: 'Julie',
    role: 'UX Direction & Communications',
    country: 'USA',
    flag: '🇺🇸',
    photo: '/team/julie.jpg',
    initials: 'JL',
    gradient: 'from-[#e8c9f0] to-[#c99de0]',
  },
  {
    name: 'Shunghoon Lee',
    role: 'Product & Tech Lead',
    country: 'South Korea',
    flag: '🇰🇷',
    photo: '/team/shunghoon.jpg',
    initials: 'SL',
    gradient: 'from-[#a7c7e7] to-[#ffb7b2]',
  },
]

export default function OurTeam() {
  return (
    <section id="our-team" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white border border-[#e8e2da] rounded-full px-4 py-2 mb-6 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-[#c1e1c1]" />
            <span className="text-xs font-semibold text-[#6b5b4e] uppercase tracking-widest">
              The People Behind SkillBridge
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#2c3e5a] mb-4 text-balance">
            Meet the Team
          </h2>
          <p className="text-lg text-[#7a6e65] max-w-xl mx-auto leading-relaxed text-balance">
            A diverse international team united by the belief that education and employment should be accessible to everyone.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <div
              key={i}
              className="group bg-white rounded-3xl border border-[#e8e2da] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
            >
              {/* Photo / Gradient fallback */}
              <div className="relative h-36 overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-80`}
                  aria-hidden="true"
                />
                <img
                  src={member.photo}
                  alt={member.name}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                />
                {/* Flag badge */}
                <div
                  className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full w-9 h-9 flex items-center justify-center text-lg shadow-sm"
                  aria-label={member.country}
                  title={member.country}
                >
                  {member.flag}
                </div>
                {/* Initials fallback (visible when no photo) */}
                <div className="absolute bottom-3 left-4 w-12 h-12 rounded-2xl bg-white/30 backdrop-blur-sm flex items-center justify-center border border-white/40">
                  <span className="text-sm font-black text-white">{member.initials}</span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-bold text-[#2c3e5a] text-base mb-0.5">{member.name}</h3>
                <p className="text-xs text-[#7a6e65] leading-relaxed mb-4">{member.role}</p>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-[#6b5b4e] bg-[#f5f0e8] rounded-full px-2.5 py-1">
                    {member.flag} {member.country}
                  </span>
                  <button
                    className="w-7 h-7 rounded-xl bg-[#e8f3fb] flex items-center justify-center text-[#4a7ab5] hover:bg-[#a7c7e7] hover:text-[#2c3e5a] transition-colors"
                    aria-label={`LinkedIn profile of ${member.name}`}
                  >
                    <Link className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
