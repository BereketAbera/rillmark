# Install the Rillmark agent skill

Run this from the **consumer project**, after installing the Rillmark npm package:

```sh
npx --yes skills@latest add ./node_modules/rillmark --skill rillmark -a codex -a claude-code --copy -y
```

The standard [skills CLI](https://github.com/vercel-labs/skills) discovers the packaged `skills/rillmark/SKILL.md` and copies the skill into the project's `.agents/skills/rillmark` and `.claude/skills/rillmark` directories. No global install is needed. Select only the agents you use by omitting the other `-a` flag. Start a new agent session if it does not discover newly installed skills immediately.

Example request:

> Use $rillmark to build a responsive workspace settings screen with name validation and a notification preference. Install only the components it needs.

The entry point routes the agent to `/llms.txt`, focused component documentation and npm installation. It covers direct component imports and either precompiled CSS or the Tailwind CSS 4 integration without loading every component into context.

## Verification

On 2026-11-04, the packed npm artifact was installed into a fresh temporary React application. The standard skills CLI installed the packaged skill from `./node_modules/rillmark` into project-scoped Codex and Claude Code locations. Both installed `SKILL.md` files matched the canonical instructions byte-for-byte. No global agent configuration was changed. The standard skill validator also passes.

`npm run test:package` repeats this check together with real package installation, strict TypeScript declarations, server rendering, both stylesheet paths, production builds and headed keyboard/mobile checks. Its retained report is `evidence/npm-package/report.json`.
