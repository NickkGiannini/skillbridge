'use client'

import { useState, useEffect, useRef } from 'react'
import {
  X,
  Users,
  Briefcase,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Building2,
  GraduationCap,
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react'

type Role = 'worker' | 'company'
type AuthMode = 'login' | 'register'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialRole?: Role
  onAuthSuccess: (role: Role) => void
}

export default function AuthModal({
  isOpen,
  onClose,
  initialRole,
  onAuthSuccess,
}: AuthModalProps) {
  const [role, setRole] = useState<Role>(initialRole ?? 'worker')
  const [mode, setMode] = useState<AuthMode>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<'role' | 'form'>('role')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    company: '',
  })
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      setStep(initialRole ? 'form' : 'role')
      setRole(initialRole ?? 'worker')
      setMode('login')
      setFormData({ name: '', email: '', password: '', company: '' })
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen, initialRole])

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate async auth
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    onAuthSuccess(role)
  }

  if (!isOpen) return null

  const workerColor = '#a7c7e7'
  const companyColor = '#ffb7b2'
  const activeColor = role === 'worker' ? workerColor : companyColor

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(44, 62, 90, 0.5)', backdropFilter: 'blur(6px)' }}
      role="dialog"
      aria-modal="true"
      aria-label="Authentication modal"
    >
      <div className="relative w-full max-w-md bg-[#faf8f5] rounded-3xl shadow-2xl overflow-hidden animate-scale-in">
        {/* Top accent bar */}
        <div
          className="h-1.5 w-full transition-colors duration-300"
          style={{ background: activeColor }}
        />

        {/* Header */}
        <div className="px-8 pt-7 pb-0 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-2xl flex items-center justify-center"
              style={{ background: activeColor + '30' }}
            >
              <GraduationCap className="w-4 h-4" style={{ color: '#2c3e5a' }} />
            </div>
            <span className="font-bold text-[#2c3e5a] text-base">ICSB Academy</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-[#f5f0e8] hover:bg-[#e8e2da] flex items-center justify-center text-[#6b5b4e] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step: Role Selection */}
        {step === 'role' && (
          <div className="px-8 pt-8 pb-10">
            <h2 className="text-2xl font-bold text-[#2c3e5a] mb-1">Welcome back!</h2>
            <p className="text-sm text-[#7a6e65] mb-8">Who are you signing in as?</p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {/* Worker option */}
              <button
                onClick={() => { setRole('worker'); setStep('form') }}
                className="group relative flex flex-col items-center gap-3 p-6 rounded-3xl border-2 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  borderColor: '#a7c7e7',
                  background: '#e8f3fb',
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ background: '#a7c7e7' }}
                >
                  <Users className="w-7 h-7 text-[#2c3e5a]" />
                </div>
                <div className="text-center">
                  <div className="font-bold text-[#2c3e5a] text-sm">I&apos;m a Worker</div>
                  <div className="text-[11px] text-[#7a6e65] mt-0.5">Job seeker</div>
                </div>
              </button>

              {/* Company option */}
              <button
                onClick={() => { setRole('company'); setStep('form') }}
                className="group relative flex flex-col items-center gap-3 p-6 rounded-3xl border-2 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  borderColor: '#ffb7b2',
                  background: '#fff0ef',
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ background: '#ffb7b2' }}
                >
                  <Briefcase className="w-7 h-7 text-[#2c3e5a]" />
                </div>
                <div className="text-center">
                  <div className="font-bold text-[#2c3e5a] text-sm">I&apos;m a Company</div>
                  <div className="text-[11px] text-[#7a6e65] mt-0.5">MSME hiring</div>
                </div>
              </button>
            </div>

            <p className="text-center text-xs text-[#7a6e65]">
              By continuing, you agree to our{' '}
              <a href="#" className="underline text-[#2c3e5a] hover:text-[#a7c7e7]">
                Terms of Service
              </a>
            </p>
          </div>
        )}

        {/* Step: Auth Form */}
        {step === 'form' && (
          <div className="px-8 pt-7 pb-10">
            {/* Back + Role indicator */}
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setStep('role')}
                className="w-8 h-8 rounded-xl bg-[#f5f0e8] hover:bg-[#e8e2da] flex items-center justify-center text-[#6b5b4e] transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <div
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1"
                style={{ background: activeColor + '30' }}
              >
                {role === 'worker' ? (
                  <Users className="w-3.5 h-3.5" style={{ color: '#2c3e5a' }} />
                ) : (
                  <Briefcase className="w-3.5 h-3.5" style={{ color: '#2c3e5a' }} />
                )}
                <span className="text-xs font-semibold text-[#2c3e5a]">
                  {role === 'worker' ? 'Worker Account' : 'Company Account'}
                </span>
              </div>
            </div>

            {/* Mode toggle */}
            <div className="flex bg-[#f5f0e8] rounded-2xl p-1 mb-7">
              {(['login', 'register'] as AuthMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className="flex-1 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={
                    mode === m
                      ? {
                          background: activeColor,
                          color: '#2c3e5a',
                          boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                        }
                      : { color: '#7a6e65' }
                  }
                >
                  {m === 'login' ? 'Sign In' : 'Register'}
                </button>
              ))}
            </div>

            <h2 className="text-xl font-bold text-[#2c3e5a] mb-1">
              {mode === 'login' ? 'Welcome back' : 'Create your account'}
            </h2>
            <p className="text-sm text-[#7a6e65] mb-6">
              {mode === 'login'
                ? `Sign in to your ${role} dashboard.`
                : `Join ICSB Academy as a ${role === 'worker' ? 'job seeker' : 'hiring company'}.`}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name field (register only) */}
              {mode === 'register' && (
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    {role === 'worker' ? (
                      <User className="w-4 h-4 text-[#a7c7e7]" />
                    ) : (
                      <Building2 className="w-4 h-4 text-[#ffb7b2]" />
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder={role === 'worker' ? 'Full name' : 'Company name'}
                    value={role === 'worker' ? formData.name : formData.company}
                    onChange={(e) =>
                      setFormData(
                        role === 'worker'
                          ? { ...formData, name: e.target.value }
                          : { ...formData, company: e.target.value }
                      )
                    }
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-[#e8e2da] text-[#2c3e5a] text-sm placeholder:text-[#b8b0a8] focus:outline-none transition-all"
                    style={{ boxShadow: 'none' }}
                    onFocus={(e) => (e.target.style.borderColor = activeColor)}
                    onBlur={(e) => (e.target.style.borderColor = '#e8e2da')}
                  />
                </div>
              )}

              {/* Email */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Mail className="w-4 h-4 text-[#a7c7e7]" />
                </div>
                <input
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-[#e8e2da] text-[#2c3e5a] text-sm placeholder:text-[#b8b0a8] focus:outline-none transition-all"
                  onFocus={(e) => (e.target.style.borderColor = activeColor)}
                  onBlur={(e) => (e.target.style.borderColor = '#e8e2da')}
                />
              </div>

              {/* Password */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Lock className="w-4 h-4 text-[#a7c7e7]" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="w-full pl-11 pr-11 py-3 rounded-2xl bg-white border border-[#e8e2da] text-[#2c3e5a] text-sm placeholder:text-[#b8b0a8] focus:outline-none transition-all"
                  onFocus={(e) => (e.target.style.borderColor = activeColor)}
                  onBlur={(e) => (e.target.style.borderColor = '#e8e2da')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#b8b0a8] hover:text-[#6b5b4e] transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                style={{
                  background: loading ? '#e8e2da' : activeColor,
                  color: '#2c3e5a',
                }}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div
                      className="w-4 h-4 border-2 rounded-full animate-spin border-t-transparent"
                      style={{ borderColor: '#2c3e5a', borderTopColor: 'transparent' }}
                    />
                    <span>Signing in...</span>
                  </div>
                ) : mode === 'login' ? (
                  'Sign In to Dashboard'
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            {mode === 'login' && (
              <p className="text-center text-xs text-[#7a6e65] mt-4">
                <a href="#" className="underline hover:text-[#2c3e5a] transition-colors">
                  Forgot your password?
                </a>
              </p>
            )}

            {/* Benefits row */}
            <div className="mt-6 pt-5 border-t border-[#e8e2da]">
              <div className="flex items-center justify-center gap-6">
                {['Free forever', 'AI-powered', 'Direct hire'].map((b) => (
                  <div key={b} className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" style={{ color: activeColor }} />
                    <span className="text-[11px] text-[#7a6e65] font-medium">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
