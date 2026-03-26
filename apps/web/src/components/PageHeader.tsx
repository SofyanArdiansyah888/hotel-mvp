import { cn } from '@/lib/utils'

export function PageHeader(props: {
  title: string
  description?: string
  right?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between', props.className)}>
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{props.title}</h1>
        {props.description ? (
          <p className="text-sm text-muted-foreground">{props.description}</p>
        ) : null}
      </div>
      {props.right ? <div className="flex items-center gap-2">{props.right}</div> : null}
    </div>
  )
}

