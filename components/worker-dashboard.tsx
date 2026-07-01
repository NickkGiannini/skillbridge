'use client'

import { useState, useMemo } from 'react'
import {
  BookOpen,
  BadgeCheck,
  TrendingUp,
  LogOut,
  Bell,
  GraduationCap,
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
} from 'lucide-react'

interface WorkerDashboardProps {
  onLogout: () => void
}

interface QuizQuestion {
  q: string
  options: string[]
  answer: number
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

const ACADEMIES: Academy[] = [
  {
    id: 1,
    title: 'Warehouse Operations & SAP',
    company: 'LogiCorp Solutions',
    skills: ['inventory', 'sap', 'forklift', 'logistics', 'safety'],
    color: '#a7c7e7',
    modules: [
      {
        title: 'Forklift Safety Fundamentals',
        content:
          'Before operating any forklift, perform a full pre-operation inspection: check tires, forks, hydraulics, and always fasten your seatbelt. Never exceed the rated load capacity and keep a clear line of sight while driving.',
      },
      {
        title: 'Inventory Control in SAP',
        content:
          'SAP Materials Management (SAP MM) tracks stock levels in real time. Learn to post goods receipts, run cycle counts, and reconcile physical stock against system records to keep inventory accurate.',
      },
      {
        title: 'Warehouse Workflow Standards',
        content:
          'Efficient warehouses follow standardized picking, packing, and shipping routes. Understanding zone-based workflows minimizes travel time and reduces fulfillment errors.',
      },
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
      {
        title: 'Active Listening',
        content:
          'Great service starts with listening. Let customers finish, reflect their concern back to them, and confirm understanding before offering a solution.',
      },
      {
        title: 'Handling Complaints',
        content:
          'Stay calm and empathize. Acknowledge the issue, apologize sincerely, and focus on a resolution rather than assigning blame.',
      },
      {
        title: 'CRM Basics',
        content:
          'A CRM system stores every customer interaction. Logging notes accurately helps the whole team deliver consistent, personalized support.',
      },
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
      {
        title: 'Bookkeeping Foundations',
        content:
          'Every transaction affects at least two accounts. Master debits and credits to keep the accounting equation balanced.',
      },
      {
        title: 'Spreadsheets for Finance',
        content:
          'Use formulas like SUM, VLOOKUP, and pivot tables to organize and analyze financial data quickly and accurately.',
      },
      {
        title: 'Monthly Reporting',
        content:
          'Reconcile accounts and prepare income statements each month to give management a clear picture of financial health.',
      },
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

export default function WorkerDashboard({ onLogout }: WorkerDashboardProps) {
  const [skills, setSkills] = useState<string[]>(['inventory', 'safety', 'communication'])
  const [skillInput, setSkillInput] = useState('')
  const [certified, setCertified] = useState<number[]>([])

  // Learning flow state
  const [activeAcademy, setActiveAcademy] = useState<Academy | null>(null)
  const [phase, setPhase] = useState<ExamPhase>('reading')
  const [moduleIndex, setModuleIndex] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>([])

  const addSkill = (raw: string) => {
    const skill = raw.trim().toLowerCase()
    if (skill && !skills.includes(skill)) {
      setSkills((prev) => [...prev, skill])
    }
    setSkillInput('')
  }

  const removeSkill = (skill: string) => setSkills((prev) => prev.filter((s) => s !== skill))

  const rankedAcademies = useMemo(() => {
    return ACADEMIES.map((a) => {
      const matched = a.skills.filter((s) => skills.includes(s)).length
      const base = a.skills.length
      const raw = base === 0 ? 0 : (matched / base) * 100
      // Give a friendly floor so nothing looks impossible, cap at 98
      const match = Math.min(98, Math.round(35 + raw * 0.63))
      return { ...a, match }
    }).sort((x, y) => y.match - x.match)
  }, [skills])

  const startLearning = (academy: Academy) => {
    setActiveAcademy(academy)
    setPhase('reading')
    setModuleIndex(0)
    setAnswers(new Array(academy.quiz.length).fill(null))
  }

  const closeLearning = () => setActiveAcademy(null)

  const score = useMemo(() => {
    if (!activeAcademy) return 0
    const correct = activeAcademy.quiz.reduce(
      (acc, question, i) => acc + (answers[i] === question.answer ? 1 : 0),
      0,
    )
    return Math.round((correct / activeAcademy.quiz.length) * 100)
  }, [activeAcademy, answers])

  const passed = score >= 70

  const submitExam = () => {
    setPhase('result')
    if (activeAcademy && score >= 70 && !certified.includes(activeAcademy.id)) {
      setCertified((prev) => [...prev, activeAcademy.id])
    }
  }

  const statCards = [
    { label: 'Skills Added', value: String(skills.length), icon: Target, color: '#a7c7e7', bg: '#e8f3fb' },
    { label: 'Certificates', value: String(certified.length), icon: BadgeCheck, color: '#c1e1c1', bg: '#eaf6ea' },
    { label: 'Matches Found', value: String(rankedAcademies.filter((a) => a.match >= 60).length), icon: Sparkles, color: '#ffb7b2', bg: '#fff0ef' },
    { label: 'Interviews', value: String(certified.length), icon: TrendingUp, color: '#ffd5c8', bg: '#fff5f0' },
  ]

  return (
    <div className="min-h-screen" style={{ background: '#faf8f5' }}>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 bg-[#2c3e5a] p-6 gap-2 flex-shrink-0">
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-2xl bg-[#a7c7e7] flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-[#2c3e5a]" />
            </div>
            <span className="text-base font-bold text-[#faf8f5]">ICSB Academy</span>
          </div>

          {[
            { label: 'Recommended', icon: Sparkles, active: true },
            { label: 'My Skills', icon: Target, active: false },
            { label: 'Certificates', icon: BadgeCheck, active: false },
            { label: 'Interviews', icon: TrendingUp, active: false },
          ].map((item) => (
            <button
              key={item.label}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                item.active
                  ? 'bg-[#a7c7e7]/20 text-[#a7c7e7]'
                  : 'text-[#faf8f5]/60 hover:bg-white/5 hover:text-[#faf8f5]'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}

          <div className="mt-auto">
            <div className="bg-[#a7c7e7]/10 rounded-2xl p-4 mb-4">
              <div className="text-xs text-[#a7c7e7] font-semibold mb-1">Learning is free</div>
              <p className="text-[11px] text-[#faf8f5]/60 leading-relaxed">
                Study every module at no cost. Pay only to unlock your certified exam.
              </p>
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

          {/* Stats grid */}
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

          {/* My Skills */}
          <div className="bg-white rounded-3xl border border-[#e8e2da] shadow-sm p-6 md:p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
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
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 bg-[#e8f3fb] text-[#2c3e5a] rounded-full pl-3 pr-2 py-1.5 text-xs font-semibold capitalize"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="w-4 h-4 rounded-full bg-[#a7c7e7]/40 hover:bg-[#a7c7e7] flex items-center justify-center transition-colors"
                    aria-label={`Remove ${skill}`}
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </span>
              ))}
              {skills.length === 0 && (
                <span className="text-xs text-[#b8b0a8] py-1.5">No skills yet — add a few to see matches.</span>
              )}
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
              <button
                onClick={() => addSkill(skillInput)}
                disabled={!skillInput.trim()}
                className="inline-flex items-center gap-1.5 bg-[#a7c7e7] text-[#2c3e5a] px-4 py-2.5 rounded-2xl text-sm font-bold hover:bg-[#89b8e0] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-[#7a6e65] font-medium">Suggestions:</span>
              {SUGGESTED_SKILLS.filter((s) => !skills.includes(s)).map((s) => (
                <button
                  key={s}
                  onClick={() => addSkill(s)}
                  className="text-[11px] capitalize rounded-full border border-[#e8e2da] bg-[#faf8f5] text-[#6b5b4e] px-2.5 py-1 hover:border-[#a7c7e7] hover:text-[#2c3e5a] transition-colors"
                >
                  + {s}
                </button>
              ))}
            </div>
          </div>

          {/* Recommended Academies */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Sparkles className="w-5 h-5 text-[#ffb7b2]" />
              <h2 className="text-lg font-bold text-[#2c3e5a]">Recommended Academies</h2>
              <span className="text-xs text-[#7a6e65]">matched to your skills</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {rankedAcademies.map((academy) => {
                const isCertified = certified.includes(academy.id)
                return (
                  <div
                    key={academy.id}
                    className="bg-white rounded-3xl p-6 border border-[#e8e2da] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: academy.color + '30' }}>
                        <BookOpen className="w-5 h-5" style={{ color: academy.color }} />
                      </div>
                      <div
                        className="text-xs font-bold rounded-full px-2.5 py-1"
                        style={{
                          background: academy.match >= 70 ? '#eaf6ea' : '#f5f0e8',
                          color: academy.match >= 70 ? '#3a6b3a' : '#6b5b4e',
                        }}
                      >
                        {academy.match}% Match
                      </div>
                    </div>

                    <h3 className="font-bold text-[#2c3e5a] text-sm mb-1">{academy.title}</h3>
                    <p className="text-xs text-[#7a6e65] flex items-center gap-1 mb-4">
                      <Building2 className="w-3 h-3" /> {academy.company}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {academy.skills.slice(0, 3).map((s) => (
                        <span
                          key={s}
                          className={`text-[10px] capitalize rounded-full px-2 py-0.5 ${
                            skills.includes(s) ? 'bg-[#e8f3fb] text-[#4a7ab5] font-semibold' : 'bg-[#f5f0e8] text-[#9a8e83]'
                          }`}
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => startLearning(academy)}
                      className="mt-auto w-full inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-bold transition-all"
                      style={
                        isCertified
                          ? { background: '#eaf6ea', color: '#3a6b3a' }
                          : { background: academy.color, color: '#2c3e5a' }
                      }
                    >
                      {isCertified ? (
                        <>
                          <BadgeCheck className="w-4 h-4" /> Certified
                        </>
                      ) : (
                        <>
                          Start Learning <ChevronRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </main>
      </div>

      {/* Module Reader + Exam Modal */}
      {activeAcademy && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-[#2c3e5a]/40 backdrop-blur-sm fade-in">
          <div className="bg-[#faf8f5] rounded-3xl w-full max-w-lg max-h-[88vh] overflow-auto shadow-2xl fade-in-up">
            {/* Header */}
            <div className="sticky top-0 bg-[#faf8f5] flex items-center justify-between p-6 border-b border-[#e8e2da]">
              <div className="min-w-0">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#4a7ab5]">
                  {phase === 'reading' ? 'Module Reader' : phase === 'exam' ? 'Certification Exam' : 'Result'}
                </span>
                <h3 className="text-lg font-bold text-[#2c3e5a] truncate">{activeAcademy.title}</h3>
              </div>
              <button
                onClick={closeLearning}
                className="w-9 h-9 rounded-2xl bg-white border border-[#e8e2da] flex items-center justify-center text-[#6b5b4e] hover:bg-[#f5f0e8] transition-colors flex-shrink-0"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6">
              {/* READING PHASE */}
              {phase === 'reading' && (
                <>
                  <div className="flex items-center gap-1.5 mb-5">
                    {activeAcademy.modules.map((_, i) => (
                      <div
                        key={i}
                        className="h-1.5 flex-1 rounded-full transition-colors"
                        style={{ background: i <= moduleIndex ? '#a7c7e7' : '#e8e2da' }}
                      />
                    ))}
                  </div>

                  <div className="w-11 h-11 rounded-2xl bg-[#a7c7e7]/20 flex items-center justify-center mb-4">
                    <span className="font-bold text-[#4a7ab5]">{moduleIndex + 1}</span>
                  </div>
                  <h4 className="text-lg font-bold text-[#2c3e5a] mb-3">
                    {activeAcademy.modules[moduleIndex].title}
                  </h4>
                  <p className="text-sm text-[#6b5b4e] leading-relaxed mb-6">
                    {activeAcademy.modules[moduleIndex].content}
                  </p>

                  <div className="flex items-center justify-between gap-3">
                    <button
                      onClick={() => setModuleIndex((i) => Math.max(0, i - 1))}
                      disabled={moduleIndex === 0}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6b5b4e] px-4 py-2.5 rounded-2xl hover:bg-[#f0ebe3] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                    {moduleIndex < activeAcademy.modules.length - 1 ? (
                      <button
                        onClick={() => setModuleIndex((i) => i + 1)}
                        className="inline-flex items-center gap-1.5 bg-[#a7c7e7] text-[#2c3e5a] px-5 py-2.5 rounded-2xl text-sm font-bold hover:bg-[#89b8e0] transition-colors"
                      >
                        Next Module <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => setPhase('exam')}
                        className="inline-flex items-center gap-1.5 bg-[#ffb7b2] text-[#2c3e5a] px-5 py-2.5 rounded-2xl text-sm font-bold hover:bg-[#ffa09a] transition-colors"
                      >
                        Take the Exam <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </>
              )}

              {/* EXAM PHASE */}
              {phase === 'exam' && (
                <>
                  <p className="text-sm text-[#7a6e65] mb-5">
                    Answer all {activeAcademy.quiz.length} questions. Score 70% or higher to earn your certificate.
                  </p>
                  <div className="space-y-4 mb-6">
                    {activeAcademy.quiz.map((question, qi) => (
                      <div key={qi} className="bg-white rounded-2xl p-4 border border-[#e8e2da]">
                        <p className="text-sm font-semibold text-[#2c3e5a] mb-3">{qi + 1}. {question.q}</p>
                        <div className="space-y-2">
                          {question.options.map((opt, oi) => {
                            const active = answers[qi] === oi
                            return (
                              <button
                                key={oi}
                                onClick={() =>
                                  setAnswers((prev) => {
                                    const next = [...prev]
                                    next[qi] = oi
                                    return next
                                  })
                                }
                                className={`w-full text-left text-xs rounded-xl px-3 py-2.5 border transition-all ${
                                  active
                                    ? 'bg-[#e8f3fb] border-[#a7c7e7] text-[#2c3e5a] font-semibold'
                                    : 'bg-[#faf8f5] border-[#e8e2da] text-[#6b5b4e] hover:border-[#a7c7e7]/50'
                                }`}
                              >
                                {opt}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={submitExam}
                    disabled={answers.some((a) => a === null)}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#ffb7b2] text-[#2c3e5a] px-5 py-3 rounded-2xl text-sm font-bold hover:bg-[#ffa09a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Submit Exam
                  </button>
                </>
              )}

              {/* RESULT PHASE */}
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

                      {/* Competence Badge */}
                      <div className="bg-white rounded-3xl border-2 border-[#c1e1c1] p-6 text-left mb-5">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-11 h-11 rounded-2xl bg-[#c1e1c1] flex items-center justify-center flex-shrink-0">
                            <Award className="w-6 h-6 text-[#2c3e5a]" />
                          </div>
                          <div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-[#3a6b3a]">
                              Standardized Competence Badge
                            </div>
                            <div className="font-bold text-[#2c3e5a] text-sm">{activeAcademy.title}</div>
                          </div>
                        </div>
                        <p className="text-xs text-[#6b5b4e] leading-relaxed">
                          This verified badge is now a portable asset on your profile. It unlocks a priority interview
                          with <span className="font-semibold">{activeAcademy.company}</span> — and makes you instantly
                          hireable by other MSMEs with similar needs across the platform.
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={closeLearning}
                          className="flex-1 inline-flex items-center justify-center gap-2 bg-[#2c3e5a] text-[#faf8f5] px-5 py-3 rounded-2xl text-sm font-bold hover:bg-[#3d5270] transition-colors"
                        >
                          <CheckCircle2 className="w-4 h-4" /> Unlock Interview
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
                      <p className="text-sm text-[#7a6e65] mb-5">
                        You need 70% to certify. Review the modules and try again — learning is always free.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => {
                            setPhase('reading')
                            setModuleIndex(0)
                            setAnswers(new Array(activeAcademy.quiz.length).fill(null))
                          }}
                          className="flex-1 inline-flex items-center justify-center gap-2 bg-[#a7c7e7] text-[#2c3e5a] px-5 py-3 rounded-2xl text-sm font-bold hover:bg-[#89b8e0] transition-colors"
                        >
                          <RotateCcw className="w-4 h-4" /> Review &amp; Retry
                        </button>
                        <button
                          onClick={closeLearning}
                          className="flex-1 inline-flex items-center justify-center gap-2 bg-white border border-[#e8e2da] text-[#6b5b4e] px-5 py-3 rounded-2xl text-sm font-bold hover:bg-[#f5f0e8] transition-colors"
                        >
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
