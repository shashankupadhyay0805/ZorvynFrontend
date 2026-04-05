import { monthKey } from './format'

export function computeSummary(transactions) {
  const totals = transactions.reduce(
    (acc, t) => {
      const amount = Number(t.amount) || 0
      if (t.type === 'income') acc.income += amount
      if (t.type === 'expense') acc.expenses += amount
      return acc
    },
    { income: 0, expenses: 0 },
  )

  return {
    totalIncome: totals.income,
    totalExpenses: totals.expenses,
    totalBalance: totals.income - totals.expenses,
  }
}

export function buildExpenseBreakdown(transactions, categoriesById) {
  const byCat = new Map()
  for (const t of transactions) {
    if (t.type !== 'expense') continue
    const key = t.category || 'other'
    byCat.set(key, (byCat.get(key) || 0) + (Number(t.amount) || 0))
  }

  const rows = Array.from(byCat.entries())
    .map(([category, value]) => {
      const meta = categoriesById[category]
      return {
        category,
        label: meta?.label || category,
        value,
        color: meta?.color,
      }
    })
    .sort((a, b) => b.value - a.value)

  return rows
}

export function buildBalanceTrend(transactions) {
  // Daily net totals then running balance (sorted asc by date)
  const byDay = new Map()
  for (const t of transactions) {
    const d = t.date
    if (!d) continue
    const amt = Number(t.amount) || 0
    const signed = t.type === 'income' ? amt : -amt
    byDay.set(d, (byDay.get(d) || 0) + signed)
  }

  const days = Array.from(byDay.keys()).sort((a, b) => a.localeCompare(b))
  let running = 0
  return days.map((date) => {
    running += byDay.get(date) || 0
    return { date, balance: running }
  })
}

export function highestSpendingCategory(transactions, categoriesById) {
  const breakdown = buildExpenseBreakdown(transactions, categoriesById)
  const top = breakdown[0]
  if (!top) return null
  return top
}

export function monthlyTotals(transactions) {
  const totals = new Map()
  for (const t of transactions) {
    const key = monthKey(t.date)
    if (!key) continue
    const amt = Number(t.amount) || 0
    const entry = totals.get(key) || { income: 0, expenses: 0 }
    if (t.type === 'income') entry.income += amt
    if (t.type === 'expense') entry.expenses += amt
    totals.set(key, entry)
  }
  return totals
}

export function monthOverMonth(transactions, referenceDateISO) {
  const ref = referenceDateISO
    ? new Date(`${referenceDateISO}T00:00:00`)
    : new Date()

  const curKey = `${ref.getFullYear()}-${String(ref.getMonth() + 1).padStart(2, '0')}`
  const prev = new Date(ref)
  prev.setMonth(prev.getMonth() - 1)
  const prevKey = `${prev.getFullYear()}-${String(prev.getMonth() + 1).padStart(2, '0')}`

  const map = monthlyTotals(transactions)
  const cur = map.get(curKey) || { income: 0, expenses: 0 }
  const prevTotals = map.get(prevKey) || { income: 0, expenses: 0 }

  return { curKey, prevKey, current: cur, previous: prevTotals }
}

export function cashflowRatio(summary) {
  const income = summary.totalIncome || 0
  const expenses = summary.totalExpenses || 0
  if (income <= 0) return null
  return expenses / income
}

/** Top income category by total amount (same shape as expense breakdown rows). */
export function highestIncomeCategory(transactions, categoriesById) {
  const byCat = new Map()
  for (const t of transactions) {
    if (t.type !== 'income') continue
    const key = t.category || 'other'
    byCat.set(key, (byCat.get(key) || 0) + (Number(t.amount) || 0))
  }
  const rows = Array.from(byCat.entries())
    .map(([category, value]) => {
      const meta = categoriesById[category]
      return { category, label: meta?.label || category, value, color: meta?.color }
    })
    .sort((a, b) => b.value - a.value)
  return rows[0] || null
}

/** Single largest expense with display label. */
export function largestExpenseTransaction(transactions, categoriesById) {
  const expenses = transactions.filter((t) => t.type === 'expense')
  if (expenses.length === 0) return null
  let max = expenses[0]
  let maxAmt = Number(max.amount) || 0
  for (const t of expenses) {
    const a = Number(t.amount) || 0
    if (a > maxAmt) {
      max = t
      maxAmt = a
    }
  }
  const meta = categoriesById[max.category]
  return {
    amount: maxAmt,
    date: max.date,
    description: max.description || '',
    categoryLabel: meta?.label || max.category || '—',
  }
}

/** (income − expenses) / income for the calendar month of reference (null if no income). */
export function currentMonthSavingsRate(transactions, referenceDateISO) {
  const ref = referenceDateISO
    ? new Date(`${referenceDateISO}T00:00:00`)
    : new Date()
  const curKey = `${ref.getFullYear()}-${String(ref.getMonth() + 1).padStart(2, '0')}`
  const map = monthlyTotals(transactions)
  const cur = map.get(curKey) || { income: 0, expenses: 0 }
  if (cur.income <= 0) return null
  return (cur.income - cur.expenses) / cur.income
}

/** Count of all transactions in current vs previous month. */
export function transactionVolumeMom(transactions, referenceDateISO) {
  const ref = referenceDateISO
    ? new Date(`${referenceDateISO}T00:00:00`)
    : new Date()
  const curKey = `${ref.getFullYear()}-${String(ref.getMonth() + 1).padStart(2, '0')}`
  const prev = new Date(ref)
  prev.setMonth(prev.getMonth() - 1)
  const prevKey = `${prev.getFullYear()}-${String(prev.getMonth() + 1).padStart(2, '0')}`

  const countFor = (key) => transactions.filter((t) => monthKey(t.date) === key).length

  return {
    curKey,
    prevKey,
    current: countFor(curKey),
    previous: countFor(prevKey),
  }
}

/** Expense category with the most line items (frequency). */
export function mostFrequentExpenseCategory(transactions, categoriesById) {
  const counts = new Map()
  for (const t of transactions) {
    if (t.type !== 'expense') continue
    const key = t.category || 'other'
    counts.set(key, (counts.get(key) || 0) + 1)
  }
  let topCat = null
  let topCount = 0
  for (const [cat, c] of counts) {
    if (c > topCount) {
      topCount = c
      topCat = cat
    }
  }
  if (topCat == null) return null
  const meta = categoriesById[topCat]
  return { category: topCat, label: meta?.label || topCat, count: topCount }
}

