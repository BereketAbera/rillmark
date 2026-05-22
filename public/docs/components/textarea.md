# Textarea

Room for a longer thought.

A resizable native textarea. Use Field for a label and validation; retain resizing when space allows.

## Install

First follow [setup](../getting-started.md). Then:

```sh
npx shadcn@latest add @rillmark/textarea
```

Theme and local source dependencies install automatically. React is supplied by your application.

## Working example

```tsx
"use client"
import { useState } from "react"
import { Field } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"

export default function ComponentDemo() {
  const [note, setNote] = useState("")
  return <Field label="Field note" description={`${300 - note.length} characters remaining.`} className="w-full max-w-md">
    <Textarea value={note} onChange={(event) => setNote(event.target.value)} maxLength={300} placeholder="What did you notice on site today?" />
  </Field>
}

```

## API

Exports (generated from TypeScript): `Textarea`. Native element and underlying Radix props are forwarded.

Use the underlying native element or Radix primitive props shown in the example. No additional configuration is required.

[Editable source](../../source/textarea.tsx) · [Registry item](../../r/textarea.json)
