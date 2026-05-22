# RadioGroup

One choice from a visible set.

Label the group with Field, and each RadioGroupItem using a label or aria-label. Radix handles roving arrow-key focus.

## Install

First follow [setup](../getting-started.md). Then:

```sh
npx shadcn@latest add @rillmark/radio-group
```

Runtime dependencies: radix-ui@^1.8.1. Theme and local source dependencies install automatically. React is supplied by your application.

## Working example

```tsx
"use client"
import { useId, useState } from "react"
import { Field } from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function ComponentDemo() {
  const id = useId()
  const [frequency, setFrequency] = useState("Weekly")
  return <Field label="Summary frequency" description="Choose how often to hear from your workspace.">
    <RadioGroup value={frequency} onValueChange={setFrequency}>{["Daily", "Weekly", "Monthly"].map((value) => <label key={value} htmlFor={`${id}-${value}`} className="flex cursor-pointer items-center gap-2 text-sm"><RadioGroupItem id={`${id}-${value}`} value={value} />{value}</label>)}</RadioGroup>
  </Field>
}

```

## API

Exports (generated from TypeScript): `RadioGroup`, `RadioGroupItem`. Native element and underlying Radix props are forwarded.

Locally declared props (generated):

| Component.prop | Type | Requirement/default | Description |
|---|---|---|---|
| RadioGroup.asChild | `boolean` | Optional |  |
| RadioGroupItem.asChild | `boolean` | Optional |  |

[Editable source](../../source/radio-group.tsx) · [Registry item](../../r/radio-group.json)
