"use client"

import * as React from "react"
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui"
import { cn } from "../lib/rillmark-utils"
import { toggleStyles, type ToggleStyleProps } from "./toggle"

const ToggleGroupStyles = React.createContext<ToggleStyleProps>({})
export type ToggleGroupProps = React.ComponentProps<typeof ToggleGroupPrimitive.Root> & ToggleStyleProps

export function ToggleGroup({ className, variant = "soft", size = "md", ...props }: ToggleGroupProps) {
  return <ToggleGroupStyles.Provider value={{ variant, size }}>
    <ToggleGroupPrimitive.Root className={cn("inline-flex w-fit flex-wrap items-center gap-1 rounded-xl data-[orientation=vertical]:flex-col", className)} {...props} />
  </ToggleGroupStyles.Provider>
}

export type ToggleGroupItemProps = React.ComponentProps<typeof ToggleGroupPrimitive.Item> & ToggleStyleProps

export function ToggleGroupItem({ className, variant, size, ...props }: ToggleGroupItemProps) {
  const inherited = React.useContext(ToggleGroupStyles)
  return <ToggleGroupPrimitive.Item className={toggleStyles({ variant: variant ?? inherited.variant, size: size ?? inherited.size, className })} {...props} />
}
