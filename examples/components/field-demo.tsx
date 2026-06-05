"use client"
import { useState } from "react"
import { Button } from "rillmark/button"
import { Field } from "rillmark/field"
import { Input } from "rillmark/input"

export default function ComponentDemo() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [saved, setSaved] = useState(false)
  return <form noValidate className="w-full max-w-sm space-y-4" onSubmit={(event) => {
    event.preventDefault()
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    setError(valid ? "" : "Enter a valid email address, such as maya@example.com.")
    setSaved(valid)
  }}>
    <Field label="Work email" required description="Used for your weekly workspace summary." error={error}><Input type="email" autoComplete="email" value={email} onChange={(event) => { setEmail(event.target.value); setError(""); setSaved(false) }} placeholder="maya@example.com" /></Field>
    <Button type="submit">Save email</Button>
    {saved && <p role="status" className="text-sm text-primary">Email saved for this demo.</p>}
  </form>
}
