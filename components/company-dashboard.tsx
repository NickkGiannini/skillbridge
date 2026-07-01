'use client'

import {
  Upload,
  Users,
  BadgeCheck,
  BookOpen,
  ChevronRight,
  LogOut,
  Bell,
  GraduationCap,
  Building2,
  Plus,
  TrendingUp,
  Clock,
  CheckCircle2,
  Star,
} from 'lucide-react'

interface CompanyDashboardProps {
  onLogout: () => void
}

const candidates = [
  { name: 'Maria Santos', course: 'Business Ops', score: 94, status: 'Ready to Hire', avatar: 'M', color: '#a7c7e7' },
  { name: 'Juan Reyes', course: 'Customer Service', score: 88, status: 'Ready to Hire', avatar: 'J', color: '#c1e1c1' },
  { name: 'Ana Cruz', course: 'Financial Records', score: 76, status: 'Still Learning', avatar: 'A', color: '#ffb7b2' },
  { name: 'Lito Bautista', course: 'Business Ops', score: 61, status: 'In Progress', avatar: 'L', color: '#ffd5c8' },
]

const statCards = [
  { label: 'Active Courses', value: '3', icon: BookOpen, color: '#a7c7e7', bg: '#e8f3fb' },
  { label: 'Enrolled Workers', value: '48', icon: Users, color: '#c1e1c1', bg: '#eaf6ea' },
  { label: 'Ready to Hire', value: '12', icon: BadgeCheck, color: '#ffb7b2', bg: '#fff0ef' },
  { label: 'Hired This Month', value: '5', icon: TrendingUp, color: '#ffd5c8', bg: '#fff5f0' },
]

const courses = [
  { title: 'Business Process Documentation', enrolled: 24, completed: 12, status: 'Live' },
  { title: 'Customer Service Excellence', enrolled: 16, completed: 10, status: 'Live' },
  { title: 'Financial Records Management', enrolled: 8, completed: 2, status: 'Draft' },
]

export default function CompanyDashboard({ onLogout }: CompanyDashboardProps) {
  return (
    <div className="min-h-screen" style={{ background: '#faf8f5' }}>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 bg-[#2c3e5a] p-6 gap-2 flex-shrink-0">
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-2xl bg-[#ffb7b2] flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-[#2c3e5a]" />
            </div>
            <span className="text-base font-bold text-[#faf8f5]">ICSB Academy</span>
          </div>

          {[
            { label: 'Academy Courses', icon: BookOpen, active: true },
            { label: 'Talent Pool', icon: Users, active: false },
            { label: 'Upload Manuals', icon: Upload, active: false },
            { label: 'Analytics', icon: TrendingUp, active: false },
          ].map((item) => (
            <button
              key={item.label}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                item.active
                  ? 'bg-[#ffb7b2]/20 text-[#ffb7b2]'
                  : 'text-[#faf8f5]/60 hover:bg-white/5 hover:text-[#faf8f5]'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}

          {/* Upload CTA */}
          <div className="mt-4">
            <button className="w-full flex items-center justify-center gap-2 bg-[#ffb7b2] text-[#2c3e5a] px-4 py-3 rounded-2xl text-sm font-bold hover:bg-[#ffa09a] transition-colors">
              <Plus className="w-4 h-4" />
              Upload Manual
            </button>
          </div>

          <div className="mt-auto">
            <div className="bg-[#ffb7b2]/10 rounded-2xl p-4 mb-4">
              <div className="text-xs text-[#ffb7b2] font-semibold mb-1">Hire Rate</div>
              <div className="text-2xl font-bold text-[#faf8f5] mb-1">25%</div>
              <div className="w-full bg-[#faf8f5]/10 rounded-full h-1.5">
                <div className="bg-[#ffb7b2] h-1.5 rounded-full" style={{ width: '25%' }} />
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
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-sm text-[#7a6e65] font-medium">Company Dashboard</p>
              <h1 className="text-2xl font-bold text-[#2c3e5a] flex items-center gap-2">
                <Building2 className="w-6 h-6 text-[#ffb7b2]" />
                Bright Solutions Inc.
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative w-10 h-10 rounded-2xl bg-white border border-[#e8e2da] flex items-center justify-center text-[#6b5b4e] hover:bg-[#f5f0e8] transition-colors shadow-sm">
                <Bell className="w-4 h-4" />
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#ffb7b2]" />
              </button>
              <div className="w-10 h-10 rounded-2xl bg-[#ffb7b2] flex items-center justify-center">
                <span className="text-sm font-bold text-[#2c3e5a]">B</span>
              </div>
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {statCards.map((stat, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-5 border border-[#e8e2da] shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center mb-3"
                  style={{ background: stat.bg }}
                >
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <div className="text-2xl font-bold text-[#2c3e5a] mb-0.5">{stat.value}</div>
                <div className="text-xs text-[#7a6e65] font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Two column layout */}
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 mb-10">
            {/* Courses col */}
            <div className="xl:col-span-3">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-[#2c3e5a]">Your Academy Courses</h2>
                <button className="flex items-center gap-1.5 text-xs font-bold bg-[#ffb7b2] text-[#2c3e5a] px-3 py-1.5 rounded-xl hover:bg-[#ffa09a] transition-colors">
                  <Plus className="w-3.5 h-3.5" /> New Course
                </button>
              </div>
              <div className="space-y-3">
                {courses.map((course, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-3xl p-5 border border-[#e8e2da] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-[#2c3e5a] text-sm">{course.title}</h3>
                      <span
                        className="text-[10px] font-bold uppercase tracking-wide rounded-full px-2.5 py-1"
                        style={{
                          background: course.status === 'Live' ? '#eaf6ea' : '#f5f0e8',
                          color: course.status === 'Live' ? '#3a6b3a' : '#6b5b4e',
                        }}
                      >
                        {course.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-6 text-xs text-[#7a6e65]">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#a7c7e7]" />
                        <span>{course.enrolled} enrolled</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#c1e1c1]" />
                        <span>{course.completed} completed</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#ffb7b2]" />
                        <span>{course.enrolled - course.completed} learning</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-[#f5f0e8] rounded-full h-1.5">
                        <div
                          className="h-1.5 rounded-full bg-[#a7c7e7]"
                          style={{
                            width: `${(course.completed / course.enrolled) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Talent Pool col */}
            <div className="xl:col-span-2">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-[#2c3e5a]">Talent Pool</h2>
                <button className="text-xs font-semibold text-[#ffb7b2] hover:underline flex items-center gap-1">
                  View all <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="space-y-3">
                {candidates.map((c, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-3xl p-4 border border-[#e8e2da] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm text-[#2c3e5a] flex-shrink-0"
                        style={{ background: c.color }}
                      >
                        {c.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-[#2c3e5a] text-sm">{c.name}</div>
                        <div className="text-xs text-[#7a6e65]">{c.course}</div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-bold text-[#2c3e5a] text-sm flex items-center gap-1">
                          <Star className="w-3 h-3 fill-[#ffb7b2] text-[#ffb7b2]" />
                          {c.score}%
                        </div>
                        <span
                          className="text-[10px] font-semibold"
                          style={{
                            color:
                              c.status === 'Ready to Hire'
                                ? '#3a6b3a'
                                : c.status === 'Still Learning'
                                ? '#a77b00'
                                : '#6b5b4e',
                          }}
                        >
                          {c.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upload CTA Banner */}
          <div
            className="rounded-3xl p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
            style={{ background: '#fff0ef' }}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#ffb7b2] flex items-center justify-center flex-shrink-0">
                <Upload className="w-6 h-6 text-[#2c3e5a]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#2c3e5a] mb-0.5">
                  Upload a New Training Manual
                </h3>
                <p className="text-sm text-[#7a6e65]">
                  Our AI will generate a custom course in under 2 minutes.
                </p>
              </div>
            </div>
            <button className="bg-[#ffb7b2] text-[#2c3e5a] px-6 py-3 rounded-2xl text-sm font-bold hover:bg-[#ffa09a] transition-colors shadow-md flex-shrink-0 hover:-translate-y-0.5 hover:shadow-lg duration-200">
              Upload Manual
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}
