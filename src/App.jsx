import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './pages/AppLayout'
import OverviewPage from './pages/OverviewPage'
import TransactionsPage from './pages/TransactionsPage'
import InsightsPage from './pages/InsightsPage'
import { useFinanceStore } from './store/useFinanceStore'
import { useThemeClass } from './hooks/useThemeClass'

export default function App() {
  const theme = useFinanceStore((s) => s.theme)
  const loading = useFinanceStore((s) => s.loading)
  const transactions = useFinanceStore((s) => s.transactions)

  useThemeClass(theme)

  // First-time seed if store didn't rehydrate (non-persist scenario)
  useEffect(() => {
    if (!loading && transactions.length === 0) {
      // store rehydrate hook normally seeds; keeping UI resilient
    }
  }, [loading, transactions.length])

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
