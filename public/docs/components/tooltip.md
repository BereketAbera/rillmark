# Tooltip

A short, optional explanation.

Wrap the relevant tree in TooltipProvider. Trigger must be focusable and already have a name. Do not put essential instructions only in a tooltip.

## Install

First follow [setup](../getting-started.md). Then:

```sh
npx shadcn@latest add @rillmark/tooltip
```

Runtime dependencies: radix-ui@^1.8.1. Theme and local source dependencies install automatically. React is supplied by your application.

## Working example

```tsx
"use client"
import { useState } from "react"
import { Bookmark } from "lucide-react"
import { IconButton } from "@/components/ui/icon-button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function ComponentDemo() {
  const [saved, setSaved] = useState(false)
  return <TooltipProvider><Tooltip>
    <TooltipTrigger asChild><IconButton label={saved ? "Remove bookmark" : "Bookmark collection"} variant="outline" aria-pressed={saved} onClick={() => setSaved(!saved)}><Bookmark aria-hidden="true" size={18} fill={saved ? "currentColor" : "none"} /></IconButton></TooltipTrigger>
    <TooltipContent>{saved ? "Saved to your collection" : "Keep this collection close"}</TooltipContent>
  </Tooltip></TooltipProvider>
}

```

## API

Exports (generated from TypeScript): `Tooltip`, `TooltipTrigger`, `TooltipProvider`, `TooltipContent`. Native element and underlying Radix props are forwarded.

Locally declared props (generated):

| Component.prop | Type | Requirement/default | Description |
|---|---|---|---|
| TooltipContent.asChild | `boolean` | Optional |  |
| TooltipTrigger.asChild | `boolean` | Optional |  |

[Editable source](../../source/tooltip.tsx) · [Registry item](../../r/tooltip.json)
