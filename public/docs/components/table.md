# Table

Readable data, with room to grow.

Use a caption, scoped headers and aria-sort for sortable columns. The overflow region is keyboard focusable. Sorting, filtering and selection belong in the application.

## Install

First follow [setup](../getting-started.md). Install the package once:

```sh
npm install rillmark
```

Import components from `rillmark/table`. Load `rillmark/styles.css` once, or use the Tailwind CSS 4 integration in setup. React 19 is supplied by your application.

## Working example

```tsx
import { Badge } from "rillmark/badge"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "rillmark/table"

const projects = [{ name: "Coastal restoration", lead: "Maya Chen", notes: 12, status: "In progress" }, { name: "Spring research", lead: "Ada Okafor", notes: 8, status: "In review" }, { name: "Watershed atlas", lead: "Niko Alvarez", notes: 24, status: "In progress" }]

export default function ComponentDemo() {
  return <Table containerLabel="Project overview">
    <TableCaption>Current research projects and their field notes.</TableCaption>
    <TableHeader><TableRow><TableHead>Project</TableHead><TableHead>Lead</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Notes</TableHead></TableRow></TableHeader>
    <TableBody>{projects.map((project) => <TableRow key={project.name}><TableCell className="min-w-48 font-medium">{project.name}</TableCell><TableCell className="whitespace-nowrap">{project.lead}</TableCell><TableCell><Badge variant={project.status === "In progress" ? "accent" : "soft"}>{project.status}</Badge></TableCell><TableCell className="text-right tabular-nums">{project.notes}</TableCell></TableRow>)}</TableBody>
  </Table>
}

```

## API

Exports (generated from TypeScript): `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`. Native element and underlying Radix props are forwarded.

Locally declared props (generated):

| Component.prop | Type | Requirement/default | Description |
|---|---|---|---|
| Table.containerLabel | `string` | Scrollable table |  |

[Readable source](../../source/table.tsx)
