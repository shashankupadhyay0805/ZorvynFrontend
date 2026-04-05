import clsx from 'clsx'

export default function Skeleton({ className }) {
  return (
    <div
      className={clsx(
        'animate-pulse rounded-xl bg-gradient-to-r from-violet-100/80 via-fuchsia-100/60 to-cyan-100/50 dark:from-violet-950/60 dark:via-fuchsia-950/40 dark:to-slate-800/60',
        className,
      )}
    />
  )
}
