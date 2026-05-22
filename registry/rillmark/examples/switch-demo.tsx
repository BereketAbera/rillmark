"use client"
import { useState } from "react"
import { Field } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"

export default function ComponentDemo() {
  const [enabled, setEnabled] = useState(true)
  return <Field label="Quiet hours" description={enabled ? "Notifications pause from 8 pm to 8 am." : "Notifications can arrive at any time."}>
    <Switch checked={enabled} onCheckedChange={setEnabled} />
  </Field>
}
