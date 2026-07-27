import { useState } from "react"
import { describe, expect, it, vi } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Toggle } from "rillmark/toggle"
import { ToggleGroup, ToggleGroupItem } from "rillmark/toggle-group"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "rillmark/collapsible"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "rillmark/context-menu"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "rillmark/hover-card"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "rillmark/navigation-menu"
import { ScrollArea } from "rillmark/scroll-area"
import { Command, CommandDialog } from "rillmark/command"

describe("expanded interaction components", () => {
  it("announces a toggle's pressed state and toggles with Space", async () => {
    const user = userEvent.setup()
    const onPressedChange = vi.fn()
    render(<Toggle aria-label="Save project" onPressedChange={onPressedChange}>Save</Toggle>)
    const toggle = screen.getByRole("button", { name: "Save project" })
    await user.tab()
    expect(toggle).toHaveFocus()
    expect(toggle).toHaveAttribute("aria-pressed", "false")
    await user.keyboard(" ")
    expect(toggle).toHaveAttribute("aria-pressed", "true")
    expect(onPressedChange).toHaveBeenCalledWith(true)
  })

  it("moves a single toggle group's focus past disabled items before selecting", async () => {
    const user = userEvent.setup()
    render(<ToggleGroup type="single" defaultValue="list" aria-label="View layout"><ToggleGroupItem value="list">List</ToggleGroupItem><ToggleGroupItem value="board" disabled>Board</ToggleGroupItem><ToggleGroupItem value="grid">Grid</ToggleGroupItem></ToggleGroup>)
    const list = screen.getByRole("radio", { name: "List" })
    const grid = screen.getByRole("radio", { name: "Grid" })
    list.focus()
    await user.keyboard("{ArrowRight}")
    await waitFor(() => expect(grid).toHaveFocus())
    await user.keyboard(" ")
    expect(grid).toHaveAttribute("aria-checked", "true")
    expect(list).toHaveAttribute("aria-checked", "false")
  })

  it("connects the collapsible trigger and content while exposing expanded state", async () => {
    const user = userEvent.setup()
    render(<Collapsible><CollapsibleTrigger>Preparation notes</CollapsibleTrigger><CollapsibleContent>Bring the research summary.</CollapsibleContent></Collapsible>)
    const trigger = screen.getByRole("button", { name: "Preparation notes" })
    expect(trigger).toHaveAttribute("aria-expanded", "false")
    expect(screen.queryByText("Bring the research summary.")).not.toBeInTheDocument()
    await user.click(trigger)
    expect(trigger).toHaveAttribute("aria-expanded", "true")
    expect(screen.getByText("Bring the research summary.")).toHaveAttribute("id", trigger.getAttribute("aria-controls"))
    await user.keyboard("{Enter}")
    expect(trigger).toHaveAttribute("aria-expanded", "false")
  })

  it("opens a context menu using Shift+F10 and activates an enabled item", async () => {
    const user = userEvent.setup()
    const duplicate = vi.fn()
    render(<ContextMenu><ContextMenuTrigger>Research brief</ContextMenuTrigger><ContextMenuContent><ContextMenuItem disabled>Archive</ContextMenuItem><ContextMenuItem onSelect={duplicate}>Duplicate</ContextMenuItem></ContextMenuContent></ContextMenu>)
    const trigger = screen.getByText("Research brief")
    trigger.focus()
    await user.keyboard("{Shift>}{F10}{/Shift}")
    await waitFor(() => expect(screen.getByRole("menuitem", { name: "Duplicate" })).toHaveFocus())
    await user.keyboard("{Enter}")
    expect(duplicate).toHaveBeenCalledOnce()
    await waitFor(() => expect(screen.queryByRole("menu")).not.toBeInTheDocument())
    expect(trigger).toHaveFocus()
  })

  it("shows supplementary hover-card content on keyboard focus", async () => {
    const user = userEvent.setup()
    render(<HoverCard openDelay={0} closeDelay={0}><HoverCardTrigger href="https://rillmark.vercel.app">Rillmark team</HoverCardTrigger><HoverCardContent>Components for considered work.</HoverCardContent></HoverCard>)
    await user.tab()
    expect(screen.getByRole("link", { name: "Rillmark team" })).toHaveFocus()
    expect(await screen.findByText("Components for considered work.")).toBeVisible()
    await user.keyboard("{Escape}")
    await waitFor(() => expect(screen.queryByText("Components for considered work.")).not.toBeInTheDocument())
  })

  it("opens navigation content and returns to its trigger after Escape", async () => {
    const user = userEvent.setup()
    render(<NavigationMenu aria-label="Workspace" delayDuration={0}><NavigationMenuList><NavigationMenuItem><NavigationMenuTrigger>Resources</NavigationMenuTrigger><NavigationMenuContent><NavigationMenuLink href="https://rillmark.vercel.app">Documentation</NavigationMenuLink><NavigationMenuLink href="https://rillmark.vercel.app/llms.txt">Agent index</NavigationMenuLink></NavigationMenuContent></NavigationMenuItem></NavigationMenuList></NavigationMenu>)
    const trigger = screen.getByRole("button", { name: "Resources" })
    trigger.focus()
    await user.keyboard("{Enter}{ArrowDown}")
    await waitFor(() => expect(screen.getByRole("link", { name: "Documentation" })).toHaveFocus())
    await user.keyboard("{Escape}")
    await waitFor(() => expect(trigger).toHaveFocus())
    expect(trigger).toHaveAttribute("aria-expanded", "false")
  })

  it("gives the scrolling viewport a keyboard stop, name and supplied ref", async () => {
    const user = userEvent.setup()
    const viewportRef = vi.fn()
    render(<ScrollArea aria-label="Recent updates" className="h-48" viewportProps={{ ref: viewportRef }}><p>Research complete.</p></ScrollArea>)
    const viewport = screen.getByRole("region", { name: "Recent updates" })
    expect(viewportRef).toHaveBeenCalledWith(viewport)
    await user.tab()
    expect(viewport).toHaveFocus()
    expect(viewport).toHaveTextContent("Research complete.")
  })

  it("filters command actions by keyword and runs an enabled match from search", async () => {
    const user = userEvent.setup()
    const disabled = vi.fn()
    const create = vi.fn()
    render(<CommandDialog trigger={<button>Open actions</button>} items={[{ id: "locked", label: "Locked note", keywords: ["draft"], disabled: true, onSelect: disabled }, { id: "create", label: "Create note", keywords: ["draft"], onSelect: create }, { id: "saved", label: "Saved projects", onSelect: vi.fn() }]} />)
    const trigger = screen.getByRole("button", { name: "Open actions" })
    await user.click(trigger)
    const search = screen.getByRole("searchbox", { name: "Find an action" })
    await waitFor(() => expect(search).toHaveFocus())
    await user.type(search, "draft")
    expect(screen.queryByRole("button", { name: "Saved projects" })).not.toBeInTheDocument()
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
    await user.keyboard("{Enter}")
    expect(create).toHaveBeenCalledOnce()
    expect(disabled).not.toHaveBeenCalled()
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument())
    expect(trigger).toHaveFocus()
  })

  it("navigates command buttons with arrows and Home/End while preserving search editing", async () => {
    const user = userEvent.setup()
    render(<Command items={[{ id: "one", label: "First action", onSelect: vi.fn() }, { id: "disabled", label: "Unavailable action", disabled: true, onSelect: vi.fn() }, { id: "last", label: "Last action", onSelect: vi.fn() }]} />)
    const search = screen.getByRole("searchbox")
    await user.click(search)
    await user.keyboard("{ArrowDown}")
    expect(screen.getByRole("button", { name: "First action" })).toHaveFocus()
    await user.keyboard("{End}")
    expect(screen.getByRole("button", { name: "Last action" })).toHaveFocus()
    await user.keyboard("{Home}")
    expect(screen.getByRole("button", { name: "First action" })).toHaveFocus()
    await user.keyboard("{ArrowUp}")
    expect(search).toHaveFocus()
    await user.type(search, "action")
    await user.keyboard("{Home}")
    expect((search as HTMLInputElement).selectionStart).toBe(0)
  })

  it("announces empty command results and does not execute an action", async () => {
    const user = userEvent.setup()
    const action = vi.fn()
    render(<Command emptyMessage="Nothing matches this search." items={[{ id: "create", label: "Create project", onSelect: action }]} />)
    await user.type(screen.getByRole("searchbox"), "no-match{Enter}")
    expect(screen.getByRole("status")).toHaveTextContent("Nothing matches this search.")
    expect(action).not.toHaveBeenCalled()
  })

  it("restores the previous focus when a controlled command dialog has no trigger part", async () => {
    const user = userEvent.setup()
    function ControlledCommands() {
      const [open, setOpen] = useState(false)
      return <><button onClick={() => setOpen(true)}>Open via shortcut handler</button><CommandDialog open={open} onOpenChange={setOpen} items={[{ id: "create", label: "Create project", onSelect: vi.fn() }]} /></>
    }
    render(<ControlledCommands />)
    const opener = screen.getByRole("button", { name: "Open via shortcut handler" })
    await user.click(opener)
    await waitFor(() => expect(screen.getByRole("searchbox")).toHaveFocus())
    await user.keyboard("{Escape}")
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument())
    expect(opener).toHaveFocus()
  })
})
