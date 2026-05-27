"use client"

import * as React from "react"
import { Slider as SliderPrimitive } from "radix-ui"
import { cn } from "@/lib/rillmark-utils"
import { useFieldControl } from "@/components/ui/field"

export type SliderProps = React.ComponentProps<typeof SliderPrimitive.Root> & {
  /** Accessible names for each thumb; particularly useful for range sliders. */
  thumbLabels?: string[]
}

export function Slider({ className, thumbLabels, value, defaultValue, ...props }: SliderProps) {
  const control = useFieldControl(props)
  const values = value ?? defaultValue ?? [props.min ?? 0]
  return (
    <SliderPrimitive.Root data-slot="slider" {...props} {...control} value={value} defaultValue={defaultValue} className={cn("relative flex min-h-11 w-full touch-none items-center select-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[orientation=vertical]:h-44 data-[orientation=vertical]:w-11 data-[orientation=vertical]:flex-col", className)}>
      <SliderPrimitive.Track className="relative grow overflow-hidden rounded-full bg-muted data-[orientation=horizontal]:h-2 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2">
        <SliderPrimitive.Range className="absolute rounded-full bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full" />
      </SliderPrimitive.Track>
      {values.map((_, index) => <SliderPrimitive.Thumb key={index} aria-label={thumbLabels?.[index] ?? (values.length > 1 ? `${props["aria-label"] ?? "Value"} ${index + 1}` : props["aria-label"])} aria-labelledby={!thumbLabels?.[index] && values.length === 1 ? control["aria-labelledby"] : undefined} aria-describedby={control["aria-describedby"]} className="block size-6 rounded-full border-2 border-primary bg-card shadow-sm outline-none before:absolute before:inset-[-10px] before:content-[''] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background" />)}
    </SliderPrimitive.Root>
  )
}
