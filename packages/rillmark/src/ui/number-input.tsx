"use client"

import * as React from 'react'
import { Minus, Plus } from 'lucide-react'
import { cn } from '../lib/rillmark-utils'
import { useFieldControl } from './field'

export interface NumberInputProps extends Omit<React.ComponentProps<'input'>, 'type' | 'value' | 'defaultValue' | 'min' | 'max' | 'step'> {
  value?: number | ''
  defaultValue?: number | ''
  onValueChange?: (value: number | '') => void
  min?: number
  max?: number
  step?: number
  decrementLabel?: string
  incrementLabel?: string
}

/** A native number field that permits empty editing and clamps on blur. */
export function NumberInput({ value, defaultValue = '', onValueChange, min, max, step = 1, decrementLabel = 'Decrease value', incrementLabel = 'Increase value', className, ref, onChange, onBlur, ...props }: NumberInputProps) {
  const control = useFieldControl(props)
  const inputRef = React.useRef<HTMLInputElement>(null)
  React.useImperativeHandle(ref, () => inputRef.current!, [])
  const [internal, setInternal] = React.useState<number | ''>(defaultValue)
  const current = value ?? internal
  const controlled = value !== undefined
  const increment = Number.isFinite(step) && step > 0 ? step : 1
  const commit = (next: number | '') => {
    if (!controlled) setInternal(next)
    if (next !== current) onValueChange?.(next)
  }
  React.useEffect(() => {
    const form = inputRef.current?.form
    if (!form || controlled) return
    const reset = () => setInternal(defaultValue)
    form.addEventListener('reset', reset)
    return () => form.removeEventListener('reset', reset)
  }, [controlled, defaultValue])
  const clamp = (number: number) => Math.min(max ?? Infinity, Math.max(min ?? -Infinity, number))
  function changeBy(direction: number) {
    const input = inputRef.current
    if (!input || control.disabled || props.readOnly) return
    if (direction > 0) input.stepUp(); else input.stepDown()
    if (Number.isFinite(input.valueAsNumber)) commit(clamp(input.valueAsNumber))
    input.focus()
  }
  const unavailable = control.disabled || props.readOnly
  const buttonClass = 'inline-flex size-11 shrink-0 items-center justify-center rounded-lg text-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-40'
  return <div data-slot="number-input" className={cn('flex min-w-0 items-center gap-1 rounded-xl border border-input bg-card p-1 text-foreground focus-within:border-ring has-[[aria-invalid=true]]:border-destructive', className)}>
    <button type="button" aria-label={decrementLabel} aria-controls={control.id} className={buttonClass} disabled={unavailable || (current !== '' && min !== undefined && current <= min)} onClick={() => changeBy(-1)}><Minus className="size-4" aria-hidden="true"/></button>
    <input {...props} {...control} ref={inputRef} type="number" min={min} max={max} step={increment} value={current} className="h-11 w-full min-w-0 rounded-md bg-transparent px-2 text-center text-base tabular-nums outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" onChange={(event) => {
      onChange?.(event)
      if (!event.defaultPrevented) commit(Number.isFinite(event.currentTarget.valueAsNumber) ? event.currentTarget.valueAsNumber : '')
    }} onBlur={(event) => {
      onBlur?.(event)
      if (!event.defaultPrevented && !props.readOnly && !control.disabled && Number.isFinite(event.currentTarget.valueAsNumber)) commit(clamp(event.currentTarget.valueAsNumber))
    }}/>
    <button type="button" aria-label={incrementLabel} aria-controls={control.id} className={buttonClass} disabled={unavailable || (current !== '' && max !== undefined && current >= max)} onClick={() => changeBy(1)}><Plus className="size-4" aria-hidden="true"/></button>
  </div>
}
