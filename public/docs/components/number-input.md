# NumberInput

A count with room to adjust.

Use value/onValueChange or defaultValue. Empty input stays empty while editing; bounds clamp on blur or step. Native number validation, form reset and Field labels are preserved. Name increment and decrement actions when there is more than one counter.

## Install

First follow [setup](../getting-started.md). Install the package once:

```sh
npm install rillmark
```

Import components from `rillmark/number-input`. Load `rillmark/styles.css` once, or use the Tailwind CSS 4 integration in setup. React 19 is supplied by your application.

## Working example

```tsx
import { useState } from 'react'
import { Field } from 'rillmark/field'
import { NumberInput } from 'rillmark/number-input'

export default function ComponentDemo() {
  const [seats, setSeats] = useState<number | ''>(4)
  return <div className="w-full max-w-xs space-y-4"><Field label="Team seats" description="Choose between 1 and 20 seats."><NumberInput value={seats} onValueChange={setSeats} min={1} max={20} decrementLabel="Remove one seat" incrementLabel="Add one seat"/></Field><p className="text-sm text-muted-foreground">{seats === '' ? 'Enter a seat count.' : `${seats} seats · $${seats * 12} per month`}</p></div>
}

```

## API

Exports (generated from TypeScript): `NumberInput`. Native element and underlying Radix props are forwarded.

Locally declared props (generated):

| Component.prop | Type | Requirement/default | Description |
|---|---|---|---|
| NumberInput.value | `number \| ""` | Optional |  |
| NumberInput.defaultValue | `number \| ""` |  |  |
| NumberInput.onValueChange | `((value: number \| "") => void)` | Optional |  |
| NumberInput.min | `number` | Optional |  |
| NumberInput.max | `number` | Optional |  |
| NumberInput.step | `number` | 1 |  |
| NumberInput.decrementLabel | `string` | Decrease value |  |
| NumberInput.incrementLabel | `string` | Increase value |  |

[Readable source](../../source/number-input.tsx)
