"use client"

import * as React from "react"
import { cn } from "@/lib/rillmark-utils"

type FieldContextValue = {
  id: string
  labelId: string
  descriptionId: string
  errorId: string
  hasLabel: boolean
  hasDescription: boolean
  hasError: boolean
  required?: boolean
  disabled?: boolean
}

const FieldContext = React.createContext<FieldContextValue | undefined>(undefined)

export type FieldProps = React.ComponentProps<"div"> & {
  label?: React.ReactNode
  description?: React.ReactNode
  error?: React.ReactNode
  required?: boolean
  disabled?: boolean
}

/** A labeled control with automatically associated help and validation text. */
export function Field({ id, label, description, error, required, disabled, className, children, ...props }: FieldProps) {
  const generatedId = React.useId()
  const controlId = id ?? `field-${generatedId}`
  const context: FieldContextValue = {
    id: controlId,
    labelId: `${controlId}-label`,
    descriptionId: `${controlId}-description`,
    errorId: `${controlId}-error`,
    hasLabel: label != null,
    hasDescription: description != null,
    hasError: Boolean(error),
    required,
    disabled,
  }

  return (
    <FieldContext.Provider value={context}>
      <div data-slot="field" data-disabled={disabled || undefined} className={cn("grid min-w-0 gap-2", className)} {...props}>
        {label != null && <FieldLabel>{label}</FieldLabel>}
        {children}
        {description != null && <FieldDescription>{description}</FieldDescription>}
        {error && <FieldError>{error}</FieldError>}
      </div>
    </FieldContext.Provider>
  )
}

function FieldLabel({ className, children, ...props }: React.ComponentProps<"label">) {
  const field = React.useContext(FieldContext)
  return (
    <label id={field?.labelId} htmlFor={field?.id} className={cn("text-sm font-semibold leading-5 text-foreground", className)} {...props}>
      {children}{field?.required && <span aria-hidden="true" className="ml-1 text-destructive">*</span>}
    </label>
  )
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  const field = React.useContext(FieldContext)
  return <p id={field?.descriptionId} className={cn("text-sm leading-relaxed text-muted-foreground", className)} {...props} />
}

function FieldError({ className, ...props }: React.ComponentProps<"p">) {
  const field = React.useContext(FieldContext)
  return <p id={field?.errorId} role="alert" className={cn("text-sm font-medium leading-relaxed text-destructive", className)} {...props} />
}

type ControlProps = Pick<React.AriaAttributes, "aria-describedby" | "aria-labelledby" | "aria-label" | "aria-invalid"> & {
  id?: string
  required?: boolean
  disabled?: boolean
}

/** Used by Rillmark controls; also useful when adapting a custom control to Field. */
export function useFieldControl(props: ControlProps = {}) {
  const field = React.useContext(FieldContext)
  const describedBy = [props["aria-describedby"], field?.hasDescription && field.descriptionId, field?.hasError && field.errorId].filter(Boolean).join(" ") || undefined
  return {
    id: props.id ?? field?.id,
    required: props.required ?? field?.required,
    disabled: props.disabled ?? field?.disabled,
    "aria-describedby": describedBy,
    "aria-labelledby": props["aria-labelledby"] ?? (props["aria-label"] ? undefined : field?.hasLabel ? field.labelId : undefined),
    "aria-invalid": props["aria-invalid"] ?? (field?.hasError || undefined),
  }
}
