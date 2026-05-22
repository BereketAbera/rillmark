"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function ComponentDemo() {
  const [completed, setCompleted] = useState(false)
  return <Popover>
    <PopoverTrigger asChild><Button variant="outline">View options{completed ? " · all projects" : " · active only"}</Button></PopoverTrigger>
    <PopoverContent aria-label="View options" className="space-y-3">
      <p className="text-sm font-semibold">Make room for what matters</p>
      <label className="flex cursor-pointer items-center gap-2 text-sm"><Checkbox checked={completed} onCheckedChange={(value) => setCompleted(value === true)} />Include completed projects</label>
      <PopoverClose asChild><Button size="sm">Done</Button></PopoverClose>
    </PopoverContent>
  </Popover>
}
