"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"
import { useFieldControl } from "@/components/ui/field"

export function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  const control = useFieldControl(props)
  return (
    <SwitchPrimitive.Root data-slot="switch" {...props} {...control} className={cn("group inline-flex h-11 w-12 shrink-0 items-center rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50", className)}>
      <span className="inline-flex h-7 w-12 items-center rounded-full border border-input bg-muted p-0.5 transition-colors group-data-[state=checked]:border-primary group-data-[state=checked]:bg-primary group-aria-invalid:border-destructive motion-reduce:transition-none">
        <SwitchPrimitive.Thumb className="block size-5 rounded-full bg-card shadow-sm transition-transform duration-150 data-[state=checked]:translate-x-5 motion-reduce:transition-none" />
      </span>
    </SwitchPrimitive.Root>
  )
}
