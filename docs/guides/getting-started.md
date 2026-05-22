# Start with something real.

Rillmark gives you editable React components with considered defaults. Add only what you need. Your application owns the source.

## 1. Start the registry

This release is local and self-hostable. In the Rillmark repository, use Node 22.12 or newer:

```sh
npm ci
npm run dev
```

The documentation and registry run at `http://localhost:5173`. Keep this server running while installing into another project. For distribution, run `npm run build` and serve `dist` on any static host. Replace the local URL in your consumer configuration with that host.

## 2. Prepare your React app

Use a React + TypeScript project with Tailwind CSS 4. The official shadcn CLI handles setup. From your consumer project:

```sh
npx shadcn@latest init
```

If you are starting from scratch, create a Vite React TypeScript app and follow the [official Vite installation guide](https://ui.shadcn.com/docs/installation/vite) to add Tailwind and the `@` alias before initialization. The repeatable clean-project verification in `scripts/test-consumer.mjs` shows the exact minimal configuration used for this release.

For an agent or noninteractive shell, the tested explicit command is `npx shadcn@latest init --base radix --template vite --preset nova --no-monorepo --no-rtl --yes`. Passing `--yes` alone still leaves a preset prompt in the current CLI.

For TypeScript 6 and newer, configure aliases with relative `paths`, without the deprecated/removed `baseUrl` setting. Use `"paths": { "@/*": ["./src/*"] }` in both the root and application tsconfig if your Vite template splits them; configure the same `@` alias in Vite. Rillmark's helper installs as `lib/rillmark-utils.ts`, preserving the initializer's existing `lib/utils.ts`.

## 3. Register Rillmark once

Add this entry to the `registries` object in your app's `components.json`:

```json
{
  "registries": {
    "@rillmark": "http://localhost:5173/r/{name}.json"
  }
}
```

Keep your existing aliases and Tailwind settings. Namespaced dependencies ensure Rillmark components install other Rillmark components.

## 4. Apply the foundations once

```sh
npx shadcn@latest add @rillmark/theme
```

This explicit first install applies the Fieldnotes semantic variables and base styles, replacing the initial shadcn theme. The CLI preserves existing values when a theme is only a transitive dependency, so do not skip this step. Later component installations preserve your customized theme.

## 5. Add your first components

```sh
npx shadcn@latest add @rillmark/button @rillmark/card @rillmark/input
```

The CLI installs editable source, explicit npm dependencies and shared utilities. There is no Rillmark runtime package or provider. On existing projects, inspect the CLI diff before overwriting files you already customized.

```tsx
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
```

Input brings Field as a source dependency. Every component page has a small example compiled by this repository. Example registry items can also be installed: `npx shadcn@latest add @rillmark/dialog-demo`.

## Your source, your decisions

Use `className` to adapt layout. Edit semantic CSS variables to change the system. Edit the installed source when a component needs to evolve. Start with [foundations](./foundations.md) or give your coding agent the [AI entry point](./ai.md).
