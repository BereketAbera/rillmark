# Badge

A small, readable signal.

Use text to identify the state. Color is supplemental. Badges are spans; use a Button for an interactive filter.

## Install

First follow [setup](../getting-started.md). Install the package once:

```sh
npm install rillmark
```

Import components from `rillmark/badge`. Load `rillmark/styles.css` once, or use the Tailwind CSS 4 integration in setup. React 19 is supplied by your application.

## Working example

```tsx
import { Badge } from "rillmark/badge"

export default function ComponentDemo() {
  return <div className="flex flex-wrap items-center gap-3"><Badge variant="accent">In progress</Badge><Badge variant="soft">In review</Badge><Badge variant="outline">Archived</Badge><Badge variant="danger">Needs attention</Badge></div>
}

```

## API

Exports (generated from TypeScript): `Badge`. Native element and underlying Radix props are forwarded.

Locally declared props (generated):

| Component.prop | Type | Requirement/default | Description |
|---|---|---|---|
| Badge.variant | `"soft" \| "outline" \| "accent" \| "danger"` | soft |  |

[Readable source](../../source/badge.tsx)
