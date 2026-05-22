# Install the Rillmark agent skill

Run this from the **consumer project**, using the absolute path of your Rillmark checkout:

```sh
npx --yes skills@latest add /path/to/rillmark --skill rillmark -a codex -a claude-code --copy -y
```

The standard [skills CLI](https://github.com/vercel-labs/skills) discovers `skills/rillmark/SKILL.md` and copies the skill into the project's `.agents/skills/rillmark` and `.claude/skills/rillmark` directories. No global install is needed. Select only the agents you use by omitting the other `-a` flag. Start a new agent session if it does not discover newly installed skills immediately.

Example request:

> Use $rillmark to build a responsive workspace settings screen with name validation and a notification preference. Install only the components it needs.

The entry point routes the agent to `/llms.txt`, focused component documentation, the standard registry and existing shadcn tools. It does not require a custom MCP server or load every component into context.

## Verification

On 2026-11-03, `skills` 1.7.6 installed the local repository skill into an isolated empty project at `/tmp/rillmark-skill-smoke`. Both agent-specific destinations contained byte-identical copies of `SKILL.md`; no global agent configuration was changed. The supplied skill-creator `quick_validate.py` passed using PyYAML in an isolated temporary environment. The release's clean consumer test verifies the component installation/build path separately.
