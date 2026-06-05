# EmptyState

A useful next step when there is nothing here.

Explain the current state and offer one relevant action. Distinguish an empty collection from a filter with no matching results.

## Install

First follow [setup](../getting-started.md). Install the package once:

```sh
npm install rillmark
```

Import components from `rillmark/empty-state`. Load `rillmark/styles.css` once, or use the Tailwind CSS 4 integration in setup. React 19 is supplied by your application.

## Working example

```tsx
"use client"
import { useState } from "react"
import { FolderPlus } from "lucide-react"
import { Button } from "rillmark/button"
import { EmptyState } from "rillmark/empty-state"

export default function ComponentDemo() {
  const [created, setCreated] = useState(false)
  return created ? <div className="space-y-3"><p role="status" className="text-sm font-semibold">Untitled collection created.</p><p className="text-sm text-muted-foreground">Your first collection is ready for observations.</p><Button variant="outline" onClick={() => setCreated(false)}>Reset demo</Button></div> : <EmptyState title="Room for a new perspective" description="Gather the projects and observations you want to return to." icon={<FolderPlus size={24} />} action={<Button onClick={() => setCreated(true)}>Create a collection</Button>} />
}

```

## API

Exports (generated from TypeScript): `EmptyState`. Native element and underlying Radix props are forwarded.

Locally declared props (generated):

| Component.prop | Type | Requirement/default | Description |
|---|---|---|---|
| EmptyState.title | `string` | Required |  |
| EmptyState.description | `string` | Required |  |
| EmptyState.icon | `ReactNode` | Optional |  |
| EmptyState.action | `ReactNode` | Optional |  |

[Readable source](../../source/empty-state.tsx)
