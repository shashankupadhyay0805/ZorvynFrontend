import {
  Sparkles,
  Target,
  CalendarRange,
  Percent,
  Activity,
  CircleArrowUp,
  Flame,
  PiggyBank,
  ArrowLeftRight,
  Repeat2,
} from 'lucide-react'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import Skeleton from '../ui/Skeleton'
import { useFormatCurrency } from '../../hooks/useFormatCurrency'
import { formatDateShort } from '../../utils/format'
import clsx from 'clsx'

function InsightTile({ icon: Icon, title, children, className }) {
  return (
    <div
      className={clsx(
        'rounded-2xl border border-violet-200/50 bg-gradient-to-br from-white/90 to-violet-50/40 p-4 shadow-sm',
        'dark:border-violet-500/15 dark:from-slate-900/80 dark:to-violet-950/30',
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white shadow-md shadow-violet-500/25">
          <Icon className="h-4 w-4" aria-hidden />
        </span>
        <div className="text-xs font-bold uppercase tracking-wider text-violet-700 dark:text-violet-300">
          {title}
        </div>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  )
}

export default function InsightsPanel({
  loading,
  topCategory,
  topIncomeCategory,
  largestExpense,
  mom,
  cashflowRatio,
  savingsRateMonth,
  avgExpense,
  txCount,
  txVolume,
  frequentSpend,
}) {
  const formatMoney = useFormatCurrency()
  const currentNet = (mom.current?.income || 0) - (mom.current?.expenses || 0)
  const prevNet = (mom.previous?.income || 0) - (mom.previous?.expenses || 0)
  const netDelta = currentNet - prevNet

  const volDelta = txVolume.current - txVolume.previous

  return (
    <Card className="p-5">
      <div className="mb-5 flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-cyan-500 text-white shadow-lg shadow-fuchsia-500/30">
          <Sparkles className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <div className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            At a glance
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            Signals that help you spot trends quickly
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <InsightTile icon={Target} title="Top spend">
          {loading ? (
            <Skeleton className="h-5 w-36" />
          ) : topCategory ? (
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="truncate font-semibold text-slate-900 dark:text-white">
                  {topCategory.label}
                </div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  All-time expenses
                </div>
              </div>
              <div className="shrink-0 text-lg font-bold text-violet-700 dark:text-violet-300">
                {formatMoney(topCategory.value)}
              </div>
            </div>
          ) : (
            <div className="text-sm text-slate-600 dark:text-slate-300">No expense data yet</div>
          )}
        </InsightTile>

        <InsightTile icon={CircleArrowUp} title="Top income">
          {loading ? (
            <Skeleton className="h-5 w-36" />
          ) : topIncomeCategory ? (
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="truncate font-semibold text-slate-900 dark:text-white">
                  {topIncomeCategory.label}
                </div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  All-time income
                </div>
              </div>
              <div className="shrink-0 text-lg font-bold text-emerald-700 dark:text-emerald-300">
                {formatMoney(topIncomeCategory.value)}
              </div>
            </div>
          ) : (
            <div className="text-sm text-slate-600 dark:text-slate-300">No income recorded</div>
          )}
        </InsightTile>

        <InsightTile icon={Flame} title="Largest expense">
          {loading ? (
            <Skeleton className="h-14 w-full" />
          ) : largestExpense ? (
            <div className="space-y-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xl font-bold text-rose-700 dark:text-rose-300">
                  {formatMoney(largestExpense.amount)}
                </span>
              </div>
              <div className="truncate text-sm font-medium text-slate-700 dark:text-slate-200">
                {largestExpense.description || largestExpense.categoryLabel}
              </div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {formatDateShort(largestExpense.date)} · {largestExpense.categoryLabel}
              </div>
            </div>
          ) : (
            <div className="text-sm text-slate-600 dark:text-slate-300">No expenses yet</div>
          )}
        </InsightTile>

        <InsightTile icon={CalendarRange} title="Month vs month">
          <div className="space-y-2">
            {loading ? (
              <>
                <Skeleton className="h-4 w-56" />
                <Skeleton className="h-4 w-40" />
              </>
            ) : (
              <>
                <div className="flex items-center justify-between gap-2 text-sm">
                  <span className="font-medium text-slate-600 dark:text-slate-300">{mom.curKey} net</span>
                  <span className="font-bold text-slate-900 dark:text-white">{formatMoney(currentNet)}</span>
                </div>
                <div className="flex items-center justify-between gap-2 text-sm">
                  <span className="font-medium text-slate-600 dark:text-slate-300">{mom.prevKey} net</span>
                  <span className="text-slate-700 dark:text-slate-200">{formatMoney(prevNet)}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <Badge tone={netDelta >= 0 ? 'green' : 'red'}>
                    {netDelta >= 0 ? 'Up' : 'Down'} {formatMoney(Math.abs(netDelta))}
                  </Badge>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    vs previous month
                  </span>
                </div>
              </>
            )}
          </div>
        </InsightTile>

        <InsightTile icon={PiggyBank} title="This month savings">
          {loading ? (
            <Skeleton className="h-5 w-44" />
          ) : savingsRateMonth == null ? (
            <div className="text-sm text-slate-600 dark:text-slate-300">
              Need income this month to compute rate
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  (Income − expenses) ÷ income
                </div>
                <div
                  className={clsx(
                    'text-xl font-bold',
                    savingsRateMonth >= 0
                      ? 'text-emerald-700 dark:text-emerald-300'
                      : 'text-rose-700 dark:text-rose-300',
                  )}
                >
                  {(savingsRateMonth * 100).toFixed(0)}%
                </div>
              </div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                For calendar month {mom.curKey}
              </p>
            </div>
          )}
        </InsightTile>

        <InsightTile icon={Percent} title="Cashflow ratio">
          {loading ? (
            <Skeleton className="h-5 w-44" />
          ) : cashflowRatio == null ? (
            <div className="text-sm text-slate-600 dark:text-slate-300">Add income to see ratio</div>
          ) : (
            <div className="flex items-center justify-between gap-2">
              <div className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Expenses ÷ income (all time)
              </div>
              <div className="text-xl font-bold text-cyan-700 dark:text-cyan-300">
                {(cashflowRatio * 100).toFixed(0)}%
              </div>
            </div>
          )}
        </InsightTile>

        <InsightTile icon={ArrowLeftRight} title="Transaction pace">
          {loading ? (
            <>
              <Skeleton className="h-4 w-48" />
              <Skeleton className="mt-2 h-4 w-40" />
            </>
          ) : (
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-slate-600 dark:text-slate-300">{txVolume.curKey}</span>
                <span className="font-bold text-slate-900 dark:text-white">{txVolume.current} tx</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-slate-600 dark:text-slate-300">{txVolume.prevKey}</span>
                <span className="text-slate-700 dark:text-slate-200">{txVolume.previous} tx</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <Badge tone={volDelta >= 0 ? 'blue' : 'slate'}>
                  {volDelta >= 0 ? '+' : ''}
                  {volDelta} vs prior month
                </Badge>
              </div>
            </div>
          )}
        </InsightTile>

        <InsightTile icon={Repeat2} title="Most frequent spend">
          {loading ? (
            <Skeleton className="h-5 w-40" />
          ) : frequentSpend ? (
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="truncate font-semibold text-slate-900 dark:text-white">
                  {frequentSpend.label}
                </div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  By number of expense lines
                </div>
              </div>
              <div className="shrink-0 text-lg font-bold text-amber-700 dark:text-amber-300">
                {frequentSpend.count}×
              </div>
            </div>
          ) : (
            <div className="text-sm text-slate-600 dark:text-slate-300">No expense lines yet</div>
          )}
        </InsightTile>

        <InsightTile icon={Activity} title="Activity">
          {loading ? (
            <>
              <Skeleton className="h-4 w-48" />
              <Skeleton className="mt-2 h-4 w-40" />
            </>
          ) : (
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-slate-600 dark:text-slate-300">Transactions</span>
                <span className="font-bold text-slate-900 dark:text-white">{txCount}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-slate-600 dark:text-slate-300">Avg expense</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {formatMoney(avgExpense)}
                </span>
              </div>
            </div>
          )}
        </InsightTile>
      </div>
    </Card>
  )
}
