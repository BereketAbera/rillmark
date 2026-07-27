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
