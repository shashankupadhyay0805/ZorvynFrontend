import clsx from 'clsx'

export default function Badge({ tone = 'slate', className, children }) {
  const tones = {
    slate:
      'border border-slate-200/80 bg-slate-100/90 text-slate-700 dark:border-slate-600/50 dark:bg-slate-800/80 dark:text-slate-200',
    green:
      'border border-emerald-200/80 bg-emerald-100/90 text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-950/60 dark:text-emerald-200',
    red: 'border border-rose-200/80 bg-rose-100/90 text-rose-900 dark:border-rose-500/30 dark:bg-rose-950/50 dark:text-rose-200',
    blue: 'border border-cyan-200/80 bg-cyan-100/90 text-cyan-900 dark:border-cyan-500/30 dark:bg-cyan-950/50 dark:text-cyan-200',
    violet:
      'border border-violet-200/80 bg-violet-100/90 text-violet-900 dark:border-violet-500/30 dark:bg-violet-950/50 dark:text-violet-200',
  }

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold tracking-tight',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
