import { Button } from "rillmark/button"
import { Card, CardContent, CardHeader, CardTitle } from "rillmark/card"
import { Field } from "rillmark/field"
import { Input } from "rillmark/input"

export function ProjectForm() {
  return (
    <Card>
      <CardHeader><CardTitle as="h2">A new beginning</CardTitle></CardHeader>
      <CardContent>
        <form style={{ display: 'grid', gap: 16 }} onSubmit={(event) => {
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
