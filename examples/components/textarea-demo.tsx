"use client"
import { useState } from "react"
import { Field } from "rillmark/field"
import { Textarea } from "rillmark/textarea"

export default function ComponentDemo() {
  const [note, setNote] = useState("")
  return <Field label="Field note" description={`${300 - note.length} characters remaining.`} className="w-full max-w-md">
    <Textarea value={note} onChange={(event) => setNote(event.target.value)} maxLength={300} placeholder="What did you notice on site today?" />
  </Field>
}
