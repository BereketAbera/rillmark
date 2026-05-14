"use client"

import * as React from "react"
import { Popover as PopoverPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"
import { useFieldControl } from "@/components/ui/field"

export type ComboboxOption = {
  value: string
  label: string
  disabled?: boolean
  keywords?: string[]
}

export type ComboboxProps = Omit<React.ComponentProps<"input">, "value" | "defaultValue" | "onChange" | "size" | "children" | "role" | "type"> & {
  options: ComboboxOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  searchPlaceholder?: string
  emptyMessage?: string
}

/** Searchable single selection. Focus stays in the input while the listbox is open. */
export function Combobox({ options, value, defaultValue = "", onValueChange, placeholder = "Choose an option", searchPlaceholder = "Search options…", emptyMessage = "No matches found.", className, name, ref, onFocus, onBlur, onClick, onKeyDown, ...props }: ComboboxProps) {
  const control = useFieldControl(props)
  const generatedId = React.useId()
  const listId = `combobox-${generatedId}`
  const inputRef = React.useRef<HTMLInputElement>(null)
  const anchorRef = React.useRef<HTMLDivElement>(null)
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const selectedValue = value ?? internalValue
  const selected = options.find((option) => option.value === selectedValue)
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [activeIndex, setActiveIndex] = React.useState(-1)
  const filtered = options.filter((option) => [option.label, ...(option.keywords ?? [])].join(" ").toLocaleLowerCase().includes(query.toLocaleLowerCase().trim()))
  const enabledIndices = filtered.flatMap((option, index) => option.disabled ? [] : [index])
  const active = open && activeIndex >= 0 && !filtered[activeIndex]?.disabled && filtered[activeIndex] ? activeIndex : -1

  React.useImperativeHandle(ref, () => inputRef.current!)
  React.useEffect(() => {
    inputRef.current?.setCustomValidity(control.required && !selected ? "Choose an option from the list." : "")
  }, [control.required, selected])

  React.useEffect(() => {
    const form = inputRef.current?.form
    function reset() {
      if (value === undefined) setInternalValue(defaultValue)
      setQuery("")
      setOpen(false)
    }
    form?.addEventListener("reset", reset)
    return () => form?.removeEventListener("reset", reset)
  }, [defaultValue, value])

  React.useEffect(() => {
    if (active >= 0) document.getElementById(`${listId}-${active}`)?.scrollIntoView?.({ block: "nearest" })
  }, [active, listId])

  function showOptions() {
    if (control.disabled || props.readOnly) return
    setQuery("")
    setActiveIndex(options.findIndex((option) => option.value === selectedValue && !option.disabled))
    setOpen(true)
  }

  function choose(option: ComboboxOption) {
    if (option.disabled || props.readOnly) return
    if (value === undefined) setInternalValue(option.value)
    onValueChange?.(option.value)
    setOpen(false)
    setQuery("")
  }

  function move(direction: 1 | -1) {
    if (!open) {
      setQuery("")
      const available = options.flatMap((option, index) => option.disabled ? [] : [index])
      setActiveIndex(direction === 1 ? available[0] ?? -1 : available.at(-1) ?? -1)
      setOpen(true)
      return
    }
    const current = enabledIndices.indexOf(activeIndex)
    const next = (current + direction + enabledIndices.length) % enabledIndices.length
    setActiveIndex(enabledIndices[next] ?? -1)
  }

  return (
    <PopoverPrimitive.Root open={open && !control.disabled && !props.readOnly} onOpenChange={setOpen}>
      <PopoverPrimitive.Anchor asChild>
        <div ref={anchorRef} data-slot="combobox" className="relative w-full min-w-0">
          <input {...props} {...control} ref={inputRef} role="combobox" type="text" autoComplete="off" spellCheck={false} aria-autocomplete="list" aria-expanded={open && !control.disabled && !props.readOnly} aria-controls={listId} aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined} value={open ? query : selected?.label ?? ""} placeholder={open ? searchPlaceholder : placeholder} className={cn("h-11 w-full min-w-0 rounded-xl rounded-tr-[5px] border border-input bg-card py-2 pr-10 pl-3.5 text-base text-foreground shadow-xs outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive md:text-sm motion-reduce:transition-none", className)} onFocus={(event) => { onFocus?.(event); if (!event.defaultPrevented) showOptions() }} onClick={(event) => { onClick?.(event); if (!event.defaultPrevented && !open) showOptions() }} onBlur={(event) => { onBlur?.(event); if (!event.defaultPrevented) setOpen(false) }} onChange={(event) => { const nextQuery = event.target.value; setQuery(nextQuery); setOpen(true); const firstEnabled = options.filter((option) => [option.label, ...(option.keywords ?? [])].join(" ").toLocaleLowerCase().includes(nextQuery.toLocaleLowerCase().trim())).findIndex((option) => !option.disabled); setActiveIndex(firstEnabled) }} onKeyDown={(event) => {
            onKeyDown?.(event)
            if (event.defaultPrevented || props.readOnly) return
            if (event.key === "ArrowDown" || event.key === "ArrowUp") { event.preventDefault(); move(event.key === "ArrowDown" ? 1 : -1) }
            if (event.key === "Enter" && open) { event.preventDefault(); if (active >= 0) choose(filtered[active]) }
            if (event.key === "Escape" && open) { event.preventDefault(); setOpen(false) }
            if (event.key === "Tab") setOpen(false)
          }} />
          <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="pointer-events-none absolute top-3.5 right-3.5 size-4 text-muted-foreground"><path d="m4 6 4 4 4-4" /></svg>
          {name && <input type="hidden" name={name} value={selectedValue} disabled={control.disabled} />}
        </div>
      </PopoverPrimitive.Anchor>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content align="start" sideOffset={6} role="presentation" onOpenAutoFocus={(event) => event.preventDefault()} onCloseAutoFocus={(event) => event.preventDefault()} onInteractOutside={(event) => { if (anchorRef.current?.contains(event.target as Node)) event.preventDefault() }} className="z-50 w-[var(--radix-popover-trigger-width)] min-w-48 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl rounded-tr-[5px] border border-border bg-popover p-1.5 text-popover-foreground shadow-lg">
          <div id={listId} role="listbox" aria-label={props["aria-label"] ?? "Options"} aria-labelledby={control["aria-labelledby"]} className="max-h-64 overflow-y-auto overscroll-contain">
            {filtered.map((option, index) => <div key={option.value} id={`${listId}-${index}`} role="option" aria-selected={selectedValue === option.value} aria-disabled={option.disabled || undefined} data-active={active === index || undefined} onPointerMove={() => { if (!option.disabled) setActiveIndex(index) }} onMouseDown={(event) => event.preventDefault()} onClick={() => choose(option)} className={cn("flex min-h-11 cursor-default items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm select-none data-[active]:bg-accent data-[active]:text-accent-foreground", option.disabled && "cursor-not-allowed opacity-50")}>
              <span className="min-w-0 break-words">{option.label}</span>
              {selectedValue === option.value && <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4 shrink-0 fill-none stroke-current stroke-2"><path d="m3 8 3 3 7-7" /></svg>}
            </div>)}
          </div>
          {!filtered.length && <p role="status" className="px-3 py-5 text-sm text-muted-foreground">{emptyMessage}</p>}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}
