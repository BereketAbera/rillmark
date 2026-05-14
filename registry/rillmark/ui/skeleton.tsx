import * as React from 'react'
import { cn } from '@/lib/utils'
/** Decorative placeholder. Give its containing region aria-busy and a loading label. */
export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div aria-hidden="true" className={cn('rounded-md bg-muted motion-safe:animate-pulse', className)} {...props}/> }
