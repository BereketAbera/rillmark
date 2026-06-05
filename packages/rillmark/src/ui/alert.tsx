import * as React from 'react'
import { cn } from '../lib/rillmark-utils'
export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> { variant?: 'soft' | 'accent' | 'danger' }
export function Alert({ className, variant = 'soft', role, ...props }: AlertProps) {
  return <div role={role ?? (variant === 'danger' ? 'alert' : 'status')} className={cn('rounded-xl rounded-tr-[5px] border p-4 text-sm', { soft: 'border-primary/25 bg-secondary text-secondary-foreground', accent: 'border-accent-foreground/25 bg-accent text-accent-foreground', danger: 'border-destructive/30 bg-destructive/10 text-destructive' }[variant], className)} {...props}/>
}
export function AlertTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) { return <h3 className={cn('mb-1 font-semibold', className)} {...props}/> }
export function AlertDescription({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cn('leading-relaxed [&_a]:underline [&_a]:underline-offset-4', className)} {...props}/> }
