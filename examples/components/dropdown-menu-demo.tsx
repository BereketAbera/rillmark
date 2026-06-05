"use client"
import { useState } from "react"
import { Button } from "rillmark/button"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "rillmark/dropdown-menu"

export default function ComponentDemo() {
  const [pinned, setPinned] = useState(false)
  const [status, setStatus] = useState("No action yet.")
  return <div className="space-y-3">
    <DropdownMenu>
      <DropdownMenuTrigger asChild><Button variant="outline">Project actions</Button></DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Spring research</DropdownMenuLabel>
        <DropdownMenuCheckboxItem checked={pinned} onCheckedChange={setPinned}>Pin to overview</DropdownMenuCheckboxItem>
        <DropdownMenuItem onSelect={() => setStatus("A copy of Spring research was created.")}>Duplicate project</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="danger" onSelect={() => setStatus("Spring research was archived.")}>Archive project</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <p role="status" className="text-sm text-muted-foreground">{pinned ? "Pinned. " : ""}{status}</p>
  </div>
}
