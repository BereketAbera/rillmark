"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "radix-ui"
import { cn } from "../lib/rillmark-utils"
import { useFieldControl } from "./field"

export function Select(props: React.ComponentProps<typeof SelectPrimitive.Root>) {
  const control = useFieldControl(props)
  return <SelectPrimitive.Root {...props} required={control.required} disabled={control.disabled} />
}

export const SelectGroup = SelectPrimitive.Group
export const SelectValue = SelectPrimitive.Value

export function SelectTrigger({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  const control = useFieldControl(props)
  return (
    <SelectPrimitive.Trigger data-slot="select-trigger" {...props} id={control.id} disabled={control.disabled} aria-invalid={control["aria-invalid"]} aria-labelledby={control["aria-labelledby"]} aria-describedby={control["aria-describedby"]} className={cn("flex h-11 w-full min-w-0 items-center justify-between gap-2 rounded-xl rounded-tr-[5px] border border-input bg-card px-3.5 text-sm text-foreground shadow-xs outline-none transition-[border-color,box-shadow] data-[placeholder]:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive [&>span]:truncate motion-reduce:transition-none", className)}>
      {children}
      <SelectPrimitive.Icon asChild><Chevron /></SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function Chevron({ className, ...props }: React.ComponentProps<"svg">) {
  return <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className={cn("size-4 shrink-0", className)} {...props}><path d="m4 6 4 4 4-4" /></svg>
}

export function SelectContent({ className, children, position = "popper", sideOffset = 6, ...props }: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content data-slot="select-content" position={position} sideOffset={sideOffset} className={cn("relative z-50 max-h-[var(--radix-select-content-available-height)] min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-xl rounded-tr-[5px] border border-border bg-popover text-popover-foreground shadow-lg", className)} {...props}>
        <SelectPrimitive.ScrollUpButton className="flex h-7 cursor-default items-center justify-center"><Chevron className="rotate-180" /></SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport className="p-1.5">{children}</SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton className="flex h-7 cursor-default items-center justify-center"><Chevron /></SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

export function SelectItem({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item data-slot="select-item" className={cn("relative flex min-h-11 w-full cursor-default items-center rounded-lg py-2 pr-3 pl-9 text-sm outline-none select-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className)} {...props}>
      <span className="absolute left-3 flex size-4 items-center justify-center"><SelectPrimitive.ItemIndicator><svg aria-hidden="true" viewBox="0 0 16 16" className="size-4 fill-none stroke-current stroke-2"><path d="m3 8 3 3 7-7" /></svg></SelectPrimitive.ItemIndicator></span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

export function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return <SelectPrimitive.Label className={cn("px-3 py-2 text-xs font-semibold tracking-wide text-muted-foreground", className)} {...props} />
}

export function SelectSeparator({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return <SelectPrimitive.Separator className={cn("my-1 h-px bg-border", className)} {...props} />
}
