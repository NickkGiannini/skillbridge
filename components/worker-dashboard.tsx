'use client'

import {
  BookOpen,
  BadgeCheck,
  TrendingUp,
  Clock,
  PlayCircle,
  Lock,
  Star,
  ChevronRight,
  LogOut,
  Bell,
  GraduationCap,
  Target,
  Flame,
} from 'lucide-react'

interface WorkerDashboardProps {
  onLogout: () => void
}

const courses = [
  {
    title: 'Business Process Documentation',
    company: 'Bright Solutions Inc.',
    progress: 75,
    modules: 8,
    completedModules: 6,
    status: 'in-progress',
    color: '#a7c7e7',
  },
  {
    title: 'Customer Service Excellence',
    company: 'Verdi Retail Co.',
    progress: 100,
    modules: 5,
    completedModules: 5,
    status: 'completed',
    color: '#c1e1c1',
  },
  {
    title: 'Financial Records Management',
    company: 'Cruz & Associates',
    progress: 0,
    modules: 6,
    completedModules: 0,
    status: 'locked',
    color: '#ffb7b2',
  },
]

const statCards = [
  { label: 'Courses Enrolled', value: '3', icon: BookOpen, color: '#a7c7e7', bg: '#e8f3fb' },
  { label: 'Certificates Earned', value: '1', icon: BadgeCheck, color: '#c1e1c1', bg: '#eaf6ea' },
  { label: 'Day Streak', value: '7', icon: Flame, color: '#ffb7b2', bg: '#fff0ef' },
  { label: 'Interview Unlocked', value: '1', icon: Target, color: '#ffd5c8', bg: '#fff5f0' },
]

export default function WorkerDashboard({ onLogout }: WorkerDashboardProps) {
  return (
    <div className="min-h-screen" style={{ background: '#faf8f5' }}>
      {/* Sidebar + Main layout */}
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
            { label: 'My Courses', icon: BookOpen, active: true },
            { label: 'Certificates', icon: BadgeCheck, active: false },
            { label: 'Progress', icon: TrendingUp, active: false },
            { label: 'Interviews', icon: Target, active: false },
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
              <div className="text-xs text-[#a7c7e7] font-semibold mb-1">Your Progress</div>
              <div className="text-2xl font-bold text-[#faf8f5] mb-1">67%</div>
              <div className="w-full bg-[#faf8f5]/10 rounded-full h-1.5">
                <div className="bg-[#a7c7e7] h-1.5 rounded-full" style={{ width: '67%' }} />
              </div>
              <div className="text-[10px] text-[#faf8f5]/50 mt-1">to your first hire</div>
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

          {/* Courses section */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-[#2c3e5a]">My Learning Paths</h2>
              <button className="text-xs font-semibold text-[#a7c7e7] hover:underline flex items-center gap-1">
                Browse more <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {courses.map((course, i) => (
                <div
                  key={i}
                  className={`bg-white rounded-3xl p-6 border border-[#e8e2da] shadow-sm transition-all duration-200 ${
                    course.status !== 'locked' ? 'hover:shadow-md hover:-translate-y-0.5 cursor-pointer' : 'opacity-70'
                  }`}
                >
                  {/* Card top */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center"
                      style={{ background: course.color + '30' }}
                    >
                      {course.status === 'locked' ? (
                        <Lock className="w-5 h-5" style={{ color: course.color }} />
                      ) : course.status === 'completed' ? (
                        <BadgeCheck className="w-5 h-5" style={{ color: course.color }} />
                      ) : (
                        <PlayCircle className="w-5 h-5" style={{ color: course.color }} />
                      )}
                    </div>
                    <span
                      className="text-[10px] font-bold uppercase tracking-wide rounded-full px-2.5 py-1"
                      style={{
                        background: course.color + '25',
                        color: '#2c3e5a',
                      }}
                    >
                      {course.status === 'in-progress'
                        ? 'In Progress'
                        : course.status === 'completed'
                        ? 'Completed'
                        : 'Locked'}
                    </span>
                  </div>

                  <h3 className="font-bold text-[#2c3e5a] text-sm mb-1">{course.title}</h3>
                  <p className="text-xs text-[#7a6e65] mb-4">{course.company}</p>

                  {/* Progress */}
                  <div className="mb-3">
                    <div className="flex justify-between mb-1.5">
                      <span className="text-[11px] text-[#7a6e65]">
                        {course.completedModules}/{course.modules} modules
                      </span>
                      <span className="text-[11px] font-bold text-[#2c3e5a]">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-[#f5f0e8] rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{ width: `${course.progress}%`, background: course.color }}
                      />
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1">
                    {[1, 2, 3].map((s) => (
                      <Star
                        key={s}
                        className="w-3.5 h-3.5"
                        style={{
                          color: s <= Math.ceil(course.progress / 34) ? course.color : '#e8e2da',
                          fill: s <= Math.ceil(course.progress / 34) ? course.color : 'none',
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interview Ready banner */}
          <div
            className="rounded-3xl p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
            style={{ background: '#c1e1c1' }}
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <BadgeCheck className="w-5 h-5 text-[#2c3e5a]" />
                <span className="font-bold text-[#2c3e5a] text-sm uppercase tracking-wide">
                  Certificate Earned
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#2c3e5a] mb-1">
                Customer Service Excellence
              </h3>
              <p className="text-sm text-[#2c3e5a]/70">
                You&apos;ve unlocked an interview with Verdi Retail Co.
              </p>
            </div>
            <button className="bg-[#2c3e5a] text-[#faf8f5] px-6 py-3 rounded-2xl text-sm font-bold hover:bg-[#3d5270] transition-colors shadow-md flex-shrink-0">
              Schedule Interview
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}
