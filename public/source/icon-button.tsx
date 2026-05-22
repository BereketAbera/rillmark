"use client"
import * as React from 'react'
import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/rillmark-utils'

export interface IconButtonProps extends Omit<ButtonProps, 'asChild'> {
  /** Required accessible name; tooltip is optional. */
  label: string
}
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton({ label, className, size = 'md', ...props }, ref) {
  return <Button ref={ref} aria-label={label} size={size} className={cn('p-0', size === 'sm' ? 'size-9' : size === 'lg' ? 'size-12' : 'size-11', className)} {...props}/>
})
