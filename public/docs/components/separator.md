# Separator

A pause between related things.

Decorative by default. Set decorative={false} when the separator communicates a structural division to assistive technology.

## Install

First follow [setup](../getting-started.md). Install the package once:

```sh
npm install rillmark
```

Import components from `rillmark/separator`. Load `rillmark/styles.css` once, or use the Tailwind CSS 4 integration in setup. React 19 is supplied by your application.

## Working example

```tsx
import { Separator } from "rillmark/separator"

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

[Readable source](../../source/separator.tsx)
