# DropdownMenu

Actions, right where they belong.

Radix supports arrow keys, typeahead, checkbox/radio items and submenus. Use onSelect for actions; avoid nested interactive elements inside items.

## Install

First follow [setup](../getting-started.md). Then:

```sh
npx shadcn@latest add @rillmark/dropdown-menu
```

Runtime dependencies: radix-ui@^1.8.1, lucide-react@^1.67.0. Theme and local source dependencies install automatically. React is supplied by your application.

## Working example

```tsx
"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function ComponentDemo() {
  const [pinned, setPinned] = useState(false)
  const [status, setStatus] = useState("No action yet.")
  return <div className="space-y-3">
    <DropdownMenu>
      <DropdownMenuTrigger asChild><Button variant="outline">Project actions</Button></DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Spring research</DropdownMenuLabel>
        <DropdownMenuCheckboxItem checked={pinned} onCheckedChange={setPinned}>Pin to overview</DropdownMenuCheckboxItem>
        <DropdownMenuItem onSelect={() => setStatus("A copy of Spring research was created.")}>Duplicate project</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="danger" onSelect={() => setStatus("Spring research was archived.")}>Archive project</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <p role="status" className="text-sm text-muted-foreground">{pinned ? "Pinned. " : ""}{status}</p>
  </div>
}

```

## API

Exports (generated from TypeScript): `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuGroup`, `DropdownMenuRadioGroup`, `DropdownMenuSub`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioItem`, `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuSubTrigger`, `DropdownMenuSubContent`. Native element and underlying Radix props are forwarded.

Locally declared props (generated):

| Component.prop | Type | Requirement/default | Description |
|---|---|---|---|
| DropdownMenuContent.asChild | `boolean` | Optional |  |
| DropdownMenuItem.asChild | `boolean` | Optional |  |
| DropdownMenuItem.variant | `"default" \| "danger"` | default |  |
| DropdownMenuItem.inset | `boolean` | Optional |  |
| DropdownMenuCheckboxItem.asChild | `boolean` | Optional |  |
| DropdownMenuRadioItem.asChild | `boolean` | Optional |  |
| DropdownMenuLabel.asChild | `boolean` | Optional |  |
| DropdownMenuSeparator.asChild | `boolean` | Optional |  |
| DropdownMenuSubTrigger.asChild | `boolean` | Optional |  |
| DropdownMenuSubContent.asChild | `boolean` | Optional |  |
| DropdownMenuTrigger.asChild | `boolean` | Optional |  |
| DropdownMenuGroup.asChild | `boolean` | Optional |  |
| DropdownMenuRadioGroup.asChild | `boolean` | Optional |  |

[Editable source](../../source/dropdown-menu.tsx) · [Registry item](../../r/dropdown-menu.json)
