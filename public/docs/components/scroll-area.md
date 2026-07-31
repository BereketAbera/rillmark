# ScrollArea

More detail within a measured space.

Set an explicit height or width and name the scrolling region with aria-label. orientation controls scrollbars; viewportProps exposes viewport classes, native props and ref. Native keyboard scrolling remains available.

## Install

First follow [setup](../getting-started.md). Install the package once:

```sh
npm install rillmark
```

Import components from `rillmark/scroll-area`. Load `rillmark/styles.css` once, or use the Tailwind CSS 4 integration in setup. React 19 is supplied by your application.

## Working example

```tsx
"use client"
import { ScrollArea } from "rillmark/scroll-area"

const activity = ["Maya shared the fieldwork brief", "Niko added the first sketches", "Ada reviewed the research notes", "Leo updated the project timeline", "Maya approved the direction", "Niko prepared the prototype", "Ada invited the review team", "Leo scheduled the next workshop"]

export default function ComponentDemo() {
  return <ScrollArea aria-label="Recent workspace activity" className="h-60 w-full max-w-sm rounded-xl border border-border bg-card">
    <div className="p-4 pr-6">
      <h3 className="mb-3 text-sm font-semibold">Recent activity</h3>
      <ol className="divide-y divide-border">
        {activity.map((event, index) => <li key={event} className="py-3"><p className="text-sm">{event}</p><p className="mt-1 text-xs text-muted-foreground">{index + 1} hours ago</p></li>)}
      </ol>
    </div>
  </ScrollArea>
}

```

## API

Exports (generated from TypeScript): `ScrollArea`, `ScrollBar`. Native element and underlying Radix props are forwarded.

Locally declared props (generated):

| Component.prop | Type | Requirement/default | Description |
|---|---|---|---|
| ScrollArea.orientation | `"vertical" \| "horizontal" \| "both"` | vertical | Which overflow directions receive a scrollbar. |
| ScrollArea.viewportProps | `(ScrollAreaViewportProps & RefAttributes<HTMLDivElement>)` | {} | Props and ref for the keyboard-focusable scrolling element. |
| ScrollArea.asChild | `boolean` | Optional |  |
| ScrollBar.asChild | `boolean` | Optional |  |

[Readable source](../../source/scroll-area.tsx)
