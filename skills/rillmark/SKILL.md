---
name: rillmark
description: Build or customize React interfaces using the Rillmark design system. Discover and install editable components, compose accessible screens, and verify the result. Use when Rillmark is requested or already present in the project.
---

# Rillmark

Rillmark is React + TypeScript + Tailwind CSS 4, with Radix primitives. Components are copied into the consumer project by the official shadcn CLI; there is no Rillmark runtime package.

## Start here

Read the registry origin from `components.json` → `registries` → `@rillmark`. For a local checkout, run `npm ci && npm run dev` in the Rillmark repository and use `http://localhost:5173`. Use that origin for these focused resources:

- `/llms.txt`: short component and guide index.
- `/docs/getting-started.md`: setup, aliases, CSS, install commands.
- `/docs/components/<name>.md`: real exports, behavior and compiling examples. Read only the components needed.
- `/docs/foundations.md`: theme customization and design defaults.
- `/r/<name>.json`: exact source, package dependencies and registry dependencies.

If the origin is unreachable, use an available local Rillmark checkout or report the missing source. Do not substitute unrelated default shadcn components while calling them Rillmark.

## Install and compose

Inspect the consumer's existing framework, Tailwind version, aliases and `components.json`. Preserve its package manager and existing source edits. For a React/TypeScript/Tailwind 4 project without shadcn configuration, follow the getting-started guide and initialize with `npx shadcn@latest init --base radix --preset nova --yes --no-monorepo --no-rtl`. The explicit preset avoids a prompt that `--yes` alone does not skip; Rillmark replaces its visual tokens when installed. Preserve an existing project's RTL setting instead of passing `--no-rtl`.

For TypeScript 6 or newer, configure the `@/*` alias with relative `paths` entries and omit `baseUrl`; TypeScript 7 removes that option even though some setup guides still show it.

Merge this entry into `components.json` (replace the origin when hosted):

```json
"registries": {
  "@rillmark": "http://localhost:5173/r/{name}.json"
}
```

Install the foundations once, explicitly, then only the needed components:

```sh
npx shadcn@latest add @rillmark/theme --yes
npx shadcn@latest add @rillmark/button @rillmark/card @rillmark/field @rillmark/input
```

The explicit theme install applies Rillmark's tokens to the starter theme. A theme resolved only as a transitive dependency deliberately preserves existing values in shadcn, which would leave the neutral starter appearance. Later component installs preserve local token customization.

The registry resolves utility and component dependencies, keeping its class helper in `lib/rillmark-utils.ts` so it does not replace an existing `utils.ts`. Imports use the consumer's aliases, usually `@/components/ui/button`. Inspect copied files before composing; do not assume exports or props from a similarly named library. Do not overwrite locally customized components as a routine update.

For an existing shadcn MCP connection, the same namespace enables registry search, metadata viewing and installation. In shadcn 4.23, `view_items_in_registries` returns metadata rather than full source; read `/r/<name>.json` or the focused component page for implementation, or use `get_item_examples_from_registries` for example code. MCP is optional; the CLI and focused Markdown are sufficient.

## Make a coherent screen

- Use the default Fieldnotes theme: warm paper, mineral teal, restrained apricot, a small upper-right corner. Use semantic colors; avoid hardcoded colors in application controls.
- Keep the default component shapes and sizes. Use `className` for layout and local overrides; there are no expression modes to configure.
- Use `Field` with `label`, `description` and `error` to associate controls and validation. Icon-only actions need an accessible name. Overlays need a title and description.
- Use visible content hierarchy and useful spacing. Expressive discovery screens and dense tables share the same controls, tokens and type scale.
- Customize CSS variables locally. Add `.dark` to the document root to select the dark theme; do not maintain separate component forks for each theme.

## Verify

Run the consumer's type check and production build. Exercise the actual interaction (submit, filter, sort, select, close), not only the initial render. Check keyboard focus/return, accessible names, validation messages, mobile overflow and reduced motion. Use headed browser tests when browser automation is available. Report any unverified behavior or unavailable registry origin precisely.
