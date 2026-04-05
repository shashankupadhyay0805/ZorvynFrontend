export const CATEGORIES = [
  { id: 'housing', label: 'Housing', color: '#2563eb' },
  { id: 'groceries', label: 'Groceries', color: '#16a34a' },
  { id: 'transport', label: 'Transport', color: '#f97316' },
  { id: 'subscriptions', label: 'Subscriptions', color: '#a855f7' },
  { id: 'dining', label: 'Dining', color: '#ef4444' },
  { id: 'health', label: 'Health', color: '#06b6d4' },
  { id: 'shopping', label: 'Shopping', color: '#f43f5e' },
  { id: 'salary', label: 'Salary', color: '#0ea5e9' },
  { id: 'freelance', label: 'Freelance', color: '#22c55e' },
]

/**
 * Transaction shape:
 * { id, date(YYYY-MM-DD), amount(number), category, type('income'|'expense'), description }
 */
export const MOCK_TRANSACTIONS = [
  {
    id: 't_1',
    date: '2026-03-28',
    amount: 4200,
    category: 'salary',
    type: 'income',
    description: 'March salary',
  },
  {
    id: 't_2',
    date: '2026-03-29',
    amount: 85.42,
    category: 'groceries',
    type: 'expense',
    description: 'Weekly groceries',
  },
  {
    id: 't_3',
    date: '2026-03-30',
    amount: 59.99,
    category: 'subscriptions',
    type: 'expense',
    description: 'Streaming plan',
  },
  {
    id: 't_4',
    date: '2026-03-31',
    amount: 1200,
    category: 'housing',
    type: 'expense',
    description: 'Rent',
  },
  {
    id: 't_5',
    date: '2026-04-01',
    amount: 34.75,
    category: 'transport',
    type: 'expense',
    description: 'Transit card top-up',
  },
  {
    id: 't_6',
    date: '2026-04-02',
    amount: 210.0,
    category: 'freelance',
    type: 'income',
    description: 'Logo design',
  },
  {
    id: 't_7',
    date: '2026-04-02',
    amount: 46.2,
    category: 'dining',
    type: 'expense',
    description: 'Dinner',
  },
  {
    id: 't_8',
    date: '2026-04-03',
    amount: 23.18,
    category: 'health',
    type: 'expense',
    description: 'Pharmacy',
  },
  {
    id: 't_9',
    date: '2026-02-14',
    amount: 149.5,
    category: 'shopping',
    type: 'expense',
    description: 'Shoes',
  },
  {
    id: 't_10',
    date: '2026-02-20',
    amount: 4150,
    category: 'salary',
    type: 'income',
    description: 'February salary',
  },
]

