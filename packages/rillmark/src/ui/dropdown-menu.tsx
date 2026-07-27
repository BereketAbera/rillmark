"use client"

import * as React from "react"
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui"
import { Check, ChevronRight, Circle } from "lucide-react"
import { cn } from "../lib/rillmark-utils"

export const DropdownMenu = DropdownMenuPrimitive.Root
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
export const DropdownMenuGroup = DropdownMenuPrimitive.Group
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup
export const DropdownMenuSub = DropdownMenuPrimitive.Sub

const contentStyles = "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-48 max-w-[calc(100vw-1.5rem)] overflow-y-auto rounded-xl rounded-tr-(--radius-corner) border border-border bg-popover p-1.5 text-popover-foreground shadow-overlay motion-safe:data-[state=open]:animate-rm-enter motion-safe:data-[state=closed]:animate-rm-exit"
const itemStyles = "relative flex min-h-11 cursor-default select-none items-center gap-2 rounded-md px-3 py-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0"

export function DropdownMenuContent({ className, sideOffset = 6, collisionPadding = 12, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content sideOffset={sideOffset} collisionPadding={collisionPadding} className={cn(contentStyles, className)} {...props} />
  </DropdownMenuPrimitive.Portal>
}

export type DropdownMenuItemProps = React.ComponentProps<typeof DropdownMenuPrimitive.Item> & { variant?: "default" | "danger"; inset?: boolean }

export function DropdownMenuItem({ className, inset, variant = "default", ...props }: DropdownMenuItemProps) {
  return <DropdownMenuPrimitive.Item className={cn(itemStyles, inset && "pl-9", variant === "danger" && "text-destructive focus:bg-destructive/10 focus:text-destructive", className)} {...props} />
}

export function DropdownMenuCheckboxItem({ className, children, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return <DropdownMenuPrimitive.CheckboxItem className={cn(itemStyles, "pl-9", className)} {...props}>
    <span className="absolute left-3 flex size-4 items-center justify-center"><DropdownMenuPrimitive.ItemIndicator><Check aria-hidden="true" size={16} /></DropdownMenuPrimitive.ItemIndicator></span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
}

export function DropdownMenuRadioItem({ className, children, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return <DropdownMenuPrimitive.RadioItem className={cn(itemStyles, "pl-9", className)} {...props}>
    <span className="absolute left-3 flex size-4 items-center justify-center"><DropdownMenuPrimitive.ItemIndicator><Circle aria-hidden="true" size={8} fill="currentColor" /></DropdownMenuPrimitive.ItemIndicator></span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
}

export function DropdownMenuLabel({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Label>) {
  return <DropdownMenuPrimitive.Label className={cn("px-3 py-2 text-xs font-semibold text-muted-foreground", className)} {...props} />
}

export function DropdownMenuSeparator({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return <DropdownMenuPrimitive.Separator className={cn("-mx-1.5 my-1.5 h-px bg-border", className)} {...props} />
}

export function DropdownMenuSubTrigger({ className, children, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger>) {
  return <DropdownMenuPrimitive.SubTrigger className={cn(itemStyles, "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground", className)} {...props}>
    {children}<ChevronRight aria-hidden="true" className="ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
}

export function DropdownMenuSubContent({ className, collisionPadding = 12, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.SubContent collisionPadding={collisionPadding} className={cn(contentStyles, className)} {...props} />
  </DropdownMenuPrimitive.Portal>
}
