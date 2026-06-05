import { Badge } from "rillmark/badge"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "rillmark/table"

const projects = [{ name: "Coastal restoration", lead: "Maya Chen", notes: 12, status: "In progress" }, { name: "Spring research", lead: "Ada Okafor", notes: 8, status: "In review" }, { name: "Watershed atlas", lead: "Niko Alvarez", notes: 24, status: "In progress" }]

export default function ComponentDemo() {
  return <Table containerLabel="Project overview">
    <TableCaption>Current research projects and their field notes.</TableCaption>
    <TableHeader><TableRow><TableHead>Project</TableHead><TableHead>Lead</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Notes</TableHead></TableRow></TableHeader>
    <TableBody>{projects.map((project) => <TableRow key={project.name}><TableCell className="min-w-48 font-medium">{project.name}</TableCell><TableCell className="whitespace-nowrap">{project.lead}</TableCell><TableCell><Badge variant={project.status === "In progress" ? "accent" : "soft"}>{project.status}</Badge></TableCell><TableCell className="text-right tabular-nums">{project.notes}</TableCell></TableRow>)}</TableBody>
  </Table>
}
