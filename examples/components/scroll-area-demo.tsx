"use client"
import { ScrollArea } from "rillmark/scroll-area"

const activity = ["Maya shared the fieldwork brief", "Niko added the first sketches", "Ada reviewed the research notes", "Leo updated the project timeline", "Maya approved the direction", "Niko prepared the prototype", "Ada invited the review team", "Leo scheduled the next workshop"]

export default function ComponentDemo() {
  return <ScrollArea aria-label="Recent workspace activity" className="h-60 w-full max-w-sm rounded-xl border border-border bg-card">
    <div className="p-4 pr-6">
      <h3 className="mb-3 text-sm font-semibold">Recent activity</h3>
      <ol className="divide-y divide-border">
        {activity.map((event, index) => <li key={event} className="py-3"><p className="text-sm">{event}</p><p className="mt-1 text-xs text-muted-foreground">{index + 1} hours ago</p></li>)}
      </ol>
    </div>
  </ScrollArea>
}
