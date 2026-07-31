"use client"

import * as React from 'react'
import { Check } from 'lucide-react'
import { cn } from '../lib/rillmark-utils'

export interface StepperStep {
  id: string
  title: string
  description?: string
  disabled?: boolean
}

export interface StepperProps extends Omit<React.ComponentProps<'nav'>, 'onChange'> {
  steps: StepperStep[]
  /** The id of the current step. */
  value: string
  /** Omit for a noninteractive progress indicator. Validation belongs to the application. */
  onValueChange?: (value: string) => void
}

/** An ordered progress trail, optionally allowing navigation between steps. */
export function Stepper({ steps, value, onValueChange, className, 'aria-label': label = 'Steps', ...props }: StepperProps) {
  const current = steps.findIndex((step) => step.id === value)
  return <nav aria-label={label} data-slot="stepper" className={cn('min-w-0', className)} {...props}>
    <ol className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">{steps.map((step, index) => {
      const active = index === current
      const completed = current >= 0 && index < current
      const contents = <><span aria-hidden="true" className={cn('inline-flex size-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold', active ? 'border-primary bg-primary text-primary-foreground' : completed ? 'border-secondary bg-secondary text-secondary-foreground' : 'border-input bg-card text-muted-foreground')}>{completed ? <Check className="size-4"/> : index + 1}</span><span className="min-w-0 text-left"><span className="block text-sm font-medium">{step.title}{completed && <span className="sr-only">, completed</span>}</span>{step.description && <span className="mt-0.5 block text-xs text-muted-foreground">{step.description}</span>}</span></>
      return <li key={step.id} className="min-w-0 flex-1">{onValueChange ? <button type="button" aria-current={active ? 'step' : undefined} disabled={step.disabled} onClick={() => onValueChange(step.id)} className="flex min-h-11 w-full items-center gap-3 rounded-lg p-1 text-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">{contents}</button> : <div aria-current={active ? 'step' : undefined} className="flex min-h-11 items-center gap-3 p-1 text-foreground">{contents}</div>}</li>
    })}</ol>
  </nav>
}
