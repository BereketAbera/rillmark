# Rillmark

Rillmark is an editable-source React design system distributed through the official shadcn CLI. Keep its use as simple as importing a component.

- Canonical components: `registry/rillmark/ui/`. Import local dependencies through `@/components/ui/*` and `@/lib/utils` so the shadcn installer can rewrite aliases.
- Canonical tokens: `tokens.json`. Generate theme assets; do not hand-edit generated files.
- Use Radix primitives for complex interaction and native HTML for ordinary controls. Preserve labels, keyboard behavior, focus return and reduced motion.
- Familiar props, `className`, `ref`, and a small variant vocabulary. No custom CLI, runtime theme engine or expression configuration.
- Docs examples are real TypeScript modules, compiled with the application. Update focused docs when APIs change.
- Run `npm run check`, `npm run build`, and relevant headed interaction tests. Registry changes also require `npm run test:consumer`.
- Keep changes in coherent commits. Record unfinished work and verification limits in `IMPLEMENTATION.md`.

For consumption, start at `public/llms.txt` or `skills/rillmark/SKILL.md`.
