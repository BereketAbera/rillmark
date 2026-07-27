"use client"

import * as React from "react"
import { Toggle as TogglePrimitive } from "radix-ui"
import { cn } from "../lib/rillmark-utils"

export type ToggleVariant = "soft" | "outline"
export type ToggleSize = "sm" | "md" | "lg"
export interface ToggleStyleProps { variant?: ToggleVariant; size?: ToggleSize; className?: string }

export function toggleStyles({ variant = "soft", size = "md", className }: ToggleStyleProps = {}) {
  return cn("inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border text-sm font-medium transition-colors duration-(--duration-fast) hover:bg-accent hover:text-accent-foreground data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none [&_svg]:size-4 [&_svg]:shrink-0", variant === "outline" ? "border-input bg-background text-foreground" : "border-transparent bg-secondary text-secondary-foreground", size === "sm" ? "min-h-9 min-w-9 px-2.5" : size === "lg" ? "min-h-12 min-w-12 px-4" : "min-h-11 min-w-11 px-3", className)
}

export type ToggleProps = React.ComponentProps<typeof TogglePrimitive.Root> & ToggleStyleProps

export function Toggle({ className, variant, size, ...props }: ToggleProps) {
  return <TogglePrimitive.Root className={toggleStyles({ variant, size, className })} {...props} />
}
