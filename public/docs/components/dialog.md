# Dialog

A focused task, with a clear way back.

Include DialogTitle and DialogDescription. The trigger receives focus again on close. Do not nest unrelated modal workflows.

## Install

First follow [setup](../getting-started.md). Install the package once:

```sh
npm install rillmark
```

Import components from `rillmark/dialog`. Load `rillmark/styles.css` once, or use the Tailwind CSS 4 integration in setup. React 19 is supplied by your application.

## Working example

```tsx
"use client"
import { useState } from "react"
import { Button } from "rillmark/button"
import { Field } from "rillmark/field"
import { Input } from "rillmark/input"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "rillmark/dialog"

export default function ComponentDemo() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("Fieldwork studio")
  const [saved, setSaved] = useState(name)
  return <div className="space-y-3">
    <p className="text-sm text-muted-foreground">Workspace: {saved}</p>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button variant="outline">Edit workspace</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>A name for your work</DialogTitle><DialogDescription>Your team will see this in their workspace switcher.</DialogDescription></DialogHeader>
        <form className="space-y-5" onSubmit={(event) => { event.preventDefault(); setSaved(name.trim()); setOpen(false) }}>
          <Field label="Workspace name" required><Input value={name} onChange={(event) => setName(event.target.value)} minLength={2} /></Field>
          <DialogFooter><Button type="submit" disabled={name.trim().length < 2}>Save name</Button></DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </div>
}

```

## API

Exports (generated from TypeScript): `Dialog`, `DialogTrigger`, `DialogClose`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`. Native element and underlying Radix props are forwarded.

Locally declared props (generated):

| Component.prop | Type | Requirement/default | Description |
|---|---|---|---|
| DialogContent.asChild | `boolean` | Optional |  |
| DialogTitle.asChild | `boolean` | Optional |  |
| DialogDescription.asChild | `boolean` | Optional |  |
| DialogTrigger.asChild | `boolean` | Optional |  |
| DialogClose.asChild | `boolean` | Optional |  |

[Readable source](../../source/dialog.tsx)
