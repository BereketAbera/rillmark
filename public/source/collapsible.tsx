"use client"

import * as React from "react"
import { Collapsible as CollapsiblePrimitive } from "radix-ui"
import { cn } from "../lib/rillmark-utils"

export const Collapsible = CollapsiblePrimitive.Root

export function CollapsibleTrigger({ className, ...props }: React.ComponentProps<typeof CollapsiblePrimitive.Trigger>) {
  return <CollapsiblePrimitive.Trigger className={cn("inline-flex min-h-11 items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors duration-(--duration-fast) hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none", className)} {...props} />
}

export function CollapsibleContent({ className, ...props }: React.ComponentProps<typeof CollapsiblePrimitive.Content>) {
  return <CollapsiblePrimitive.Content className={cn("text-sm leading-relaxed motion-safe:data-[state=open]:animate-rm-enter", className)} {...props} />
}
