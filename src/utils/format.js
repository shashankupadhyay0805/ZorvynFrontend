export function formatCurrency(amount, currency = 'USD') {
  const value = Number(amount) || 0
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatDateShort(isoDate) {
  if (!isoDate) return ''
  const d = new Date(`${isoDate}T00:00:00`)
  if (Number.isNaN(d.getTime())) return isoDate
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(d)
}

export function monthKey(isoDate) {
  const d = new Date(`${isoDate}T00:00:00`)
  if (Number.isNaN(d.getTime())) return ''
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  return `${y}-${m}`
}

