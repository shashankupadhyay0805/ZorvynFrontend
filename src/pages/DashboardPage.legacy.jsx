import { useMemo, useState } from 'react'
import TopBar from '../components/layout/TopBar'
import SummaryCards from '../components/overview/SummaryCards'
import BalanceTrendChart from '../components/charts/BalanceTrendChart'
import ExpenseBreakdownChart from '../components/charts/ExpenseBreakdownChart'
import TransactionsTable from '../components/transactions/TransactionsTable'
import TransactionFormModal from '../components/transactions/TransactionFormModal'
import InsightsPanel from '../components/insights/InsightsPanel'
import Modal from '../components/ui/Modal'
import Button from '../components/ui/Button'
import { useFinanceStore } from '../store/useFinanceStore'
import {
  buildBalanceTrend,
  buildExpenseBreakdown,
  cashflowRatio as calcCashflowRatio,
  computeSummary,
  highestSpendingCategory,
  monthOverMonth,
} from '../utils/finance'

export default function DashboardPage() {
  const loading = useFinanceStore((s) => s.loading)
  const transactions = useFinanceStore((s) => s.transactions)
  const categoriesById = useFinanceStore((s) => s.categoriesById)
  const deleteTransaction = useFinanceStore((s) => s.deleteTransaction)
  const role = useFinanceStore((s) => s.role)

  const [formOpen, setFormOpen] = useState(false)
  const [formMode, setFormMode] = useState('add') // add | edit
  const [editing, setEditing] = useState(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleting, setDeleting] = useState(null)

  const summary = useMemo(() => computeSummary(transactions), [transactions])
  const trend = useMemo(() => buildBalanceTrend(transactions), [transactions])
  const breakdown = useMemo(
    () => buildExpenseBreakdown(transactions, categoriesById),
    [transactions, categoriesById],
  )

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

  const onAdd = () => {
    setEditing(null)
    setFormMode('add')
    setFormOpen(true)
  }
  const onEdit = (t) => {
    setEditing(t)
    setFormMode('edit')
    setFormOpen(true)
  }
  const onDelete = (t) => {
    setDeleting(t)
    setDeleteOpen(true)
  }

  return (
    <div className="min-h-dvh">
      <TopBar onAdd={onAdd} />

      <main className="mx-auto max-w-6xl space-y-4 px-4 py-4">
        <SummaryCards summary={summary} loading={loading} />

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <BalanceTrendChart data={trend} loading={loading} />
          <ExpenseBreakdownChart data={breakdown} loading={loading} />
        </div>

        <InsightsPanel
          loading={loading}
          topCategory={topCategory}
          mom={mom}
          cashflowRatio={ratio}
          avgExpense={avgExpense}
          txCount={transactions.length}
        />

        <TransactionsTable onAdd={onAdd} onEdit={onEdit} onDelete={onDelete} />

        <footer className="pb-8 pt-2 text-xs text-slate-500 dark:text-slate-400">
          Frontend-only demo with mock data. State is persisted in localStorage.
        </footer>
      </main>

      <TransactionFormModal
        open={formOpen}
        mode={formMode}
        initial={editing}
        onClose={() => setFormOpen(false)}
      />

      <Modal
        open={deleteOpen}
        title="Delete transaction?"
        description="This action cannot be undone."
        onClose={() => setDeleteOpen(false)}
      >
        <div className="space-y-4">
          {deleting ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-200">
              <div className="font-medium">{deleting.description || '—'}</div>
              <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {deleting.date} • {deleting.type} • {deleting.category}
              </div>
            </div>
          ) : null}

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button variant="secondary" onClick={() => setDeleteOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              disabled={role !== 'admin'}
              onClick={() => {
                if (role !== 'admin' || !deleting) return
                deleteTransaction(deleting.id)
                setDeleteOpen(false)
              }}
            >
              Delete
            </Button>
          </div>

          {role !== 'admin' && (
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Switch to Admin to delete transactions.
            </div>
          )}
        </div>
      </Modal>
    </div>
  )
}

