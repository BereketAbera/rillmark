"use client"
import * as React from 'react'
import { Progress as Primitive } from 'radix-ui'
import { cn } from '@/lib/rillmark-utils'
export function Progress({ className, value, max = 100, ...props }: React.ComponentProps<typeof Primitive.Root>) {
  const limit = max > 0 ? max : 100
  const normalized = value == null ? null : Math.min(limit, Math.max(0, value))
  return <Primitive.Root max={limit} value={normalized} className={cn('relative h-2.5 w-full overflow-hidden rounded-full bg-muted', className)} {...props}>
    <Primitive.Indicator className={cn('h-full rounded-full bg-primary transition-[width] duration-200 motion-reduce:transition-none', normalized === null && 'w-1/3 motion-safe:animate-pulse')} style={normalized === null ? undefined : { width: `${normalized / limit * 100}%` }}/>
  </Primitive.Root>
}
