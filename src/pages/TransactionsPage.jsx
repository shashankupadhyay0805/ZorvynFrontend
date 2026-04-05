import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import TransactionsTable from '../components/transactions/TransactionsTable'
import TransactionFormModal from '../components/transactions/TransactionFormModal'
import Modal from '../components/ui/Modal'
import Button from '../components/ui/Button'
import { useFinanceStore } from '../store/useFinanceStore'

export default function TransactionsPage() {
  const role = useFinanceStore((s) => s.role)
  const deleteTransaction = useFinanceStore((s) => s.deleteTransaction)

  const [params, setParams] = useSearchParams()
  const addParam = params.get('add')

  const [formOpen, setFormOpen] = useState(false)
  const [formMode, setFormMode] = useState('add') // add | edit
  const [editing, setEditing] = useState(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleting, setDeleting] = useState(null)

  useEffect(() => {
    if (addParam === '1') {
      setEditing(null)
      setFormMode('add')
      setFormOpen(true)
      const next = new URLSearchParams(params)
      next.delete('add')
      setParams(next, { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addParam])

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
    <div className="space-y-6">
      <TransactionsTable onAdd={onAdd} onEdit={onEdit} onDelete={onDelete} />

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
            <div className="rounded-xl border border-violet-200/70 bg-gradient-to-br from-violet-50/80 to-white p-3 text-sm text-slate-700 dark:border-violet-500/20 dark:from-violet-950/40 dark:to-slate-900/60 dark:text-slate-200">
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
              <Trash2 className="h-4 w-4" />
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

