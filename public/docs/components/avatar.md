# Avatar

A recognizable presence, even without an image.

Compose AvatarImage with descriptive alt and AvatarFallback. If initials are the only name, give the Avatar a role="img" and aria-label.

## Install

First follow [setup](../getting-started.md). Then:

```sh
npx shadcn@latest add @rillmark/avatar
```

Runtime dependencies: radix-ui@^1.8.1. Theme and local source dependencies install automatically. React is supplied by your application.

## Working example

```tsx
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function ComponentDemo() {
  return <div className="flex items-center gap-4">
    <div className="flex -space-x-2"><Avatar role="img" aria-label="Maya Chen"><AvatarFallback>MC</AvatarFallback></Avatar><Avatar role="img" aria-label="Ada Okafor"><AvatarFallback className="bg-accent text-accent-foreground">AO</AvatarFallback></Avatar><Avatar role="img" aria-label="Niko Alvarez"><AvatarFallback>NA</AvatarFallback></Avatar></div>
    <div><p className="text-sm font-semibold">The research team</p><p className="text-sm text-muted-foreground">Maya, Ada, and Niko</p></div>
  </div>
}

```

## API

Exports (generated from TypeScript): `Avatar`, `AvatarImage`, `AvatarFallback`. Native element and underlying Radix props are forwarded.

Locally declared props (generated):

| Component.prop | Type | Requirement/default | Description |
|---|---|---|---|
| Avatar.asChild | `boolean` | Optional |  |
| AvatarImage.asChild | `boolean` | Optional |  |
| AvatarFallback.asChild | `boolean` | Optional |  |

[Editable source](../../source/avatar.tsx) · [Registry item](../../r/avatar.json)
