import clsx from 'clsx'

const labelStyles =
  'block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400'

/** Small uppercase label for form fields (mobile-friendly). */
export default function FieldLabel({ htmlFor, children, className, as }) {
  const Component = as || (htmlFor ? 'label' : 'span')
  const props =
    Component === 'label' && htmlFor ? { htmlFor } : {}

  return (
    <Component className={clsx(labelStyles, className)} {...props}>
      {children}
    </Component>
  )
}
