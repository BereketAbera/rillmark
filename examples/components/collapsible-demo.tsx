"use client"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "rillmark/collapsible"

export default function ComponentDemo() {
  const [open, setOpen] = useState(false)
  return <Collapsible open={open} onOpenChange={setOpen} className="w-full max-w-md rounded-xl border border-border p-3"><CollapsibleTrigger className="w-full">Preparation notes<ChevronDown aria-hidden="true" size={18} className={open ? "rotate-180" : ""} /></CollapsibleTrigger><CollapsibleContent className="px-3 pb-3 pt-2 text-muted-foreground"><ul className="list-disc space-y-2 pl-5"><li>Bring the latest research summary.</li><li>Collect one question from each teammate.</li><li>Leave time to agree on the next step.</li></ul></CollapsibleContent></Collapsible>
}
