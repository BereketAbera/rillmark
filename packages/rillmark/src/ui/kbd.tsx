import * as React from 'react'
import { cn } from '../lib/rillmark-utils'

/** A key or shortcut hint. This component does not register keyboard shortcuts. */
export function Kbd({ className, ...props }: React.ComponentProps<'kbd'>) {
  return <kbd data-slot="kbd" className={cn('inline-flex min-h-6 min-w-6 items-center justify-center rounded-md border border-border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground shadow-xs', className)} {...props}/>
}
