# Rillmark

**Interfaces with a point of view.** An independent React design system for people and their coding agents, with original components, tokens and a recognizable Fieldnotes visual identity.

**[Live documentation and examples](https://rillmark.vercel.app)** · **[AI entry point](https://rillmark.vercel.app/llms.txt)** · **[Private repository](https://github.com/BereketAbera/rillmark)**

![Rillmark documentation](docs/evidence/documentation-light.png)

## Install

For a React 19 application:

```sh
npm install rillmark
```

Import the stylesheet once and the components you need:

```tsx
import 'rillmark/styles.css'
import { Button } from 'rillmark/button'

export function SaveAction() {
  return <Button onClick={() => console.log('Saved')}>Save changes</Button>
}
```

Root imports such as `import { Button, Field, Input } from 'rillmark'` also work. JavaScript modules and TypeScript declarations are included. The precompiled stylesheet supplies component styles and both themes without requiring Tailwind setup. Use your own CSS for application layout.

In an existing Tailwind CSS 4 app, use these imports **instead of** `rillmark/styles.css`:

```css
@import "tailwindcss";
@import "rillmark/tailwind.css";
```

This registers component classes for scanning and provides semantic utilities. Add `.dark` to the document root for dark mode; override semantic CSS variables for customization. See [the package guide](packages/rillmark/README.md) and [complete setup](docs/guides/getting-started.md).

## What ships

| Family | Components |
| --- | --- |
| Actions | Button, IconButton, ButtonGroup |
| Forms | Field, Input, Textarea, Checkbox, RadioGroup, Switch, Select, Combobox, Slider |
| Structure | Card, Separator, Tabs, Accordion, Breadcrumbs, Pagination |
| Overlays | Dialog, AlertDialog, Sheet, Popover, Tooltip, DropdownMenu |
| Feedback/display | Alert, Toast, Badge, Avatar, Skeleton, Progress, Table |
| Patterns | EmptyState; search/filtering, validated forms, sortable/filterable tables in complete examples |

All 32 components have compiling examples, live previews, readable source and generated local API metadata. The documentation includes search, light/dark controls, mobile previews, and three complete applications: a dense project dashboard, a settings/onboarding workflow, and an expressive discovery page. Their interactions and saved preferences work in browser-local storage; no backend is connected.

## A considered identity

The selected **Fieldnotes** direction uses warm paper, mineral green, compact DM Sans, restrained apricot, and one small corner on otherwise generous surfaces. Compare the [three same-screen studies](public/exploration.html) and read [the research record](docs/research.md).

`tokens.json` is the canonical token source. It generates both semantic themes and the package CSS. Components live in `packages/rillmark/src/`; the documentation and npm package use that same implementation. Radix supplies complex accessible interactions; ordinary controls use native HTML. There is no custom CLI, MCP server, configuration language, or theme engine.

## Start here, agents

Read [llms.txt](https://rillmark.vercel.app/llms.txt), follow setup, then fetch only the relevant component pages. Examples use the same imports that consumers install. API metadata comes from TypeScript implementation.

Install the consuming skill from your application directory:

```sh
npx skills add ./node_modules/rillmark --skill rillmark -a codex -a claude-code --copy -y
```

The skill covers npm setup, discovery, composition, customization and verification. See [the skill](skills/rillmark/SKILL.md), [AI setup](docs/guides/ai.md), and [installation verification](docs/skill-installation.md). No MCP configuration is required.

## Develop and verify

Use Node 24:

```sh
npm ci
npm run dev
```

Open [local documentation](http://localhost:5173). Sources are in `packages/rillmark/src/`, compiling examples in `examples/components/`, guides in `docs/guides/`, and tokens in `tokens.json`. Generated documentation and metadata are committed so CI can check for drift. Read [AGENTS.md](AGENTS.md) before contributing.

```sh
npm run check          # source/example consistency, token contrast, TS, ESLint, unit tests
npm run build          # static documentation in dist/
npm run package:build # JS, declarations, CSS and tokens from canonical source
npm run test:package  # packed tarball in a fresh app; headed interaction/style tests
npm run test:e2e      # headed Chrome: all components, a11y, mobile and complete workflows
```

CI runs these useful repeatable checks, using headed Chromium under Xvfb. See [verification](docs/verification.md) and [release instructions](docs/releasing.md).

## Hosting

The site is deployed at **[rillmark.vercel.app](https://rillmark.vercel.app)** in Vercel's `bereketaberas-projects` scope. Deployments use the local checkout; Git-triggered deployment is disabled. `npm run build` also produces a self-contained static site for another host.

Redeploy with `vercel deploy --prod --scope bereketaberas-projects`. A new checkout first runs `vercel link --yes --project rillmark --scope bereketaberas-projects`. Local project metadata stays in ignored `.vercel/`.

## Release boundaries

This scoped release excludes spreadsheet grids, rich-text editing and complex charts. Chromium is verified; dedicated Safari/Firefox, real touch-device and screen-reader sessions remain unverified. Automated accessibility checks supplement keyboard and visual review; they do not establish complete conformance.

MIT licensed. The documentation bundles DM Sans under the included [SIL Open Font License](public/licenses/dm-sans-OFL.txt); package consumers can load the font separately or keep the system fallback.
