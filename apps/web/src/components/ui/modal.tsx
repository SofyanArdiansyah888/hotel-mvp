import * as React from 'react'

import { cn } from '@/lib/utils'

type ModalProps = {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  className?: string
}

export function Modal({ open, onClose, title, children, className }: ModalProps) {
  React.useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-[color-mix(in_oklab,var(--on-surface),transparent_78%)] p-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        className={cn(
          'w-full max-w-2xl rounded-[1.25rem] bg-[color-mix(in_oklab,var(--surface-container-lowest),transparent_20%)] p-5 shadow-[0px_12px_32px_rgba(26,28,29,0.06)] backdrop-blur-[12px] outline outline-1 outline-[color-mix(in_oklab,var(--outline-variant),transparent_80%)]',
          className,
        )}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="mb-5 flex items-center justify-between gap-2 pb-3">
          <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
          <button
            className="rounded-md px-2 py-1 text-sm text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-low)]"
            onClick={onClose}
            type="button"
          >
            Tutup
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

