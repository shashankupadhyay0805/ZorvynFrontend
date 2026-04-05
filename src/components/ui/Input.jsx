import clsx from 'clsx'

export default function Input({ className, ...props }) {
  return (
    <input
      className={clsx(
        'h-10 w-full rounded-xl border border-violet-200/70 bg-white/90 px-3 text-sm text-slate-900 shadow-sm outline-none backdrop-blur-sm',
        'placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/25',
        'dark:border-violet-500/20 dark:bg-slate-950/80 dark:text-slate-50 dark:placeholder:text-slate-500 dark:focus:border-violet-400',
        className,
      )}
      {...props}
    />
  )
}
