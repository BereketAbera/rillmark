# Toast

An update that respects the current task.

Use ToastProvider and one ToastViewport. Control each Toast open state. Keep important errors visible inline too; transient messages are not a substitute for validation.

## Install

First follow [setup](../getting-started.md). Install the package once:

```sh
npm install rillmark
```

Import components from `rillmark/toast`. Load `rillmark/styles.css` once, or use the Tailwind CSS 4 integration in setup. React 19 is supplied by your application.

## Working example

```tsx
"use client"
import { useState } from "react"
import { Button } from "rillmark/button"
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "rillmark/toast"

export default function ComponentDemo() {
  const [open, setOpen] = useState(false)
  const [revision, setRevision] = useState(0)
  return <ToastProvider>
    <Button onClick={() => { setRevision(revision + 1); setOpen(true) }}>Save changes</Button>
    <Toast key={revision} open={open} onOpenChange={setOpen} variant="success">
      <ToastTitle>Changes saved</ToastTitle><ToastDescription>Your workspace preferences are up to date.</ToastDescription><ToastClose />
    </Toast>
    <ToastViewport />
  </ToastProvider>
}

```

## API

Exports (generated from TypeScript): `ToastProvider`, `Toast`, `ToastTitle`, `ToastDescription`, `ToastAction`, `ToastClose`, `ToastViewport`. Native element and underlying Radix props are forwarded.

Locally declared props (generated):

| Component.prop | Type | Requirement/default | Description |
|---|---|---|---|
| Toast.asChild | `boolean` | Optional |  |
| Toast.variant | `"default" \| "success" \| "danger"` | default |  |
| ToastTitle.asChild | `boolean` | Optional |  |
| ToastDescription.asChild | `boolean` | Optional |  |
| ToastAction.asChild | `boolean` | Optional |  |
| ToastClose.asChild | `boolean` | Optional |  |
| ToastViewport.asChild | `boolean` | Optional |  |

[Readable source](../../source/toast.tsx)
