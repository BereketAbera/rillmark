"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

export default function ComponentDemo() {
  const [period, setPeriod] = useState("Week")
  return <div className="space-y-3">
    <ButtonGroup aria-label="Reporting period">{["Week", "Month", "Year"].map((item) => <Button key={item} variant={period === item ? "solid" : "outline"} aria-pressed={period === item} onClick={() => setPeriod(item)}>{item}</Button>)}</ButtonGroup>
    <p role="status" className="text-sm text-muted-foreground">Showing this {period.toLowerCase()}’s activity.</p>
  </div>
}
