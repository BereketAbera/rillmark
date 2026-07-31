"use client"

import * as React from 'react'
import { FileText, Upload, X } from 'lucide-react'
import { cn } from '../lib/rillmark-utils'
import { useFieldControl } from './field'

export interface FileDropzoneProps extends Omit<React.ComponentProps<'input'>, 'type' | 'value' | 'defaultValue' | 'onChange' | 'multiple' | 'size'> {
  files?: File[]
  defaultFiles?: File[]
  onFilesChange?: (files: File[]) => void
  /** Per-file limit in bytes; omitted means no size limit. */
  maxSize?: number
  maxFiles?: number
}

function matchesAccept(file: File, accept?: string) {
  if (!accept?.trim()) return true
  return accept.split(',').some((part) => {
    const rule = part.trim().toLowerCase()
    if (!rule) return false
    if (rule.startsWith('.')) return file.name.toLowerCase().endsWith(rule)
    return rule.endsWith('/*') ? file.type.toLowerCase().startsWith(rule.slice(0, -1)) : file.type.toLowerCase() === rule
  })
}

/** Local file selection and validation. Uploading belongs to the application. */
export function FileDropzone({ files, defaultFiles = [], onFilesChange, maxSize, maxFiles = 5, accept, className, ref, disabled, required, ...props }: FileDropzoneProps) {
  const control = useFieldControl({ ...props, disabled, required })
  const inputRef = React.useRef<HTMLInputElement>(null)
  React.useImperativeHandle(ref, () => inputRef.current!, [])
  const generatedId = React.useId()
  const [internal, setInternal] = React.useState(defaultFiles)
  const [errors, setErrors] = React.useState<string[]>([])
  const [dragging, setDragging] = React.useState(false)
  const dragDepth = React.useRef(0)
  const selected = files ?? internal
  const controlled = files !== undefined
  const limit = Number.isFinite(maxFiles) ? Math.max(1, Math.floor(maxFiles)) : 5
  React.useEffect(() => {
    const input = inputRef.current
    if (!input) return
    if (selected.length === 0) input.value = ''
    else if (typeof DataTransfer !== 'undefined') {
      const transfer = new DataTransfer()
      for (const file of selected) transfer.items.add(file)
      input.files = transfer.files
    }
  })
  React.useEffect(() => {
    const form = inputRef.current?.form
    if (!form) return
    const reset = (event: Event) => queueMicrotask(() => {
      if (event.defaultPrevented) return
      if (!controlled) setInternal(defaultFiles)
      setErrors([])
    })
    form.addEventListener('reset', reset)
    return () => form.removeEventListener('reset', reset)
  }, [controlled, defaultFiles])
  function update(next: File[]) { if (!controlled) setInternal(next); onFilesChange?.(next) }
  function select(incoming: File[]) {
    if (control.disabled) return
    const accepted: File[] = []
    const rejected: string[] = []
    for (const file of incoming) {
      if (!matchesAccept(file, accept)) rejected.push(`${file.name}: file type is not accepted.`)
      else if (maxSize !== undefined && file.size > maxSize) rejected.push(`${file.name}: exceeds the ${(maxSize / 1024 / 1024).toLocaleString(undefined, { maximumFractionDigits: 2 })} MB limit.`)
      else if (accepted.length >= limit) rejected.push(`Choose up to ${limit} ${limit === 1 ? 'file' : 'files'}.`)
      else accepted.push(file)
    }
    setErrors([...new Set(rejected)])
    update(accepted)
  }
  return <div data-slot="file-dropzone" className={cn('grid min-w-0 gap-3', className)}>
    <div data-dragging={dragging || undefined} className="grid min-w-0 justify-items-center gap-3 rounded-2xl border border-dashed border-input bg-card p-5 text-center text-foreground transition-colors duration-(--duration-fast) focus-within:ring-2 focus-within:ring-ring data-[dragging]:border-ring data-[dragging]:bg-secondary" onDragEnter={(event) => { event.preventDefault(); if (!control.disabled) { dragDepth.current += 1; setDragging(true) } }} onDragOver={(event) => { event.preventDefault(); event.dataTransfer.dropEffect = control.disabled ? 'none' : 'copy' }} onDragLeave={(event) => { event.preventDefault(); dragDepth.current = Math.max(0, dragDepth.current - 1); if (!dragDepth.current) setDragging(false) }} onDrop={(event) => { event.preventDefault(); dragDepth.current = 0; setDragging(false); select(Array.from(event.dataTransfer.files)) }}>
      <Upload className="size-6 text-primary" aria-hidden="true"/>
      <p className="text-sm font-medium">Drop files here or choose from your device.</p>
      <input {...props} {...control} ref={inputRef} type="file" accept={accept} multiple={limit > 1} required={control.required && selected.length === 0} aria-invalid={errors.length > 0 || control['aria-invalid']} aria-describedby={[control['aria-describedby'], `${generatedId}-help`, errors.length > 0 && `${generatedId}-errors`].filter(Boolean).join(' ')} className="block min-h-11 w-full min-w-0 max-w-sm cursor-pointer rounded-lg text-sm text-muted-foreground file:mr-3 file:min-h-11 file:cursor-pointer file:rounded-lg file:border-0 file:bg-secondary file:px-4 file:font-medium file:text-secondary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" onChange={(event) => select(Array.from(event.target.files ?? []))}/>
      <p id={`${generatedId}-help`} className="text-xs text-muted-foreground">Up to {limit} {limit === 1 ? 'file' : 'files'}{maxSize !== undefined ? `, ${(maxSize / 1024 / 1024).toLocaleString(undefined, { maximumFractionDigits: 2 })} MB each` : ''}. Files stay on your device until your application sends them.</p>
    </div>
    {errors.length > 0 && <ul id={`${generatedId}-errors`} role="alert" className="grid gap-1 text-sm text-destructive">{errors.map((error) => <li key={error}>{error}</li>)}</ul>}
    {selected.length > 0 && <ul aria-label="Selected files" className="grid gap-2">{selected.map((file, index) => <li key={`${file.name}-${file.lastModified}-${index}`} className="flex min-w-0 items-center gap-3 rounded-lg border border-border bg-card py-1 pl-3 pr-1 text-sm"><FileText className="size-4 shrink-0 text-muted-foreground" aria-hidden="true"/><span className="min-w-0 flex-1 break-all">{file.name}<span className="ml-2 text-xs text-muted-foreground">{Math.max(1, Math.ceil(file.size / 1024))} KB</span></span><button type="button" aria-label={`Remove ${file.name}`} disabled={control.disabled} onClick={() => { update(selected.filter((_, i) => i !== index)); setErrors([]); inputRef.current?.focus() }} className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"><X className="size-4" aria-hidden="true"/></button></li>)}</ul>}
    <span role="status" className="sr-only">{selected.length} {selected.length === 1 ? 'file' : 'files'} selected.</span>
  </div>
}
