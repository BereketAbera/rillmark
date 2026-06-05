"use client"
import { useState } from "react"
import { Bookmark } from "lucide-react"
import { IconButton } from "rillmark/icon-button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "rillmark/tooltip"

export default function ComponentDemo() {
  const [saved, setSaved] = useState(false)
  return <TooltipProvider><Tooltip>
    <TooltipTrigger asChild><IconButton label={saved ? "Remove bookmark" : "Bookmark collection"} variant="outline" aria-pressed={saved} onClick={() => setSaved(!saved)}><Bookmark aria-hidden="true" size={18} fill={saved ? "currentColor" : "none"} /></IconButton></TooltipTrigger>
    <TooltipContent>{saved ? "Saved to your collection" : "Keep this collection close"}</TooltipContent>
  </Tooltip></TooltipProvider>
}
