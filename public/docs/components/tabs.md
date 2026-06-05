# Tabs

One workspace, several views.

Compose TabsList, TabsTrigger and TabsContent with matching values. Label the list. Radix handles arrow keys, Home and End.

## Install

First follow [setup](../getting-started.md). Install the package once:

```sh
npm install rillmark
```

Import components from `rillmark/tabs`. Load `rillmark/styles.css` once, or use the Tailwind CSS 4 integration in setup. React 19 is supplied by your application.

## Working example

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "rillmark/tabs"

export default function ComponentDemo() {
  return <Tabs defaultValue="overview">
    <TabsList aria-label="Project sections"><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="activity">Activity</TabsTrigger><TabsTrigger value="files" disabled>Restricted files</TabsTrigger></TabsList>
    <TabsContent value="overview"><p className="text-sm leading-relaxed">Spring research brings together 12 field notes from the coastal restoration team. The next review is on Friday.</p></TabsContent>
    <TabsContent value="activity"><p className="text-sm leading-relaxed">Maya added a field note. Niko reviewed the site survey. Three observations are ready for discussion.</p></TabsContent>
  </Tabs>
}

```

## API

Exports (generated from TypeScript): `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`. Native element and underlying Radix props are forwarded.

Locally declared props (generated):

| Component.prop | Type | Requirement/default | Description |
|---|---|---|---|
| Tabs.asChild | `boolean` | Optional |  |
| TabsList.asChild | `boolean` | Optional |  |
| TabsTrigger.asChild | `boolean` | Optional |  |
| TabsContent.asChild | `boolean` | Optional |  |

[Readable source](../../source/tabs.tsx)
