# NavigationMenu

A clear route into a larger workspace.

Compose List, Item, Trigger, Content and Link using real destinations. The root supplies its viewport; set viewport={false} for manual placement. Radix manages keyboard navigation and dismissal.

## Install

First follow [setup](../getting-started.md). Install the package once:

```sh
npm install rillmark
```

Import components from `rillmark/navigation-menu`. Load `rillmark/styles.css` once, or use the Tailwind CSS 4 integration in setup. React 19 is supplied by your application.

## Working example

```tsx
"use client"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "rillmark/navigation-menu"

export default function ComponentDemo() {
  return <NavigationMenu aria-label="Documentation">
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Explore components</NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuLink href="#/components/button" className="grid gap-1"><span>Actions</span><span className="text-xs font-normal text-muted-foreground">Buttons and their quiet alternatives.</span></NavigationMenuLink>
          <NavigationMenuLink href="#/components/field" className="grid gap-1"><span>Forms</span><span className="text-xs font-normal text-muted-foreground">Labels, descriptions and errors together.</span></NavigationMenuLink>
          <NavigationMenuLink href="#/components/dialog" className="grid gap-1"><span>Focused tasks</span><span className="text-xs font-normal text-muted-foreground">Dialogs with a clear way back.</span></NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem><NavigationMenuLink href="https://rillmark.vercel.app/docs/foundations.md">Foundations</NavigationMenuLink></NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
}

```

## API

Exports (generated from TypeScript): `NavigationMenu`, `NavigationMenuList`, `NavigationMenuItem`, `NavigationMenuTrigger`, `NavigationMenuContent`, `NavigationMenuLink`, `NavigationMenuViewport`, `NavigationMenuIndicator`. Native element and underlying Radix props are forwarded.

Locally declared props (generated):

| Component.prop | Type | Requirement/default | Description |
|---|---|---|---|
| NavigationMenu.viewport | `boolean` | true | Render the shared dropdown viewport automatically. Disable to place it yourself. |
| NavigationMenu.asChild | `boolean` | Optional |  |
| NavigationMenuList.asChild | `boolean` | Optional |  |
| NavigationMenuTrigger.asChild | `boolean` | Optional |  |
| NavigationMenuContent.asChild | `boolean` | Optional |  |
| NavigationMenuLink.asChild | `boolean` | Optional |  |
| NavigationMenuViewport.asChild | `boolean` | Optional |  |
| NavigationMenuIndicator.asChild | `boolean` | Optional |  |
| NavigationMenuItem.asChild | `boolean` | Optional |  |

[Readable source](../../source/navigation-menu.tsx)
