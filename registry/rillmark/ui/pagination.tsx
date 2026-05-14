"use client"
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
export interface PaginationProps extends Omit<React.ComponentProps<'nav'>, 'onChange'> { page: number; pageCount: number; onPageChange: (page: number) => void }
export function Pagination({ page, pageCount, onPageChange, className, ...props }: PaginationProps) {
  const total = Math.max(1, Math.floor(pageCount))
  const current = Math.min(total, Math.max(1, page))
  return <nav aria-label="Pagination" className={cn('flex flex-wrap items-center justify-between gap-3', className)} {...props}>
    <Button variant="outline" disabled={current <= 1} onClick={() => onPageChange(current - 1)}>← Previous</Button>
    <span className="text-sm text-muted-foreground" aria-live="polite">Page <strong className="font-medium text-foreground">{current}</strong> of {total}</span>
    <Button variant="outline" disabled={current >= total} onClick={() => onPageChange(current + 1)}>Next →</Button>
  </nav>
}
