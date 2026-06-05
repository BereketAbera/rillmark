# Sheet

A little more room, alongside the work.

Built on the same Radix Dialog foundation. Use side="right" or side="left". Include SheetTitle and SheetDescription.

## Install

First follow [setup](../getting-started.md). Install the package once:

```sh
npm install rillmark
```

Import components from `rillmark/sheet`. Load `rillmark/styles.css` once, or use the Tailwind CSS 4 integration in setup. React 19 is supplied by your application.

## Working example

```tsx
"use client"
import { useState } from "react"
import { Button } from "rillmark/button"
import { Field } from "rillmark/field"
import { Switch } from "rillmark/switch"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "rillmark/sheet"

export default function ComponentDemo() {
  const [digest, setDigest] = useState(true)
  return <Sheet>
    <SheetTrigger asChild><Button variant="outline">Notification settings</Button></SheetTrigger>
    <SheetContent>
      <SheetHeader><SheetTitle>A quieter workspace</SheetTitle><SheetDescription>Changes apply immediately to this demo session.</SheetDescription></SheetHeader>
      <Field label="Weekly digest" description="A Monday summary of projects you follow."><Switch checked={digest} onCheckedChange={setDigest} /></Field>
      <p role="status" className="text-sm text-muted-foreground">Weekly digest is {digest ? "on" : "off"}.</p>
      <SheetFooter><SheetClose asChild><Button>Done</Button></SheetClose></SheetFooter>
    </SheetContent>
  </Sheet>
}

```

## API

Exports (generated from TypeScript): `Sheet`, `SheetTrigger`, `SheetClose`, `SheetContent`, `SheetHeader`, `SheetFooter`, `SheetTitle`, `SheetDescription`. Native element and underlying Radix props are forwarded.

Locally declared props (generated):

| Component.prop | Type | Requirement/default | Description |
|---|---|---|---|
| SheetContent.asChild | `boolean` | Optional |  |
| SheetContent.side | `"left" \| "right"` | right |  |
| SheetTitle.asChild | `boolean` | Optional |  |
| SheetDescription.asChild | `boolean` | Optional |  |
| SheetTrigger.asChild | `boolean` | Optional |  |
| SheetClose.asChild | `boolean` | Optional |  |

[Readable source](../../source/sheet.tsx)
