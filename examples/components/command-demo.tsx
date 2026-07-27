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
