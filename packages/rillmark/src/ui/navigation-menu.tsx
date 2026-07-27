"use client"

import * as React from "react"
import { NavigationMenu as NavigationMenuPrimitive } from "radix-ui"
import { ChevronDown } from "lucide-react"
import { cn } from "../lib/rillmark-utils"

export interface NavigationMenuProps extends React.ComponentProps<typeof NavigationMenuPrimitive.Root> {
  /** Render the shared dropdown viewport automatically. Disable to place it yourself. */
  viewport?: boolean
}

export function NavigationMenu({ className, children, viewport = true, ...props }: NavigationMenuProps) {
  return <NavigationMenuPrimitive.Root className={cn("relative z-10 flex max-w-full items-center", className)} {...props}>
    {children}
    {viewport && <NavigationMenuViewport />}
  </NavigationMenuPrimitive.Root>
}

export function NavigationMenuList({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return <NavigationMenuPrimitive.List className={cn("flex list-none flex-wrap items-center gap-1", className)} {...props} />
}

export const NavigationMenuItem = NavigationMenuPrimitive.Item

const controlStyles = "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-foreground outline-none hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-safe:transition-colors motion-safe:duration-(--duration-fast)"

export function NavigationMenuTrigger({ className, children, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return <NavigationMenuPrimitive.Trigger className={cn(controlStyles, "group disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground", className)} {...props}>
    {children}<ChevronDown aria-hidden="true" className="size-4 shrink-0 motion-safe:transition-transform motion-safe:duration-(--duration-fast) group-data-[state=open]:rotate-180" />
  </NavigationMenuPrimitive.Trigger>
}

export function NavigationMenuContent({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return <NavigationMenuPrimitive.Content className={cn("left-0 top-0 grid w-[min(24rem,calc(100vw-2rem))] gap-1 p-2", className)} {...props} />
}

export function NavigationMenuLink({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return <NavigationMenuPrimitive.Link className={cn(controlStyles, "justify-start data-[active]:bg-accent data-[active]:text-accent-foreground", className)} {...props} />
}

export function NavigationMenuViewport({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return <div className="absolute left-0 top-full z-50">
    <NavigationMenuPrimitive.Viewport className={cn("relative mt-2 h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl rounded-tr-(--radius-corner) border border-border bg-popover text-popover-foreground shadow-xl motion-safe:data-[state=open]:animate-rm-enter motion-safe:data-[state=closed]:animate-rm-exit", className)} {...props} />
  </div>
}

export function NavigationMenuIndicator({ className, children, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  return <NavigationMenuPrimitive.Indicator className={cn("top-full z-50 flex h-2 items-end justify-center overflow-hidden", className)} {...props}>
    {children ?? <span className="relative top-1 size-2 rotate-45 rounded-tl-sm border-l border-t border-border bg-popover" />}
  </NavigationMenuPrimitive.Indicator>
}
