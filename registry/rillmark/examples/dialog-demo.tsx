"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function ComponentDemo() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("Fieldwork studio")
  const [saved, setSaved] = useState(name)
  return <div className="space-y-3">
    <p className="text-sm text-muted-foreground">Workspace: {saved}</p>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button variant="outline">Edit workspace</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>A name for your work</DialogTitle><DialogDescription>Your team will see this in their workspace switcher.</DialogDescription></DialogHeader>
        <form className="space-y-5" onSubmit={(event) => { event.preventDefault(); setSaved(name.trim()); setOpen(false) }}>
          <Field label="Workspace name" required><Input value={name} onChange={(event) => setName(event.target.value)} minLength={2} /></Field>
          <DialogFooter><Button type="submit" disabled={name.trim().length < 2}>Save name</Button></DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </div>
}
