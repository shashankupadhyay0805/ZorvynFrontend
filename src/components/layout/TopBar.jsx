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
import FieldLabel from '../ui/FieldLabel'
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
          'flex min-h-[3.25rem] w-full flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-center text-[10px] font-bold leading-tight transition-all duration-200 md:min-h-9 md:flex-row md:gap-1.5 md:px-3 md:py-0 md:text-sm md:font-semibold',
          isActive
            ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md shadow-violet-500/30 dark:from-violet-500 dark:to-fuchsia-500'
            : 'text-slate-600 hover:bg-violet-100/70 dark:text-slate-300 dark:hover:bg-violet-950/60',
        )
      }
    >
      <Icon className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
      <span>{label}</span>
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
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-3 md:flex-row md:items-center md:justify-between md:gap-3">
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

        <div className="flex w-full min-w-0 flex-col gap-4 md:w-auto md:items-end">
          <div className="w-full md:w-auto">
            <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 md:hidden">
              Navigate
            </p>
            <nav
              className="grid w-full grid-cols-3 gap-1 rounded-2xl border border-violet-200/60 bg-white/80 p-1 shadow-sm dark:border-violet-500/20 dark:bg-slate-900/60 md:flex md:w-auto md:gap-1"
              aria-label="Main pages"
            >
              <NavButton to="/" label="Overview" icon={LayoutDashboard} />
              <NavButton to="/transactions" label="Transactions" icon={ListOrdered} />
              <NavButton to="/insights" label="Insights" icon={Lightbulb} />
            </nav>
          </div>

          <div className="w-full md:w-auto">
            <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 md:hidden">
              Preferences
            </p>
            <div className="grid w-full grid-cols-3 gap-x-2 gap-y-3 md:flex md:w-auto md:flex-wrap md:items-end md:justify-end md:gap-2">
              <div className="flex min-w-0 flex-col gap-1">
                <FieldLabel htmlFor="zorvyn-theme">Theme</FieldLabel>
                <div className="flex min-w-0 gap-1.5">
                  <Select
                    id="zorvyn-theme"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="min-w-0 flex-1 text-xs md:w-[8.5rem] md:flex-none md:text-sm"
                  >
                    <option value="system">System</option>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </Select>
                  <span
                    className="hidden h-10 w-9 shrink-0 items-center justify-center rounded-xl border border-violet-200/60 bg-violet-50 text-violet-600 md:flex dark:border-violet-500/20 dark:bg-violet-950/50 dark:text-violet-300"
                    aria-hidden
                  >
                    {theme === 'dark' ? (
                      <Moon className="h-4 w-4" />
                    ) : theme === 'light' ? (
                      <Sun className="h-4 w-4" />
                    ) : (
                      <Monitor className="h-4 w-4" />
                    )}
                  </span>
                </div>
              </div>

              <div className="flex min-w-0 flex-col gap-1">
                <FieldLabel htmlFor="zorvyn-currency">Currency</FieldLabel>
                <Select
                  id="zorvyn-currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full min-w-0 text-xs md:w-44 md:text-sm"
                  title="Display currency"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code} title={c.label}>
                      {c.code}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="flex min-w-0 flex-col gap-1">
                <FieldLabel htmlFor="zorvyn-role">Role</FieldLabel>
                <Select
                  id="zorvyn-role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full min-w-0 text-xs md:w-36 md:text-sm"
                >
                  <option value="viewer">Viewer</option>
                  <option value="admin">Admin</option>
                </Select>
              </div>
            </div>
          </div>

          {role === 'admin' && (
            <div className="w-full md:flex md:w-auto md:justify-end">
              <div className="flex w-full flex-col gap-1 md:w-auto">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 md:sr-only">
                  Actions
                </span>
                <Button onClick={onAdd} className="h-10 w-full md:inline-flex md:w-auto">
                  <Plus className="h-4 w-4" />
                  Add transaction
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
