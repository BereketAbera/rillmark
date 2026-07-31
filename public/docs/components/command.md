# Command

Find the next action without leaving your work.

Pass items with unique id, label and onSelect, plus optional description, keywords, icon or disabled state. Command is an inline searchable action list; CommandDialog adds a modal with a trigger and open/onOpenChange. Arrow keys move through search and enabled buttons; Enter in search runs the first enabled match. Home/End move among action buttons. Escape closes the dialog and returns focus to its trigger.

## Install

First follow [setup](../getting-started.md). Install the package once:

```sh
npm install rillmark
```

Import components from `rillmark/command`. Load `rillmark/styles.css` once, or use the Tailwind CSS 4 integration in setup. React 19 is supplied by your application.

## Working example

```tsx
"use client"
import { useState } from "react"
import { Bell, FilePlus, Star } from "lucide-react"
import { Button } from "rillmark/button"
import { CommandDialog } from "rillmark/command"

export default function ComponentDemo() {
  const [result, setResult] = useState("Choose an action to begin.")
  return <div className="space-y-3"><CommandDialog title="A little momentum" trigger={<Button variant="outline">Find an action</Button>} items={[
    { id: "draft", label: "Create a draft", description: "Start a new research note.", keywords: ["new", "document"], icon: <FilePlus />, onSelect: () => setResult("A new draft is ready for your notes.") },
    { id: "saved", label: "Show saved projects", description: "Return to work you marked for later.", keywords: ["favorites"], icon: <Star />, onSelect: () => setResult("Your saved projects are ready to review.") },
    { id: "quiet", label: "Pause notifications", description: "Make room for an hour of focus.", keywords: ["quiet", "focus"], icon: <Bell />, onSelect: () => setResult("Notifications paused for one hour.") },
  ]} /><p role="status" className="text-sm text-muted-foreground">{result}</p></div>
}

```

## API

Exports (generated from TypeScript): `Command`, `CommandDialog`. Native element and underlying Radix props are forwarded.

Locally declared props (generated):

| Component.prop | Type | Requirement/default | Description |
|---|---|---|---|
| Command.items | `CommandAction[]` | Required |  |
| Command.label | `string` | Find an action | Accessible name for the search input. |
| Command.placeholder | `string` | Search actions… |  |
| Command.emptyMessage | `string` | No matching actions. Try another search. |  |
| Command.onAction | `((action: CommandAction) => void)` | Optional | Runs after the selected action. |
| CommandDialog.open | `boolean` | Optional |  |
| CommandDialog.defaultOpen | `boolean` | false |  |
| CommandDialog.onOpenChange | `((open: boolean) => void)` | Optional |  |
| CommandDialog.title | `string` | Workspace actions |  |
| CommandDialog.description | `string` | Search for an action, then choose it. Use arrow keys to move between the search and actions. |  |
| CommandDialog.trigger | `ReactElement<unknown, string \| JSXElementConstructor<any>>` | Optional | The actual focusable opener; focus returns here when the dialog closes. |
| CommandDialog.label | `string` | Optional | Accessible name for the search input. |
| CommandDialog.items | `CommandAction[]` | Required |  |
| CommandDialog.placeholder | `string` | Optional |  |
| CommandDialog.emptyMessage | `string` | Optional |  |
| CommandDialog.onAction | `((action: CommandAction) => void)` | Optional | Runs after the selected action. |

[Readable source](../../source/command.tsx)
