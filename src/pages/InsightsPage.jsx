import { useMemo } from 'react'
import { Lightbulb } from 'lucide-react'
import InsightsPanel from '../components/insights/InsightsPanel'
import { useFinanceStore } from '../store/useFinanceStore'
import {
  cashflowRatio as calcCashflowRatio,
  computeSummary,
  currentMonthSavingsRate,
  highestIncomeCategory,
  highestSpendingCategory,
  largestExpenseTransaction,
  monthOverMonth,
  mostFrequentExpenseCategory,
  transactionVolumeMom,
} from '../utils/finance'

export default function InsightsPage() {
  const loading = useFinanceStore((s) => s.loading)
  const transactions = useFinanceStore((s) => s.transactions)
  const categoriesById = useFinanceStore((s) => s.categoriesById)

  const summary = useMemo(() => computeSummary(transactions), [transactions])
  const topCategory = useMemo(
    () => highestSpendingCategory(transactions, categoriesById),
    [transactions, categoriesById],
  )
  const mom = useMemo(() => monthOverMonth(transactions), [transactions])
  const ratio = useMemo(() => calcCashflowRatio(summary), [summary])
  const avgExpense = useMemo(() => {
    const ex = transactions.filter((t) => t.type === 'expense')
    if (ex.length === 0) return 0
    const sum = ex.reduce((a, t) => a + (Number(t.amount) || 0), 0)
    return sum / ex.length
  }, [transactions])

  const topIncome = useMemo(
    () => highestIncomeCategory(transactions, categoriesById),
    [transactions, categoriesById],
  )
  const biggestExpense = useMemo(
    () => largestExpenseTransaction(transactions, categoriesById),
    [transactions, categoriesById],
  )
  const savingsRateMonth = useMemo(() => currentMonthSavingsRate(transactions), [transactions])
  const txVolume = useMemo(() => transactionVolumeMom(transactions), [transactions])
  const frequentSpend = useMemo(
    () => mostFrequentExpenseCategory(transactions, categoriesById),
    [transactions, categoriesById],
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-fuchsia-600 text-white shadow-lg shadow-amber-500/25">
          <Lightbulb className="h-6 w-6" aria-hidden />
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Insights</h1>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Patterns, comparisons, and health checks
          </p>
        </div>
      </div>
      <InsightsPanel
        loading={loading}
        topCategory={topCategory}
        topIncomeCategory={topIncome}
        largestExpense={biggestExpense}
        mom={mom}
        cashflowRatio={ratio}
        savingsRateMonth={savingsRateMonth}
        avgExpense={avgExpense}
        txCount={transactions.length}
        txVolume={txVolume}
        frequentSpend={frequentSpend}
      />
    </div>
  )
}

