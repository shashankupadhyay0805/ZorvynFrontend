import { useEffect } from 'react'

export function useThemeClass(theme) {
  useEffect(() => {
    const root = document.documentElement

    const apply = () => {
      const prefersDark =
        window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

      const isDark = theme === 'dark' || (theme === 'system' && prefersDark)
      root.classList.toggle('dark', isDark)
    }

    apply()

    if (theme !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => apply()
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [theme])
}

