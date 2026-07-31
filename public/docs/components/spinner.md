# Spinner

A small sign that work is underway.

The default status label is Loading; provide a specific label when possible. Motion stops under reduced motion. Keep essential progress and errors in text and use one announcement per loading region.

## Install

First follow [setup](../getting-started.md). Install the package once:

```sh
npm install rillmark
```

Import components from `rillmark/spinner`. Load `rillmark/styles.css` once, or use the Tailwind CSS 4 integration in setup. React 19 is supplied by your application.

## Working example

```tsx
import { useEffect, useRef, useState } from 'react'
import { Spinner } from 'rillmark/spinner'
import { Button } from 'rillmark/button'

export default function ComponentDemo() {
  const [loading, setLoading] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => () => clearTimeout(timer.current), [])
  return <div className="flex flex-col items-center gap-5"><div className="flex items-center gap-5"><Spinner size="sm" label="Small loading indicator"/><Spinner label="Medium loading indicator"/><Spinner size="lg" label="Large loading indicator"/></div><Button disabled={loading} onClick={() => { setLoading(true); timer.current = setTimeout(() => setLoading(false), 1800) }}>{loading ? <><Spinner label="Refreshing preview" className="text-primary-foreground"/> Refreshing…</> : 'Preview loading state'}</Button><p className="text-xs text-muted-foreground">Animation respects reduced motion.</p></div>
}

```

## API

Exports (generated from TypeScript): `Spinner`. Native element and underlying Radix props are forwarded.

Locally declared props (generated):

| Component.prop | Type | Requirement/default | Description |
|---|---|---|---|
| Spinner.label | `string` | Loading |  |
| Spinner.size | `"sm" \| "md" \| "lg"` | md |  |

[Readable source](../../source/spinner.tsx)
