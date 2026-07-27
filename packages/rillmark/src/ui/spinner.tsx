import * as React from 'react'
import { cn } from '../lib/rillmark-utils'

export interface SpinnerProps extends React.ComponentProps<'span'> {
  label?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Spinner({ label = 'Loading', size = 'md', className, ...props }: SpinnerProps) {
  return <span data-slot="spinner" role="status" className={cn('inline-flex shrink-0 items-center justify-center text-primary', className)} {...props}>
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={cn('motion-safe:animate-spin', size === 'sm' ? 'size-4' : size === 'lg' ? 'size-8' : 'size-5')}><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" opacity=".25"/><path d="M12 3a9 9 0 0 1 9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
    <span className="sr-only">{label}</span>
  </span>
}
