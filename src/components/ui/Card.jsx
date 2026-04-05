import clsx from 'clsx'

export default function Card({ className, children }) {
  return (
    <div
      className={clsx(
        'rounded-2xl border border-violet-200/40 bg-white/75 shadow-card backdrop-blur-md',
        'dark:border-violet-500/15 dark:bg-slate-900/55 dark:shadow-card-dark',
        className,
      )}
    >
      {children}
    </div>
  )
}
