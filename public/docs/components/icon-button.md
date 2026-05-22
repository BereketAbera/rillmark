# IconButton

A compact action with a name.

The label prop is required. Icons alone are not accessible names. Default to the 44px size for touch.

## Install

First follow [setup](../getting-started.md). Then:

```sh
npx shadcn@latest add @rillmark/icon-button
```

Theme and local source dependencies install automatically. React is supplied by your application.

## Working example

```tsx
"use client"
import { useState } from "react"
import { Bookmark } from "lucide-react"
import { IconButton } from "@/components/ui/icon-button"

export default function ComponentDemo() {
  const [saved, setSaved] = useState(false)
  return <div className="flex items-center gap-3">
    <IconButton label={saved ? "Remove bookmark" : "Bookmark project"} variant={saved ? "solid" : "outline"} aria-pressed={saved} onClick={() => setSaved(!saved)}><Bookmark aria-hidden="true" size={18} fill={saved ? "currentColor" : "none"} /></IconButton>
    <span className="text-sm text-muted-foreground">{saved ? "In your collection" : "Keep this project close"}</span>
  </div>
}

```

## API

Exports (generated from TypeScript): `IconButton`. Native element and underlying Radix props are forwarded.

Locally declared props (generated):

| Component.prop | Type | Requirement/default | Description |
|---|---|---|---|
| IconButton.label | `string` | Required | Required accessible name; tooltip is optional. |
| IconButton.variant | `"solid" \| "soft" \| "outline" \| "ghost" \| "danger"` | Optional |  |
| IconButton.size | `"sm" \| "md" \| "lg"` | md |  |
| IconButton.loading | `boolean` | Optional | Keeps the label visible and prevents repeated submission. |

[Editable source](../../source/icon-button.tsx) · [Registry item](../../r/icon-button.json)
