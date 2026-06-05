"use client"
import { useState } from "react"
import { Button } from "rillmark/button"

export default function ComponentDemo() {
  const [saved, setSaved] = useState(false)
  return <div className="space-y-3">
    <div className="flex flex-wrap items-center gap-3">
      <Button onClick={() => setSaved(true)} disabled={saved}>{saved ? "Changes saved" : "Save changes"}</Button>
      <Button variant="outline" onClick={() => setSaved(false)}>Reset</Button>
      <Button disabled variant="soft">Waiting for access</Button>
    </div>
    <p role="status" className="text-sm text-muted-foreground">{saved ? "Your preferences are up to date." : "You have unsaved preferences."}</p>
  </div>
}
