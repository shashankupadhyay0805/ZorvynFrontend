import { useEffect } from 'react'
import clsx from 'clsx'

export default function Modal({ open, title, description, onClose, children, className }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Close modal"
        className="absolute inset-0 bg-slate-950/55 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="relative mx-auto flex min-h-full max-w-2xl items-center px-4 py-10">
        <div
          className={clsx(
            'w-full rounded-2xl border border-violet-200/50 bg-white/95 p-5 shadow-glow backdrop-blur-xl',
            'dark:border-violet-500/20 dark:bg-slate-950/95',
            className,
          )}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          {(title || description) && (
            <div className="mb-4">
              {title && (
                <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-lg font-bold text-transparent dark:from-violet-400 dark:to-fuchsia-400">
                  {title}
                </div>
              )}
              {description && (
                <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">{description}</div>
              )}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  )
}
