import * as React from 'react'
import { cn } from '@/lib/rillmark-utils'
export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> { containerLabel?: string }
export function Table({ className, containerLabel = 'Scrollable table', ...props }: TableProps) { return <div role="region" aria-label={containerLabel} tabIndex={0} className="w-full overflow-x-auto rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><table className={cn('w-full caption-bottom text-left text-sm', className)} {...props}/></div> }
export function TableHeader({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) { return <thead className={cn('border-b border-border bg-muted/60', className)} {...props}/> }
export function TableBody({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) { return <tbody className={cn('[&_tr:last-child]:border-0', className)} {...props}/> }
export function TableFooter({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) { return <tfoot className={cn('border-t border-border bg-muted font-medium', className)} {...props}/> }
export function TableRow({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) { return <tr className={cn('border-b border-border transition-colors hover:bg-muted/50 data-[selected=true]:bg-secondary motion-reduce:transition-none', className)} {...props}/> }
export function TableHead({ className, scope = 'col', ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) { return <th scope={scope} className={cn('h-11 whitespace-nowrap px-4 text-xs font-medium text-muted-foreground', className)} {...props}/> }
export function TableCell({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) { return <td className={cn('px-4 py-4 align-middle', className)} {...props}/> }
export function TableCaption({ className, ...props }: React.HTMLAttributes<HTMLTableCaptionElement>) { return <caption className={cn('p-4 text-left text-sm text-muted-foreground', className)} {...props}/> }
