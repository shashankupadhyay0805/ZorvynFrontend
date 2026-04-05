import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { LineChart as LineChartIcon } from 'lucide-react'
import Card from '../ui/Card'
import { formatDateShort } from '../../utils/format'
import { useFormatCurrency } from '../../hooks/useFormatCurrency'

export default function BalanceTrendChart({ data, loading }) {
  const formatMoney = useFormatCurrency()

  const renderTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null
    const v = payload[0]?.value ?? 0
    return (
      <div className="rounded-xl border border-violet-200/80 bg-white/95 px-3 py-2 text-sm shadow-lg backdrop-blur-sm dark:border-violet-500/30 dark:bg-slate-950/95">
        <div className="font-semibold text-slate-900 dark:text-white">{formatDateShort(label)}</div>
        <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text font-bold text-transparent">
          {formatMoney(v)}
        </div>
      </div>
    )
  }

  return (
    <Card className="p-5">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-600 text-white shadow-lg shadow-cyan-500/25">
          <LineChartIcon className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <div className="font-bold tracking-tight text-slate-900 dark:text-white">Balance trend</div>
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Running balance over time
          </div>
        </div>
      </div>

      <div className="h-64">
        {loading ? (
          <div className="h-full w-full animate-pulse rounded-2xl bg-gradient-to-br from-violet-100/80 via-fuchsia-50/50 to-cyan-100/60 dark:from-violet-950/40 dark:via-slate-900 dark:to-cyan-950/30" />
        ) : data.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-violet-200/80 text-center text-sm font-medium text-slate-600 dark:border-violet-500/25 dark:text-slate-400">
            <LineChartIcon className="h-8 w-8 text-violet-300 dark:text-violet-600" aria-hidden />
            No data to chart yet
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 6, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="balanceLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 92, 246, 0.12)" />
              <XAxis
                dataKey="date"
                tickFormatter={(v) => formatDateShort(v).replace(/,\s*\d{4}$/, '')}
                tick={{ fontSize: 11, fill: 'rgba(100,116,139,0.85)' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v) => formatMoney(v)}
                tick={{ fontSize: 10, fill: 'rgba(100,116,139,0.85)' }}
                axisLine={false}
                tickLine={false}
                width={64}
              />
              <Tooltip content={renderTooltip} />
              <Line
                type="monotone"
                dataKey="balance"
                stroke="url(#balanceLine)"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 5, strokeWidth: 0, fill: '#a855f7' }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  )
}
