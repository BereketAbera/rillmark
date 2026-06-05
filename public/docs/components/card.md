# Card

A home for related information.

Compose Header, Title, Description, Content and Footer. Choose a heading level with CardTitle as="h2" (or h3–h6) appropriate to your page; Card itself is a plain div.

## Install

First follow [setup](../getting-started.md). Install the package once:

```sh
npm install rillmark
```

Import components from `rillmark/card`. Load `rillmark/styles.css` once, or use the Tailwind CSS 4 integration in setup. React 19 is supplied by your application.

## Working example

```tsx
"use client"
import { useState } from "react"
import { Badge } from "rillmark/badge"
import { Button } from "rillmark/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "rillmark/card"

export default function ComponentDemo() {
  const [following, setFollowing] = useState(false)
  return <Card className="w-full max-w-sm">
    <CardHeader><Badge variant="accent" className="w-fit">Fieldwork</Badge><CardTitle as="h2">Coastal restoration</CardTitle><CardDescription>Finding a better rhythm between our communities and the shore.</CardDescription></CardHeader>
    <CardContent><p className="text-sm text-muted-foreground">12 observations · 3 collaborators</p></CardContent>
    <CardFooter><Button variant={following ? "soft" : "solid"} aria-pressed={following} onClick={() => setFollowing(!following)}>{following ? "Following project" : "Follow project"}</Button></CardFooter>
  </Card>
}

```

## API

Exports (generated from TypeScript): `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`. Native element and underlying Radix props are forwarded.

Locally declared props (generated):

| Component.prop | Type | Requirement/default | Description |
|---|---|---|---|
| CardTitle.as | `"h2" \| "h3" \| "h4" \| "h5" \| "h6"` | h3 |  |

[Readable source](../../source/card.tsx)
