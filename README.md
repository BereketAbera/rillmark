# Rillmark

**Interfaces with a point of view.** An expressive, editable-source React design system for people and their coding agents. Install individual components with the official shadcn CLI, compose familiar APIs, and own every line.

![Rillmark documentation](docs/evidence/documentation-light.png)

## Run locally

Use Node 22.12+ (verified on Node 24):

```sh
npm ci
npm run dev
```

Open [the documentation](http://localhost:5173), [workspace](http://localhost:5173/#/examples/dashboard), [settings](http://localhost:5173/#/examples/settings), or [discovery](http://localhost:5173/#/examples/discovery). All example interactions run locally; saves use this browser's storage. The examples are not connected to a backend.

## Install into an application

Prepare a React + TypeScript + Tailwind CSS 4 app with the official shadcn CLI, then merge this namespace into its `components.json`:

```json
{
  "registries": {
    "@rillmark": "http://localhost:5173/r/{name}.json"
  }
}
```

With the local registry running, install the foundations **explicitly once**, then select components:

```sh
npx shadcn@latest add @rillmark/theme
npx shadcn@latest add @rillmark/button @rillmark/card @rillmark/input
```

The explicit theme step replaces the initial shadcn palette. Later component installs preserve your customized tokens. The CLI installs dependencies and editable source; there is no Rillmark runtime or provider. Our `lib/rillmark-utils.ts` preserves the app's existing utility. A fresh shadcn init may already contain a Button: replacing that starter is intentional, while customized files should be reviewed before replacement.

Follow [the complete installation guide](docs/guides/getting-started.md) for aliases, the tested noninteractive init command, and TypeScript 6/7 setup. `@rillmark/<name>-demo` installs a compiling usage example through the same CLI.

## What ships

| Family | Components |
| --- | --- |
| Actions | Button, IconButton, ButtonGroup |
| Forms | Field, Input, Textarea, Checkbox, RadioGroup, Switch, Select, Combobox, Slider |
| Structure | Card, Separator, Tabs, Accordion, Breadcrumbs, Pagination |
| Overlays | Dialog, AlertDialog, Sheet, Popover, Tooltip, DropdownMenu |
| Feedback/display | Alert, Toast, Badge, Avatar, Skeleton, Progress, Table |
| Patterns | EmptyState; search/filtering, validated forms, sortable/filterable tables in complete examples |

The static registry has 66 items: 32 components, 32 compiling examples, foundations and utilities. The documentation includes live previews, copyable source, generated local API metadata, search, light/dark mode, and mobile preview widths.

## A considered identity

The selected **Fieldnotes** direction uses warm paper, mineral green, compact DM Sans, restrained apricot, and one small corner on otherwise generous surfaces. It works at table density and across expressive discovery. Compare the [three same-screen studies](public/exploration.html) and read [the short research record](docs/research.md).

`tokens.json` is the canonical token source. It generates semantic CSS variables, both themes, and the registry foundations. Consumers edit their installed CSS and component source. DM Sans is locally bundled for the docs; consumers get a system fallback unless they choose the documented font import.

Radix is the single complex-interaction foundation: it supplies tested keyboard, focus, portal and state behavior without imposing a visual style. Native controls cover ordinary inputs. No custom CLI, MCP server, theme engine or configuration language was built.

## Start here, agents

Read [`public/llms.txt`](public/llms.txt), or fetch `/llms.txt` from the running site. Follow its setup link and only the relevant component pages. API metadata comes from TypeScript; documentation examples are the same modules used by live previews and production builds.

Install the consuming skill from your application directory:

```sh
npx skills add /absolute/path/to/rillmark --skill rillmark -a codex -a claude-code --copy -y
```

Project-scoped installation was tested for both agents. See [the skill](skills/rillmark/SKILL.md), [AI setup and standard shadcn MCP configuration](docs/guides/ai.md), and [independent agent-consumer verification](docs/agent-verification.md). The standard MCP server discovers this registry through the existing namespace; no additional server is needed.

## Verify and contribute

```sh
npm run check          # official schemas, dependency closure, token contrast, TS, ESLint, Vitest
npm run build          # static documentation + registry in dist/
npm run test:consumer  # real fresh npm app, official init/add, all 32 demos, production build
npm run test:mcp       # official server discovery, search, view and example retrieval
npm run test:e2e       # headed Chrome: keyboard, focus, a11y, mobile, complete workflows
```

The local headed suite uses installed Google Chrome. CI installs Playwright Chromium and runs it headed under Xvfb. Screenshots and traces are produced by the tests. See [the verification report](docs/verification.md) for evidence and boundaries.

Edit components in `registry/rillmark/ui/`, demos in `registry/rillmark/examples/`, guides in `docs/guides/`, and tokens in `tokens.json`. `npm run registry:build` generates metadata, focused docs, theme CSS and the official registry JSON. Generated assets are committed so the registry can be inspected without a build; CI checks for drift. Read [AGENTS.md](AGENTS.md) before contributing.

## Hosting and release boundaries

`npm run build` produces a self-contained static site and registry. Serve `dist/` at a host root over HTTPS, then replace the localhost registry origin in consumer configuration and agent instructions. Hash routes do not require server rewrites. No production hosting account or public registry URL is configured by this release.

This is a first scoped release. It intentionally excludes spreadsheet grids, rich-text editing and complex charts. Browser verification covers Chromium; dedicated Safari/Firefox, real touch-device and screen-reader sessions remain unverified. Automated accessibility checks supplement the keyboard and visual checks; they do not establish complete accessibility conformance.

MIT licensed. DM Sans is distributed under its [SIL Open Font License](public/licenses/dm-sans-OFL.txt); icon and primitive dependencies retain their own licenses.
