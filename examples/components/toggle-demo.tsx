"use client"
import { useState } from "react"
import { Star } from "lucide-react"
import { Toggle } from "rillmark/toggle"

export default function ComponentDemo() {
  const [saved, setSaved] = useState(false)
  return <div className="space-y-3"><Toggle pressed={saved} onPressedChange={setSaved} aria-label="Save this project"><Star aria-hidden="true" fill={saved ? "currentColor" : "none"} />Save project</Toggle><p role="status" className="text-sm text-muted-foreground">{saved ? "Added to your saved projects." : "Keep this project close for later."}</p></div>
}
