# Pagination

Move through a manageable set.

Control page, pageCount and onPageChange. It disables boundary actions and announces page changes. Filter data before calculating the page count.

## Install

First follow [setup](../getting-started.md). Install the package once:

```sh
npm install rillmark
```

Import components from `rillmark/pagination`. Load `rillmark/styles.css` once, or use the Tailwind CSS 4 integration in setup. React 19 is supplied by your application.

## Working example

```tsx
"use client"
import { useState } from "react"
import { Pagination } from "rillmark/pagination"

const notes = ["Tidal pools at first light", "An unexpected nesting site", "Walking the northern edge", "Spring growth survey", "Stories from the harbor", "A map of returning birds"]

export default function ComponentDemo() {
  const [page, setPage] = useState(1)
  return <div className="w-full space-y-5">
    <ul className="space-y-3 text-sm">{notes.slice((page - 1) * 2, page * 2).map((note) => <li key={note} className="rounded-lg border border-border p-4">{note}</li>)}</ul>
    <Pagination page={page} pageCount={3} onPageChange={setPage} />
  </div>
}

```

## API

Exports (generated from TypeScript): `Pagination`. Native element and underlying Radix props are forwarded.

Locally declared props (generated):

| Component.prop | Type | Requirement/default | Description |
|---|---|---|---|
| Pagination.page | `number` | Required |  |
| Pagination.pageCount | `number` | Required |  |
| Pagination.onPageChange | `(page: number) => void` | Required |  |

[Readable source](../../source/pagination.tsx)
