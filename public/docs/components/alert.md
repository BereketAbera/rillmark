# Alert

Feedback with enough context to act.

Use soft for information, accent for attention and danger for errors. Danger uses role=alert; other variants use status. Do not repeat static notices excessively.

## Install

First follow [setup](../getting-started.md). Then:

```sh
npx shadcn@latest add @rillmark/alert
```

Theme and local source dependencies install automatically. React is supplied by your application.

## Working example

```tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ComponentDemo() {
  return <div className="w-full max-w-lg space-y-4">
    <Alert variant="accent"><AlertTitle>Ready for the next chapter</AlertTitle><AlertDescription>All 12 observations have been reviewed. Your team can begin the synthesis.</AlertDescription></Alert>
    <Alert variant="danger"><AlertTitle>Two notes need attention</AlertTitle><AlertDescription>Add a site location to each note before including it in your report.</AlertDescription></Alert>
  </div>
}

```

## API

Exports (generated from TypeScript): `Alert`, `AlertTitle`, `AlertDescription`. Native element and underlying Radix props are forwarded.

Locally declared props (generated):

| Component.prop | Type | Requirement/default | Description |
|---|---|---|---|
| Alert.variant | `"soft" \| "accent" \| "danger"` | soft |  |

[Editable source](../../source/alert.tsx) · [Registry item](../../r/alert.json)
