# Select

A focused list of choices.

Compose Select, SelectTrigger, SelectValue, SelectContent and SelectItem. Radix supplies typeahead and keyboard selection. Item values must be nonempty.

## Install

First follow [setup](../getting-started.md). Then:

```sh
npx shadcn@latest add @rillmark/select
```

Runtime dependencies: radix-ui@^1.8.1. Theme and local source dependencies install automatically. React is supplied by your application.

## Working example

```tsx
"use client"
import { useState } from "react"
import { Field } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ComponentDemo() {
  const [region, setRegion] = useState("east")
  return <Field label="Research region" description="Your project’s primary field location." className="w-full max-w-sm">
    <Select value={region} onValueChange={setRegion}>
      <SelectTrigger><SelectValue placeholder="Choose a region" /></SelectTrigger>
      <SelectContent><SelectItem value="east">Eastern coast</SelectItem><SelectItem value="north">Northern highlands</SelectItem><SelectItem value="central">Central watershed</SelectItem><SelectItem value="south" disabled>Southern reserve · full</SelectItem></SelectContent>
    </Select>
  </Field>
}

```

## API

Exports (generated from TypeScript): `Select`, `SelectGroup`, `SelectValue`, `SelectTrigger`, `SelectContent`, `SelectItem`, `SelectLabel`, `SelectSeparator`. Native element and underlying Radix props are forwarded.

Locally declared props (generated):

| Component.prop | Type | Requirement/default | Description |
|---|---|---|---|
| Select.value | `string` | Optional |  |
| Select.defaultValue | `string` | Optional |  |
| Select.onValueChange | `((value: string) => void)` | Optional |  |
| SelectTrigger.asChild | `boolean` | Optional |  |
| SelectContent.asChild | `boolean` | Optional |  |
| SelectItem.asChild | `boolean` | Optional |  |
| SelectLabel.asChild | `boolean` | Optional |  |
| SelectSeparator.asChild | `boolean` | Optional |  |
| SelectGroup.asChild | `boolean` | Optional |  |
| SelectValue.asChild | `boolean` | Optional |  |

[Editable source](../../source/select.tsx) · [Registry item](../../r/select.json)
