'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Upload,
  Users,
  BadgeCheck,
  BookOpen,
  LogOut,
  Bell,
  Building2,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  Star,
  X,
  FileText,
  Wand2,
  Loader2,
  BarChart3,
} from 'lucide-react'

const LS_ACADEMIES_KEY = 'sb_academies'
const LS_CANDIDATES_KEY = 'sb_candidates'

interface QuizQuestion {
  q: string
  options: string[]
  answer: number
}

interface Academy {
  id: number
  title: string
  modules: string[]
  quiz: QuizQuestion[]
  enrolled: number
  status: 'Live' | 'Draft'
  isNew?: boolean
}

interface Candidate {
  name: string
  course: string
  score: number
  status: string
  avatar: string
  color: string
}

const defaultAcademies: Academy[] = [
  {
    id: 1,
    title: 'Warehouse Operations & SAP',
    modules: ['Forklift Safety Fundamentals', 'Inventory Control in SAP', 'Warehouse Workflow Standards'],
    quiz: [
      { q: 'What is the first check before operating a forklift?', options: ['Pre-operation inspection', 'Charging the phone', 'Skipping the seatbelt'], answer: 0 },
      { q: 'Which SAP module tracks stock levels?', options: ['SAP HR', 'SAP MM (Materials Management)', 'SAP Travel'], answer: 1 },
      { q: 'Inventory cycle counting helps to:', options: ['Increase errors', 'Verify stock accuracy', 'Delay shipments'], answer: 1 },
    ],
    enrolled: 24,
    status: 'Live',
  },
  {
    id: 2,
    title: 'Customer Service Excellence',
    modules: ['Active Listening', 'Handling Complaints', 'CRM Basics'],
    quiz: [
      { q: 'The best way to handle an upset customer is to:', options: ['Interrupt them', 'Listen and empathize', 'Transfer the call immediately'], answer: 1 },
      { q: 'A CRM system is used to:', options: ['Manage customer relationships', 'Cook food', 'Drive trucks'], answer: 0 },
      { q: 'Empathy in service means:', options: ['Ignoring feelings', 'Understanding the customer', 'Ending the chat'], answer: 1 },
    ],
    enrolled: 16,
    status: 'Live',
  },
]

const defaultCandidates: Candidate[] = [
  { name: 'Maria Santos', course: 'Warehouse Operations', score: 94, status: 'Certified - Interview Unlocked', avatar: 'M', color: '#a7c7e7' },
  { name: 'Juan Reyes', course: 'Customer Service', score: 88, status: 'Certified - Interview Unlocked', avatar: 'J', color: '#c1e1c1' },
  { name: 'Ana Cruz', course: 'Warehouse Operations', score: 100, status: 'Hired', avatar: 'A', color: '#ffb7b2' },
  { name: 'Lito Bautista', course: 'Customer Service', score: 0, status: 'Enrolled', avatar: 'L', color: '#ffd5c8' },
  { name: 'Grace Lim', course: 'Warehouse Operations', score: 62, status: 'Enrolled', avatar: 'G', color: '#a7c7e7' },
]

const generationSteps = [
  'Parsing your document...',
  'AI is structuring modules...',
  'Generating interactive quizzes...',
  'Creating skill vectors...',
]

const moduleTemplates = [
  'Core Concepts & Terminology',
  'Safety & Compliance Standards',
  'Hands-On Practical Skills',
  'Tools & Systems Training',
  'Quality Assurance',
]

function titleFromText(text: string): string {
  const clean = text.trim().replace(/\s+/g, ' ')
  if (!clean) return 'New Custom Academy'
  const words = clean.split(' ').slice(0, 4).join(' ')
  return words.charAt(0).toUpperCase() + words.slice(1)
}

type SidebarTab = 'generator' | 'academies' | 'candidates' | 'analytics'

export default function CompanyDashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<SidebarTab>('generator')
  const [academies, setAcademies] = useState<Academy[]>(() => {
    if (typeof window === 'undefined') return defaultAcademies
    try {
      const stored = localStorage.getItem(LS_ACADEMIES_KEY)
      return stored ? JSON.parse(stored) : defaultAcademies
    } catch { return defaultAcademies }
  })
  const [candidates, setCandidates] = useState<Candidate[]>(() => {
    if (typeof window === 'undefined') return defaultCandidates
    try {
      const stored = localStorage.getItem(LS_CANDIDATES_KEY)
      return stored ? JSON.parse(stored) : defaultCandidates
    } catch { return defaultCandidates }
  })
  const [jobText, setJobText] = useState('')
  const [generating, setGenerating] = useState(false)
  const [stepIndex, setStepIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [selected, setSelected] = useState<Academy | null>(null)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  // Sync academies to localStorage
  useEffect(() => {
    try { localStorage.setItem(LS_ACADEMIES_KEY, JSON.stringify(academies)) } catch {}
  }, [academies])

  // Poll candidates from localStorage (worker may update)
  useEffect(() => {
    const poll = setInterval(() => {
      try {
        const stored = localStorage.getItem(LS_CANDIDATES_KEY)
        if (stored) setCandidates(JSON.parse(stored))
      } catch {}
    }, 1500)
    return () => clearInterval(poll)
  }, [])

  useEffect(() => {
    return () => timers.current.forEach(clearTimeout)
  }, [])

  const handleGenerate = () => {
    if (!jobText.trim() || generating) return
    setGenerating(true)
    setStepIndex(0)
    setProgress(0)

    generationSteps.forEach((_, i) => {
      const t = setTimeout(() => {
        setStepIndex(i)
        setProgress(((i + 1) / generationSteps.length) * 100)
      }, i * 750)
      timers.current.push(t)
    })

    const done = setTimeout(() => {
      const newAcademy: Academy = {
        id: Date.now(),
        title: `${titleFromText(jobText)} Academy`,
        modules: moduleTemplates.slice(0, 3),
        quiz: [
          { q: 'What is the primary goal of this role?', options: ['Deliver quality work', 'Avoid tasks', 'Ignore standards'], answer: 0 },
          { q: 'Following safety standards helps to:', options: ['Increase risk', 'Protect workers', 'Slow production'], answer: 1 },
          { q: 'Continuous learning on the job leads to:', options: ['Career growth', 'Fewer skills', 'Job loss'], answer: 0 },
        ],
        enrolled: 0,
        status: 'Live',
        isNew: true,
      }
      setAcademies((prev) => [newAcademy, ...prev])
      setGenerating(false)
      setJobText('')
      setProgress(0)
      setTab('academies')
    }, generationSteps.length * 750 + 400)
    timers.current.push(done)
  }

  const sidebarItems: { id: SidebarTab; label: string; icon: typeof Wand2 }[] = [
    { id: 'generator', label: 'AI Academy Generator', icon: Wand2 },
    { id: 'academies', label: 'Active Academies', icon: BookOpen },
    { id: 'candidates', label: 'Candidate Pipeline', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ]

  const statCards = [
    { label: 'Active Academies', value: String(academies.length), icon: BookOpen, color: '#a7c7e7', bg: '#e8f3fb' },
    { label: 'Candidates Screened', value: String(candidates.length), icon: Users, color: '#c1e1c1', bg: '#eaf6ea' },
    { label: 'Interview Unlocked', value: String(candidates.filter((c) => c.status.includes('Interview')).length), icon: BadgeCheck, color: '#ffb7b2', bg: '#fff0ef' },
    { label: 'Hired', value: String(candidates.filter((c) => c.status === 'Hired').length), icon: TrendingUp, color: '#ffd5c8', bg: '#fff5f0' },
  ]

  return (
    <div className="min-h-screen" style={{ background: '#faf8f5' }}>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 bg-[#2c3e5a] p-6 gap-2 flex-shrink-0">
          {/* SkillBridge logo */}
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
              <span className="text-[9px] text-[#a7c7e7]/70 font-semibold uppercase tracking-widest">Company Portal</span>
            </div>
          </div>

          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all text-left ${
                tab === item.id
                  ? 'bg-[#ffb7b2]/20 text-[#ffb7b2]'
                  : 'text-[#faf8f5]/60 hover:bg-white/5 hover:text-[#faf8f5]'
              }`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </button>
          ))}

          <div className="mt-auto">
            <div className="bg-[#ffb7b2]/10 rounded-2xl p-4 mb-4">
              <div className="text-xs text-[#ffb7b2] font-semibold mb-1">Hire Rate</div>
              <div className="text-2xl font-bold text-[#faf8f5] mb-1">
                {candidates.length > 0
                  ? Math.round((candidates.filter((c) => c.status === 'Hired').length / candidates.length) * 100)
                  : 0}%
              </div>
              <div className="w-full bg-[#faf8f5]/10 rounded-full h-1.5">
                <div
                  className="bg-[#ffb7b2] h-1.5 rounded-full transition-all"
                  style={{ width: `${candidates.length > 0 ? Math.round((candidates.filter((c) => c.status === 'Hired').length / candidates.length) * 100) : 0}%` }}
                />
              </div>
              <div className="text-[10px] text-[#faf8f5]/50 mt-1">this month</div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 text-sm text-[#faf8f5]/50 hover:text-[#ffb7b2] transition-colors px-4 py-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 md:p-10 overflow-auto">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-sm text-[#7a6e65] font-medium">Company Dashboard</p>
              <h1 className="text-2xl font-bold text-[#2c3e5a] flex items-center gap-2">
                <Building2 className="w-6 h-6 text-[#ffb7b2]" />
                LogiCorp Solutions
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative w-10 h-10 rounded-2xl bg-white border border-[#e8e2da] flex items-center justify-center text-[#6b5b4e] hover:bg-[#f5f0e8] transition-colors shadow-sm">
                <Bell className="w-4 h-4" />
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#ffb7b2]" />
              </button>
              <div className="w-10 h-10 rounded-2xl bg-[#ffb7b2] flex items-center justify-center">
                <span className="text-sm font-bold text-[#2c3e5a]">L</span>
              </div>
            </div>
          </div>

          {/* Stat cards */}
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

          {/* ── TAB: AI Generator ── */}
          {tab === 'generator' && (
            <div className="bg-white rounded-3xl border border-[#e8e2da] shadow-sm p-6 md:p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-2xl bg-[#a7c7e7]/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#4a7ab5]" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#2c3e5a]">AI Academy Generator</h2>
                  <p className="text-sm text-[#7a6e65]">Paste a job description or manual — AI builds the course.</p>
                </div>
              </div>
              <textarea
                value={jobText}
                onChange={(e) => setJobText(e.target.value)}
                disabled={generating}
                rows={5}
                placeholder="e.g. We need a warehouse worker who knows SAP, forklift safety, and basic inventory control..."
                className="w-full rounded-2xl bg-[#faf8f5] border border-[#e8e2da] p-4 text-sm text-[#2c3e5a] placeholder:text-[#b8b0a8] focus:outline-none focus:border-[#a7c7e7] focus:ring-2 focus:ring-[#a7c7e7]/20 transition-all resize-none disabled:opacity-60"
              />
              {generating ? (
                <div className="mt-5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#4a7ab5] mb-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {generationSteps[stepIndex]}
                  </div>
                  <div className="w-full bg-[#f5f0e8] rounded-full h-2.5 overflow-hidden">
                    <div className="h-2.5 rounded-full bg-[#a7c7e7] transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between mt-5 gap-4 flex-wrap">
                  <div className="flex items-center gap-2 text-xs text-[#7a6e65]">
                    <FileText className="w-3.5 h-3.5 text-[#a7c7e7]" />
                    Supports SOPs, manuals, and job descriptions
                  </div>
                  <button
                    onClick={handleGenerate}
                    disabled={!jobText.trim()}
                    className="inline-flex items-center gap-2 bg-[#a7c7e7] text-[#2c3e5a] px-6 py-3 rounded-2xl text-sm font-bold hover:bg-[#89b8e0] transition-all hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Wand2 className="w-4 h-4" />
                    Generate Academy with AI
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ── TAB: Active Academies ── */}
          {tab === 'academies' && (
            <div>
              <h2 className="text-lg font-bold text-[#2c3e5a] mb-5">Active Academies</h2>
              <div className="space-y-3">
                {academies.map((academy) => (
                  <button
                    key={academy.id}
                    onClick={() => setSelected(academy)}
                    className={`w-full text-left bg-white rounded-3xl p-5 border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all ${
                      academy.isNew ? 'border-[#a7c7e7] ring-2 ring-[#a7c7e7]/20' : 'border-[#e8e2da]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-[#2c3e5a] text-sm">{academy.title}</h3>
                        {academy.isNew && (
                          <span className="text-[9px] font-bold uppercase tracking-wide rounded-full px-2 py-0.5 bg-[#a7c7e7] text-[#2c3e5a]">New</span>
                        )}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wide rounded-full px-2.5 py-1 bg-[#eaf6ea] text-[#3a6b3a]">
                        {academy.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-5 text-xs text-[#7a6e65]">
                      <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 text-[#a7c7e7]" />{academy.modules.length} modules</span>
                      <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#c1e1c1]" />{academy.quiz.length} questions</span>
                      <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-[#ffb7b2]" />{academy.enrolled} enrolled</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── TAB: Candidate Pipeline ── */}
          {tab === 'candidates' && (
            <div>
              <h2 className="text-lg font-bold text-[#2c3e5a] mb-5">Candidate Pipeline</h2>
              <div className="bg-white rounded-3xl border border-[#e8e2da] shadow-sm overflow-hidden">
                {candidates.map((c, i) => (
                  <div key={i} className={`flex items-center gap-3 p-4 ${i !== candidates.length - 1 ? 'border-b border-[#f0ebe3]' : ''}`}>
                    <div className="w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-xs text-[#2c3e5a] flex-shrink-0" style={{ background: c.color }}>
                      {c.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-[#2c3e5a] text-sm truncate">{c.name}</div>
                      <div className="text-[11px] text-[#7a6e65] truncate">{c.course}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-bold text-[#2c3e5a] text-sm flex items-center gap-1 justify-end">
                        {c.score > 0 && <Star className="w-3 h-3 fill-[#ffb7b2] text-[#ffb7b2]" />}
                        {c.score > 0 ? `${c.score}%` : '—'}
                      </div>
                      <span
                        className="text-[9px] font-bold uppercase tracking-wide rounded-full px-2 py-0.5 inline-block mt-0.5"
                        style={{
                          background: c.status === 'Hired' ? '#eaf6ea' : c.status.includes('Interview') ? '#fff0ef' : '#f5f0e8',
                          color: c.status === 'Hired' ? '#3a6b3a' : c.status.includes('Interview') ? '#c0574f' : '#6b5b4e',
                        }}
                      >
                        {c.status === 'Certified - Interview Unlocked' ? 'Interview' : c.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── TAB: Analytics ── */}
          {tab === 'analytics' && (
            <div>
              <h2 className="text-lg font-bold text-[#2c3e5a] mb-5">Analytics Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Funnel */}
                <div className="bg-white rounded-3xl border border-[#e8e2da] shadow-sm p-6">
                  <h3 className="font-bold text-[#2c3e5a] mb-4 text-sm">Hiring Funnel</h3>
                  {[
                    { label: 'Enrolled', value: candidates.length, max: candidates.length, color: '#a7c7e7' },
                    { label: 'Completed Exam', value: candidates.filter((c) => c.score > 0).length, max: candidates.length, color: '#c1e1c1' },
                    { label: 'Interview Unlocked', value: candidates.filter((c) => c.status.includes('Interview') || c.status === 'Hired').length, max: candidates.length, color: '#ffb7b2' },
                    { label: 'Hired', value: candidates.filter((c) => c.status === 'Hired').length, max: candidates.length, color: '#3a6b3a' },
                  ].map((row, i) => (
                    <div key={i} className="mb-3">
                      <div className="flex justify-between text-xs text-[#7a6e65] mb-1">
                        <span className="font-medium">{row.label}</span>
                        <span className="font-bold text-[#2c3e5a]">{row.value}</span>
                      </div>
                      <div className="w-full bg-[#f5f0e8] rounded-full h-2.5">
                        <div
                          className="h-2.5 rounded-full transition-all duration-700"
                          style={{ width: row.max > 0 ? `${(row.value / row.max) * 100}%` : '0%', background: row.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* KPIs */}
                <div className="bg-white rounded-3xl border border-[#e8e2da] shadow-sm p-6">
                  <h3 className="font-bold text-[#2c3e5a] mb-4 text-sm">Key Performance Indicators</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Avg. Exam Score', value: candidates.filter((c) => c.score > 0).length > 0 ? `${Math.round(candidates.filter((c) => c.score > 0).reduce((a, c) => a + c.score, 0) / candidates.filter((c) => c.score > 0).length)}%` : 'N/A', color: '#a7c7e7', bg: '#e8f3fb' },
                      { label: 'Pass Rate (≥70%)', value: candidates.filter((c) => c.score > 0).length > 0 ? `${Math.round((candidates.filter((c) => c.score >= 70).length / candidates.filter((c) => c.score > 0).length) * 100)}%` : 'N/A', color: '#c1e1c1', bg: '#eaf6ea' },
                      { label: 'Academies Live', value: String(academies.filter((a) => a.status === 'Live').length), color: '#ffb7b2', bg: '#fff0ef' },
                      { label: 'Conversion Rate', value: candidates.length > 0 ? `${Math.round((candidates.filter((c) => c.status === 'Hired').length / candidates.length) * 100)}%` : '0%', color: '#ffd5c8', bg: '#fff5f0' },
                    ].map((kpi, i) => (
                      <div key={i} className="rounded-2xl p-4" style={{ background: kpi.bg }}>
                        <div className="text-xl font-bold mb-0.5" style={{ color: kpi.color }}>{kpi.value}</div>
                        <div className="text-xs text-[#7a6e65] font-medium">{kpi.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enrollment over time (mock bar chart) */}
                <div className="bg-white rounded-3xl border border-[#e8e2da] shadow-sm p-6 md:col-span-2">
                  <h3 className="font-bold text-[#2c3e5a] mb-4 text-sm">Monthly Enrollment (Mock Data)</h3>
                  <div className="flex items-end gap-2 h-28">
                    {[4, 7, 5, 11, 9, 15, 13, 18, 14, 22, 19, 24].map((v, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className="w-full rounded-t-lg transition-all"
                          style={{ height: `${(v / 24) * 100}%`, background: i === 11 ? '#a7c7e7' : '#e8f3fb' }}
                        />
                        <span className="text-[9px] text-[#b8b0a8]">{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Academy Detail Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-[#2c3e5a]/40 backdrop-blur-sm fade-in"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-[#faf8f5] rounded-3xl w-full max-w-lg max-h-[85vh] overflow-auto shadow-2xl fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-[#faf8f5] flex items-start justify-between p-6 border-b border-[#e8e2da]">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#4a7ab5]">AI-Generated Course</span>
                <h3 className="text-xl font-bold text-[#2c3e5a] mt-1">{selected.title}</h3>
              </div>
              <button onClick={() => setSelected(null)} className="w-9 h-9 rounded-2xl bg-white border border-[#e8e2da] flex items-center justify-center text-[#6b5b4e] hover:bg-[#f5f0e8] transition-colors flex-shrink-0" aria-label="Close">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6">
              <h4 className="text-sm font-bold text-[#2c3e5a] mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#a7c7e7]" /> Course Structure
              </h4>
              <div className="space-y-2 mb-6">
                {selected.modules.map((m, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white rounded-2xl p-3 border border-[#e8e2da]">
                    <div className="w-7 h-7 rounded-xl bg-[#a7c7e7]/20 flex items-center justify-center text-xs font-bold text-[#4a7ab5] flex-shrink-0">{i + 1}</div>
                    <span className="text-sm font-medium text-[#2c3e5a]">Module {i + 1}: {m}</span>
                  </div>
                ))}
              </div>
              <h4 className="text-sm font-bold text-[#2c3e5a] mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#c1e1c1]" /> Sample Quiz Questions
              </h4>
              <div className="space-y-3">
                {selected.quiz.map((question, i) => (
                  <div key={i} className="bg-white rounded-2xl p-4 border border-[#e8e2da]">
                    <p className="text-sm font-semibold text-[#2c3e5a] mb-2.5">{i + 1}. {question.q}</p>
                    <div className="space-y-1.5">
                      {question.options.map((opt, j) => (
                        <div key={j} className={`text-xs rounded-xl px-3 py-2 border ${j === question.answer ? 'bg-[#eaf6ea] border-[#c1e1c1] text-[#3a6b3a] font-semibold' : 'bg-[#faf8f5] border-[#e8e2da] text-[#7a6e65]'}`}>
                          {opt}{j === question.answer && ' ✓'}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
