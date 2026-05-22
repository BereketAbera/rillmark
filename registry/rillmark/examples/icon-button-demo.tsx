"use client"
import { useState } from "react"
import { Bookmark } from "lucide-react"
import { IconButton } from "@/components/ui/icon-button"

export default function ComponentDemo() {
  const [saved, setSaved] = useState(false)
  return <div className="flex items-center gap-3">
    <IconButton label={saved ? "Remove bookmark" : "Bookmark project"} variant={saved ? "solid" : "outline"} aria-pressed={saved} onClick={() => setSaved(!saved)}><Bookmark aria-hidden="true" size={18} fill={saved ? "currentColor" : "none"} /></IconButton>
    <span className="text-sm text-muted-foreground">{saved ? "In your collection" : "Keep this project close"}</span>
  </div>
}
