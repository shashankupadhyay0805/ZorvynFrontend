import { useMemo } from 'react'
import { useFinanceStore } from '../store/useFinanceStore'
import { formatCurrency as formatCurrencyPure } from '../utils/format'

/** Re-renders when `currency` changes (unlike calling getState in a plain util). */
export function useFormatCurrency() {
  const currency = useFinanceStore((s) => s.currency)
  return useMemo(() => (amount) => formatCurrencyPure(amount, currency), [currency])
}
