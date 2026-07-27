"use client"

import * as React from "react"
import { ScrollArea as ScrollAreaPrimitive } from "radix-ui"
import { cn } from "../lib/rillmark-utils"

export interface ScrollAreaProps extends React.ComponentProps<typeof ScrollAreaPrimitive.Root> {
  /** Which overflow directions receive a scrollbar. */
  orientation?: "vertical" | "horizontal" | "both"
  /** Props and ref for the keyboard-focusable scrolling element. */
  viewportProps?: React.ComponentProps<typeof ScrollAreaPrimitive.Viewport>
}

export function ScrollArea({ className, children, orientation = "vertical", type = "auto", viewportProps = {}, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, ...props }: ScrollAreaProps) {
  const { className: viewportClassName, ...viewportRest } = viewportProps
  const viewportLabel = viewportRest["aria-label"] ?? ariaLabel
  const viewportLabelledBy = viewportRest["aria-labelledby"] ?? ariaLabelledBy
  return <ScrollAreaPrimitive.Root type={type} className={cn("relative overflow-hidden", className)} {...props}>
    <ScrollAreaPrimitive.Viewport tabIndex={0} role={viewportLabel || viewportLabelledBy ? "region" : undefined} aria-label={viewportLabel} aria-labelledby={viewportLabelledBy} className={cn("size-full rounded-[inherit] outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring", viewportClassName)} {...viewportRest}>
      {children}
    </ScrollAreaPrimitive.Viewport>
    {orientation !== "horizontal" && <ScrollBar orientation="vertical" />}
    {orientation !== "vertical" && <ScrollBar orientation="horizontal" />}
    <ScrollAreaPrimitive.Corner className="bg-muted" />
  </ScrollAreaPrimitive.Root>
}

export function ScrollBar({ className, children, orientation = "vertical", ...props }: React.ComponentProps<typeof ScrollAreaPrimitive.Scrollbar>) {
  return <ScrollAreaPrimitive.Scrollbar orientation={orientation} className={cn("flex touch-none select-none p-0.5 data-[orientation=vertical]:h-full data-[orientation=vertical]:w-3 data-[orientation=horizontal]:h-3 data-[orientation=horizontal]:flex-col", className)} {...props}>
    {children ?? <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-border hover:bg-muted-foreground" />}
  </ScrollAreaPrimitive.Scrollbar>
}
