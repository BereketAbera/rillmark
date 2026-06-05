# AlertDialog

A deliberate pause before a consequence.

Describe the consequence and provide Cancel and Action. Initial focus goes to Cancel. Never use this for routine success messages.

## Install

First follow [setup](../getting-started.md). Install the package once:

```sh
npm install rillmark
```

Import components from `rillmark/alert-dialog`. Load `rillmark/styles.css` once, or use the Tailwind CSS 4 integration in setup. React 19 is supplied by your application.

## Working example

```tsx
"use client"
import { useState } from "react"
import { Button } from "rillmark/button"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "rillmark/alert-dialog"

export default function ComponentDemo() {
  const [archived, setArchived] = useState(false)
  return <div className="space-y-3">
    <p role="status" className="text-sm text-muted-foreground">{archived ? "Spring research was archived." : "Spring research is active."}</p>
    {archived ? <Button variant="outline" onClick={() => setArchived(false)}>Restore project</Button> : <AlertDialog>
      <AlertDialogTrigger asChild><Button variant="danger">Archive project</Button></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader><AlertDialogTitle>Archive Spring research?</AlertDialogTitle><AlertDialogDescription>The project will leave your active list. You can restore it later.</AlertDialogDescription></AlertDialogHeader>
        <AlertDialogFooter><AlertDialogCancel>Keep active</AlertDialogCancel><AlertDialogAction onClick={() => setArchived(true)}>Archive project</AlertDialogAction></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>}
  </div>
}

```

## API

Exports (generated from TypeScript): `AlertDialog`, `AlertDialogTrigger`, `AlertDialogContent`, `AlertDialogHeader`, `AlertDialogFooter`, `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogAction`, `AlertDialogCancel`. Native element and underlying Radix props are forwarded.

Locally declared props (generated):

| Component.prop | Type | Requirement/default | Description |
|---|---|---|---|
| AlertDialogContent.asChild | `boolean` | Optional |  |
| AlertDialogTitle.asChild | `boolean` | Optional |  |
| AlertDialogDescription.asChild | `boolean` | Optional |  |
| AlertDialogAction.asChild | `boolean` | Optional |  |
| AlertDialogCancel.asChild | `boolean` | Optional |  |
| AlertDialogTrigger.asChild | `boolean` | Optional |  |

[Readable source](../../source/alert-dialog.tsx)
