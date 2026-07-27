# Rillmark

Rillmark is an independent React design system distributed through npm. Keep its use as simple as importing a component.

- Canonical components: `packages/rillmark/src/ui/`; shared utilities: `packages/rillmark/src/lib/`. The documentation and npm build use this same source. Do not maintain a second implementation or hand-edit package `dist/`.
- Canonical tokens: `tokens.json`. Generate theme assets; do not hand-edit generated files.
- Use Radix primitives for complex interaction and native HTML for ordinary controls. Preserve labels, keyboard behavior, focus return and reduced motion.
- Familiar props, `className`, `ref`, and a small variant vocabulary. Visual presets are CSS tokens selected on `html` with `data-rillmark-preset`; `data-rillmark-mode` selects appearance independently. Do not add a custom CLI, MCP server or runtime theme engine. Keep component implementation and distribution owned by this package.
- Docs examples in `examples/components/` are real TypeScript modules using consumer imports and compiled with the application. Update focused docs when APIs change.
- Run `npm run check`, `npm run build`, `npm run test:package` and relevant headed interaction tests. Verify the actual packed tarball before npm publication.
- Keep changes in coherent commits. Record unfinished work and verification limits in `IMPLEMENTATION.md`.
- GitHub destination: `BereketAbera/rillmark`. Never push this project to `bekabt`. The documentation is deployed separately at `https://rillmark.vercel.app` through Vercel CLI.

For consumption, start at `public/llms.txt` or `skills/rillmark/SKILL.md`.
