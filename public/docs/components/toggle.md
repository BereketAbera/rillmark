# Toggle

A small action with a persistent state.

Use pressed/onPressedChange or defaultPressed. The button announces aria-pressed; keep its label stable while its state changes. Default controls provide a 44px touch target.

## Install

First follow [setup](../getting-started.md). Install the package once:

```sh
npm install rillmark
```

Import components from `rillmark/toggle`. Load `rillmark/styles.css` once, or use the Tailwind CSS 4 integration in setup. React 19 is supplied by your application.

## Working example

```tsx
"use client"
import { useState } from "react"
import { Star } from "lucide-react"
import { Toggle } from "rillmark/toggle"

export default function ComponentDemo() {
  const [saved, setSaved] = useState(false)
  return <div className="space-y-3"><Toggle pressed={saved} onPressedChange={setSaved} aria-label="Save this project"><Star aria-hidden="true" fill={saved ? "currentColor" : "none"} />Save project</Toggle><p role="status" className="text-sm text-muted-foreground">{saved ? "Added to your saved projects." : "Keep this project close for later."}</p></div>
}

```

## API

Exports (generated from TypeScript): `toggleStyles`, `Toggle`. Native element and underlying Radix props are forwarded.

Locally declared props (generated):

| Component.prop | Type | Requirement/default | Description |
|---|---|---|---|
| toggleStyles.variant | `"soft" \| "outline"` | soft |  |
| toggleStyles.size | `"sm" \| "md" \| "lg"` | md |  |
| toggleStyles.className | `string` | Optional |  |
| Toggle.asChild | `boolean` | Optional |  |
| Toggle.variant | `"soft" \| "outline"` | Optional |  |
| Toggle.size | `"sm" \| "md" \| "lg"` | Optional |  |

[Readable source](../../source/toggle.tsx)
