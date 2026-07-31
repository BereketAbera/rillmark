"use client"

import * as React from 'react'
import { Slot } from 'radix-ui'
import { cn } from '../lib/rillmark-utils'

export type ButtonVariant = 'solid' | 'soft' | 'outline' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'
const variants: Record<ButtonVariant, string> = {
  solid: 'border-transparent bg-primary text-primary-foreground hover:brightness-110',
  soft: 'border-transparent bg-secondary text-secondary-foreground hover:brightness-95 dark:hover:brightness-110',
  outline: 'border-input bg-transparent text-foreground hover:bg-secondary',
  ghost: 'border-transparent bg-transparent text-foreground hover:bg-secondary',
  danger: 'border-transparent bg-destructive text-destructive-foreground hover:brightness-110',
}
const sizes: Record<ButtonSize, string> = { sm: 'min-h-9 px-3 text-sm', md: 'min-h-11 px-4 text-sm', lg: 'min-h-12 px-5 text-base' }

export function buttonVariants({ variant = 'solid', size = 'md', className }: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}) {
  return cn('inline-flex shrink-0 items-center justify-center gap-2 rounded-xl rounded-tr-(--radius-corner) border font-medium leading-snug transition-[filter] duration-(--duration-fast) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 motion-reduce:transition-none [&_svg]:size-4 [&_svg]:shrink-0', variants[variant], sizes[size], className)
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Keeps the label visible and prevents repeated submission. */
  loading?: boolean
  /** Compose a single element, such as an anchor. */
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button({ className, variant, size, loading = false, disabled, asChild = false, children, onClick, type = 'button', ...props }, ref) {
  const Component = asChild ? Slot.Root : 'button'
  const unavailable = disabled || loading
  const preventActivation = (event: React.SyntheticEvent) => { event.preventDefault(); event.stopPropagation() }
  // Slot normally calls the child's handler first. A disabled composed link must
  // block activation before either handler runs, including keyboard-generated clicks.
  const content = asChild && unavailable && React.isValidElement(children)
    ? React.cloneElement(children as React.ReactElement<React.HTMLAttributes<HTMLElement>>, {
      'aria-disabled': true,
      tabIndex: -1,
      onClickCapture: preventActivation,
      onClick: preventActivation,
      onKeyDown: (event) => { if (event.key === 'Enter' || event.key === ' ') preventActivation(event) },
      onKeyUp: (event) => { if (event.key === 'Enter' || event.key === ' ') preventActivation(event) },
    })
    : children
  return <Component ref={ref} className={buttonVariants({ variant, size, className })} type={asChild ? undefined : type} disabled={asChild ? undefined : unavailable} aria-disabled={unavailable || undefined} aria-busy={loading || undefined} onClick={(event) => { if (unavailable) { event.preventDefault(); return } onClick?.(event) }} {...props}>
    {asChild ? content : <>{loading && <svg aria-hidden="true" className="motion-safe:animate-spin" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" opacity=".25"/><path d="M12 3a9 9 0 0 1 9 9" stroke="currentColor" strokeWidth="2"/></svg>}{children}</>}
  </Component>
})
