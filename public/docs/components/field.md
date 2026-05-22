# Field

Labels, help and errors that stay connected.

Wrap one control per Field. Label, description and error props automatically connect to Rillmark controls. Always describe errors in text.

## Install

First follow [setup](../getting-started.md). Then:

```sh
npx shadcn@latest add @rillmark/field
```

Theme and local source dependencies install automatically. React is supplied by your application.

## Working example

```tsx
"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function ComponentDemo() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [saved, setSaved] = useState(false)
  return <form noValidate className="w-full max-w-sm space-y-4" onSubmit={(event) => {
    event.preventDefault()
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    setError(valid ? "" : "Enter a valid email address, such as maya@example.com.")
    setSaved(valid)
  }}>
    <Field label="Work email" required description="Used for your weekly workspace summary." error={error}><Input type="email" autoComplete="email" value={email} onChange={(event) => { setEmail(event.target.value); setError(""); setSaved(false) }} placeholder="maya@example.com" /></Field>
    <Button type="submit">Save email</Button>
    {saved && <p role="status" className="text-sm text-primary">Email saved for this demo.</p>}
  </form>
}

```

## API

Exports (generated from TypeScript): `Field`, `useFieldControl`. Native element and underlying Radix props are forwarded.

Locally declared props (generated):

| Component.prop | Type | Requirement/default | Description |
|---|---|---|---|
| Field.label | `ReactNode` | Optional |  |
| Field.description | `ReactNode` | Optional |  |
| Field.error | `ReactNode` | Optional |  |
| Field.required | `boolean` | Optional |  |
| Field.disabled | `boolean` | Optional |  |
| useFieldControl.id | `string` | Optional |  |
| useFieldControl.required | `boolean` | Optional |  |
| useFieldControl.disabled | `boolean` | Optional |  |

[Editable source](../../source/field.tsx) · [Registry item](../../r/field.json)
