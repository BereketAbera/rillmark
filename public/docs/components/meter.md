# Meter

A useful measure against a known range.

Supply an accessible name and a value within min/max. This native meter represents capacity or a measurement, such as storage. Use Progress for task completion. aria-valuetext can describe units and context.

## Install

First follow [setup](../getting-started.md). Install the package once:

```sh
npm install rillmark
```

Import components from `rillmark/meter`. Load `rillmark/styles.css` once, or use the Tailwind CSS 4 integration in setup. React 19 is supplied by your application.

## Working example

```tsx
import { useState } from 'react'
import { Meter } from 'rillmark/meter'
import { Field } from 'rillmark/field'
import { Slider } from 'rillmark/slider'

export default function ComponentDemo() {
  const [used, setUsed] = useState(6)
  return <div className="w-full max-w-sm space-y-6"><div><div className="mb-2 flex justify-between gap-4 text-sm"><span id="storage-label" className="font-medium">Storage used</span><span className="text-muted-foreground">{used} of 20 GB</span></div><Meter aria-labelledby="storage-label" value={used} max={20} aria-valuetext={`${used} of 20 gigabytes used`}/></div><Field label="Preview usage"><Slider value={[used]} onValueChange={([next]) => setUsed(next)} max={20} step={1}/></Field></div>
}

```

## API

Exports (generated from TypeScript): `Meter`. Native element and underlying Radix props are forwarded.

Locally declared props (generated):

| Component.prop | Type | Requirement/default | Description |
|---|---|---|---|
| Meter.min | `number` | 0 |  |
| Meter.max | `number` | 100 |  |
| Meter.value | `number` | Required |  |

[Readable source](../../source/meter.tsx)
