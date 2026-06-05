# Popover

Context within reach.

Small interactive supporting content. Use a Dialog for a task that requires a modal focus boundary. Label interactive controls inside the content.

## Install

First follow [setup](../getting-started.md). Install the package once:

```sh
npm install rillmark
```

Import components from `rillmark/popover`. Load `rillmark/styles.css` once, or use the Tailwind CSS 4 integration in setup. React 19 is supplied by your application.

## Working example

```tsx
"use client"
import { useState } from "react"
import { Button } from "rillmark/button"
import { Checkbox } from "rillmark/checkbox"
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "rillmark/popover"

export default function ComponentDemo() {
  const [completed, setCompleted] = useState(false)
  return <Popover>
    <PopoverTrigger asChild><Button variant="outline">View options{completed ? " · all projects" : " · active only"}</Button></PopoverTrigger>
    <PopoverContent aria-label="View options" className="space-y-3">
      <p className="text-sm font-semibold">Make room for what matters</p>
      <label className="flex cursor-pointer items-center gap-2 text-sm"><Checkbox checked={completed} onCheckedChange={(value) => setCompleted(value === true)} />Include completed projects</label>
      <PopoverClose asChild><Button size="sm">Done</Button></PopoverClose>
    </PopoverContent>
  </Popover>
}

```

## API

Exports (generated from TypeScript): `Popover`, `PopoverTrigger`, `PopoverAnchor`, `PopoverClose`, `PopoverContent`. Native element and underlying Radix props are forwarded.

Locally declared props (generated):

| Component.prop | Type | Requirement/default | Description |
|---|---|---|---|
| PopoverContent.asChild | `boolean` | Optional |  |
| PopoverTrigger.asChild | `boolean` | Optional |  |
| PopoverAnchor.asChild | `boolean` | Optional |  |
| PopoverClose.asChild | `boolean` | Optional |  |

[Readable source](../../source/popover.tsx)
