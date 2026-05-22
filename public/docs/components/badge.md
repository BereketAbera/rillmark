# Badge

A small, readable signal.

Use text to identify the state. Color is supplemental. Badges are spans; use a Button for an interactive filter.

## Install

First follow [setup](../getting-started.md). Then:

```sh
npx shadcn@latest add @rillmark/badge
```

Theme and local source dependencies install automatically. React is supplied by your application.

## Working example

```tsx
import { Badge } from "@/components/ui/badge"

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

[Editable source](../../source/badge.tsx) · [Registry item](../../r/badge.json)
