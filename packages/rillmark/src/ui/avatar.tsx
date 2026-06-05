"use client"
import * as React from 'react'
import { Avatar as Primitive } from 'radix-ui'
import { cn } from '../lib/rillmark-utils'
export function Avatar({ className, ...props }: React.ComponentProps<typeof Primitive.Root>) { return <Primitive.Root className={cn('relative inline-flex size-10 shrink-0 overflow-hidden rounded-full border border-border', className)} {...props}/> }
export function AvatarImage({ className, ...props }: React.ComponentProps<typeof Primitive.Image>) { return <Primitive.Image className={cn('size-full object-cover', className)} {...props}/> }
export function AvatarFallback({ className, ...props }: React.ComponentProps<typeof Primitive.Fallback>) { return <Primitive.Fallback className={cn('flex size-full items-center justify-center bg-secondary text-xs font-semibold text-secondary-foreground', className)} {...props}/> }
