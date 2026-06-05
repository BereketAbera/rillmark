# A short path from intent to interface.

Give your agent a small entry point, then let it read only the components it needs. Rillmark is an independent npm design system with original components, semantic tokens and generated API documentation.

## Start here

```text
Read https://rillmark.vercel.app/llms.txt. Use Rillmark to build
project settings with validation and a notification preference.
Install the npm package, keep the Fieldnotes defaults, and verify
keyboard behavior, mobile layout and a production build.
```

The setup guide explains React 19 compatibility and styles. Each focused component page includes real exports, a compiling example, import paths and generated local prop information. No custom CLI, registry configuration or MCP server is required.

## Install the consuming skill

From your consumer project, with the Rillmark checkout available locally:

```sh
npx skills add /absolute/path/to/rillmark --skill rillmark -a codex -a claude-code --copy -y
```

The standard Agent Skills installer creates project-scoped copies for Codex and Claude Code. The source is `skills/rillmark/SKILL.md`. The skill covers npm setup, discovery, composition, customization and verification. It does not load the full documentation into context.

## Read progressively

1. Read `llms.txt` and setup once.
2. Choose only the relevant component pages.
3. Install `rillmark` and use the displayed package imports.
4. Import `rillmark/styles.css` once, or use the documented Tailwind CSS 4 integration. Do not combine them.
5. Use semantic variables and existing variants; keep labels and component composition intact.
6. Run the app's checks and build, then verify interactions, keyboard focus and mobile layout in a headed browser.

`/api.json` is generated from TypeScript exports and local prop declarations. Native HTML and Radix props remain available; their full upstream API is intentionally not duplicated. Readable component source is linked from every page, and the human and agent examples use the same compiled modules.
