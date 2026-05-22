"use client"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"

export default function ComponentDemo() {
  const [checked, setChecked] = useState(true)
  return <div className="space-y-2">
    <label className="flex cursor-pointer items-center gap-2 text-sm"><Checkbox checked={checked} onCheckedChange={(value) => setChecked(value === true)} />Include me in the project summary</label>
    <label className="flex items-center gap-2 text-sm text-muted-foreground"><Checkbox disabled />SMS updates · unavailable on this plan</label>
    <p role="status" className="text-sm text-muted-foreground">{checked ? "You’ll receive the next summary." : "Summary emails are off."}</p>
  </div>
}
