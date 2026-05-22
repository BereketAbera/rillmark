# Skeleton

A quiet placeholder for what comes next.

Skeleton is decorative and hidden from assistive technology. Mark the containing region aria-busy and provide a loading label. Motion stops under reduced motion.

## Install

First follow [setup](../getting-started.md). Then:

```sh
npx shadcn@latest add @rillmark/skeleton
```

Theme and local source dependencies install automatically. React is supplied by your application.

## Working example

```tsx
"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export default function ComponentDemo() {
  const [loading, setLoading] = useState(true)
  return <div className="w-full max-w-sm space-y-5">
    <div aria-busy={loading} className="min-h-28 space-y-3">
      {loading ? <><span className="sr-only" role="status">Loading project preview</span><Skeleton className="h-5 w-2/3" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-5/6" /></> : <><p className="font-semibold">Coastal restoration</p><p className="text-sm text-muted-foreground">12 field notes exploring how our shoreline is changing.</p></>}
    </div>
    <Button variant="outline" onClick={() => setLoading(!loading)}>{loading ? "Show loaded content" : "Preview loading state"}</Button>
  </div>
}

```

## API

Exports (generated from TypeScript): `Skeleton`. Native element and underlying Radix props are forwarded.

Use the underlying native element or Radix primitive props shown in the example. No additional configuration is required.

[Editable source](../../source/skeleton.tsx) · [Registry item](../../r/skeleton.json)
