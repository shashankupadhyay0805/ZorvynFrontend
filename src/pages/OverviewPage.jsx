import { useMemo } from 'react'
import { LayoutDashboard } from 'lucide-react'
import SummaryCards from '../components/overview/SummaryCards'
import BalanceTrendChart from '../components/charts/BalanceTrendChart'
import ExpenseBreakdownChart from '../components/charts/ExpenseBreakdownChart'
import { useFinanceStore } from '../store/useFinanceStore'
import { buildBalanceTrend, buildExpenseBreakdown, computeSummary } from '../utils/finance'

export default function OverviewPage() {
  const loading = useFinanceStore((s) => s.loading)
  const transactions = useFinanceStore((s) => s.transactions)
  const categoriesById = useFinanceStore((s) => s.categoriesById)

  const summary = useMemo(() => computeSummary(transactions), [transactions])
  const trend = useMemo(() => buildBalanceTrend(transactions), [transactions])
  const breakdown = useMemo(
    () => buildExpenseBreakdown(transactions, categoriesById),
    [transactions, categoriesById],
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-500/30">
          <LayoutDashboard className="h-6 w-6" aria-hidden />
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Overview</h1>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Your financial snapshot at a glance
          </p>
        </div>
      </div>

      <SummaryCards summary={summary} loading={loading} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <BalanceTrendChart data={trend} loading={loading} />
        <ExpenseBreakdownChart data={breakdown} loading={loading} />
      </div>
    </div>
  )
}

