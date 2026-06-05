# Slider

Fine control across a range.

Values are number arrays, as in Radix. Use thumbLabels for multiple thumbs and a Field label for the overall control. Arrow keys adjust values.

## Install

First follow [setup](../getting-started.md). Install the package once:

```sh
npm install rillmark
```

Import components from `rillmark/slider`. Load `rillmark/styles.css` once, or use the Tailwind CSS 4 integration in setup. React 19 is supplied by your application.

## Working example

```tsx
"use client"
import { useState } from "react"
import { Field } from "rillmark/field"
import { Slider } from "rillmark/slider"

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

[Readable source](../../source/slider.tsx)
