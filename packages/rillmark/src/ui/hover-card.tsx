"use client"

import * as React from "react"
import { HoverCard as HoverCardPrimitive } from "radix-ui"
import { cn } from "../lib/rillmark-utils"

export const HoverCard = HoverCardPrimitive.Root
export const HoverCardTrigger = HoverCardPrimitive.Trigger

export function HoverCardContent({ className, sideOffset = 8, collisionPadding = 12, ...props }: React.ComponentProps<typeof HoverCardPrimitive.Content>) {
  return <HoverCardPrimitive.Portal>
    <HoverCardPrimitive.Content sideOffset={sideOffset} collisionPadding={collisionPadding} className={cn("z-50 w-80 max-w-[calc(100vw-1.5rem)] rounded-2xl rounded-tr-(--radius-corner) border border-border bg-popover p-5 text-sm leading-relaxed text-popover-foreground shadow-xl outline-none motion-safe:data-[state=open]:animate-rm-enter motion-safe:data-[state=closed]:animate-rm-exit", className)} {...props} />
  </HoverCardPrimitive.Portal>
}

export function HoverCardArrow({ className, ...props }: React.ComponentProps<typeof HoverCardPrimitive.Arrow>) {
  return <HoverCardPrimitive.Arrow className={cn("fill-popover", className)} {...props} />
}
