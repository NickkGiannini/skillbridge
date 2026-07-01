'use client'

import { useState } from 'react'
import Navbar from '@/components/navbar'
import HeroSection from '@/components/hero-section'
import HowItWorks from '@/components/how-it-works'
import AuthModal from '@/components/auth-modal'
import WorkerDashboard from '@/components/worker-dashboard'
import CompanyDashboard from '@/components/company-dashboard'
import { Heart, Shield, Zap, Globe, ArrowRight, GraduationCap, Mail } from 'lucide-react'

type Role = 'worker' | 'company'
type View = 'landing' | 'worker-dashboard' | 'company-dashboard'

export default function Home() {
  const [view, setView] = useState<View>('landing')
  const [modalOpen, setModalOpen] = useState(false)
  const [modalRole, setModalRole] = useState<Role | undefined>(undefined)

  const openModal = (role?: Role) => {
    setModalRole(role)
    setModalOpen(true)
  }

  const handleAuthSuccess = (role: Role) => {
    setModalOpen(false)
    setView(role === 'worker' ? 'worker-dashboard' : 'company-dashboard')
  }

  const handleLogout = () => {
    setView('landing')
    setModalRole(undefined)
  }

  if (view === 'worker-dashboard') {
    return <WorkerDashboard onLogout={handleLogout} />
  }
  if (view === 'company-dashboard') {
    return <CompanyDashboard onLogout={handleLogout} />
  }

  return (
    <>
      <Navbar onLoginClick={() => openModal()} />

      <main>
        {/* Hero */}
        <HeroSection
          onWorkerClick={() => openModal('worker')}
          onCompanyClick={() => openModal('company')}
        />

        {/* How It Works */}
        <HowItWorks />

        {/* Why ICSB section */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-white border border-[#e8e2da] rounded-full px-4 py-2 mb-6 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-[#ffb7b2]" />
                <span className="text-xs font-semibold text-[#6b5b4e] uppercase tracking-widest">
                  Why ICSB Academy
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#2c3e5a] mb-4 text-balance">
                Built for real impact
              </h2>
              <p className="text-lg text-[#7a6e65] max-w-xl mx-auto leading-relaxed text-balance">
                We believe every worker deserves a fair shot at a great career — and every MSME deserves pre-trained talent.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Large card */}
              <div className="bg-[#2c3e5a] rounded-3xl p-8 flex flex-col justify-between min-h-[300px]">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#a7c7e7]/20 flex items-center justify-center mb-6">
                    <Zap className="w-6 h-6 text-[#a7c7e7]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#faf8f5] mb-3">
                    AI-Generated Courses in Minutes
                  </h3>
                  <p className="text-[#faf8f5]/70 leading-relaxed text-sm">
                    Companies upload their SOPs and training docs — our AI engine parses, structures, and delivers a complete corporate course automatically. No curriculum designers needed.
                  </p>
                </div>
                <button
                  onClick={() => openModal('company')}
                  className="mt-8 inline-flex items-center gap-2 bg-[#a7c7e7] text-[#2c3e5a] px-5 py-2.5 rounded-2xl text-sm font-bold hover:bg-[#89b8e0] transition-all hover:shadow-md self-start"
                >
                  Start as a Company <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Small cards */}
              <div className="bg-[#e8f3fb] rounded-3xl p-7 flex gap-5 items-start hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-2xl bg-[#a7c7e7] flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-[#2c3e5a]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#2c3e5a] mb-1.5">Free for Vulnerable Workers</h3>
                  <p className="text-sm text-[#7a6e65] leading-relaxed">
                    Zero cost, zero barriers. Workers from underserved communities access world-class company training without paying anything.
                  </p>
                </div>
              </div>

              <div className="bg-[#eaf6ea] rounded-3xl p-7 flex gap-5 items-start hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-2xl bg-[#c1e1c1] flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-[#2c3e5a]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#2c3e5a] mb-1.5">Verified Certificates &amp; Direct Hire</h3>
                  <p className="text-sm text-[#7a6e65] leading-relaxed">
                    AI-proctored exams ensure genuine competency. Pass the test, earn the certificate, unlock the interview — no middlemen.
                  </p>
                </div>
              </div>

              <div className="bg-[#fff0ef] rounded-3xl p-7 flex gap-5 items-start hover:shadow-md transition-shadow md:col-span-2">
                <div className="w-11 h-11 rounded-2xl bg-[#ffb7b2] flex items-center justify-center flex-shrink-0">
                  <Globe className="w-5 h-5 text-[#2c3e5a]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#2c3e5a] mb-1.5">Decentralized by Design</h3>
                  <p className="text-sm text-[#7a6e65] leading-relaxed">
                    Each company hosts its own AI-powered academy. The platform is distributed — every MSME owns their training ecosystem while workers across regions access it freely.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-6 bg-[#f5f0e8]/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#2c3e5a] mb-3">Stories of Growth</h2>
              <p className="text-[#7a6e65]">Real people, real transformations.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  quote: 'I had zero office experience. After 3 weeks on ICSB Academy, I passed the exam and got hired as an Operations Assistant.',
                  name: 'Maria Santos',
                  role: 'Operations Assistant, Bright Solutions',
                  color: '#a7c7e7',
                  initial: 'M',
                },
                {
                  quote: 'We uploaded our 80-page SOP manual and within 2 minutes had a fully structured course. We hired 3 graduates last month.',
                  name: 'James Villanueva',
                  role: 'HR Manager, Verdi Retail Co.',
                  color: '#ffb7b2',
                  initial: 'J',
                },
                {
                  quote: "As a fresh graduate, I never thought I'd land a finance job this fast. The AI coach made everything click.",
                  name: 'Ana Cruz',
                  role: 'Finance Analyst, Cruz & Associates',
                  color: '#c1e1c1',
                  initial: 'A',
                },
              ].map((t, i) => (
                <div
                  key={i}
                  className="bg-white rounded-3xl p-7 border border-[#e8e2da] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="flex gap-0.5 mb-5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} className="text-[#ffb7b2] text-sm">&#9733;</span>
                    ))}
                  </div>
                  <p className="text-sm text-[#6b5b4e] leading-relaxed mb-6 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-[#2c3e5a]"
                      style={{ background: t.color }}
                    >
                      {t.initial}
                    </div>
                    <div>
                      <div className="font-bold text-[#2c3e5a] text-sm">{t.name}</div>
                      <div className="text-xs text-[#7a6e65]">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#2c3e5a] rounded-3xl p-12 text-center relative overflow-hidden">
              <div
                aria-hidden="true"
                className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 pointer-events-none"
                style={{ background: '#a7c7e7', filter: 'blur(60px)', transform: 'translate(30%,-30%)' }}
              />
              <div
                aria-hidden="true"
                className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10 pointer-events-none"
                style={{ background: '#ffb7b2', filter: 'blur(60px)', transform: 'translate(-30%,30%)' }}
              />
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-[#a7c7e7]/20 mb-6">
                  <GraduationCap className="w-8 h-8 text-[#a7c7e7]" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#faf8f5] mb-4 text-balance">
                  Your future starts with a single course.
                </h2>
                <p className="text-[#faf8f5]/70 max-w-xl mx-auto mb-8 leading-relaxed">
                  Whether you&apos;re a worker seeking a career breakthrough or a company building its dream team — ICSB Academy makes it possible.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() => openModal('worker')}
                    className="bg-[#a7c7e7] text-[#2c3e5a] px-8 py-4 rounded-3xl font-bold text-sm hover:bg-[#89b8e0] transition-all hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto"
                  >
                    Start Learning for Free
                  </button>
                  <button
                    onClick={() => openModal('company')}
                    className="bg-[#ffb7b2] text-[#2c3e5a] px-8 py-4 rounded-3xl font-bold text-sm hover:bg-[#ffa09a] transition-all hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto"
                  >
                    Build Your Academy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#f5f0e8] border-t border-[#e8e2da] py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-10">
            <div className="max-w-xs">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-2xl bg-[#a7c7e7] flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-[#2c3e5a]" />
                </div>
                <span className="font-bold text-[#2c3e5a]">ICSB Academy</span>
              </div>
              <p className="text-sm text-[#7a6e65] leading-relaxed">
                Decentralized AI-powered corporate academy bridging the gap between workers and MSMEs.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div>
                <h4 className="font-bold text-[#2c3e5a] mb-3">Platform</h4>
                {['For Workers', 'For Companies', 'How It Works', 'Pricing'].map((l) => (
                  <a key={l} href="#" className="block text-[#7a6e65] hover:text-[#2c3e5a] mb-2 transition-colors">
                    {l}
                  </a>
                ))}
              </div>
              <div>
                <h4 className="font-bold text-[#2c3e5a] mb-3">Company</h4>
                {['About ICSB', 'Blog', 'Careers', 'Press'].map((l) => (
                  <a key={l} href="#" className="block text-[#7a6e65] hover:text-[#2c3e5a] mb-2 transition-colors">
                    {l}
                  </a>
                ))}
              </div>
              <div>
                <h4 className="font-bold text-[#2c3e5a] mb-3">Legal</h4>
                {['Privacy Policy', 'Terms of Use', 'Cookie Policy'].map((l) => (
                  <a key={l} href="#" className="block text-[#7a6e65] hover:text-[#2c3e5a] mb-2 transition-colors">
                    {l}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="bg-white rounded-3xl p-6 border border-[#e8e2da] flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
            <div className="flex items-center gap-3 flex-1">
              <Mail className="w-5 h-5 text-[#a7c7e7] flex-shrink-0" />
              <div>
                <div className="font-bold text-[#2c3e5a] text-sm">Stay in the loop</div>
                <div className="text-xs text-[#7a6e65]">Get updates on new courses and hiring opportunities.</div>
              </div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 sm:w-56 px-4 py-2.5 rounded-2xl bg-[#f5f0e8] border border-[#e8e2da] text-sm text-[#2c3e5a] placeholder:text-[#b8b0a8] focus:outline-none focus:border-[#a7c7e7] transition-colors"
              />
              <button className="bg-[#2c3e5a] text-[#faf8f5] px-5 py-2.5 rounded-2xl text-sm font-bold hover:bg-[#3d5270] transition-colors flex-shrink-0">
                Subscribe
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#7a6e65]">
            <span>&copy; 2025 ICSB Academy. All rights reserved.</span>
            <span>Built with care for workers and communities everywhere.</span>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialRole={modalRole}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  )
}
