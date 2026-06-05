# Textarea

Room for a longer thought.

A resizable native textarea. Use Field for a label and validation; retain resizing when space allows.

## Install

First follow [setup](../getting-started.md). Install the package once:

```sh
npm install rillmark
```

Import components from `rillmark/textarea`. Load `rillmark/styles.css` once, or use the Tailwind CSS 4 integration in setup. React 19 is supplied by your application.

## Working example

```tsx
"use client"
import { useState } from "react"
import { Field } from "rillmark/field"
import { Textarea } from "rillmark/textarea"

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

[Readable source](../../source/textarea.tsx)
