"use client"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ComponentDemo() {
  const [following, setFollowing] = useState(false)
  return <Card className="w-full max-w-sm">
    <CardHeader><Badge variant="accent" className="w-fit">Fieldwork</Badge><CardTitle as="h2">Coastal restoration</CardTitle><CardDescription>Finding a better rhythm between our communities and the shore.</CardDescription></CardHeader>
    <CardContent><p className="text-sm text-muted-foreground">12 observations · 3 collaborators</p></CardContent>
    <CardFooter><Button variant={following ? "soft" : "solid"} aria-pressed={following} onClick={() => setFollowing(!following)}>{following ? "Following project" : "Follow project"}</Button></CardFooter>
  </Card>
}
