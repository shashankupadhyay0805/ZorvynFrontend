import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { PieChart as PieChartIcon } from 'lucide-react'
import Card from '../ui/Card'
import { useFormatCurrency } from '../../hooks/useFormatCurrency'

export default function ExpenseBreakdownChart({ data, loading }) {
  const formatMoney = useFormatCurrency()
  const top = data.slice(0, 6)

  const renderTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null
    const row = payload[0]?.payload
    if (!row) return null
    return (
      <div className="rounded-xl border border-fuchsia-200/80 bg-white/95 px-3 py-2 text-sm shadow-lg backdrop-blur-sm dark:border-fuchsia-500/25 dark:bg-slate-950/95">
        <div className="font-semibold text-slate-900 dark:text-white">{row.label}</div>
        <div className="font-bold text-fuchsia-700 dark:text-fuchsia-300">{formatMoney(row.value)}</div>
      </div>
    )
  }

  return (
    <Card className="p-5">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-rose-500 text-white shadow-lg shadow-fuchsia-500/25">
          <PieChartIcon className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <div className="font-bold tracking-tight text-slate-900 dark:text-white">Expense breakdown</div>
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Top categories (expenses)
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-[1fr_180px]">
        <div className="h-56">
          {loading ? (
            <div className="h-full w-full animate-pulse rounded-2xl bg-gradient-to-br from-fuchsia-100/70 via-rose-50/50 to-amber-50/60 dark:from-fuchsia-950/40 dark:via-slate-900 dark:to-rose-950/30" />
          ) : top.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-fuchsia-200/80 text-center text-sm font-medium text-slate-600 dark:border-fuchsia-500/25 dark:text-slate-400">
              <PieChartIcon className="h-8 w-8 text-fuchsia-300 dark:text-fuchsia-700" aria-hidden />
              No expense data
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip content={renderTooltip} />
                <Pie
                  data={top}
                  dataKey="value"
                  nameKey="label"
                  innerRadius={52}
                  outerRadius={78}
                  paddingAngle={3}
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth={2}
                >
                  {top.map((entry) => (
                    <Cell key={entry.category} fill={entry.color || '#94a3b8'} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="space-y-2.5">
          {top.length === 0 ? (
            <div className="text-sm text-slate-600 dark:text-slate-300">—</div>
          ) : (
            top.map((r) => (
              <div key={r.category} className="flex items-center justify-between gap-3 text-sm">
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full ring-2 ring-white dark:ring-slate-900"
                    style={{ background: r.color || '#94a3b8' }}
                  />
                  <span className="truncate font-medium text-slate-700 dark:text-slate-200">{r.label}</span>
                </div>
                <span className="shrink-0 font-bold text-slate-900 dark:text-white">{formatMoney(r.value)}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </Card>
  )
}
