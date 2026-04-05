import { Wallet, TrendingUp, Receipt } from 'lucide-react'
import Card from '../ui/Card'
import Skeleton from '../ui/Skeleton'
import { useFormatCurrency } from '../../hooks/useFormatCurrency'
import clsx from 'clsx'

const variants = {
  balance: {
    icon: Wallet,
    ring: 'ring-violet-400/30 dark:ring-violet-500/25',
    iconBg: 'from-violet-500 to-fuchsia-600',
    accent: 'text-violet-700 dark:text-violet-300',
  },
  income: {
    icon: TrendingUp,
    ring: 'ring-emerald-400/35 dark:ring-emerald-500/25',
    iconBg: 'from-emerald-500 to-teal-500',
    accent: 'text-emerald-700 dark:text-emerald-300',
  },
  expense: {
    icon: Receipt,
    ring: 'ring-rose-400/35 dark:ring-rose-500/25',
    iconBg: 'from-rose-500 to-orange-500',
    accent: 'text-rose-700 dark:text-rose-300',
  },
}

function MetricCard({ label, value, hint, loading, formatMoney, variant }) {
  const { icon: Icon, ring, iconBg, accent } = variants[variant]

  return (
    <Card className={clsx('relative overflow-hidden p-5 ring-1', ring)}>
      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-white/40 to-transparent opacity-60 dark:from-white/10" />
      <div className="relative flex items-start justify-between gap-3">
        <div
          className={clsx(
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg',
            iconBg,
            variant === 'balance' && 'shadow-violet-500/30',
            variant === 'income' && 'shadow-emerald-500/25',
            variant === 'expense' && 'shadow-rose-500/25',
          )}
        >
          <Icon className="h-5 w-5" aria-hidden />
        </div>
      </div>
      <div className={clsx('mt-4 text-xs font-semibold uppercase tracking-wider', accent)}>{label}</div>
      <div className="mt-1">
        {loading ? (
          <Skeleton className="mt-1 h-9 w-36" />
        ) : (
          <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {formatMoney(value)}
          </div>
        )}
      </div>
      {hint && (
        <div className="mt-2 text-xs font-medium text-slate-500 dark:text-slate-400">{hint}</div>
      )}
    </Card>
  )
}

export default function SummaryCards({ summary, loading }) {
  const formatMoney = useFormatCurrency()
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <MetricCard
        label="Total balance"
        value={summary.totalBalance}
        hint="Income minus expenses"
        loading={loading}
        formatMoney={formatMoney}
        variant="balance"
      />
      <MetricCard
        label="Total income"
        value={summary.totalIncome}
        hint="All time"
        loading={loading}
        formatMoney={formatMoney}
        variant="income"
      />
      <MetricCard
        label="Total expenses"
        value={summary.totalExpenses}
        hint="All time"
        loading={loading}
        formatMoney={formatMoney}
        variant="expense"
      />
    </div>
  )
}
