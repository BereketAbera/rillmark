# Separator

A pause between related things.

Decorative by default. Set decorative={false} when the separator communicates a structural division to assistive technology.

## Install

First follow [setup](../getting-started.md). Then:

```sh
npx shadcn@latest add @rillmark/separator
```

Runtime dependencies: radix-ui@^1.8.1. Theme and local source dependencies install automatically. React is supplied by your application.

## Working example

```tsx
import { Separator } from "@/components/ui/separator"

export default function ComponentDemo() {
  return <div className="w-full max-w-sm space-y-4">
    <div><p className="font-semibold">Coastal restoration</p><p className="text-sm text-muted-foreground">A shared research workspace.</p></div>
    <Separator />
    <div className="flex h-6 items-center gap-4 text-sm text-muted-foreground"><span>12 notes</span><Separator orientation="vertical" /><span>3 collaborators</span></div>
  </div>
}

```

## API

Exports (generated from TypeScript): `Separator`. Native element and underlying Radix props are forwarded.

Locally declared props (generated):

| Component.prop | Type | Requirement/default | Description |
|---|---|---|---|
| Separator.asChild | `boolean` | Optional |  |

[Editable source](../../source/separator.tsx) · [Registry item](../../r/separator.json)
