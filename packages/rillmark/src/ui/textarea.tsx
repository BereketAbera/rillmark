"use client"

import * as React from "react"
import { cn } from "../lib/rillmark-utils"
import { useFieldControl } from "./field"

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  const control = useFieldControl(props)
  return <textarea data-slot="textarea" {...props} {...control} className={cn("flex min-h-28 w-full min-w-0 resize-y rounded-xl rounded-tr-[5px] border border-input bg-card px-3.5 py-3 text-base leading-relaxed text-foreground shadow-xs transition-[border-color,box-shadow] placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive md:text-sm motion-reduce:transition-none", className)} />
}
