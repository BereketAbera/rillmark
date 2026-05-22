"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export default function ComponentDemo() {
  const [loading, setLoading] = useState(true)
  return <div className="w-full max-w-sm space-y-5">
    <div aria-busy={loading} className="min-h-28 space-y-3">
      {loading ? <><span className="sr-only" role="status">Loading project preview</span><Skeleton className="h-5 w-2/3" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-5/6" /></> : <><p className="font-semibold">Coastal restoration</p><p className="text-sm text-muted-foreground">12 field notes exploring how our shoreline is changing.</p></>}
    </div>
    <Button variant="outline" onClick={() => setLoading(!loading)}>{loading ? "Show loaded content" : "Preview loading state"}</Button>
  </div>
}
