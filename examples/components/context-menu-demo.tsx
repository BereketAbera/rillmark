"use client"
import { useState } from "react"
import { ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuTrigger } from "rillmark/context-menu"

export default function ComponentDemo() {
  const [pinned, setPinned] = useState(false)
  const [copies, setCopies] = useState(0)
  return <div className="w-full max-w-md space-y-3"><ContextMenu><ContextMenuTrigger className="block rounded-xl border border-dashed border-input bg-card p-8 text-center"><p className="font-medium">Coastal research brief</p><p className="mt-2 text-sm text-muted-foreground">Right-click, long-press, or focus here and press Shift+F10.</p></ContextMenuTrigger><ContextMenuContent><ContextMenuLabel>Research brief</ContextMenuLabel><ContextMenuCheckboxItem checked={pinned} onCheckedChange={(value) => setPinned(value === true)}>Pin to workspace</ContextMenuCheckboxItem><ContextMenuSeparator /><ContextMenuItem onSelect={() => setCopies((count) => count + 1)}>Duplicate brief</ContextMenuItem></ContextMenuContent></ContextMenu><p role="status" className="text-sm text-muted-foreground">{pinned ? "Pinned" : "Unpinned"} · {copies} {copies === 1 ? "copy" : "copies"} created</p></div>
}
