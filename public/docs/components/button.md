# Button

A clear next step, with quiet alternatives.

Use solid for the primary action, soft for a companion, outline for a boundary and ghost for a quiet action. Loading preserves the label and blocks repeated clicks.

## Install

First follow [setup](../getting-started.md). Then:

```sh
npx shadcn@latest add @rillmark/button
```

Runtime dependencies: radix-ui@^1.8.1. Theme and local source dependencies install automatically. React is supplied by your application.

## Working example

```tsx
"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function ComponentDemo() {
  const [saved, setSaved] = useState(false)
  return <div className="space-y-3">
    <div className="flex flex-wrap items-center gap-3">
      <Button onClick={() => setSaved(true)} disabled={saved}>{saved ? "Changes saved" : "Save changes"}</Button>
      <Button variant="outline" onClick={() => setSaved(false)}>Reset</Button>
      <Button disabled variant="soft">Waiting for access</Button>
    </div>
    <p role="status" className="text-sm text-muted-foreground">{saved ? "Your preferences are up to date." : "You have unsaved preferences."}</p>
  </div>
}

```

## API

Exports (generated from TypeScript): `buttonVariants`, `Button`. Native element and underlying Radix props are forwarded.

Locally declared props (generated):

| Component.prop | Type | Requirement/default | Description |
|---|---|---|---|
| buttonVariants.variant | `"solid" \| "soft" \| "outline" \| "ghost" \| "danger"` | solid |  |
| buttonVariants.size | `"sm" \| "md" \| "lg"` | md |  |
| buttonVariants.className | `string` | Optional |  |
| Button.variant | `"solid" \| "soft" \| "outline" \| "ghost" \| "danger"` | Optional |  |
| Button.size | `"sm" \| "md" \| "lg"` | Optional |  |
| Button.loading | `boolean` | false | Keeps the label visible and prevents repeated submission. |
| Button.asChild | `boolean` | false | Compose a single element, such as an anchor. |

[Editable source](../../source/button.tsx) · [Registry item](../../r/button.json)
