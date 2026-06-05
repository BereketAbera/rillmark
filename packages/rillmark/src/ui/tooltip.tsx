"use client"

import * as React from "react"
import { Tooltip as TooltipPrimitive } from "radix-ui"
import { cn } from "../lib/rillmark-utils"

export const Tooltip = TooltipPrimitive.Root
export const TooltipTrigger = TooltipPrimitive.Trigger

export function TooltipProvider({ delayDuration = 400, ...props }: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return <TooltipPrimitive.Provider delayDuration={delayDuration} {...props} />
}

export function TooltipContent({ className, sideOffset = 6, collisionPadding = 12, children, ...props }: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content sideOffset={sideOffset} collisionPadding={collisionPadding} className={cn("z-50 max-w-64 rounded-lg border border-border bg-foreground px-3 py-2 text-xs leading-relaxed text-background shadow-md motion-safe:data-[state=delayed-open]:animate-rm-enter", className)} {...props}>
      {children}
      <TooltipPrimitive.Arrow className="fill-foreground" />
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
}
