# Distribution decision

Rillmark ships as an independent npm package for React 19. The package contains ESM component modules, TypeScript declarations, semantic tokens and styles generated from one canonical implementation. Consumers install `rillmark` and import components directly; no project initializer, alias configuration or external component installer is required.

## Package contract

- Use `npm install rillmark` and imports such as `import { Button } from 'rillmark/button'`. Named imports from `rillmark` are also supported.
- Import `rillmark/styles.css` once for precompiled styles. This path needs no Tailwind build, and application layout can use ordinary CSS.
- Existing Tailwind CSS 4 applications can instead import `tailwindcss` followed by `rillmark/tailwind.css`. That entry exposes the semantic theme and registers package modules for class detection. Choose one stylesheet path to avoid duplicate styles.
- React and React DOM are peer dependencies. Radix provides complex interaction primitives; ordinary controls use native HTML. Components expose familiar props, `className` and `ref`.
- Customize semantic CSS variables after the stylesheet; apply `.dark` to the document root for dark mode. The package exports `rillmark/tokens.json` for tooling and `rillmark/theme.css` for its uncompiled theme. System font fallbacks work without font installation.
- Verify the packed artifact in a clean consumer with real dependency installation, TypeScript compilation and a production build. Test both stylesheet paths against the same canonical components.

The package is the supported consumption path. Readable source remains available in the documentation for inspection and intentional local adaptation.

## Agent discovery

[Rillmark's index](https://rillmark.vercel.app/llms.txt) routes agents to focused setup, foundation and component Markdown. Component pages contain exports and compiling examples, so an agent can read the relevant API without loading the whole catalog. The consuming skill at `skills/rillmark/SKILL.md` follows the independent [Agent Skills specification](https://agentskills.io/specification); contributor instructions remain in `AGENTS.md`.
