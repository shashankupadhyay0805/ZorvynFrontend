import { useMemo } from 'react'
import { ListOrdered, Search, Download, FileJson, RotateCcw, Pencil, Trash2, Plus } from 'lucide-react'
import Card from '../ui/Card'
import Input from '../ui/Input'
import Select from '../ui/Select'
import FieldLabel from '../ui/FieldLabel'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import Skeleton from '../ui/Skeleton'
import { useFinanceStore } from '../../store/useFinanceStore'
import { formatDateShort } from '../../utils/format'
import { useFormatCurrency } from '../../hooks/useFormatCurrency'

function sortTransactions(rows, sortBy, sortDir) {
  const dir = sortDir === 'asc' ? 1 : -1
  const sorted = [...rows]
  sorted.sort((a, b) => {
    if (sortBy === 'amount') return (a.amount - b.amount) * dir
    return a.date.localeCompare(b.date) * dir
  })
  return sorted
}

export default function TransactionsTable({ onAdd, onEdit, onDelete }) {
  const formatMoney = useFormatCurrency()
  const role = useFinanceStore((s) => s.role)
  const loading = useFinanceStore((s) => s.loading)
  const categories = useFinanceStore((s) => s.categories)
  const categoriesById = useFinanceStore((s) => s.categoriesById)
  const transactions = useFinanceStore((s) => s.transactions)
  const filters = useFinanceStore((s) => s.filters)
  const setFilters = useFinanceStore((s) => s.setFilters)
  const resetFilters = useFinanceStore((s) => s.resetFilters)
  const exportTransactions = useFinanceStore((s) => s.exportTransactions)

  const filtered = useMemo(() => {
    const q = filters.query.trim().toLowerCase()
    let rows = transactions

    if (filters.type !== 'all') rows = rows.filter((t) => t.type === filters.type)
    if (filters.category !== 'all') rows = rows.filter((t) => t.category === filters.category)
    if (q) {
      rows = rows.filter((t) => {
        const cat = categoriesById[t.category]?.label || t.category
        return (
          (t.description || '').toLowerCase().includes(q) ||
          cat.toLowerCase().includes(q) ||
          t.type.toLowerCase().includes(q) ||
          t.date.includes(q) ||
          String(t.amount).includes(q)
        )
      })
    }

    return sortTransactions(rows, filters.sortBy, filters.sortDir)
  }, [transactions, filters, categoriesById])

  const empty = !loading && filtered.length === 0

  return (
    <Card className="p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25">
            <ListOrdered className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <div className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              Transactions
            </div>
            <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Search, filter, sort — admins can edit the ledger
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {role === 'admin' && (
            <Button onClick={onAdd} className="sm:hidden">
              <Plus className="h-4 w-4" />
              Add
            </Button>
          )}
          <Button variant="secondary" onClick={() => exportTransactions('csv')}>
            <Download className="h-4 w-4" />
            CSV
          </Button>
          <Button variant="secondary" onClick={() => exportTransactions('json')}>
            <FileJson className="h-4 w-4" />
            JSON
          </Button>
        </div>
      </div>

      <div className="mt-5">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 md:hidden">
          Filters
        </p>
        <div className="grid grid-cols-2 gap-x-3 gap-y-3 md:grid-cols-4 md:gap-2">
          <div className="col-span-2 flex min-w-0 flex-col gap-1 md:col-span-1">
            <FieldLabel htmlFor="tx-filter-search">Search</FieldLabel>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-violet-400" />
              <Input
                id="tx-filter-search"
                className="pl-9 text-sm"
                placeholder="Search…"
                value={filters.query}
                onChange={(e) => setFilters({ query: e.target.value })}
              />
            </div>
          </div>

          <div className="flex min-w-0 flex-col gap-1">
            <FieldLabel htmlFor="tx-filter-type">Type</FieldLabel>
            <Select
              id="tx-filter-type"
              value={filters.type}
              onChange={(e) => setFilters({ type: e.target.value })}
              className="w-full min-w-0 text-sm"
            >
              <option value="all">All types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </Select>
          </div>

          <div className="flex min-w-0 flex-col gap-1">
            <FieldLabel htmlFor="tx-filter-category">Category</FieldLabel>
            <Select
              id="tx-filter-category"
              value={filters.category}
              onChange={(e) => setFilters({ category: e.target.value })}
              className="w-full min-w-0 text-sm"
            >
              <option value="all">All categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </Select>
          </div>

          <div className="col-span-2 grid grid-cols-2 gap-x-3 gap-y-0 md:col-span-1 md:flex md:min-w-0 md:items-end md:gap-2">
            <div className="flex min-w-0 flex-col gap-1 md:min-w-0 md:flex-1">
              <FieldLabel htmlFor="tx-filter-sort">Sort by</FieldLabel>
              <Select
                id="tx-filter-sort"
                value={`${filters.sortBy}:${filters.sortDir}`}
                onChange={(e) => {
                  const [sortBy, sortDir] = e.target.value.split(':')
                  setFilters({ sortBy, sortDir })
                }}
                className="w-full min-w-0 text-sm"
              >
                <option value="date:desc">Date · Newest</option>
                <option value="date:asc">Date · Oldest</option>
                <option value="amount:desc">Amount · High</option>
                <option value="amount:asc">Amount · Low</option>
              </Select>
            </div>
            <div className="flex min-w-0 flex-col gap-1">
              <FieldLabel as="span" className="md:hidden">
                Reset
              </FieldLabel>
              <Button
                variant="ghost"
                type="button"
                onClick={resetFilters}
                className="h-10 w-full shrink-0 px-2 md:w-auto"
                aria-label="Reset all filters"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 overflow-x-auto rounded-2xl border border-violet-200/40 dark:border-violet-500/15">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-violet-200/50 bg-gradient-to-r from-violet-50/90 to-fuchsia-50/50 text-xs font-bold uppercase tracking-wide text-violet-800 dark:border-violet-500/20 dark:from-violet-950/50 dark:to-fuchsia-950/30 dark:text-violet-200">
              <th className="py-3 pr-4 pl-4">Date</th>
              <th className="py-2.5 pr-4 font-medium">Description</th>
              <th className="py-2.5 pr-4 font-medium">Category</th>
              <th className="py-2.5 pr-4 font-medium">Type</th>
              <th className="py-2.5 pr-4 text-right font-medium">Amount</th>
              <th className="py-3 pl-4 pr-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white/50 dark:bg-slate-950/30">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} className="border-b border-violet-100/60 dark:border-violet-950/40">
                  <td className="py-3 pr-4">
                    <Skeleton className="h-4 w-24" />
                  </td>
                  <td className="py-3 pr-4">
                    <Skeleton className="h-4 w-56" />
                  </td>
                  <td className="py-3 pr-4">
                    <Skeleton className="h-4 w-28" />
                  </td>
                  <td className="py-3 pr-4">
                    <Skeleton className="h-4 w-20" />
                  </td>
                  <td className="py-3 pr-4 text-right">
                    <Skeleton className="ml-auto h-4 w-24" />
                  </td>
                  <td className="py-3 pl-4 text-right">
                    <Skeleton className="ml-auto h-8 w-28" />
                  </td>
                </tr>
              ))
            ) : empty ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-14 text-center text-sm font-medium text-slate-600 dark:text-slate-400"
                >
                  <div className="mx-auto flex max-w-xs flex-col items-center gap-2">
                    <Search className="h-10 w-10 text-violet-200 dark:text-violet-800" />
                    Nothing matches — try clearing filters or search.
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((t) => {
                const cat = categoriesById[t.category]
                const tone = t.type === 'income' ? 'green' : 'red'
                return (
                  <tr
                    key={t.id}
                    className="border-b border-violet-100/50 transition-colors hover:bg-violet-50/40 dark:border-violet-950/40 dark:hover:bg-violet-950/20"
                  >
                    <td className="py-3 pr-4 text-slate-700 dark:text-slate-200">
                      {formatDateShort(t.date)}
                    </td>
                    <td className="py-3 pr-4">
                      <div className="max-w-[340px] truncate text-slate-900 dark:text-slate-50">
                        {t.description || '—'}
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-slate-700 dark:text-slate-200">
                      <span className="inline-flex items-center gap-2">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ background: cat?.color || '#94a3b8' }}
                        />
                        {cat?.label || t.category}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <Badge tone={tone}>{t.type === 'income' ? 'Income' : 'Expense'}</Badge>
                    </td>
                    <td className="py-3 pr-4 text-right font-bold text-slate-900 dark:text-white">
                      {formatMoney(t.amount)}
                    </td>
                    <td className="py-3 pl-4 text-right">
                      {role === 'admin' ? (
                        <div className="flex justify-end gap-2">
                          <Button variant="secondary" size="sm" onClick={() => onEdit(t)}>
                            <Pencil className="h-3.5 w-3.5" />
                            Edit
                          </Button>
                          <Button variant="danger" size="sm" onClick={() => onDelete(t)}>
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete
                          </Button>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

