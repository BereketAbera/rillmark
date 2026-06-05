"use client"
import { useState } from "react"
import { FolderPlus } from "lucide-react"
import { Button } from "rillmark/button"
import { EmptyState } from "rillmark/empty-state"

export default function ComponentDemo() {
  const [created, setCreated] = useState(false)
  return created ? <div className="space-y-3"><p role="status" className="text-sm font-semibold">Untitled collection created.</p><p className="text-sm text-muted-foreground">Your first collection is ready for observations.</p><Button variant="outline" onClick={() => setCreated(false)}>Reset demo</Button></div> : <EmptyState title="Room for a new perspective" description="Gather the projects and observations you want to return to." icon={<FolderPlus size={24} />} action={<Button onClick={() => setCreated(true)}>Create a collection</Button>} />
}
