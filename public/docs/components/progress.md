# Progress

A sense of how far along.

Always supply aria-label or aria-labelledby. A null value is indeterminate. Explicit values are clamped between zero and max.

## Install

First follow [setup](../getting-started.md). Install the package once:

```sh
npm install rillmark
```

Import components from `rillmark/progress`. Load `rillmark/styles.css` once, or use the Tailwind CSS 4 integration in setup. React 19 is supplied by your application.

## Working example

```tsx
"use client"
import { useState } from "react"
import { Button } from "rillmark/button"
import { Progress } from "rillmark/progress"

export default function ComponentDemo() {
  const [reviewed, setReviewed] = useState(6)
  return <div className="w-full max-w-sm space-y-4">
    <div className="flex justify-between gap-3 text-sm"><span className="font-semibold">Observation review</span><span>{reviewed} of 12</span></div>
    <Progress aria-label="Observations reviewed" value={reviewed} max={12} getValueLabel={(value, max) => `${value} of ${max} observations`} />
    <Button variant="outline" onClick={() => setReviewed(reviewed === 12 ? 0 : reviewed + 1)}>{reviewed === 12 ? "Start another review" : "Review next observation"}</Button>
  </div>
}

```

## API

Exports (generated from TypeScript): `Progress`. Native element and underlying Radix props are forwarded.

Locally declared props (generated):

| Component.prop | Type | Requirement/default | Description |
|---|---|---|---|
| Progress.asChild | `boolean` | Optional |  |

[Readable source](../../source/progress.tsx)
