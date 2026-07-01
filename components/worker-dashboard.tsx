'use client'

import { useState, useMemo, useEffect } from 'react'
import {
  BookOpen,
  BadgeCheck,
  TrendingUp,
  LogOut,
  Bell,
  Target,
  Plus,
  X,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Award,
  PartyPopper,
  RotateCcw,
  Building2,
  CheckCircle2,
  GraduationCap,
  AlertTriangle,
  ShieldCheck,
  Cpu,
  Heart,
  ArrowRight,
  ChevronDown,
} from 'lucide-react'

const LS_ACADEMIES_KEY = 'sb_academies'
const LS_CANDIDATES_KEY = 'sb_candidates'
const LS_RISK_KEY = 'sb_risk_profile'

interface RiskProfile {
  riskPct: number
  vulnerableTasks: string[]
  transferableSkills: string[]
  pivotCourse: string
  pivotCompany: string
  pivotReducedRisk: number
  pivotAcademyId: number
}

const RISK_DATA: Record<string, { label: string } & RiskProfile> = {
  'data-entry': {
    label: 'Data Entry Clerk',
    riskPct: 88,
    vulnerableTasks: ['Transcribing documents', 'Sorting & filing records', 'Copy-pasting between systems', 'Basic data validation'],
    transferableSkills: ['Attention to detail', 'Process discipline', 'Stakeholder communication'],
    pivotCourse: 'Financial Records Management',
    pivotCompany: 'Cruz & Associates',
    pivotReducedRisk: 31,
    pivotAcademyId: 3,
  },
  'front-desk': {
    label: 'Front Desk Receptionist',
    riskPct: 72,
    vulnerableTasks: ['Answering standard FAQs', 'Booking & scheduling', 'Routing calls', 'Sending templated emails'],
    transferableSkills: ['Empathy & warmth', 'Conflict de-escalation', 'Reading social cues', 'Team coordination'],
    pivotCourse: 'Customer Service Excellence',
    pivotCompany: 'Verdi Retail Co.',
    pivotReducedRisk: 15,
    pivotAcademyId: 2,
  },
  'warehouse': {
    label: 'Warehouse Operator',
    riskPct: 54,
    vulnerableTasks: ['Inventory counting', 'Label scanning & printing', 'Simple picking routes'],
    transferableSkills: ['Physical dexterity', 'Equipment operation', 'Safety judgment', 'Team leadership on floor'],
    pivotCourse: 'Warehouse Operations & SAP',
    pivotCompany: 'LogiCorp Solutions',
    pivotReducedRisk: 18,
    pivotAcademyId: 1,
  },
  'social-media': {
    label: 'Social Media Coordinator',
    riskPct: 61,
    vulnerableTasks: ['Scheduling posts', 'Captioning images with AI tools', 'Reporting analytics', 'A/B testing copy'],
    transferableSkills: ['Brand storytelling', 'Community empathy', 'Creative direction', 'Crisis communication'],
    pivotCourse: 'Customer Service Excellence',
    pivotCompany: 'Verdi Retail Co.',
    pivotReducedRisk: 22,
    pivotAcademyId: 2,
  },
}

function RiskGauge({ pct }: { pct: number }) {
  const r = 52
  const cx = 64
  const cy = 64
  const startAngle = -210
  const sweepAngle = 240
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const arc = (angle: number) => {
    const rad = toRad(angle)
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
  }
  const start = arc(startAngle)
  const trackEnd = arc(startAngle + sweepAngle)
  const fillEnd = arc(startAngle + sweepAngle * (pct / 100))
  const largeArc = sweepAngle * (pct / 100) > 180 ? 1 : 0
  const trackLarge = sweepAngle > 180 ? 1 : 0

  const color = pct >= 75 ? '#f87171' : pct >= 50 ? '#fbbf24' : '#34d399'
  const bgColor = pct >= 75 ? '#fee2e2' : pct >= 50 ? '#fef9c3' : '#d1fae5'

  return (
    <div className="relative flex items-center justify-center" style={{ width: 128, height: 100 }}>
      <svg width="128" height="100" viewBox="0 0 128 100" aria-hidden="true">
        {/* Track */}
        <path
          d={`M ${start.x} ${start.y} A ${r} ${r} 0 ${trackLarge} 1 ${trackEnd.x} ${trackEnd.y}`}
          fill="none"
          stroke="#e8e2da"
          strokeWidth="10"
          strokeLinecap="round"
        />
        {/* Fill */}
        {pct > 0 && (
          <path
            d={`M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${fillEnd.x} ${fillEnd.y}`}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 0.6s ease' }}
          />
        )}
      </svg>
      <div className="absolute flex flex-col items-center justify-center" style={{ bottom: 6 }}>
        <span className="text-2xl font-bold leading-none" style={{ color }}>{pct}%</span>
        <span className="text-[9px] font-semibold uppercase tracking-widest text-[#7a6e65] mt-0.5">AI Risk</span>
      </div>
    </div>
  )
}

interface QuizQuestion {
  q: string
  options: string[]
  answer: number
}

interface StoredAcademy {
  id: number
  title: string
  modules: string[]
  quiz: QuizQuestion[]
  enrolled: number
  status: string
}

interface Academy {
  id: number
  title: string
  company: string
  skills: string[]
  color: string
  modules: { title: string; content: string }[]
  quiz: QuizQuestion[]
}

const BASE_ACADEMIES: Academy[] = [
  {
    id: 1,
    title: 'Warehouse Operations & SAP',
    company: 'LogiCorp Solutions',
    skills: ['inventory', 'sap', 'forklift', 'logistics', 'safety'],
    color: '#a7c7e7',
    modules: [
      { title: 'Forklift Safety Fundamentals', content: 'Before operating any forklift, perform a full pre-operation inspection: check tires, forks, hydraulics, and always fasten your seatbelt. Never exceed the rated load capacity and keep a clear line of sight while driving.' },
      { title: 'Inventory Control in SAP', content: 'SAP Materials Management (SAP MM) tracks stock levels in real time. Learn to post goods receipts, run cycle counts, and reconcile physical stock against system records to keep inventory accurate.' },
      { title: 'Warehouse Workflow Standards', content: 'Efficient warehouses follow standardized picking, packing, and shipping routes. Understanding zone-based workflows minimizes travel time and reduces fulfillment errors.' },
    ],
    quiz: [
      { q: 'What must you do before operating a forklift?', options: ['Skip the seatbelt', 'Pre-operation inspection', 'Overload the forks'], answer: 1 },
      { q: 'Which SAP module tracks stock levels?', options: ['SAP MM', 'SAP Travel', 'SAP Payroll'], answer: 0 },
      { q: 'Cycle counting is used to:', options: ['Increase errors', 'Verify stock accuracy', 'Delay orders'], answer: 1 },
    ],
  },
  {
    id: 2,
    title: 'Customer Service Excellence',
    company: 'Verdi Retail Co.',
    skills: ['communication', 'crm', 'empathy', 'sales', 'support'],
    color: '#c1e1c1',
    modules: [
      { title: 'Active Listening', content: 'Great service starts with listening. Let customers finish, reflect their concern back to them, and confirm understanding before offering a solution.' },
      { title: 'Handling Complaints', content: 'Stay calm and empathize. Acknowledge the issue, apologize sincerely, and focus on a resolution rather than assigning blame.' },
      { title: 'CRM Basics', content: 'A CRM system stores every customer interaction. Logging notes accurately helps the whole team deliver consistent, personalized support.' },
    ],
    quiz: [
      { q: 'The best way to handle an upset customer is to:', options: ['Interrupt them', 'Listen and empathize', 'Hang up'], answer: 1 },
      { q: 'A CRM system is used to:', options: ['Manage customer relationships', 'Drive forklifts', 'Cook food'], answer: 0 },
      { q: 'Empathy in service means:', options: ['Ignoring feelings', 'Understanding the customer', 'Ending the chat'], answer: 1 },
    ],
  },
  {
    id: 3,
    title: 'Financial Records Management',
    company: 'Cruz & Associates',
    skills: ['accounting', 'excel', 'bookkeeping', 'finance', 'reporting'],
    color: '#ffb7b2',
    modules: [
      { title: 'Bookkeeping Foundations', content: 'Every transaction affects at least two accounts. Master debits and credits to keep the accounting equation balanced.' },
      { title: 'Spreadsheets for Finance', content: 'Use formulas like SUM, VLOOKUP, and pivot tables to organize and analyze financial data quickly and accurately.' },
      { title: 'Monthly Reporting', content: 'Reconcile accounts and prepare income statements each month to give management a clear picture of financial health.' },
    ],
    quiz: [
      { q: 'Every transaction affects at least how many accounts?', options: ['One', 'Two', 'Zero'], answer: 1 },
      { q: 'Which tool organizes financial data?', options: ['Spreadsheets', 'Forklifts', 'CRMs only'], answer: 0 },
      { q: 'Monthly reconciliation helps to:', options: ['Hide errors', 'Verify accuracy', 'Skip reports'], answer: 1 },
    ],
  },
]

const SUGGESTED_SKILLS = ['inventory', 'sap', 'communication', 'excel', 'safety', 'crm']

type ExamPhase = 'reading' | 'exam' | 'result'
type SidebarTab = 'recommended' | 'skills' | 'certificates' | 'interviews'

function storedAcademyToAcademy(s: StoredAcademy, index: number): Academy {
  const colors = ['#ffd5c8', '#e8c9f0', '#d4edda']
  return {
    id: s.id,
    title: s.title,
    company: 'New Partner MSME',
    skills: ['general', 'operations', 'quality'],
    color: colors[index % colors.length],
    modules: s.modules.map((m) => ({
      title: m,
      content: `This module covers key concepts related to "${m}". Study carefully to prepare for the certification exam.`,
    })),
    quiz: s.quiz,
  }
}

export default function WorkerDashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<SidebarTab>('recommended')
  const [skills, setSkills] = useState<string[]>(['inventory', 'safety', 'communication'])
  const [skillInput, setSkillInput] = useState('')
  const [certified, setCertified] = useState<{ id: number; title: string; score: number; company: string }[]>([])
  const [extraAcademies, setExtraAcademies] = useState<Academy[]>([])

  // AI Risk Index state
  const [selectedJob, setSelectedJob] = useState<string>('')
  const [riskExpanded, setRiskExpanded] = useState(true)

  const [activeAcademy, setActiveAcademy] = useState<Academy | null>(null)
  const [phase, setPhase] = useState<ExamPhase>('reading')
  const [moduleIndex, setModuleIndex] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>([])

  // Load persisted risk job selection
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_RISK_KEY)
      if (saved) setSelectedJob(saved)
    } catch {}
  }, [])

  // Save risk job selection on change
  useEffect(() => {
    if (selectedJob) {
      try { localStorage.setItem(LS_RISK_KEY, selectedJob) } catch {}
    }
  }, [selectedJob])

  // Load company-generated academies from localStorage
  useEffect(() => {
    const load = () => {
      try {
        const stored = localStorage.getItem(LS_ACADEMIES_KEY)
        if (stored) {
          const parsed: StoredAcademy[] = JSON.parse(stored)
          // Only include academies not in BASE_ACADEMIES (id > 2)
          const extras = parsed.filter((a) => a.id > 2 && a.status === 'Live')
          setExtraAcademies(extras.map((a, i) => storedAcademyToAcademy(a, i)))
        }
      } catch {}
    }
    load()
    const interval = setInterval(load, 1500)
    return () => clearInterval(interval)
  }, [])

  const allAcademies = useMemo(() => [...BASE_ACADEMIES, ...extraAcademies], [extraAcademies])

  const addSkill = (raw: string) => {
    const skill = raw.trim().toLowerCase()
    if (skill && !skills.includes(skill)) setSkills((prev) => [...prev, skill])
    setSkillInput('')
  }

  const removeSkill = (skill: string) => setSkills((prev) => prev.filter((s) => s !== skill))

  const rankedAcademies = useMemo(() => {
    return allAcademies.map((a) => {
      const matched = a.skills.filter((s) => skills.includes(s)).length
      const raw = a.skills.length === 0 ? 0 : (matched / a.skills.length) * 100
      const match = Math.min(98, Math.round(35 + raw * 0.63))
      return { ...a, match }
    }).sort((x, y) => y.match - x.match)
  }, [skills, allAcademies])

  const startLearning = (academy: Academy) => {
    setActiveAcademy(academy)
    setPhase('reading')
    setModuleIndex(0)
    setAnswers(new Array(academy.quiz.length).fill(null))
  }

  const closeLearning = () => setActiveAcademy(null)

  const score = useMemo(() => {
    if (!activeAcademy) return 0
    const correct = activeAcademy.quiz.reduce((acc, q, i) => acc + (answers[i] === q.answer ? 1 : 0), 0)
    return Math.round((correct / activeAcademy.quiz.length) * 100)
  }, [activeAcademy, answers])

  const passed = score >= 70

  const submitExam = () => {
    setPhase('result')
    if (activeAcademy && score >= 70 && !certified.find((c) => c.id === activeAcademy.id)) {
      const newCert = { id: activeAcademy.id, title: activeAcademy.title, score, company: activeAcademy.company }
      setCertified((prev) => [...prev, newCert])

      // Write result to localStorage so Company Dashboard sees it
      try {
        const stored = localStorage.getItem(LS_CANDIDATES_KEY)
        const existing = stored ? JSON.parse(stored) : []
        const newCandidate = {
          name: 'Maria Santos',
          course: activeAcademy.title.split('&')[0].trim(),
          score,
          status: 'Certified - Interview Unlocked',
          avatar: 'M',
          color: '#a7c7e7',
        }
        // Replace existing entry for this worker+course or append
        const idx = existing.findIndex((c: { name: string; course: string }) => c.name === 'Maria Santos' && c.course === newCandidate.course)
        if (idx >= 0) existing[idx] = newCandidate
        else existing.push(newCandidate)
        localStorage.setItem(LS_CANDIDATES_KEY, JSON.stringify(existing))
      } catch {}
    }
  }

  const statCards = [
    { label: 'Skills Added', value: String(skills.length), icon: Target, color: '#a7c7e7', bg: '#e8f3fb' },
    { label: 'Certificates', value: String(certified.length), icon: BadgeCheck, color: '#c1e1c1', bg: '#eaf6ea' },
    { label: 'Matches Found', value: String(rankedAcademies.filter((a) => a.match >= 60).length), icon: Sparkles, color: '#ffb7b2', bg: '#fff0ef' },
    { label: 'Interviews', value: String(certified.length), icon: TrendingUp, color: '#ffd5c8', bg: '#fff5f0' },
  ]

  const sidebarItems: { id: SidebarTab; label: string; icon: typeof GraduationCap }[] = [
    { id: 'recommended', label: 'Recommended', icon: Sparkles },
    { id: 'skills', label: 'My Skills', icon: Target },
    { id: 'certificates', label: 'Certificates', icon: BadgeCheck },
    { id: 'interviews', label: 'Interviews', icon: TrendingUp },
  ]

  return (
    <div className="min-h-screen" style={{ background: '#faf8f5' }}>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 bg-[#2c3e5a] p-6 gap-2 flex-shrink-0">
          <div className="flex items-center gap-2.5 mb-8">
            <img
              src="/logo-skillbridge.jpeg"
              alt="SkillBridge"
              height={36}
              width={36}
              className="rounded-xl object-contain flex-shrink-0"
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
            <div className="flex flex-col leading-none">
              <span className="text-sm font-bold text-[#faf8f5]">Skill<span className="text-[#a7c7e7]">Bridge</span></span>
              <span className="text-[9px] text-[#a7c7e7]/70 font-semibold uppercase tracking-widest">Worker Portal</span>
            </div>
          </div>

          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all text-left ${
                tab === item.id
                  ? 'bg-[#a7c7e7]/20 text-[#a7c7e7]'
                  : 'text-[#faf8f5]/60 hover:bg-white/5 hover:text-[#faf8f5]'
              }`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
              {item.id === 'certificates' && certified.length > 0 && (
                <span className="ml-auto text-[10px] font-bold bg-[#c1e1c1] text-[#2c3e5a] rounded-full w-5 h-5 flex items-center justify-center">
                  {certified.length}
                </span>
              )}
            </button>
          ))}

          <div className="mt-auto">
            <div className="bg-[#a7c7e7]/10 rounded-2xl p-4 mb-4">
              <div className="text-xs text-[#a7c7e7] font-semibold mb-1">Learning is free</div>
              <p className="text-[11px] text-[#faf8f5]/60 leading-relaxed">
                Study every module at no cost. Pay only to unlock your certified exam.
              </p>
            </div>
            <button onClick={onLogout} className="flex items-center gap-2 text-sm text-[#faf8f5]/50 hover:text-[#ffb7b2] transition-colors px-4 py-2">
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 md:p-10 overflow-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-sm text-[#7a6e65] font-medium">Good morning,</p>
              <h1 className="text-2xl font-bold text-[#2c3e5a]">Maria Santos</h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative w-10 h-10 rounded-2xl bg-white border border-[#e8e2da] flex items-center justify-center text-[#6b5b4e] hover:bg-[#f5f0e8] transition-colors shadow-sm">
                <Bell className="w-4 h-4" />
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#ffb7b2]" />
              </button>
              <div className="w-10 h-10 rounded-2xl bg-[#a7c7e7] flex items-center justify-center">
                <span className="text-sm font-bold text-[#2c3e5a]">M</span>
              </div>
            </div>
          </div>

          {/* AI Automation Risk Index */}
          {(() => {
            const profile = selectedJob ? RISK_DATA[selectedJob] : null
            const riskColor = profile
              ? profile.riskPct >= 75 ? '#ef4444' : profile.riskPct >= 50 ? '#f59e0b' : '#10b981'
              : '#a7c7e7'
            const riskBg = profile
              ? profile.riskPct >= 75 ? '#fef2f2' : profile.riskPct >= 50 ? '#fffbeb' : '#f0fdf4'
              : '#f0f7ff'

            return (
              <div className="bg-white rounded-3xl border border-[#e8e2da] shadow-sm mb-8 overflow-hidden">
                {/* Card header — always visible */}
                <button
                  onClick={() => setRiskExpanded((v) => !v)}
                  className="w-full flex items-center gap-3 px-6 py-4 hover:bg-[#faf8f5] transition-colors text-left"
                  aria-expanded={riskExpanded}
                >
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: riskBg }}>
                    <Cpu className="w-5 h-5" style={{ color: riskColor }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#2c3e5a] text-sm">AI Automation Risk Index</span>
                      <span className="text-[9px] font-bold uppercase tracking-widest rounded-full px-2 py-0.5 bg-[#e8f3fb] text-[#4a7ab5]">Indice di Sostituibilità AI</span>
                    </div>
                    <p className="text-xs text-[#7a6e65] mt-0.5">
                      {profile ? `${profile.label} — ${profile.riskPct}% risk` : 'Select your job role to assess your AI replacement risk'}
                    </p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-[#7a6e65] flex-shrink-0 transition-transform ${riskExpanded ? 'rotate-180' : ''}`} />
                </button>

                {riskExpanded && (
                  <div className="px-6 pb-6 border-t border-[#f0ebe3]">
                    {/* Job selector */}
                    <div className="flex items-center gap-3 pt-5 mb-5">
                      <label htmlFor="job-select" className="text-xs font-semibold text-[#2c3e5a] whitespace-nowrap">Your current role:</label>
                      <div className="relative flex-1 max-w-xs">
                        <select
                          id="job-select"
                          value={selectedJob}
                          onChange={(e) => setSelectedJob(e.target.value)}
                          className="w-full appearance-none bg-[#faf8f5] border border-[#e8e2da] rounded-2xl pl-4 pr-9 py-2.5 text-sm text-[#2c3e5a] focus:outline-none focus:border-[#a7c7e7] focus:ring-2 focus:ring-[#a7c7e7]/20 transition-all cursor-pointer"
                        >
                          <option value="">-- Select a role --</option>
                          {Object.entries(RISK_DATA).map(([key, val]) => (
                            <option key={key} value={key}>{val.label}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#7a6e65] pointer-events-none" />
                      </div>
                    </div>

                    {!profile && (
                      <div className="rounded-2xl bg-[#f5f0e8] border border-[#e8e2da] px-5 py-6 flex flex-col items-center gap-2 text-center">
                        <AlertTriangle className="w-6 h-6 text-[#b8b0a8]" />
                        <p className="text-sm text-[#7a6e65]">Choose your role above to see your personalised AI risk assessment.</p>
                      </div>
                    )}

                    {profile && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {/* Gauge column */}
                        <div className="flex flex-col items-center justify-center rounded-2xl py-5 px-4" style={{ background: riskBg }}>
                          <RiskGauge pct={profile.riskPct} />
                          <p className="text-[11px] font-semibold text-center mt-2" style={{ color: riskColor }}>
                            {profile.riskPct >= 75 ? 'High Risk — Act now' : profile.riskPct >= 50 ? 'Moderate Risk — Upskill soon' : 'Lower Risk — Stay current'}
                          </p>
                        </div>

                        {/* Tasks breakdown column */}
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center gap-1.5 mb-2">
                              <AlertTriangle className="w-3.5 h-3.5 text-[#f59e0b]" />
                              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6b5b4e]">Vulnerable Tasks</span>
                            </div>
                            <ul className="space-y-1.5">
                              {profile.vulnerableTasks.map((t) => (
                                <li key={t} className="flex items-start gap-1.5 text-xs text-[#6b5b4e]">
                                  <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-[#fbbf24] flex-shrink-0" />
                                  {t}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5 mb-2">
                              <Heart className="w-3.5 h-3.5 text-[#10b981]" />
                              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6b5b4e]">Human Strengths</span>
                            </div>
                            <ul className="space-y-1.5">
                              {profile.transferableSkills.map((s) => (
                                <li key={s} className="flex items-start gap-1.5 text-xs text-[#6b5b4e]">
                                  <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-[#34d399] flex-shrink-0" />
                                  {s}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Pivot recommendation column */}
                        <div className="rounded-2xl bg-[#e8f3fb] border border-[#a7c7e7]/40 p-5 flex flex-col justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-1.5 mb-2">
                              <ShieldCheck className="w-4 h-4 text-[#4a7ab5]" />
                              <span className="text-[11px] font-bold uppercase tracking-wider text-[#4a7ab5]">SkillBridge Recommendation</span>
                            </div>
                            <p className="text-xs text-[#2c3e5a] leading-relaxed">
                              Study{' '}
                              <span className="font-bold">&ldquo;{profile.pivotCourse}&rdquo;</span>{' '}
                              by {profile.pivotCompany} to pivot your role and lower your AI risk from{' '}
                              <span className="font-bold" style={{ color: riskColor }}>{profile.riskPct}%</span>{' '}
                              to{' '}
                              <span className="font-bold text-[#10b981]">{profile.pivotReducedRisk}%</span>.
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              const target = [...BASE_ACADEMIES].find((a) => a.id === profile.pivotAcademyId)
                              if (target) startLearning(target)
                            }}
                            className="inline-flex items-center justify-center gap-2 bg-[#2c3e5a] text-[#faf8f5] rounded-2xl px-4 py-2.5 text-xs font-bold hover:bg-[#3d5270] transition-colors w-full"
                          >
                            Start Course <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })()}

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statCards.map((stat, i) => (
              <div key={i} className="bg-white rounded-3xl p-5 border border-[#e8e2da] shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-3" style={{ background: stat.bg }}>
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <div className="text-2xl font-bold text-[#2c3e5a] mb-0.5">{stat.value}</div>
                <div className="text-xs text-[#7a6e65] font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* ── TAB: Recommended ── */}
          {tab === 'recommended' && (
            <div>
              <div className="flex items-center gap-2 mb-5">
                <Sparkles className="w-5 h-5 text-[#ffb7b2]" />
                <h2 className="text-lg font-bold text-[#2c3e5a]">Recommended Academies</h2>
                <span className="text-xs text-[#7a6e65]">matched to your skills</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {rankedAcademies.map((academy) => {
                  const isCertified = !!certified.find((c) => c.id === academy.id)
                  return (
                    <div key={academy.id} className="bg-white rounded-3xl p-6 border border-[#e8e2da] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: academy.color + '30' }}>
                          <BookOpen className="w-5 h-5" style={{ color: academy.color }} />
                        </div>
                        <div className="text-xs font-bold rounded-full px-2.5 py-1" style={{ background: academy.match >= 70 ? '#eaf6ea' : '#f5f0e8', color: academy.match >= 70 ? '#3a6b3a' : '#6b5b4e' }}>
                          {academy.match}% Match
                        </div>
                      </div>
                      <h3 className="font-bold text-[#2c3e5a] text-sm mb-1">{academy.title}</h3>
                      <p className="text-xs text-[#7a6e65] flex items-center gap-1 mb-4">
                        <Building2 className="w-3 h-3" /> {academy.company}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {academy.skills.slice(0, 3).map((s) => (
                          <span key={s} className={`text-[10px] capitalize rounded-full px-2 py-0.5 ${skills.includes(s) ? 'bg-[#e8f3fb] text-[#4a7ab5] font-semibold' : 'bg-[#f5f0e8] text-[#9a8e83]'}`}>
                            {s}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={() => startLearning(academy)}
                        className="mt-auto w-full inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-bold transition-all"
                        style={isCertified ? { background: '#eaf6ea', color: '#3a6b3a' } : { background: academy.color, color: '#2c3e5a' }}
                      >
                        {isCertified ? <><BadgeCheck className="w-4 h-4" /> Certified</> : <>Start Learning <ChevronRight className="w-4 h-4" /></>}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── TAB: My Skills ── */}
          {tab === 'skills' && (
            <div className="bg-white rounded-3xl border border-[#e8e2da] shadow-sm p-6 md:p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-2xl bg-[#a7c7e7]/20 flex items-center justify-center">
                  <Target className="w-5 h-5 text-[#4a7ab5]" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#2c3e5a]">My Skills</h2>
                  <p className="text-sm text-[#7a6e65]">Add your skills — AI matches you to the right academies.</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {skills.map((skill) => (
                  <span key={skill} className="inline-flex items-center gap-1.5 bg-[#e8f3fb] text-[#2c3e5a] rounded-full pl-3 pr-2 py-1.5 text-xs font-semibold capitalize">
                    {skill}
                    <button onClick={() => removeSkill(skill)} className="w-4 h-4 rounded-full bg-[#a7c7e7]/40 hover:bg-[#a7c7e7] flex items-center justify-center transition-colors" aria-label={`Remove ${skill}`}>
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </span>
                ))}
                {skills.length === 0 && <span className="text-xs text-[#b8b0a8] py-1.5">No skills yet — add a few to see matches.</span>}
              </div>
              <div className="flex gap-2 mb-3">
                <input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229) {
                      e.preventDefault()
                      addSkill(skillInput)
                    }
                  }}
                  placeholder="Type a skill and press Enter..."
                  className="flex-1 rounded-2xl bg-[#faf8f5] border border-[#e8e2da] px-4 py-2.5 text-sm text-[#2c3e5a] placeholder:text-[#b8b0a8] focus:outline-none focus:border-[#a7c7e7] focus:ring-2 focus:ring-[#a7c7e7]/20 transition-all"
                />
                <button onClick={() => addSkill(skillInput)} disabled={!skillInput.trim()} className="inline-flex items-center gap-1.5 bg-[#a7c7e7] text-[#2c3e5a] px-4 py-2.5 rounded-2xl text-sm font-bold hover:bg-[#89b8e0] transition-colors disabled:opacity-40">
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] text-[#7a6e65] font-medium">Suggestions:</span>
                {SUGGESTED_SKILLS.filter((s) => !skills.includes(s)).map((s) => (
                  <button key={s} onClick={() => addSkill(s)} className="text-[11px] capitalize rounded-full border border-[#e8e2da] bg-[#faf8f5] text-[#6b5b4e] px-2.5 py-1 hover:border-[#a7c7e7] hover:text-[#2c3e5a] transition-colors">
                    + {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── TAB: Certificates ── */}
          {tab === 'certificates' && (
            <div>
              <h2 className="text-lg font-bold text-[#2c3e5a] mb-5">My Certificates</h2>
              {certified.length === 0 ? (
                <div className="bg-white rounded-3xl border border-[#e8e2da] p-12 text-center">
                  <div className="w-14 h-14 rounded-3xl bg-[#eaf6ea] flex items-center justify-center mx-auto mb-4">
                    <BadgeCheck className="w-7 h-7 text-[#c1e1c1]" />
                  </div>
                  <h3 className="font-bold text-[#2c3e5a] mb-2">No certificates yet</h3>
                  <p className="text-sm text-[#7a6e65] max-w-xs mx-auto">Complete a course exam with 70% or higher to earn your first Standardized Competence Badge.</p>
                  <button onClick={() => setTab('recommended')} className="mt-5 inline-flex items-center gap-2 bg-[#a7c7e7] text-[#2c3e5a] px-5 py-2.5 rounded-2xl text-sm font-bold hover:bg-[#89b8e0] transition-colors">
                    Browse Academies <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {certified.map((cert, i) => (
                    <div key={i} className="bg-white rounded-3xl border-2 border-[#c1e1c1] p-6 flex items-center gap-4 shadow-sm">
                      <div className="w-14 h-14 rounded-3xl bg-[#eaf6ea] flex items-center justify-center flex-shrink-0">
                        <Award className="w-7 h-7 text-[#3a6b3a]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-[#3a6b3a] mb-0.5">Standardized Competence Badge</div>
                        <h3 className="font-bold text-[#2c3e5a] text-sm truncate">{cert.title}</h3>
                        <p className="text-xs text-[#7a6e65]">{cert.company}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-2xl font-bold text-[#3a6b3a]">{cert.score}%</div>
                        <div className="text-[10px] text-[#7a6e65]">Exam Score</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── TAB: Interviews ── */}
          {tab === 'interviews' && (
            <div>
              <h2 className="text-lg font-bold text-[#2c3e5a] mb-5">Interview Pipeline</h2>
              {certified.length === 0 ? (
                <div className="bg-white rounded-3xl border border-[#e8e2da] p-12 text-center">
                  <div className="w-14 h-14 rounded-3xl bg-[#fff0ef] flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-7 h-7 text-[#ffb7b2]" />
                  </div>
                  <h3 className="font-bold text-[#2c3e5a] mb-2">No interviews unlocked yet</h3>
                  <p className="text-sm text-[#7a6e65] max-w-xs mx-auto">Pass a certification exam to unlock a direct interview with the company that created the course.</p>
                  <button onClick={() => setTab('recommended')} className="mt-5 inline-flex items-center gap-2 bg-[#ffb7b2] text-[#2c3e5a] px-5 py-2.5 rounded-2xl text-sm font-bold hover:bg-[#ffa09a] transition-colors">
                    Start Learning <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {certified.map((cert, i) => (
                    <div key={i} className="bg-white rounded-3xl border border-[#e8e2da] p-6 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 rounded-2xl bg-[#fff0ef] flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-6 h-6 text-[#ffb7b2]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-[#2c3e5a] text-sm truncate">{cert.company}</h3>
                        <p className="text-xs text-[#7a6e65]">Role: {cert.title}</p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-[10px] font-bold uppercase tracking-wide rounded-full px-3 py-1 bg-[#fff0ef] text-[#c0574f]">
                          Interview Unlocked
                        </span>
                        <button className="bg-[#2c3e5a] text-[#faf8f5] px-4 py-2 rounded-2xl text-xs font-bold hover:bg-[#3d5270] transition-colors">
                          Schedule
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Module Reader + Exam Modal */}
      {activeAcademy && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-[#2c3e5a]/40 backdrop-blur-sm fade-in">
          <div className="bg-[#faf8f5] rounded-3xl w-full max-w-lg max-h-[88vh] overflow-auto shadow-2xl fade-in-up">
            <div className="sticky top-0 bg-[#faf8f5] flex items-center justify-between p-6 border-b border-[#e8e2da]">
              <div className="min-w-0">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#4a7ab5]">
                  {phase === 'reading' ? 'Module Reader' : phase === 'exam' ? 'Certification Exam' : 'Result'}
                </span>
                <h3 className="text-lg font-bold text-[#2c3e5a] truncate">{activeAcademy.title}</h3>
              </div>
              <button onClick={closeLearning} className="w-9 h-9 rounded-2xl bg-white border border-[#e8e2da] flex items-center justify-center text-[#6b5b4e] hover:bg-[#f5f0e8] transition-colors flex-shrink-0" aria-label="Close">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6">
              {/* READING */}
              {phase === 'reading' && (
                <>
                  <div className="flex items-center gap-1.5 mb-5">
                    {activeAcademy.modules.map((_, i) => (
                      <div key={i} className="h-1.5 flex-1 rounded-full transition-colors" style={{ background: i <= moduleIndex ? '#a7c7e7' : '#e8e2da' }} />
                    ))}
                  </div>
                  <div className="w-11 h-11 rounded-2xl bg-[#a7c7e7]/20 flex items-center justify-center mb-4">
                    <BookOpen className="w-5 h-5 text-[#4a7ab5]" />
                  </div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-[#4a7ab5] mb-1">
                    Module <span className="font-bold text-[#4a7ab5]">{moduleIndex + 1}</span> of {activeAcademy.modules.length}
                  </p>
                  <h4 className="text-lg font-bold text-[#2c3e5a] mb-3">{activeAcademy.modules[moduleIndex].title}</h4>
                  <p className="text-sm text-[#6b5b4e] leading-relaxed mb-6">{activeAcademy.modules[moduleIndex].content}</p>
                  <div className="flex items-center justify-between gap-3">
                    <button onClick={() => setModuleIndex((i) => Math.max(0, i - 1))} disabled={moduleIndex === 0} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6b5b4e] px-4 py-2.5 rounded-2xl hover:bg-[#f0ebe3] transition-colors disabled:opacity-30">
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                    {moduleIndex < activeAcademy.modules.length - 1 ? (
                      <button onClick={() => setModuleIndex((i) => i + 1)} className="inline-flex items-center gap-1.5 bg-[#a7c7e7] text-[#2c3e5a] px-5 py-2.5 rounded-2xl text-sm font-bold hover:bg-[#89b8e0] transition-colors">
                        Next Module <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button onClick={() => setPhase('exam')} className="inline-flex items-center gap-1.5 bg-[#ffb7b2] text-[#2c3e5a] px-5 py-2.5 rounded-2xl text-sm font-bold hover:bg-[#ffa09a] transition-colors">
                        Take the Exam <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </>
              )}

              {/* EXAM */}
              {phase === 'exam' && (
                <>
                  <p className="text-sm text-[#7a6e65] mb-5">Answer all {activeAcademy.quiz.length} questions. Score 70% or higher to earn your certificate.</p>
                  <div className="space-y-4 mb-6">
                    {activeAcademy.quiz.map((question, qi) => (
                      <div key={qi} className="bg-white rounded-2xl p-4 border border-[#e8e2da]">
                        <p className="text-sm font-semibold text-[#2c3e5a] mb-3">{qi + 1}. {question.q}</p>
                        <div className="space-y-2">
                          {question.options.map((opt, oi) => (
                            <button
                              key={oi}
                              onClick={() => setAnswers((prev) => { const next = [...prev]; next[qi] = oi; return next })}
                              className={`w-full text-left text-xs rounded-xl px-3 py-2.5 border transition-all ${answers[qi] === oi ? 'bg-[#e8f3fb] border-[#a7c7e7] text-[#2c3e5a] font-semibold' : 'bg-[#faf8f5] border-[#e8e2da] text-[#6b5b4e] hover:border-[#a7c7e7]/50'}`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button onClick={submitExam} disabled={answers.some((a) => a === null)} className="w-full inline-flex items-center justify-center gap-2 bg-[#ffb7b2] text-[#2c3e5a] px-5 py-3 rounded-2xl text-sm font-bold hover:bg-[#ffa09a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                    Submit Exam
                  </button>
                </>
              )}

              {/* RESULT */}
              {phase === 'result' && (
                <div className="text-center">
                  {passed ? (
                    <>
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-[#eaf6ea] mb-4 animate-float">
                        <PartyPopper className="w-8 h-8 text-[#3a6b3a]" />
                      </div>
                      <h4 className="text-2xl font-bold text-[#2c3e5a] mb-1">Congratulations!</h4>
                      <p className="text-sm text-[#7a6e65] mb-1">You scored</p>
                      <div className="text-4xl font-bold text-[#3a6b3a] mb-5">{score}%</div>
                      <div className="bg-white rounded-3xl border-2 border-[#c1e1c1] p-6 text-left mb-5">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-11 h-11 rounded-2xl bg-[#c1e1c1] flex items-center justify-center flex-shrink-0">
                            <Award className="w-6 h-6 text-[#2c3e5a]" />
                          </div>
                          <div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-[#3a6b3a]">Standardized Competence Badge</div>
                            <div className="font-bold text-[#2c3e5a] text-sm">{activeAcademy.title}</div>
                          </div>
                        </div>
                        <p className="text-xs text-[#6b5b4e] leading-relaxed">
                          This verified badge is now a portable asset on your profile. It unlocks a priority interview with{' '}
                          <span className="font-semibold">{activeAcademy.company}</span> — and makes you instantly hireable by other MSMEs with similar needs across the platform.
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button onClick={() => { closeLearning(); setTab('certificates') }} className="flex-1 inline-flex items-center justify-center gap-2 bg-[#2c3e5a] text-[#faf8f5] px-5 py-3 rounded-2xl text-sm font-bold hover:bg-[#3d5270] transition-colors">
                          <CheckCircle2 className="w-4 h-4" /> View Certificate
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-[#fff0ef] mb-4">
                        <RotateCcw className="w-8 h-8 text-[#c0574f]" />
                      </div>
                      <h4 className="text-2xl font-bold text-[#2c3e5a] mb-1">Almost there!</h4>
                      <p className="text-sm text-[#7a6e65] mb-1">You scored</p>
                      <div className="text-4xl font-bold text-[#c0574f] mb-2">{score}%</div>
                      <p className="text-sm text-[#7a6e65] mb-5">You need 70% to certify. Review the modules and try again — learning is always free.</p>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button onClick={() => { setPhase('reading'); setModuleIndex(0); setAnswers(new Array(activeAcademy.quiz.length).fill(null)) }} className="flex-1 inline-flex items-center justify-center gap-2 bg-[#a7c7e7] text-[#2c3e5a] px-5 py-3 rounded-2xl text-sm font-bold hover:bg-[#89b8e0] transition-colors">
                          <RotateCcw className="w-4 h-4" /> Review &amp; Retry
                        </button>
                        <button onClick={closeLearning} className="flex-1 inline-flex items-center justify-center gap-2 bg-white border border-[#e8e2da] text-[#6b5b4e] px-5 py-3 rounded-2xl text-sm font-bold hover:bg-[#f5f0e8] transition-colors">
                          Close
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
