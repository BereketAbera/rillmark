import * as React from 'react'
import { cn } from '@/lib/rillmark-utils'
export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> { orientation?: 'horizontal' | 'vertical' }
export function ButtonGroup({ orientation = 'horizontal', className, ...props }: ButtonGroupProps) {
  return <div role="group" className={cn('inline-flex gap-1 rounded-2xl rounded-tr-md border border-border bg-muted p-1', orientation === 'vertical' ? 'flex-col' : 'flex-wrap items-center', className)} {...props}/>
}
