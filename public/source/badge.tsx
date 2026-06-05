import * as React from 'react'
import { cn } from '../lib/rillmark-utils'
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> { variant?: 'soft' | 'outline' | 'accent' | 'danger' }
export function Badge({ className, variant = 'soft', ...props }: BadgeProps) {
  return <span className={cn('inline-flex max-w-full items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium leading-5', { soft: 'border-transparent bg-secondary text-secondary-foreground', outline: 'border-border text-muted-foreground', accent: 'border-transparent bg-accent text-accent-foreground', danger: 'border-destructive/25 bg-destructive/10 text-destructive' }[variant], className)} {...props}/>
}
