"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function ComponentDemo() {
  const [reviewed, setReviewed] = useState(6)
  return <div className="w-full max-w-sm space-y-4">
    <div className="flex justify-between gap-3 text-sm"><span className="font-semibold">Observation review</span><span>{reviewed} of 12</span></div>
    <Progress aria-label="Observations reviewed" value={reviewed} max={12} getValueLabel={(value, max) => `${value} of ${max} observations`} />
    <Button variant="outline" onClick={() => setReviewed(reviewed === 12 ? 0 : reviewed + 1)}>{reviewed === 12 ? "Start another review" : "Review next observation"}</Button>
  </div>
}
