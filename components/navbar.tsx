'use client'

import { useState, useEffect } from 'react'
import { GraduationCap, Menu, X } from 'lucide-react'

interface NavbarProps {
  onLoginClick: (role?: 'worker' | 'company') => void
  offsetTop?: boolean
}

export default function Navbar({ onLoginClick, offsetTop = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    setMobileOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header
      style={{ top: offsetTop ? 'var(--demo-nav-h, 52px)' : 0 }}
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#faf8f5]/95 backdrop-blur-md shadow-sm border-b border-[#e8e2da]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="/logo-skillbridge.jpeg"
            alt="SkillBridge logo"
            height={36}
            width={36}
            className="rounded-xl object-contain"
            onError={(e) => {
              const t = e.currentTarget
              t.style.display = 'none'
              const fallback = t.nextElementSibling as HTMLElement | null
              if (fallback) fallback.style.display = 'flex'
            }}
          />
          <span
            className="w-9 h-9 rounded-2xl bg-[#a7c7e7] items-center justify-center shadow-sm hidden"
            aria-hidden="true"
          >
            <GraduationCap className="w-5 h-5 text-[#2c3e5a]" />
          </span>
          <div className="flex flex-col leading-none">
            <span className="text-base font-bold text-[#2c3e5a] tracking-tight">
              Skill<span className="text-[#1a7fc1]">Bridge</span>
            </span>
            <span className="text-[9px] font-semibold text-[#a7c7e7] uppercase tracking-widest hidden sm:block">
              ICSB Academy Cup 2026
            </span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-7">
          <button
            onClick={() => scrollTo('how-it-works')}
            className="text-sm text-[#6b5b4e] hover:text-[#2c3e5a] transition-colors duration-200 font-medium"
          >
            How It Works
          </button>
          <button
            onClick={() => onLoginClick('worker')}
            className="text-sm text-[#6b5b4e] hover:text-[#2c3e5a] transition-colors duration-200 font-medium"
          >
            For Workers
          </button>
          <button
            onClick={() => onLoginClick('company')}
            className="text-sm text-[#6b5b4e] hover:text-[#2c3e5a] transition-colors duration-200 font-medium"
          >
            For Companies
          </button>
          <button
            onClick={() => scrollTo('our-team')}
            className="text-sm text-[#6b5b4e] hover:text-[#2c3e5a] transition-colors duration-200 font-medium"
          >
            Team
          </button>
          <button
            onClick={() => scrollTo('vision-roadmap')}
            className="text-sm text-[#6b5b4e] hover:text-[#2c3e5a] transition-colors duration-200 font-medium"
          >
            Roadmap
          </button>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => onLoginClick()}
            className="text-sm font-medium text-[#2c3e5a] hover:text-[#1a7fc1] transition-colors duration-200 px-4 py-2"
          >
            Sign In
          </button>
          <button
            onClick={() => onLoginClick()}
            className="text-sm font-semibold bg-[#2c3e5a] text-[#faf8f5] px-5 py-2.5 rounded-2xl hover:bg-[#3d5270] transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-xl text-[#2c3e5a] hover:bg-[#f5f0e8] transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle mobile menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#faf8f5]/98 backdrop-blur-md border-b border-[#e8e2da] px-6 py-4 animate-fade-up">
          <div className="flex flex-col gap-3">
            <button onClick={() => scrollTo('how-it-works')} className="text-sm text-[#6b5b4e] hover:text-[#2c3e5a] transition-colors py-1 font-medium text-left">
              How It Works
            </button>
            <button onClick={() => { onLoginClick('worker'); setMobileOpen(false) }} className="text-sm text-[#6b5b4e] hover:text-[#2c3e5a] transition-colors py-1 font-medium text-left">
              For Workers
            </button>
            <button onClick={() => { onLoginClick('company'); setMobileOpen(false) }} className="text-sm text-[#6b5b4e] hover:text-[#2c3e5a] transition-colors py-1 font-medium text-left">
              For Companies
            </button>
            <button onClick={() => scrollTo('our-team')} className="text-sm text-[#6b5b4e] hover:text-[#2c3e5a] transition-colors py-1 font-medium text-left">
              Team
            </button>
            <button onClick={() => scrollTo('vision-roadmap')} className="text-sm text-[#6b5b4e] hover:text-[#2c3e5a] transition-colors py-1 font-medium text-left">
              Roadmap
            </button>
            <div className="pt-2 flex flex-col gap-2 border-t border-[#e8e2da] mt-1">
              <button
                onClick={() => { onLoginClick(); setMobileOpen(false) }}
                className="text-sm font-medium text-[#2c3e5a] py-2 hover:text-[#1a7fc1] transition-colors text-left"
              >
                Sign In
              </button>
              <button
                onClick={() => { onLoginClick(); setMobileOpen(false) }}
                className="text-sm font-semibold bg-[#2c3e5a] text-[#faf8f5] px-5 py-2.5 rounded-2xl hover:bg-[#3d5270] transition-all text-center"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
