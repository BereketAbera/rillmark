"use client"
import { useId, useState } from "react"
import { Field } from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function ComponentDemo() {
  const id = useId()
  const [frequency, setFrequency] = useState("Weekly")
  return <Field label="Summary frequency" description="Choose how often to hear from your workspace.">
    <RadioGroup value={frequency} onValueChange={setFrequency}>{["Daily", "Weekly", "Monthly"].map((value) => <label key={value} htmlFor={`${id}-${value}`} className="flex cursor-pointer items-center gap-2 text-sm"><RadioGroupItem id={`${id}-${value}`} value={value} />{value}</label>)}</RadioGroup>
  </Field>
}
