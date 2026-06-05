# Button

A clear next step, with quiet alternatives.

Use solid for the primary action, soft for a companion, outline for a boundary and ghost for a quiet action. Loading preserves the label and blocks repeated clicks.

## Install

First follow [setup](../getting-started.md). Install the package once:

```sh
npm install rillmark
```

Import components from `rillmark/button`. Load `rillmark/styles.css` once, or use the Tailwind CSS 4 integration in setup. React 19 is supplied by your application.

## Working example

```tsx
"use client"
import { useState } from "react"
import { Button } from "rillmark/button"

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

[Readable source](../../source/button.tsx)
