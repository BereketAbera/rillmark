"use client"

import * as React from 'react'
import { X } from 'lucide-react'
import { cn } from '../lib/rillmark-utils'
import { useFieldControl } from './field'

export interface TagInputProps extends Omit<React.ComponentProps<'input'>, 'type' | 'value' | 'defaultValue' | 'onChange' | 'size'> {
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  /** Maximum number of tags. Duplicates are ignored, ignoring case. */
  maxTags?: number
}

/** Enter or comma adds a tag. Backspace on an empty input focuses its last remove button. */
export function TagInput({ value, defaultValue = [], onValueChange, maxTags, name, className, ref, onKeyDown, disabled, readOnly, ...props }: TagInputProps) {
  const control = useFieldControl({ ...props, disabled })
  const inputRef = React.useRef<HTMLInputElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  React.useImperativeHandle(ref, () => inputRef.current!, [])
  const [internal, setInternal] = React.useState(defaultValue)
  const [draft, setDraft] = React.useState('')
  const [message, setMessage] = React.useState('')
  const tags = value ?? internal
  const controlled = value !== undefined
  const instructionId = React.useId()
  React.useEffect(() => {
    inputRef.current?.setCustomValidity(control.required && tags.length === 0 ? 'Add at least one tag.' : '')
  }, [control.required, tags.length])
  React.useEffect(() => {
    const form = inputRef.current?.form
    if (!form) return
    const reset = (event: Event) => queueMicrotask(() => {
      if (event.defaultPrevented) return
      if (!controlled) setInternal(defaultValue)
      setDraft(''); setMessage('')
    })
    form.addEventListener('reset', reset)
    return () => form.removeEventListener('reset', reset)
  }, [controlled, defaultValue])
  const update = (next: string[]) => { if (!controlled) setInternal(next); onValueChange?.(next) }
  function add() {
    const tag = draft.trim()
    if (!tag) return
    if (tags.some((item) => item.toLocaleLowerCase() === tag.toLocaleLowerCase())) { setMessage(`${tag} is already included.`); return }
    if (maxTags !== undefined && tags.length >= maxTags) { setMessage(`Add up to ${maxTags} tags.`); return }
    update([...tags, tag]); setDraft(''); setMessage(`Added ${tag}.`)
  }
  function remove(index: number) {
    const removed = tags[index]
    update(tags.filter((_, i) => i !== index))
    setMessage(`Removed ${removed}.`)
    inputRef.current?.focus()
  }
  return <div data-slot="tag-input" className={cn('min-w-0', className)}>
    <div ref={containerRef} className="flex min-h-11 flex-wrap items-center gap-1.5 rounded-xl border border-input bg-card p-1.5 text-foreground focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background has-[[aria-invalid=true]]:border-destructive">
      {tags.length > 0 && <ul aria-label="Added tags" className="contents">{tags.map((tag, index) => <li key={`${tag}-${index}`} className="inline-flex max-w-full items-center gap-1 rounded-lg bg-secondary pl-2.5 text-sm text-secondary-foreground"><span className="break-all">{tag}</span>{!readOnly && <button type="button" aria-label={`Remove ${tag}`} disabled={control.disabled} onClick={() => remove(index)} className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"><X aria-hidden="true" className="size-3.5"/></button>}{readOnly && <span className="w-1.5"/>}</li>)}</ul>}
      <input {...props} {...control} ref={inputRef} type="text" value={draft} readOnly={readOnly} required={control.required && tags.length === 0} aria-describedby={[control['aria-describedby'], instructionId].filter(Boolean).join(' ')} className="h-9 min-w-24 flex-1 rounded-md bg-transparent px-2 text-base outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" onChange={(event) => { setDraft(event.target.value); setMessage('') }} onKeyDown={(event) => {
        onKeyDown?.(event)
        if (event.defaultPrevented || event.nativeEvent.isComposing || readOnly || control.disabled) return
        if (event.key === 'Enter' || event.key === ',') { event.preventDefault(); add() }
        if (event.key === 'Backspace' && !draft && tags.length) { event.preventDefault(); containerRef.current?.querySelectorAll<HTMLButtonElement>('button')[tags.length - 1]?.focus() }
      }}/>
    </div>
    {name && tags.map((tag, index) => <input key={index} type="hidden" name={name} value={tag} form={props.form} disabled={control.disabled}/>)}
    <p id={instructionId} className="mt-2 text-xs text-muted-foreground">{readOnly ? `${tags.length} tags.` : 'Press Enter or comma to add a tag.'}</p>
    <span role="status" className="sr-only">{message}</span>
  </div>
}
