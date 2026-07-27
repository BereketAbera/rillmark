"use client"
import { useState } from "react"
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "rillmark/toggle-group"

export default function ComponentDemo() {
  const [alignment, setAlignment] = useState("left")
  return <div className="w-full max-w-md space-y-4"><ToggleGroup type="single" value={alignment} onValueChange={(value) => { if (value) setAlignment(value) }} aria-label="Text alignment" variant="outline"><ToggleGroupItem value="left" aria-label="Align left"><AlignLeft aria-hidden="true" /></ToggleGroupItem><ToggleGroupItem value="center" aria-label="Align center"><AlignCenter aria-hidden="true" /></ToggleGroupItem><ToggleGroupItem value="right" aria-label="Align right"><AlignRight aria-hidden="true" /></ToggleGroupItem></ToggleGroup><p className="rounded-xl border border-border bg-card p-4 text-sm" style={{ textAlign: alignment as "left" | "center" | "right" }}>Make room for the next good idea.</p></div>
}
