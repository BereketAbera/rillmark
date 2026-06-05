# Checkbox

An independent choice, clearly marked.

Supports checked, defaultChecked and onCheckedChange, including indeterminate state. Name the control with Field or aria-label.

## Install

First follow [setup](../getting-started.md). Install the package once:

```sh
npm install rillmark
```

Import components from `rillmark/checkbox`. Load `rillmark/styles.css` once, or use the Tailwind CSS 4 integration in setup. React 19 is supplied by your application.

## Working example

```tsx
"use client"
import { useState } from "react"
import { Checkbox } from "rillmark/checkbox"

export default function ComponentDemo() {
  const [checked, setChecked] = useState(true)
  return <div className="space-y-2">
    <label className="flex cursor-pointer items-center gap-2 text-sm"><Checkbox checked={checked} onCheckedChange={(value) => setChecked(value === true)} />Include me in the project summary</label>
    <label className="flex items-center gap-2 text-sm text-muted-foreground"><Checkbox disabled />SMS updates · unavailable on this plan</label>
    <p role="status" className="text-sm text-muted-foreground">{checked ? "You’ll receive the next summary." : "Summary emails are off."}</p>
  </div>
}

```

## API

Exports (generated from TypeScript): `Checkbox`. Native element and underlying Radix props are forwarded.

Locally declared props (generated):

| Component.prop | Type | Requirement/default | Description |
|---|---|---|---|
| Checkbox.asChild | `boolean` | Optional |  |

[Readable source](../../source/checkbox.tsx)
