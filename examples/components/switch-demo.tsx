"use client"
import { useState } from "react"
import { Field } from "rillmark/field"
import { Switch } from "rillmark/switch"

export default function ComponentDemo() {
  const [enabled, setEnabled] = useState(true)
  return <Field label="Quiet hours" description={enabled ? "Notifications pause from 8 pm to 8 am." : "Notifications can arrive at any time."}>
    <Switch checked={enabled} onCheckedChange={setEnabled} />
  </Field>
}
