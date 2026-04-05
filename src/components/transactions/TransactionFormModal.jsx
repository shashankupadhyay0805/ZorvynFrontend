import { useEffect, useMemo, useState } from 'react'
import { Save, CirclePlus } from 'lucide-react'
import Modal from '../ui/Modal'
import Input from '../ui/Input'
import Select from '../ui/Select'
import Button from '../ui/Button'
import { useFinanceStore } from '../../store/useFinanceStore'

function todayISO() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export default function TransactionFormModal({ open, mode, initial, onClose }) {
  const categories = useFinanceStore((s) => s.categories)
  const addTransaction = useFinanceStore((s) => s.addTransaction)
  const updateTransaction = useFinanceStore((s) => s.updateTransaction)

  const isEdit = mode === 'edit'

  const defaults = useMemo(
    () => ({
      date: initial?.date || todayISO(),
      amount: initial?.amount ?? '',
      category: initial?.category || 'groceries',
      type: initial?.type || 'expense',
      description: initial?.description || '',
    }),
    [initial],
  )

  const [form, setForm] = useState(defaults)
  const [error, setError] = useState('')

  useEffect(() => {
    if (open) setForm(defaults)
    if (open) setError('')
  }, [open, defaults])

  const canSubmit =
    form.date &&
    form.type &&
    form.category &&
    String(form.amount).trim() !== '' &&
    Number(form.amount) > 0

  const onSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!canSubmit) {
      setError('Please enter a valid date, amount (> 0), type, and category.')
      return
    }

    if (isEdit) {
      updateTransaction(initial.id, {
        ...form,
        amount: Number(form.amount),
      })
    } else {
      addTransaction({ ...form, amount: Number(form.amount) })
    }

    onClose?.()
  }

  return (
    <Modal
      open={open}
      title={isEdit ? 'Edit transaction' : 'Add transaction'}
      description="All fields are stored locally (mock data)."
      onClose={onClose}
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <div className="text-xs font-medium text-slate-600 dark:text-slate-300">Date</div>
            <Input
              type="date"
              value={form.date}
              onChange={(e) => setForm((s) => ({ ...s, date: e.target.value }))}
            />
          </div>

          <div className="space-y-1.5">
            <div className="text-xs font-medium text-slate-600 dark:text-slate-300">Amount</div>
            <Input
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={form.amount}
              onChange={(e) => setForm((s) => ({ ...s, amount: e.target.value }))}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <div className="text-xs font-medium text-slate-600 dark:text-slate-300">Type</div>
            <Select value={form.type} onChange={(e) => setForm((s) => ({ ...s, type: e.target.value }))}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </Select>
          </div>

          <div className="space-y-1.5">
            <div className="text-xs font-medium text-slate-600 dark:text-slate-300">Category</div>
            <Select
              value={form.category}
              onChange={(e) => setForm((s) => ({ ...s, category: e.target.value }))}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="text-xs font-medium text-slate-600 dark:text-slate-300">Description</div>
          <Input
            placeholder="Optional note"
            value={form.description}
            onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
          />
        </div>

        {error && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-200">
            {error}
          </div>
        )}

        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={!canSubmit}>
            {isEdit ? (
              <>
                <Save className="h-4 w-4" />
                Save changes
              </>
            ) : (
              <>
                <CirclePlus className="h-4 w-4" />
                Add transaction
              </>
            )}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

