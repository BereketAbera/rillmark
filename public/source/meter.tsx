import * as React from 'react'
import { cn } from '../lib/rillmark-utils'

export interface MeterProps extends Omit<React.ComponentProps<'meter'>, 'min' | 'max' | 'value'> {
  min?: number
  max?: number
  value: number
}

/** A measurement within a known range. Use Progress for task completion. */
export function Meter({ className, min = 0, max = 100, value, children, ...props }: MeterProps) {
  const start = Number.isFinite(min) ? min : 0
  const end = Number.isFinite(max) && max > start ? max : start + 100
  const normalized = Number.isFinite(value) ? Math.min(end, Math.max(start, value)) : start
  return <meter data-slot="meter" min={start} max={end} value={normalized} className={cn('block h-3 w-full overflow-hidden rounded-full [&::-webkit-meter-bar]:rounded-full [&::-webkit-meter-bar]:border-0 [&::-webkit-meter-bar]:bg-muted [&::-webkit-meter-optimum-value]:rounded-full [&::-webkit-meter-optimum-value]:bg-primary [&::-webkit-meter-suboptimum-value]:rounded-full [&::-webkit-meter-suboptimum-value]:bg-accent-foreground [&::-webkit-meter-even-less-good-value]:rounded-full [&::-webkit-meter-even-less-good-value]:bg-destructive [&::-moz-meter-bar]:rounded-full [&::-moz-meter-bar]:bg-primary', className)} {...props}>{children ?? `${normalized} of ${end}`}</meter>
}
