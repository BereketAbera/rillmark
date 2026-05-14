import * as React from "react"
import { describe, expect, it, vi } from "vitest"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Combobox } from "@/components/ui/combobox"
import { Slider } from "@/components/ui/slider"

describe("form accessibility and interaction", () => {
  it("connects labels, descriptions, validation and required state without manual ids", () => {
    render(<Field label="Workspace name" description="Visible to your team." error="Enter a workspace name." required><Input /></Field>)
    const input = screen.getByRole("textbox", { name: "Workspace name" })
    expect(input).toBeRequired()
    expect(input).toHaveAttribute("aria-invalid", "true")
    expect(input).toHaveAccessibleDescription("Visible to your team. Enter a workspace name.")
    expect(screen.getByRole("alert")).toHaveTextContent("Enter a workspace name.")
  })

  it("keeps caller descriptions and explicit labels, and inherits disabled state", () => {
    render(<><p id="more-help">Optional background.</p><Field label="Project story" description="Keep it brief." disabled><Textarea aria-describedby="more-help" aria-label="Story" /></Field></>)
    const textarea = screen.getByRole("textbox", { name: "Story" })
    expect(textarea).toBeDisabled()
    expect(textarea).toHaveAccessibleDescription("Optional background. Keep it brief.")
  })

  it("toggles checkbox and switch with the keyboard and submits checked values", async () => {
    const user = userEvent.setup()
    render(<form data-testid="preferences"><Field label="Digest"><Checkbox name="digest" value="weekly" /></Field><Field label="Public profile"><Switch name="public" /></Field></form>)
    const checkbox = screen.getByRole("checkbox", { name: "Digest" })
    const toggle = screen.getByRole("switch", { name: "Public profile" })
    await user.tab()
    expect(checkbox).toHaveFocus()
    await user.keyboard(" ")
    expect(checkbox).toBeChecked()
    await user.tab()
    expect(toggle).toHaveFocus()
    await user.keyboard(" ")
    expect(toggle).toBeChecked()
    const data = new FormData(screen.getByTestId("preferences") as HTMLFormElement)
    expect(data.get("digest")).toBe("weekly")
    expect(data.get("public")).toBe("on")
  })

  it("exposes indeterminate state and supports radio arrow navigation", async () => {
    const user = userEvent.setup()
    render(<><Checkbox aria-label="Select all" checked="indeterminate" /><Field label="Visibility"><RadioGroup defaultValue="team"><label><RadioGroupItem value="team" />Team</label><label><RadioGroupItem value="private" />Private</label></RadioGroup></Field></>)
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-checked", "mixed")
    await user.tab()
    await user.tab()
    expect(screen.getByRole("radio", { name: "Team" })).toHaveFocus()
    await user.keyboard("{ArrowDown>}")
    await waitFor(() => expect(screen.getByRole("radio", { name: "Private" })).toBeChecked())
    await user.keyboard("{/ArrowDown}")
  })

  it("opens a select, selects with keyboard, and returns focus", async () => {
    const user = userEvent.setup()
    render(<Field label="Plan"><Select defaultValue="studio"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="studio">Studio</SelectItem><SelectItem value="team">Team</SelectItem></SelectContent></Select></Field>)
    const trigger = screen.getByRole("combobox", { name: "Plan" })
    await user.tab()
    await user.keyboard(" ")
    expect(screen.getByRole("listbox")).toBeInTheDocument()
    await user.keyboard("{ArrowDown}{Enter}")
    expect(trigger).toHaveTextContent("Team")
    expect(trigger).toHaveFocus()
  })

  it("names slider thumbs and changes value with arrow keys", async () => {
    const user = userEvent.setup()
    render(<Field label="Weekly capacity" description="Hours available."><Slider defaultValue={[20]} max={40} step={5} /></Field>)
    const thumb = screen.getByRole("slider", { name: "Weekly capacity" })
    expect(thumb).toHaveAccessibleDescription("Hours available.")
    await user.tab()
    await user.keyboard("{ArrowRight}")
    expect(thumb).toHaveAttribute("aria-valuenow", "25")
  })
})

const locations = [{ value: "ams", label: "Amsterdam" }, { value: "ber", label: "Berlin", disabled: true }, { value: "cph", label: "Copenhagen", keywords: ["Denmark"] }]

describe("Combobox", () => {
  it("retains input focus, skips disabled options and submits the selected value", async () => {
    const user = userEvent.setup()
    const change = vi.fn()
    render(<form data-testid="form"><Field label="Home base" required><Combobox options={locations} name="city" onValueChange={change} /></Field><button>Continue</button></form>)
    const input = screen.getByRole("combobox", { name: "Home base" }) as HTMLInputElement
    expect(input.validity.valid).toBe(false)
    await user.tab()
    expect(input).toHaveFocus()
    expect(input).toHaveAttribute("aria-expanded", "true")
    await user.keyboard("{ArrowDown}{ArrowDown}{Enter}")
    expect(change).toHaveBeenCalledWith("cph")
    expect(input).toHaveValue("Copenhagen")
    expect(input).toHaveFocus()
    expect(input).toHaveAttribute("aria-expanded", "false")
    expect(input.validity.valid).toBe(true)
    expect(new FormData(screen.getByTestId("form") as HTMLFormElement).get("city")).toBe("cph")
  })

  it("filters labels and keywords, reports an empty state, and restores selection on Escape", async () => {
    const user = userEvent.setup()
    render(<Field label="City"><Combobox options={locations} defaultValue="ams" /></Field>)
    const input = screen.getByRole("combobox", { name: "City" })
    await user.click(input)
    await user.type(input, "Denmark")
    expect(screen.getAllByRole("option")).toHaveLength(1)
    expect(screen.getByRole("option")).toHaveTextContent("Copenhagen")
    await user.clear(input)
    await user.type(input, "Atlantis")
    expect(screen.getByRole("status")).toHaveTextContent("No matches found.")
    await user.keyboard("{Escape}")
    expect(input).toHaveValue("Amsterdam")
    expect(input).toHaveFocus()
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
  })

  it("leaves the list with Tab, refuses disabled choices and supports controlled state", async () => {
    const user = userEvent.setup()
    function Controlled() {
      const [value, setValue] = React.useState("ams")
      return <><Field label="City"><Combobox options={locations} value={value} onValueChange={setValue} /></Field><button>Next</button></>
    }
    render(<Controlled />)
    const input = screen.getByRole("combobox", { name: "City" })
    await user.click(input)
    fireEvent.click(screen.getByRole("option", { name: "Berlin" }))
    expect(input).toHaveAttribute("aria-expanded", "true")
    await user.click(screen.getByRole("option", { name: "Copenhagen" }))
    expect(input).toHaveValue("Copenhagen")
    await user.click(input)
    await user.tab()
    expect(screen.getByRole("button", { name: "Next" })).toHaveFocus()
    expect(input).toHaveAttribute("aria-expanded", "false")
  })

  it("resets uncontrolled selection with its form and keeps read-only choices closed", async () => {
    const user = userEvent.setup()
    render(<form data-testid="resettable"><Combobox aria-label="Editable city" options={locations} defaultValue="ams" /><Combobox aria-label="Fixed city" options={locations} defaultValue="ams" readOnly /><button type="reset">Reset</button></form>)
    const editable = screen.getByRole("combobox", { name: "Editable city" })
    await user.click(editable)
    await user.click(screen.getByRole("option", { name: "Copenhagen" }))
    expect(editable).toHaveValue("Copenhagen")
    await user.click(screen.getByRole("button", { name: "Reset" }))
    expect(editable).toHaveValue("Amsterdam")
    const fixed = screen.getByRole("combobox", { name: "Fixed city" })
    await user.click(fixed)
    await user.keyboard("{ArrowDown}")
    expect(fixed).toHaveAttribute("aria-expanded", "false")
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
  })
})
