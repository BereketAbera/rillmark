# ToggleGroup

Related choices in one compact row.

Choose type="single" or type="multiple" and give the group an accessible name. Items need unique values and labels. Arrow keys move focus; Space or Enter selects. Group variant and size are inherited by items.

## Install

First follow [setup](../getting-started.md). Install the package once:

```sh
npm install rillmark
```

Import components from `rillmark/toggle-group`. Load `rillmark/styles.css` once, or use the Tailwind CSS 4 integration in setup. React 19 is supplied by your application.

## Working example

```tsx
"use client"
import { useState } from "react"
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "rillmark/toggle-group"

export default function ComponentDemo() {
  const [alignment, setAlignment] = useState("left")
  return <div className="w-full max-w-md space-y-4"><ToggleGroup type="single" value={alignment} onValueChange={(value) => { if (value) setAlignment(value) }} aria-label="Text alignment" variant="outline"><ToggleGroupItem value="left" aria-label="Align left"><AlignLeft aria-hidden="true" /></ToggleGroupItem><ToggleGroupItem value="center" aria-label="Align center"><AlignCenter aria-hidden="true" /></ToggleGroupItem><ToggleGroupItem value="right" aria-label="Align right"><AlignRight aria-hidden="true" /></ToggleGroupItem></ToggleGroup><p className="rounded-xl border border-border bg-card p-4 text-sm" style={{ textAlign: alignment as "left" | "center" | "right" }}>Make room for the next good idea.</p></div>
}

```

## API

Exports (generated from TypeScript): `ToggleGroup`, `ToggleGroupItem`. Native element and underlying Radix props are forwarded.

Locally declared props (generated):

| Component.prop | Type | Requirement/default | Description |
|---|---|---|---|
| ToggleGroup.asChild | `boolean` | Optional |  |
| ToggleGroup.variant | `"soft" \| "outline"` | soft |  |
| ToggleGroup.size | `"sm" \| "md" \| "lg"` | md |  |
| ToggleGroupItem.asChild | `boolean` | Optional |  |
| ToggleGroupItem.variant | `"soft" \| "outline"` | Optional |  |
| ToggleGroupItem.size | `"sm" \| "md" \| "lg"` | Optional |  |

[Readable source](../../source/toggle-group.tsx)
