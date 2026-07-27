"use client"

import * as React from "react"
import { Toast as ToastPrimitive } from "radix-ui"
import { X } from "lucide-react"
import { cn } from "../lib/rillmark-utils"

export function ToastProvider({ duration = 5000, swipeDirection = "right", ...props }: React.ComponentProps<typeof ToastPrimitive.Provider>) {
  return <ToastPrimitive.Provider duration={duration} swipeDirection={swipeDirection} {...props} />
}

export type ToastProps = React.ComponentProps<typeof ToastPrimitive.Root> & { variant?: "default" | "success" | "danger" }

export function Toast({ className, variant = "default", ...props }: ToastProps) {
  return <ToastPrimitive.Root className={cn("pointer-events-auto relative grid w-full gap-1 overflow-hidden rounded-xl rounded-tr-(--radius-corner) border border-border bg-popover p-4 pr-12 text-popover-foreground shadow-overlay outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[calc(100%+1rem)] motion-safe:data-[state=open]:animate-rm-enter motion-safe:data-[state=closed]:animate-rm-exit motion-safe:data-[swipe=cancel]:transition-transform motion-safe:data-[swipe=end]:transition-transform", variant === "success" && "border-l-4 border-l-primary", variant === "danger" && "border-l-4 border-l-destructive", className)} {...props} />
}

export function ToastTitle({ className, ...props }: React.ComponentProps<typeof ToastPrimitive.Title>) {
  return <ToastPrimitive.Title className={cn("text-sm font-semibold", className)} {...props} />
}

export function ToastDescription({ className, ...props }: React.ComponentProps<typeof ToastPrimitive.Description>) {
  return <ToastPrimitive.Description className={cn("text-sm leading-relaxed text-muted-foreground", className)} {...props} />
}

export function ToastAction({ className, ...props }: React.ComponentProps<typeof ToastPrimitive.Action>) {
  return <ToastPrimitive.Action className={cn("mt-2 inline-flex min-h-11 w-fit items-center justify-center rounded-lg border border-border px-3 py-2 text-sm font-semibold hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50", className)} {...props} />
}

export function ToastClose({ className, children, "aria-label": ariaLabel = "Dismiss notification", ...props }: React.ComponentProps<typeof ToastPrimitive.Close>) {
  return <ToastPrimitive.Close aria-label={ariaLabel} className={cn("absolute right-1 top-1 inline-flex size-11 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background", className)} {...props}>{children ?? <X aria-hidden="true" size={16} />}</ToastPrimitive.Close>
}

export function ToastViewport({ className, ...props }: React.ComponentProps<typeof ToastPrimitive.Viewport>) {
  return <ToastPrimitive.Viewport className={cn("fixed bottom-0 right-0 z-[100] flex max-h-dvh w-full max-w-sm list-none flex-col gap-2 overflow-y-auto rounded-xl p-4 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background", className)} {...props} />
}
