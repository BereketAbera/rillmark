# Collapsible

Supporting details, close at hand.

Compose Collapsible, CollapsibleTrigger and CollapsibleContent. Control open/onOpenChange when needed. The trigger exposes expanded state and its relationship to the content.

## Install

First follow [setup](../getting-started.md). Install the package once:

```sh
npm install rillmark
```

Import components from `rillmark/collapsible`. Load `rillmark/styles.css` once, or use the Tailwind CSS 4 integration in setup. React 19 is supplied by your application.

## Working example

```tsx
"use client"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "rillmark/collapsible"

export default function ComponentDemo() {
  const [open, setOpen] = useState(false)
  return <Collapsible open={open} onOpenChange={setOpen} className="w-full max-w-md rounded-xl border border-border p-3"><CollapsibleTrigger className="w-full">Preparation notes<ChevronDown aria-hidden="true" size={18} className={open ? "rotate-180" : ""} /></CollapsibleTrigger><CollapsibleContent className="px-3 pb-3 pt-2 text-muted-foreground"><ul className="list-disc space-y-2 pl-5"><li>Bring the latest research summary.</li><li>Collect one question from each teammate.</li><li>Leave time to agree on the next step.</li></ul></CollapsibleContent></Collapsible>
}

```

## API

Exports (generated from TypeScript): `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent`. Native element and underlying Radix props are forwarded.

Locally declared props (generated):

| Component.prop | Type | Requirement/default | Description |
|---|---|---|---|
| CollapsibleTrigger.asChild | `boolean` | Optional |  |
| CollapsibleContent.asChild | `boolean` | Optional |  |
| Collapsible.asChild | `boolean` | Optional |  |

[Readable source](../../source/collapsible.tsx)
