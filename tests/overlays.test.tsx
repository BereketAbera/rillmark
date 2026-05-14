import { describe, expect, it, vi } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast"

describe("overlay and navigation composition", () => {
  it("focuses a dialog control and returns focus to its trigger after Escape", async () => {
    const user = userEvent.setup()
    render(<Dialog>
      <DialogTrigger asChild><button>Edit space</button></DialogTrigger>
      <DialogContent>
        <DialogTitle>Edit workspace</DialogTitle>
        <DialogDescription>Update the name shown to your team.</DialogDescription>
        <label>Workspace name<input defaultValue="Fieldwork" /></label>
      </DialogContent>
    </Dialog>)
    const trigger = screen.getByRole("button", { name: "Edit space" })
    await user.click(trigger)
    expect(screen.getByRole("dialog", { name: "Edit workspace" })).toHaveAccessibleDescription("Update the name shown to your team.")
    await waitFor(() => expect(screen.getByRole("textbox", { name: "Workspace name" })).toHaveFocus())
    await user.keyboard("{Escape}")
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument())
    expect(trigger).toHaveFocus()
  })

  it("puts destructive confirmation focus on Cancel and does not execute it on Escape", async () => {
    const user = userEvent.setup()
    const remove = vi.fn()
    render(<AlertDialog>
      <AlertDialogTrigger>Delete workspace</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Delete Fieldwork?</AlertDialogTitle>
        <AlertDialogDescription>This removes your saved workspace.</AlertDialogDescription>
        <AlertDialogCancel>Keep workspace</AlertDialogCancel>
        <AlertDialogAction onClick={remove}>Delete permanently</AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>)
    await user.click(screen.getByRole("button", { name: "Delete workspace" }))
    await waitFor(() => expect(screen.getByRole("button", { name: "Keep workspace" })).toHaveFocus())
    await user.keyboard("{Escape}")
    await waitFor(() => expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument())
    expect(remove).not.toHaveBeenCalled()
  })

  it("opens menus from the keyboard, skips disabled actions, and activates an item", async () => {
    const user = userEvent.setup()
    const archive = vi.fn()
    render(<DropdownMenu>
      <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem disabled>Rename</DropdownMenuItem>
        <DropdownMenuItem onSelect={archive}>Archive</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>)
    screen.getByRole("button", { name: "Actions" }).focus()
    await user.keyboard("{ArrowDown}")
    await waitFor(() => expect(screen.getByRole("menuitem", { name: "Archive" })).toHaveFocus())
    await user.keyboard("{Enter}")
    expect(archive).toHaveBeenCalledOnce()
    await waitFor(() => expect(screen.queryByRole("menu")).not.toBeInTheDocument())
  })

  it("switches tab panels with arrow keys while preserving the tab relationship", async () => {
    const user = userEvent.setup()
    render(<Tabs defaultValue="overview">
      <TabsList aria-label="Workspace sections">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Project overview</TabsContent>
      <TabsContent value="activity">Recent activity</TabsContent>
    </Tabs>)
    screen.getByRole("tab", { name: "Overview" }).focus()
    await user.keyboard("{ArrowRight}")
    expect(screen.getByRole("tab", { name: "Activity" })).toHaveAttribute("aria-selected", "true")
    expect(screen.getByRole("tabpanel", { name: "Activity" })).toHaveTextContent("Recent activity")
    expect(screen.queryByText("Project overview")).not.toBeInTheDocument()
  })

  it("allows a notification to be dismissed by its accessible close control", async () => {
    const user = userEvent.setup()
    render(<ToastProvider duration={100000}>
      <Toast defaultOpen variant="success">
        <ToastTitle>Changes saved</ToastTitle>
        <ToastDescription>Your workspace is up to date.</ToastDescription>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>)
    await user.click(screen.getByRole("button", { name: "Dismiss notification" }))
    await waitFor(() => expect(screen.queryByRole("button", { name: "Dismiss notification" })).not.toBeInTheDocument())
  })
})
