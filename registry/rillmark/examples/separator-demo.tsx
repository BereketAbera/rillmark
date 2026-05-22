import { Separator } from "@/components/ui/separator"

export default function ComponentDemo() {
  return <div className="w-full max-w-sm space-y-4">
    <div><p className="font-semibold">Coastal restoration</p><p className="text-sm text-muted-foreground">A shared research workspace.</p></div>
    <Separator />
    <div className="flex h-6 items-center gap-4 text-sm text-muted-foreground"><span>12 notes</span><Separator orientation="vertical" /><span>3 collaborators</span></div>
  </div>
}
