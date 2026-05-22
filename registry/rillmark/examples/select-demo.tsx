"use client"
import { useState } from "react"
import { Field } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ComponentDemo() {
  const [region, setRegion] = useState("east")
  return <Field label="Research region" description="Your project’s primary field location." className="w-full max-w-sm">
    <Select value={region} onValueChange={setRegion}>
      <SelectTrigger><SelectValue placeholder="Choose a region" /></SelectTrigger>
      <SelectContent><SelectItem value="east">Eastern coast</SelectItem><SelectItem value="north">Northern highlands</SelectItem><SelectItem value="central">Central watershed</SelectItem><SelectItem value="south" disabled>Southern reserve · full</SelectItem></SelectContent>
    </Select>
  </Field>
}
