import * as React from 'react'
import { cn } from '@/lib/rillmark-utils'
export function Breadcrumbs({ className, ...props }: React.ComponentProps<'nav'>) { return <nav aria-label="Breadcrumb" className={className} {...props}/> }
export function BreadcrumbList({ className, ...props }: React.ComponentProps<'ol'>) { return <ol className={cn('flex flex-wrap items-center gap-1 text-sm text-muted-foreground', className)} {...props}/> }
export function BreadcrumbItem({ className, ...props }: React.ComponentProps<'li'>) { return <li className={cn('inline-flex min-w-0 items-center gap-1', className)} {...props}/> }
export function BreadcrumbLink({ className, ...props }: React.ComponentProps<'a'>) { return <a className={cn('inline-flex min-h-11 items-center rounded-md px-2 underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', className)} {...props}/> }
export function BreadcrumbPage({ className, ...props }: React.ComponentProps<'span'>) { return <span aria-current="page" className={cn('px-2 font-medium text-foreground', className)} {...props}/> }
export function BreadcrumbSeparator({ className, ...props }: React.ComponentProps<'li'>) { return <li aria-hidden="true" role="presentation" className={cn('select-none px-1', className)} {...props}>/</li> }
