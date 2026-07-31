# Timeline

A readable record of what happened.

Compose Timeline, TimelineItem, TimelineTitle, TimelineDescription and TimelineTime. Use a heading level that fits the page and dateTime for machine-readable timestamps. Icons are decorative; describe the event and its status in text.

## Install

First follow [setup](../getting-started.md). Install the package once:

```sh
npm install rillmark
```

Import components from `rillmark/timeline`. Load `rillmark/styles.css` once, or use the Tailwind CSS 4 integration in setup. React 19 is supplied by your application.

## Working example

```tsx
import { Check, MessageSquare, Plus } from 'lucide-react'
import { Timeline, TimelineItem, TimelineTitle, TimelineDescription, TimelineTime } from 'rillmark/timeline'

export default function ComponentDemo() {
  return <Timeline aria-label="Project activity" className="w-full max-w-md"><TimelineItem icon={<Check/>}><TimelineTitle>Direction approved</TimelineTitle><TimelineDescription>Maya signed off on the concept. The next phase is ready.</TimelineDescription><TimelineTime dateTime="2026-11-04T10:30:00Z">Today, 10:30</TimelineTime></TimelineItem><TimelineItem icon={<MessageSquare/>}><TimelineTitle>Feedback shared</TimelineTitle><TimelineDescription>Three notes on the first exploration.</TimelineDescription><TimelineTime dateTime="2026-11-03T15:00:00Z">Yesterday, 15:00</TimelineTime></TimelineItem><TimelineItem icon={<Plus/>}><TimelineTitle>Project created</TimelineTitle><TimelineDescription>A new place for an idea to take shape.</TimelineDescription><TimelineTime dateTime="2026-11-02T09:00:00Z">November 2, 09:00</TimelineTime></TimelineItem></Timeline>
}

```

## API

Exports (generated from TypeScript): `Timeline`, `TimelineItem`, `TimelineTitle`, `TimelineDescription`, `TimelineTime`. Native element and underlying Radix props are forwarded.

Locally declared props (generated):

| Component.prop | Type | Requirement/default | Description |
|---|---|---|---|
| TimelineItem.icon | `ReactNode` | Optional | Decorative marker; include its meaning in the item's text. |
| TimelineTitle.as | `"h2" \| "h3" \| "h4" \| "h5" \| "h6"` | h3 |  |
| TimelineTitle.ref | `Ref<HTMLHeadingElement>` | Optional |  |

[Readable source](../../source/timeline.tsx)
