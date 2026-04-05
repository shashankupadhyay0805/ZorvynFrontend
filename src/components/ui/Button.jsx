import clsx from 'clsx'

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  children,
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl font-semibold tracking-tight transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]'
  const sizes = {
    sm: 'h-9 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-11 px-5 text-sm',
  }
  const variants = {
    primary:
      'bg-gradient-to-r from-violet-600 via-violet-600 to-fuchsia-600 text-white shadow-md shadow-violet-500/25 hover:shadow-lg hover:shadow-violet-500/30 hover:brightness-105 dark:from-violet-500 dark:to-fuchsia-500',
    secondary:
      'border border-violet-200/80 bg-white/90 text-violet-950 shadow-sm hover:border-violet-300 hover:bg-violet-50/90 dark:border-violet-500/20 dark:bg-slate-800/80 dark:text-slate-100 dark:hover:bg-slate-800',
    ghost:
      'bg-transparent text-slate-700 hover:bg-violet-100/60 dark:text-slate-200 dark:hover:bg-violet-950/50',
    danger:
      'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md shadow-rose-500/25 hover:brightness-105',
  }

  return (
    <button
      className={clsx(base, sizes[size], variants[variant], className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
