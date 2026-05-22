# A short path from intent to interface.

Give your agent a small entry point, then let it read the components it needs. Rillmark uses existing shadcn infrastructure throughout.

## Start here

Ask your agent to read `http://localhost:5173/llms.txt`, then the setup guide and relevant component pages. Each focused page includes a working TypeScript example, imports, installation command and generated API information.

```text
Read http://localhost:5173/llms.txt. Use Rillmark to build a
project settings screen. Install only the required components,
keep the Fieldnotes defaults, and verify keyboard behavior,
validation and a production build.
```

## Install the consuming skill

From your consumer project, with the Rillmark repository available locally:

```sh
npx skills add /absolute/path/to/rillmark --skill rillmark -a codex -a claude-code --copy -y
```

This uses the existing Agent Skills installer and installs project-scoped copies for Codex and Claude Code. The source is `skills/rillmark/SKILL.md`. The skill covers discovery, setup, selective installation, composition, customization and verification. It does not require the full documentation in context.

## Use the shadcn MCP server

Once the namespace is in `components.json`, the official server can discover the catalog at `/r/registry.json`, inspect items and provide install commands. No Rillmark MCP server is needed.

For Claude Code:

```sh
npx shadcn@latest mcp init --client claude
```

For Codex, add the standard server to your chosen Codex MCP configuration:

```toml
[mcp_servers.shadcn]
command = "npx"
args = ["shadcn@latest", "mcp"]
```

Restart the client after changing its configuration. Run the client in the consumer project so the server can find `components.json`. Registry discovery and tools are supplied by shadcn; this repository ships no additional protocol implementation.

## Read progressively

1. Read `llms.txt` and setup once.
2. Choose the few relevant component pages or search the configured registry.
3. Install through shadcn and compose with the displayed imports.
4. Use semantic tokens and existing variants; edit local source for specific needs.
5. Run the app's checks, production build and keyboard/mobile verification.

`/api.json` is generated from TypeScript exports and local prop declarations. Native HTML and Radix props remain available; their full upstream API is intentionally not duplicated. Human and agent examples come from the same compiled files.
