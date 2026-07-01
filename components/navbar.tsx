'use client'

import { useState, useEffect } from 'react'
import { GraduationCap, Menu, X } from 'lucide-react'

interface NavbarProps {
  onLoginClick: () => void
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

  return (
    <header
      style={{ top: offsetTop ? 'var(--demo-nav-h, 52px)' : 0 }}
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#faf8f5]/95 backdrop-blur-md shadow-sm border-b border-[#e8e2da]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-[#a7c7e7] flex items-center justify-center shadow-sm">
            <GraduationCap className="w-5 h-5 text-[#2c3e5a]" />
          </div>
          <span className="text-lg font-semibold text-[#2c3e5a] tracking-tight">
            ICSB <span className="text-[#a7c7e7]">Academy</span>
          </span>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {['How It Works', 'For Workers', 'For Companies', 'About'].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm text-[#6b5b4e] hover:text-[#2c3e5a] transition-colors duration-200 font-medium"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onLoginClick}
            className="text-sm font-medium text-[#2c3e5a] hover:text-[#a7c7e7] transition-colors duration-200 px-4 py-2"
          >
            Sign In
          </button>
          <button
            onClick={onLoginClick}
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
            {['How It Works', 'For Workers', 'For Companies', 'About'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm text-[#6b5b4e] hover:text-[#2c3e5a] transition-colors py-1 font-medium"
                onClick={() => setMobileOpen(false)}
              >
                {item}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2 border-t border-[#e8e2da] mt-1">
              <button
                onClick={() => { onLoginClick(); setMobileOpen(false) }}
                className="text-sm font-medium text-[#2c3e5a] py-2 hover:text-[#a7c7e7] transition-colors text-left"
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
