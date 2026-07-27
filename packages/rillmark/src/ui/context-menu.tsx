"use client"

import * as React from "react"
import { ContextMenu as ContextMenuPrimitive } from "radix-ui"
import { Check, ChevronRight, Circle } from "lucide-react"
import { cn } from "../lib/rillmark-utils"

export const ContextMenu = ContextMenuPrimitive.Root
export const ContextMenuGroup = ContextMenuPrimitive.Group
export const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup
export const ContextMenuSub = ContextMenuPrimitive.Sub

export function ContextMenuTrigger({ className, tabIndex = 0, disabled, onKeyDown, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Trigger>) {
  return <ContextMenuPrimitive.Trigger {...props} disabled={disabled} tabIndex={disabled ? -1 : tabIndex} aria-haspopup="menu" className={cn("rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background", className)} onKeyDown={(event) => {
    onKeyDown?.(event)
    if (event.defaultPrevented || disabled || !(event.key === "ContextMenu" || (event.shiftKey && event.key === "F10"))) return
    event.preventDefault()
    const bounds = event.currentTarget.getBoundingClientRect()
    event.currentTarget.dispatchEvent(new MouseEvent("contextmenu", { bubbles: true, cancelable: true, clientX: bounds.left + bounds.width / 2, clientY: bounds.bottom }))
  }} />
}

const contentStyles = "z-50 max-h-[var(--radix-context-menu-content-available-height)] min-w-48 max-w-[calc(100vw-1.5rem)] overflow-y-auto rounded-xl rounded-tr-(--radius-corner) border border-border bg-popover p-1.5 text-popover-foreground shadow-xl motion-safe:data-[state=open]:animate-rm-enter motion-safe:data-[state=closed]:animate-rm-exit"
const itemStyles = "relative flex min-h-11 cursor-default select-none items-center gap-2 rounded-md px-3 py-2 text-sm outline-none transition-colors duration-(--duration-fast) focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 motion-reduce:transition-none [&>svg]:size-4 [&>svg]:shrink-0"

export function ContextMenuContent({ className, collisionPadding = 12, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Content>) {
  return <ContextMenuPrimitive.Portal><ContextMenuPrimitive.Content collisionPadding={collisionPadding} className={cn(contentStyles, className)} {...props} /></ContextMenuPrimitive.Portal>
}

export type ContextMenuItemProps = React.ComponentProps<typeof ContextMenuPrimitive.Item> & { variant?: "default" | "danger"; inset?: boolean }
export function ContextMenuItem({ className, inset, variant = "default", ...props }: ContextMenuItemProps) {
  return <ContextMenuPrimitive.Item className={cn(itemStyles, inset && "pl-9", variant === "danger" && "text-destructive focus:bg-destructive/10 focus:text-destructive", className)} {...props} />
}

export function ContextMenuCheckboxItem({ className, children, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>) {
  return <ContextMenuPrimitive.CheckboxItem className={cn(itemStyles, "pl-9", className)} {...props}><span className="absolute left-3 flex size-4 items-center justify-center"><ContextMenuPrimitive.ItemIndicator><Check aria-hidden="true" size={16} /></ContextMenuPrimitive.ItemIndicator></span>{children}</ContextMenuPrimitive.CheckboxItem>
}

export function ContextMenuRadioItem({ className, children, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.RadioItem>) {
  return <ContextMenuPrimitive.RadioItem className={cn(itemStyles, "pl-9", className)} {...props}><span className="absolute left-3 flex size-4 items-center justify-center"><ContextMenuPrimitive.ItemIndicator><Circle aria-hidden="true" size={8} fill="currentColor" /></ContextMenuPrimitive.ItemIndicator></span>{children}</ContextMenuPrimitive.RadioItem>
}

export function ContextMenuLabel({ className, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Label>) {
  return <ContextMenuPrimitive.Label className={cn("px-3 py-2 text-xs font-semibold text-muted-foreground", className)} {...props} />
}

export function ContextMenuSeparator({ className, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Separator>) {
  return <ContextMenuPrimitive.Separator className={cn("-mx-1.5 my-1.5 h-px bg-border", className)} {...props} />
}

export function ContextMenuSubTrigger({ className, children, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger>) {
  return <ContextMenuPrimitive.SubTrigger className={cn(itemStyles, "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground", className)} {...props}>{children}<ChevronRight aria-hidden="true" className="ml-auto" /></ContextMenuPrimitive.SubTrigger>
}

export function ContextMenuSubContent({ className, collisionPadding = 12, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.SubContent>) {
  return <ContextMenuPrimitive.Portal><ContextMenuPrimitive.SubContent collisionPadding={collisionPadding} className={cn(contentStyles, className)} {...props} /></ContextMenuPrimitive.Portal>
}
