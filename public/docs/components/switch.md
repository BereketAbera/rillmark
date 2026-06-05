# Switch

An immediate on or off decision.

Use checked/onCheckedChange or defaultChecked. Include a persistent label; use a checkbox for consent or form submission choices.

## Install

First follow [setup](../getting-started.md). Install the package once:

```sh
npm install rillmark
```

Import components from `rillmark/switch`. Load `rillmark/styles.css` once, or use the Tailwind CSS 4 integration in setup. React 19 is supplied by your application.

## Working example

```tsx
"use client"
import { useState } from "react"
import { Field } from "rillmark/field"
import { Switch } from "rillmark/switch"

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

[Readable source](../../source/switch.tsx)
