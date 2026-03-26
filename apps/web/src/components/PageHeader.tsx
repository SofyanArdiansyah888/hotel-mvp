import { cn } from '@/lib/utils'

export function PageHeader(props: {
  title: string
  description?: string
  right?: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'rounded-2xl bg-surface-container-lowest px-5 py-4 sm:flex sm:items-end sm:justify-between',
        props.className,
      )}
    >
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{props.title}</h1>
        {props.description ? (
          <p className="text-sm text-on-surface-variant">{props.description}</p>
        ) : null}
      </div>
      {props.right ? <div className="mt-3 flex items-center gap-2 sm:mt-0">{props.right}</div> : null}
    </div>
  )
}

