import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[transform,background-color,box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:translate-y-px',
  {
    variants: {
      variant: {
        default:
          'bg-[linear-gradient(135deg,var(--primary),var(--primary-container))] text-[var(--on-primary)] hover:brightness-110',
        secondary:
          'bg-[var(--secondary-container)] text-[var(--on-secondary-container)] hover:brightness-105',
        outline:
          'bg-[color-mix(in_oklab,var(--surface-container-lowest),transparent_6%)] text-[var(--on-surface)] outline outline-1 outline-[color-mix(in_oklab,var(--outline-variant),transparent_80%)] hover:bg-[var(--surface-container-low)]',
        destructive:
          'bg-[color-mix(in_oklab,var(--danger),#ffffff_12%)] text-white hover:brightness-105',
        ghost: 'text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-low)]',
        link:
          'text-[var(--primary-container)] underline-offset-4 hover:text-[var(--primary)] hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = 'button', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

