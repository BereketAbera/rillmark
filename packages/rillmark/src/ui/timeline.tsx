import * as React from 'react'
import { cn } from '../lib/rillmark-utils'

/** A chronological list. Supply a visible heading or aria-label for context. */
export function Timeline({ className, ...props }: React.ComponentProps<'ol'>) {
  return <ol data-slot="timeline" className={cn('grid min-w-0 gap-0', className)} {...props}/>
}

export interface TimelineItemProps extends React.ComponentProps<'li'> {
  /** Decorative marker; include its meaning in the item's text. */
  icon?: React.ReactNode
}

export function TimelineItem({ className, icon, children, ...props }: TimelineItemProps) {
  return <li className={cn('relative min-w-0 pb-6 pl-10 last:pb-0 before:absolute before:bottom-0 before:left-3.5 before:top-7 before:w-px before:bg-border last:before:hidden', className)} {...props}>
    <span aria-hidden="true" className="absolute left-0 top-0 inline-flex size-7 items-center justify-center rounded-full border border-border bg-secondary text-secondary-foreground [&_svg]:size-3.5">{icon ?? <span className="size-1.5 rounded-full bg-primary"/>}</span>
    {children}
  </li>
}

export interface TimelineTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  ref?: React.Ref<HTMLHeadingElement>
}

export function TimelineTitle({ as: Tag = 'h3', className, ...props }: TimelineTitleProps) {
  return <Tag className={cn('text-sm font-semibold leading-7 text-foreground', className)} {...props}/>
}

export function TimelineDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return <p className={cn('mt-1 text-sm leading-relaxed text-muted-foreground', className)} {...props}/>
}

export function TimelineTime({ className, ...props }: React.ComponentProps<'time'>) {
  return <time className={cn('mt-1 block text-xs leading-5 text-muted-foreground', className)} {...props}/>
}
