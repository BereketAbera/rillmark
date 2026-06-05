import { Badge } from "rillmark/badge"

export default function ComponentDemo() {
  return <div className="flex flex-wrap items-center gap-3"><Badge variant="accent">In progress</Badge><Badge variant="soft">In review</Badge><Badge variant="outline">Archived</Badge><Badge variant="danger">Needs attention</Badge></div>
}
