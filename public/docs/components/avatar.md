# Avatar

A recognizable presence, even without an image.

Compose AvatarImage with descriptive alt and AvatarFallback. If initials are the only name, give the Avatar a role="img" and aria-label.

## Install

First follow [setup](../getting-started.md). Install the package once:

```sh
npm install rillmark
```

Import components from `rillmark/avatar`. Load `rillmark/styles.css` once, or use the Tailwind CSS 4 integration in setup. React 19 is supplied by your application.

## Working example

```tsx
import { Avatar, AvatarFallback } from "rillmark/avatar"

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

[Readable source](../../source/avatar.tsx)
