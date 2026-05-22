# Slider

Fine control across a range.

Values are number arrays, as in Radix. Use thumbLabels for multiple thumbs and a Field label for the overall control. Arrow keys adjust values.

## Install

First follow [setup](../getting-started.md). Then:

```sh
npx shadcn@latest add @rillmark/slider
```

Runtime dependencies: radix-ui@^1.8.1. Theme and local source dependencies install automatically. React is supplied by your application.

## Working example

```tsx
"use client"
import { useState } from "react"
import { Field } from "@/components/ui/field"
import { Slider } from "@/components/ui/slider"

export default function ComponentDemo() {
  const [capacity, setCapacity] = useState([40])
  return <Field label="Review capacity" description={`${capacity[0]} observations per week.`} className="w-full max-w-sm">
    <Slider value={capacity} onValueChange={setCapacity} min={10} max={100} step={5} thumbLabels={["Observations per week"]} />
  </Field>
}

```

## API

Exports (generated from TypeScript): `Slider`. Native element and underlying Radix props are forwarded.

Locally declared props (generated):

| Component.prop | Type | Requirement/default | Description |
|---|---|---|---|
| Slider.asChild | `boolean` | Optional |  |
| Slider.thumbLabels | `string[]` | Optional | Accessible names for each thumb; particularly useful for range sliders. |

[Editable source](../../source/slider.tsx) · [Registry item](../../r/slider.json)
