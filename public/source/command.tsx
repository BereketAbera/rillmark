"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { cn } from "../lib/rillmark-utils"
import { Input } from "./input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./dialog"

export interface CommandAction {
  /** Stable unique action identifier. */
  id: string
  label: string
  description?: string
  keywords?: string[]
  icon?: React.ReactNode
  disabled?: boolean
  onSelect: () => void
}

export interface CommandProps extends Omit<React.ComponentProps<"div">, "children" | "onSelect"> {
  items: CommandAction[]
  /** Accessible name for the search input. */
  label?: string
  placeholder?: string
  emptyMessage?: string
  /** Runs after the selected action. */
  onAction?: (action: CommandAction) => void
}

export function Command({ items, label = "Find an action", placeholder = "Search actions…", emptyMessage = "No matching actions. Try another search.", onAction, className, onKeyDown, ...props }: CommandProps) {
  const [query, setQuery] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)
  const listRef = React.useRef<HTMLUListElement>(null)
  const resultsId = React.useId()
  const normalized = query.trim().toLocaleLowerCase()
  const matches = items.filter((item) => [item.label, item.description, ...(item.keywords ?? [])].filter(Boolean).join(" ").toLocaleLowerCase().includes(normalized))
  const actionButtons = () => Array.from(listRef.current?.querySelectorAll<HTMLButtonElement>("button:not(:disabled)") ?? [])

  return <div {...props} className={cn("grid gap-3", className)} onKeyDown={(event) => {
    onKeyDown?.(event)
    if (event.defaultPrevented || event.nativeEvent.isComposing || event.altKey || event.ctrlKey || event.metaKey) return
    const input = inputRef.current
    const buttons = actionButtons()
    const target = event.target
    if (event.key === "Enter" && target === input) {
      event.preventDefault()
      buttons[0]?.click()
      return
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      const stops = [input, ...buttons].filter((element): element is HTMLInputElement | HTMLButtonElement => Boolean(element))
      const index = stops.findIndex((element) => element === target)
      if (index < 0) return
      event.preventDefault()
      stops[(index + (event.key === "ArrowDown" ? 1 : -1) + stops.length) % stops.length]?.focus()
    } else if ((event.key === "Home" || event.key === "End") && buttons.some((button) => button === target)) {
      event.preventDefault()
      ;(event.key === "Home" ? buttons[0] : buttons.at(-1))?.focus()
    }
  }}>
    <div className="relative"><Search aria-hidden="true" size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" /><Input ref={inputRef} type="search" value={query} onChange={(event) => setQuery(event.target.value)} aria-label={label} aria-controls={resultsId} placeholder={placeholder} className="pl-10" /></div>
    <p role="status" className={matches.length ? "sr-only" : "px-3 py-6 text-center text-sm text-muted-foreground"}>{matches.length ? `${matches.length} ${matches.length === 1 ? "action" : "actions"} available.` : emptyMessage}</p>
    <ul ref={listRef} id={resultsId} aria-label="Matching actions" className="max-h-72 space-y-1 overflow-y-auto p-1">
      {matches.map((item) => <li key={item.id}><button type="button" disabled={item.disabled} className="flex min-h-11 w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm transition-colors duration-(--duration-fast) hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none" onClick={() => { item.onSelect(); onAction?.(item) }}>
        {item.icon && <span aria-hidden="true" className="shrink-0 [&_svg]:size-4">{item.icon}</span>}<span className="min-w-0"><span className="block font-medium">{item.label}</span>{item.description && <span className="mt-0.5 block text-xs text-muted-foreground">{item.description}</span>}</span>
      </button></li>)}
    </ul>
  </div>
}

export interface CommandDialogProps extends Omit<CommandProps, "title"> {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  title?: string
  description?: string
  /** The actual focusable opener; focus returns here when the dialog closes. */
  trigger?: React.ReactElement
}

export function CommandDialog({ open, defaultOpen = false, onOpenChange, title = "Workspace actions", description = "Search for an action, then choose it. Use arrow keys to move between the search and actions.", trigger, onAction, ...props }: CommandDialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const previousFocus = React.useRef<HTMLElement | null>(null)
  const changeOpen = (next: boolean) => {
    if (open === undefined) setInternalOpen(next)
    onOpenChange?.(next)
  }
  return <Dialog open={open ?? internalOpen} onOpenChange={changeOpen}>
    {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
    <DialogContent onOpenAutoFocus={() => { previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null }} onCloseAutoFocus={(event) => {
      if (!trigger) { event.preventDefault(); previousFocus.current?.focus() }
    }}><DialogHeader><DialogTitle>{title}</DialogTitle><DialogDescription>{description}</DialogDescription></DialogHeader><Command {...props} onAction={(action) => { onAction?.(action); changeOpen(false) }} /></DialogContent>
  </Dialog>
}
