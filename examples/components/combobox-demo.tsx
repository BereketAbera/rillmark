"use client"
import { useState } from "react"
import { Combobox } from "rillmark/combobox"
import { Field } from "rillmark/field"

const options = [{ value: "maya", label: "Maya Chen", keywords: ["research"] }, { value: "niko", label: "Niko Alvarez", keywords: ["design"] }, { value: "ada", label: "Ada Okafor", keywords: ["ecology"] }, { value: "leo", label: "Leo Park · away", disabled: true }]

export default function ComponentDemo() {
  const [owner, setOwner] = useState("")
  return <Field label="Project lead" description="Find a teammate by name or specialty." className="w-full max-w-sm">
    <Combobox options={options} value={owner} onValueChange={setOwner} placeholder="Choose a teammate" emptyMessage="No teammates match. Try a different name." />
  </Field>
}
