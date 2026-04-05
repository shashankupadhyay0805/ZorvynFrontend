import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { nanoid } from 'nanoid'
import { CATEGORIES, MOCK_TRANSACTIONS } from '../data/mockTransactions'

const categoriesById = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]))

const defaultFilters = {
  query: '',
  type: 'all', // all | income | expense
  category: 'all',
  sortBy: 'date', // date | amount
  sortDir: 'desc', // asc | desc
}

export const useFinanceStore = create(
  persist(
    (set, get) => ({
      role: 'viewer', // viewer | admin
      theme: 'system', // system | light | dark
      currency: 'USD', // ISO 4217
      categories: CATEGORIES,
      categoriesById,

      loading: true,
      transactions: [],

      filters: defaultFilters,

      hydrate() {
        // allow a tiny “skeleton” phase even w/ persisted data
        set({ loading: true })
        setTimeout(() => set({ loading: false }), 450)
      },

      setRole(role) {
        set({ role })
      },

      setTheme(theme) {
        set({ theme })
      },

      setCurrency(currency) {
        set({ currency })
      },

      setFilters(partial) {
        set({ filters: { ...get().filters, ...partial } })
      },

      resetFilters() {
        set({ filters: defaultFilters })
      },

      addTransaction(input) {
        const t = {
          id: `t_${nanoid(8)}`,
          date: input.date,
          amount: Number(input.amount) || 0,
          category: input.category,
          type: input.type,
          description: input.description || '',
        }
        set({ transactions: [t, ...get().transactions] })
      },

      updateTransaction(id, patch) {
        set({
          transactions: get().transactions.map((t) =>
            t.id === id
              ? {
                  ...t,
                  ...patch,
                  amount:
                    patch.amount === undefined ? t.amount : Number(patch.amount) || 0,
                }
              : t,
          ),
        })
      },

      deleteTransaction(id) {
        set({ transactions: get().transactions.filter((t) => t.id !== id) })
      },

      exportTransactions(format = 'json') {
        const rows = get().transactions
        if (format === 'json') {
          const blob = new Blob([JSON.stringify(rows, null, 2)], {
            type: 'application/json',
          })
          downloadBlob(blob, 'transactions.json')
          return
        }

        const csv = toCsv(rows)
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
        downloadBlob(blob, 'transactions.csv')
      },
    }),
    {
      name: 'finance-dashboard-v1',
      version: 1,
      partialize: (state) => ({
        role: state.role,
        theme: state.theme,
        currency: state.currency,
        transactions: state.transactions,
        filters: state.filters,
      }),
      merge: (persistedState, currentState) => {
        const p = persistedState && typeof persistedState === 'object' ? persistedState : {}
        return {
          ...currentState,
          ...p,
          currency: p.currency ?? currentState.currency ?? 'USD',
        }
      },
      onRehydrateStorage: () => (state) => {
        // If no persisted transactions, seed mock data once.
        if (state && (!Array.isArray(state.transactions) || state.transactions.length === 0)) {
          state.transactions = MOCK_TRANSACTIONS
        }
        state?.hydrate?.()
      },
    },
  ),
)

function toCsv(rows) {
  const header = ['id', 'date', 'amount', 'category', 'type', 'description']
  const escape = (v) => {
    const s = String(v ?? '')
    if (/[,"\n]/.test(s)) return `"${s.replaceAll('"', '""')}"`
    return s
  }

  const lines = [header.join(',')]
  for (const r of rows) {
    lines.push(
      [
        r.id,
        r.date,
        r.amount,
        r.category,
        r.type,
        r.description || '',
      ].map(escape).join(','),
    )
  }
  return lines.join('\n')
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 2500)
}

