# Distribution research

Checked against current official sources on 2026-11-03. The implementation uses the existing shadcn ecosystem: no custom CLI, schema, or MCP server.

## Registry and installation

- A root `registry.json` describes editable source. `npx shadcn@latest build` creates static JSON in `public/r`; any HTTP static host can serve it. `registry:ui` follows the consumer's UI alias. Explicit npm dependencies belong in `dependencies`; own source dependencies must use `@rillmark/name`, because bare names refer to the built-in shadcn registry. [Registry guide](https://ui.shadcn.com/docs/registry/getting-started), [item schema](https://ui.shadcn.com/docs/registry/registry-item-json).
- Consumers initialize an existing React/Tailwind project with the shadcn CLI, then add `"@rillmark": "http://localhost:5173/r/{name}.json"` to `components.json` → `registries`. Install only needed items with `npx shadcn@latest add @rillmark/button`. The localhost origin is for this local release; replace it with the actual registry host when deployed. [Namespaces](https://ui.shadcn.com/docs/registry/namespace).
- `cssVars.theme`, `.light`, and `.dark` provide Tailwind v4 theme variables. `css` can deliver layers, utilities, and keyframes. Keep these generated from one token source. `registry:file` requires a target; `registry:ui` can use automatic alias placement. Avoid overwriting user-customized files without inspecting the diff. [Item schema](https://ui.shadcn.com/docs/registry/registry-item-json).
- The CLI offers `view`, `search`, `list`, `info --json`, and `add --dry-run`. Test the installed CLI version as well as online documentation: flags can evolve. [CLI reference](https://ui.shadcn.com/docs/cli).

## Agents

- `llms.txt` is a small discovery index, not an exhaustive prompt. shadcn links focused installation, component, and guide pages. Rillmark follows this structure with compiled examples and generated export metadata. [Official index](https://ui.shadcn.com/llms.txt).
- Skills use a folder containing `SKILL.md`, YAML `name` and `description`, and optional focused references. Put the consuming skill at `skills/rillmark/SKILL.md`; keep contributor guidance in `AGENTS.md`. The skill name must match its directory. [Agent Skills specification](https://agentskills.io/specification).
- shadcn distributes its own skill with `npx skills add shadcn/ui`. Rillmark uses that same installer. A local checkout can be installed from a consumer project with `npx skills add /absolute/path/to/rillmark --skill rillmark -a codex -a claude-code --copy -y`. The command is project scoped, with Codex in `.agents/skills` and Claude in `.claude/skills`. [shadcn Skills](https://ui.shadcn.com/docs/skills), [skills CLI](https://github.com/vercel-labs/skills/blob/main/docs/commands.md), [agent locations](https://github.com/vercel-labs/skills/blob/main/docs/agents.md).

## MCP

A compatible registry needs only a valid index at `/r/registry.json`; the existing shadcn MCP server discovers it through the consumer's `components.json`. Claude setup is `npx shadcn@latest mcp init --client claude`. Codex's documented manual configuration is:

```toml
[mcp_servers.shadcn]
command = "npx"
args = ["shadcn@latest", "mcp"]
```

Restart the agent after configuration. No Rillmark MCP endpoint or credentials are necessary for a public/local registry. [Registry MCP prerequisites](https://ui.shadcn.com/docs/registry/mcp), [client setup](https://ui.shadcn.com/docs/mcp).
