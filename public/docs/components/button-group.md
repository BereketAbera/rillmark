# ButtonGroup

Related actions, kept together.

Supply aria-label to explain the group. Use buttons for actions and Tabs for switching a content panel.

## Install

First follow [setup](../getting-started.md). Then:

```sh
npx shadcn@latest add @rillmark/button-group
```

Theme and local source dependencies install automatically. React is supplied by your application.

## Working example

```tsx
"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

export default function ComponentDemo() {
  const [period, setPeriod] = useState("Week")
  return <div className="space-y-3">
    <ButtonGroup aria-label="Reporting period">{["Week", "Month", "Year"].map((item) => <Button key={item} variant={period === item ? "solid" : "outline"} aria-pressed={period === item} onClick={() => setPeriod(item)}>{item}</Button>)}</ButtonGroup>
    <p role="status" className="text-sm text-muted-foreground">Showing this {period.toLowerCase()}’s activity.</p>
  </div>
}

```

## API

Exports (generated from TypeScript): `ButtonGroup`. Native element and underlying Radix props are forwarded.

Locally declared props (generated):

| Component.prop | Type | Requirement/default | Description |
|---|---|---|---|
| ButtonGroup.orientation | `"horizontal" \| "vertical"` | horizontal |  |

[Editable source](../../source/button-group.tsx) · [Registry item](../../r/button-group.json)
