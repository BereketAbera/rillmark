"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

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
