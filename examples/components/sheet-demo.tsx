"use client"
import { useState } from "react"
import { Button } from "rillmark/button"
import { Field } from "rillmark/field"
import { Switch } from "rillmark/switch"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "rillmark/sheet"

export default function ComponentDemo() {
  const [digest, setDigest] = useState(true)
  return <Sheet>
    <SheetTrigger asChild><Button variant="outline">Notification settings</Button></SheetTrigger>
    <SheetContent>
      <SheetHeader><SheetTitle>A quieter workspace</SheetTitle><SheetDescription>Changes apply immediately to this demo session.</SheetDescription></SheetHeader>
      <Field label="Weekly digest" description="A Monday summary of projects you follow."><Switch checked={digest} onCheckedChange={setDigest} /></Field>
      <p role="status" className="text-sm text-muted-foreground">Weekly digest is {digest ? "on" : "off"}.</p>
      <SheetFooter><SheetClose asChild><Button>Done</Button></SheetClose></SheetFooter>
    </SheetContent>
  </Sheet>
}
