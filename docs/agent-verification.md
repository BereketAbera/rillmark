# Independent consuming-agent verification

Verified on 2026-11-03 in `/tmp/rillmark-agent-consumer`. The agent followed `skills/rillmark/SKILL.md`, the served `/llms.txt`, the setup guide and focused Button, Card, Field, Input, Combobox, Switch and Dialog pages. It created a workspace settings screen with validation, a searchable location choice, notification preference, confirmation dialog and theme control.

## Actual installation

The app was scaffolded with `create-vite` 9.3.3 (`react-ts`). It installed its own dependencies rather than linking the Rillmark repository's `node_modules`.

```sh
npm create vite@latest rillmark-agent-consumer -- --template react-ts --no-interactive
npm install
npm install tailwindcss @tailwindcss/vite
npm install -D @types/node
npx --yes shadcn@latest init --base radix --preset nova --yes --no-monorepo --no-rtl
```

Tailwind's Vite plugin, the CSS import and the `@/*` TypeScript/Vite aliases were configured following the [official Vite setup guide](https://ui.shadcn.com/docs/installation/vite), with `baseUrl` omitted for TypeScript 7. The consumer registered `@rillmark` at `http://127.0.0.1:5175/r/{name}.json`, served directly from this repository's `public` folder.

```sh
npx --yes shadcn@latest add @rillmark/theme --yes
npx --yes shadcn@latest add @rillmark/button @rillmark/card @rillmark/field @rillmark/input @rillmark/combobox @rillmark/switch @rillmark/dialog --yes
npm run build
npm run lint
```

The final registry installed seven editable components plus `src/lib/rillmark-utils.ts` without an overwrite prompt. The pre-existing starter `src/lib/utils.ts` remained byte-for-byte unchanged. Source imports, package dependencies, semantic CSS variables and a production bundle all resolved. The light background/primary values were `#F5F4ED`/`#245F55`; dark values were `#142725`/`#B2D5BA`.

The final consumer used React 19.3.1, Tailwind 4.3.4, Radix 1.8.1, shadcn 4.23.0, Vite 8.3.5 and TypeScript 7.0.2. Production compilation passed. The scaffold's Oxlint passed with two non-blocking Fast Refresh warnings about the intentionally shared `buttonVariants` and `useFieldControl` exports. Vite also warned that the external guide's `__dirname` config pattern should eventually migrate to `import.meta.dirname`; this did not affect the build.

## Skill installation

```sh
npx -y skills@1.7.6 add /Users/bek/dev/rillmark --skill rillmark -a codex -a claude-code --copy -y
```

Both `.agents/skills/rillmark/SKILL.md` and `.claude/skills/rillmark/SKILL.md` contained exact copies of the final skill, without symlinks. Installation was project-local. The supplied skill-creator `quick_validate.py` passed with PyYAML in an isolated environment.

## Headed browser verification

The production app was served on port 5176 and tested in headed Google Chrome (`headless: false`). The real browser verified:

- A whitespace-only workspace name showed an associated error, focused the field and did not open the confirmation dialog.
- Combobox keyword search found Copenhagen from “Denmark”; Enter selected it and preserved input focus.
- Dialog opening moved focus inside, repeated Tab stayed inside, Escape returned focus, and saving closed the dialog and displayed a status message.
- Space toggled the notification switch and updated its description.
- The 390px mobile layout had no document-level horizontal overflow.
- Reduced motion shortened the Switch thumb transition to `0.00001s` through the theme's reduction rule.
- Axe found **zero violations** in settled light desktop, dark desktop and dark mobile states. No page errors occurred.

Desktop and mobile screenshots were visually inspected. The form controls, saved state, typography, panel hierarchy and dark Switch thumb were legible and unclipped. Artifacts remain in `/tmp/rillmark-agent-consumer/verification/`: `report.json`, `desktop-light.png`, `desktop-dark.png` and `mobile-dark.png`. The isolated test harness is `verify-consumer.mjs`; repeatable release checks live in the repository's test suites.

## Findings incorporated

- shadcn's `--yes` does not skip its preset prompt. The skill now specifies `--preset nova`.
- The theme must be installed explicitly once; a transitive theme preserves the neutral starter values. Setup guidance now reflects that behavior.
- The original shared `utils.ts` path caused an overwrite prompt. Rillmark now owns a distinct `rillmark-utils.ts` path; the final consumer installation confirmed the collision is gone.
- TypeScript 7 rejects `baseUrl`, still present in the external setup guide. Skill/setup guidance uses relative `paths` entries.
- Visual inspection exposed weak contrast on the unchecked dark Switch thumb. The component now uses foreground/primary-foreground thumb colors.
- The consumer used semantic `h2` headings inside CardHeader to match its page hierarchy. CardTitle's default `h3` would otherwise skip a level after its `h1`.
- An audit launched during the theme button's color transition initially sampled transient low contrast. Final audits waited for active transitions to finish; settled theme contrast passed.

The screen stores preview state in memory and has no backend. This verification did not include physical mobile devices, screen-reader listening tests or remote deployment. It supplements the clean registry consumer script and the release interaction tests rather than claiming exhaustive accessibility certification.
