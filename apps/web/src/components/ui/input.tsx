import * as React from 'react'

import { cn } from '@/lib/utils'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          'flex h-10 w-full rounded-[0.5rem] bg-[var(--surface-container-high)] px-3 py-2 text-sm text-[var(--on-surface)] shadow-none outline-none placeholder:text-[color-mix(in_oklab,var(--on-surface-variant),transparent_15%)] transition-[background-color,outline-color] focus:bg-[var(--surface-container-lowest)] focus:outline focus:outline-1 focus:outline-[color-mix(in_oklab,var(--primary),transparent_80%)] disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

