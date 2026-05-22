# Input

A familiar place to begin.

Native input props and ref are supported. Use Field for a persistent label; placeholders are hints, not labels.

## Install

First follow [setup](../getting-started.md). Then:

```sh
npx shadcn@latest add @rillmark/input
```

Theme and local source dependencies install automatically. React is supplied by your application.

## Working example

```tsx
"use client"
import { useState } from "react"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function ComponentDemo() {
  const [query, setQuery] = useState("")
  const projects = ["Coastal restoration", "Spring research", "Watershed atlas"].filter((name) => name.toLowerCase().includes(query.toLowerCase()))
  return <div className="w-full max-w-sm space-y-4">
    <Field label="Find a project" description="Search by project name."><Input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try coastal…" /></Field>
    <ul className="space-y-2 text-sm">{projects.map((project) => <li key={project}>{project}</li>)}</ul>
    <p role="status" className="text-sm text-muted-foreground">{projects.length ? `${projects.length} projects found` : "No projects match your search."}</p>
  </div>
}

```

## API

Exports (generated from TypeScript): `Input`. Native element and underlying Radix props are forwarded.

Use the underlying native element or Radix primitive props shown in the example. No additional configuration is required.

[Editable source](../../source/input.tsx) · [Registry item](../../r/input.json)
