"use client"

import * as React from "react"
import { Accordion as AccordionPrimitive } from "radix-ui"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/rillmark-utils"

export const Accordion = AccordionPrimitive.Root

export function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item className={cn("border-b border-border first:border-t", className)} {...props} />
}

export function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger className={cn("group flex min-h-14 flex-1 items-center justify-between gap-4 rounded-lg py-4 text-left text-sm font-semibold outline-none transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50", className)} {...props}>
      {children}<ChevronDown aria-hidden="true" size={18} className="shrink-0 motion-safe:transition-transform group-data-[state=open]:rotate-180" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
}

export function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return <AccordionPrimitive.Content className="overflow-hidden text-sm leading-relaxed text-muted-foreground motion-safe:data-[state=open]:animate-rm-enter" {...props}>
    <div className={cn("pb-5 pr-8", className)}>{children}</div>
  </AccordionPrimitive.Content>
}
