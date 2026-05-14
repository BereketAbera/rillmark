"use client"

import * as React from "react"
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"
import { useFieldControl } from "@/components/ui/field"

export function RadioGroup({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  const control = useFieldControl(props)
  return <RadioGroupPrimitive.Root data-slot="radio-group" {...props} {...control} className={cn("grid gap-1", className)} />
}

export function RadioGroupItem({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item data-slot="radio-group-item" {...props} className={cn("group inline-flex size-11 shrink-0 items-center justify-center rounded-xl outline-none transition-colors hover:bg-accent/60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none", className)}>
      <span className="flex size-5 items-center justify-center rounded-full border border-input bg-card group-data-[state=checked]:border-primary group-aria-invalid:border-destructive">
        <RadioGroupPrimitive.Indicator className="size-2.5 rounded-full bg-primary" />
      </span>
    </RadioGroupPrimitive.Item>
  )
}
