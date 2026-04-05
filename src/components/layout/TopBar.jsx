import {
  LayoutDashboard,
  ListOrdered,
  Sparkles,
  Lightbulb,
  Plus,
  Moon,
  Sun,
  Monitor,
} from 'lucide-react'
import Button from '../ui/Button'
import Select from '../ui/Select'
import { useFinanceStore } from '../../store/useFinanceStore'
import { CURRENCIES } from '../../data/currencies'
import clsx from 'clsx'
import { NavLink } from 'react-router-dom'

function NavButton({ to, label, icon: Icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        clsx(
          'inline-flex h-9 items-center gap-1.5 rounded-xl px-3 text-sm font-semibold tracking-tight transition-all duration-200',
          isActive
            ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md shadow-violet-500/30 dark:from-violet-500 dark:to-fuchsia-500'
            : 'text-slate-600 hover:bg-violet-100/70 dark:text-slate-300 dark:hover:bg-violet-950/60',
        )
      }
    >
      <Icon className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
      <span className="hidden sm:inline">{label}</span>
    </NavLink>
  )
}

export default function TopBar({ onAdd }) {
  const role = useFinanceStore((s) => s.role)
  const setRole = useFinanceStore((s) => s.setRole)
  const theme = useFinanceStore((s) => s.theme)
  const setTheme = useFinanceStore((s) => s.setTheme)
  const currency = useFinanceStore((s) => s.currency)
  const setCurrency = useFinanceStore((s) => s.setCurrency)

  return (
    <div className="sticky top-0 z-40 border-b border-violet-200/40 bg-white/70 shadow-sm backdrop-blur-xl dark:border-violet-500/15 dark:bg-slate-950/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-cyan-500 text-white shadow-lg shadow-violet-500/35">
            <Sparkles className="h-5 w-5" aria-hidden />
          </div>
          <div className="min-w-0 pt-0.5">
            <div className="truncate text-base font-bold tracking-tight text-slate-900 dark:text-white">
              Zorvyn{' '}
              <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text font-bold text-transparent dark:from-violet-400 dark:to-fuchsia-400">
                Finance
              </span>
            </div>
            <div className="truncate text-sm text-slate-600 dark:text-slate-400">
              Balance, cashflow & insights — all in one place
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 md:justify-end">
          <div className="flex items-center gap-1 rounded-2xl border border-violet-200/60 bg-white/80 p-1 shadow-sm dark:border-violet-500/20 dark:bg-slate-900/60">
            <NavButton to="/" label="Overview" icon={LayoutDashboard} />
            <NavButton to="/transactions" label="Transactions" icon={ListOrdered} />
            <NavButton to="/insights" label="Insights" icon={Lightbulb} />
          </div>

          <div className="hidden items-center gap-1.5 md:flex">
            <Select value={theme} onChange={(e) => setTheme(e.target.value)} className="w-[9.5rem]">
              <option value="system">Theme · System</option>
              <option value="light">Theme · Light</option>
              <option value="dark">Theme · Dark</option>
            </Select>
            <span className="flex h-10 w-9 items-center justify-center rounded-xl border border-violet-200/60 bg-violet-50 text-violet-600 dark:border-violet-500/20 dark:bg-violet-950/50 dark:text-violet-300">
              {theme === 'dark' ? <Moon className="h-4 w-4" /> : theme === 'light' ? <Sun className="h-4 w-4" /> : <Monitor className="h-4 w-4" />}
            </span>
          </div>

          <Select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-44"
            aria-label="Currency"
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </Select>

          <Select value={role} onChange={(e) => setRole(e.target.value)} className="w-36">
            <option value="viewer">Role · Viewer</option>
            <option value="admin">Role · Admin</option>
          </Select>

          {role === 'admin' && (
            <Button onClick={onAdd} className="hidden sm:inline-flex">
              <Plus className="h-4 w-4" />
              Add transaction
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
