# Switch

An immediate on or off decision.

Use checked/onCheckedChange or defaultChecked. Include a persistent label; use a checkbox for consent or form submission choices.

## Install

First follow [setup](../getting-started.md). Then:

```sh
npx shadcn@latest add @rillmark/switch
```

Runtime dependencies: radix-ui@^1.8.1. Theme and local source dependencies install automatically. React is supplied by your application.

## Working example

```tsx
"use client"
import { useState } from "react"
import { Field } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"

export default function ComponentDemo() {
  const [enabled, setEnabled] = useState(true)
  return <Field label="Quiet hours" description={enabled ? "Notifications pause from 8 pm to 8 am." : "Notifications can arrive at any time."}>
    <Switch checked={enabled} onCheckedChange={setEnabled} />
  </Field>
}

```

## API

Exports (generated from TypeScript): `Switch`. Native element and underlying Radix props are forwarded.

Locally declared props (generated):

| Component.prop | Type | Requirement/default | Description |
|---|---|---|---|
| Switch.asChild | `boolean` | Optional |  |

[Editable source](../../source/switch.tsx) · [Registry item](../../r/switch.json)
