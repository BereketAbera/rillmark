# Tooltip

A short, optional explanation.

Wrap the relevant tree in TooltipProvider. Trigger must be focusable and already have a name. Do not put essential instructions only in a tooltip.

## Install

First follow [setup](../getting-started.md). Install the package once:

```sh
npm install rillmark
```

Import components from `rillmark/tooltip`. Load `rillmark/styles.css` once, or use the Tailwind CSS 4 integration in setup. React 19 is supplied by your application.

## Working example

```tsx
"use client"
import { useState } from "react"
import { Bookmark } from "lucide-react"
import { IconButton } from "rillmark/icon-button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "rillmark/tooltip"

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

[Readable source](../../source/tooltip.tsx)
