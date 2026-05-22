import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function ProjectForm() {
  return (
    <Card>
      <CardHeader><CardTitle as="h2">A new beginning</CardTitle></CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={(event) => {
          event.preventDefault()
          const data = new FormData(event.currentTarget)
          window.alert(`Project created: ${data.get("name")}`)
        }}>
          <Field label="Project name" required><Input name="name" /></Field>
          <Button type="submit">Create project</Button>
        </form>
      </CardContent>
    </Card>
  )
}
