# Breadcrumbs

A useful trail back.

Compose the list with real links and a final BreadcrumbPage. Separators are hidden from assistive technology.

## Install

First follow [setup](../getting-started.md). Install the package once:

```sh
npm install rillmark
```

Import components from `rillmark/breadcrumbs`. Load `rillmark/styles.css` once, or use the Tailwind CSS 4 integration in setup. React 19 is supplied by your application.

## Working example

```tsx
import { Breadcrumbs, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "rillmark/breadcrumbs"

export default function ComponentDemo() {
  return <Breadcrumbs><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="/">Rillmark</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>Breadcrumbs</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumbs>
}

```

## API

Exports (generated from TypeScript): `Breadcrumbs`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`. Native element and underlying Radix props are forwarded.

Use the underlying native element or Radix primitive props shown in the example. No additional configuration is required.

[Readable source](../../source/breadcrumbs.tsx)
