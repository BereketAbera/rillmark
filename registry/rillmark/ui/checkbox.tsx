"use client"

import * as React from "react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"
import { useFieldControl } from "@/components/ui/field"

export function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  const control = useFieldControl(props)
  return (
    <CheckboxPrimitive.Root data-slot="checkbox" {...props} {...control} className={cn("group inline-flex size-11 shrink-0 items-center justify-center rounded-xl outline-none transition-colors hover:bg-accent/60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none", className)}>
      <span className="flex size-5 items-center justify-center rounded-[6px] rounded-tr-[2px] border border-input bg-card text-primary-foreground transition-colors group-aria-invalid:border-destructive group-data-[state=checked]:border-primary group-data-[state=checked]:bg-primary group-data-[state=indeterminate]:border-primary group-data-[state=indeterminate]:bg-primary motion-reduce:transition-none">
        <CheckboxPrimitive.Indicator className="flex items-center justify-center">
          <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5 fill-none stroke-current stroke-2"><path className="group-data-[state=indeterminate]:hidden" d="m3 8 3 3 7-7" /><path className="hidden group-data-[state=indeterminate]:block" d="M3 8h10" /></svg>
        </CheckboxPrimitive.Indicator>
      </span>
    </CheckboxPrimitive.Root>
  )
}
