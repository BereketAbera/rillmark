# Clean consumer verification

Verified on 2026-11-03 with Node 24.13.0, shadcn 4.23.0, React 19.3.1, TypeScript 6.0.3, Vite 8.3.5, and Tailwind CSS 4.3.4.

## Repeatable installation test

Run `npm run test:consumer` from the repository. The script creates a new temporary React/TypeScript/Vite project, installs its own npm dependencies, serves the built registry on a free loopback port, and invokes the real shadcn CLI. It never links the repository's components or `node_modules` into the consumer.

The verified sequence is:

1. Prepare Tailwind v4, Vite, TypeScript, and the `@/*` alias.
2. Initialize with `shadcn init --base radix --template vite --preset nova --no-monorepo --no-rtl --yes`.
3. Configure `@rillmark` in `components.json` and discover it with `shadcn search @rillmark --query button`.
4. Apply the theme explicitly with `shadcn add @rillmark/theme --yes`.
5. Replace the known, unmodified starter Button using `shadcn add @rillmark/button --yes --overwrite`.
6. Install all 32 example registry items without blanket overwrite; their dependencies deliver all 32 UI components and the separate `rillmark-utils.ts` helper.
7. Typecheck and production-build every installed example.

All steps passed. The starter `src/lib/utils.ts` remained byte-for-byte unchanged. Both light and dark token sets, semantic Tailwind mappings, motion keyframes, and reduced-motion rules were present in the consumer stylesheet. The production CSS included the installed theme and used utilities. A subsequent Button reinstall preserved a locally customized primary token.

Each run prints its retained temporary project path and writes `verification.json` there. The latest successful project path is also recorded in `rillmark-consumer-last.json` in the operating system's temporary directory. Its registry URL is temporary; use a running registry host for later installations.

## Findings incorporated into setup

The official CLI preserves existing CSS variable values when a theme arrives only as a transitive component dependency. Applying `@rillmark/theme` explicitly once is therefore necessary after shadcn initialization. Later component installs preserve local token customizations. The repeatable test covers this behavior.

Current shadcn initialization creates its own Button. The test replaces only that known starter source, then installs all remaining items without overwrite. In an existing application, inspect source differences before replacing a customized component.

Rillmark's helper has its own filename so installing it does not collide with a consumer's existing `utils.ts`. Typography uses the documented system fallback unless the consumer opts into the DM Sans font instructions.

## Browser verification of the installed production build

Headed Chrome, driven by Playwright, exercised the actual consumer output at desktop (1280 × 900) and mobile (390 × 844) sizes. Desktop light and mobile dark screenshots were visually inspected.

- Dialog edits saved successfully; Escape closed the dialog and returned focus to its trigger.
- Submitting an invalid email showed the associated validation message.
- Typing into Combobox and pressing Enter selected the filtered teammate.
- Body colors matched the installed light and dark semantic tokens.
- The mobile document had no horizontal overflow.
- Reduced-motion emulation produced 0.00001-second animation and transition durations.
- Axe reported zero WCAG A/AA violations in both light and dark rendered component examples; no JavaScript page errors occurred.

These browser checks complement the repository's interaction tests. Automated accessibility checks do not establish screen-reader usability; no dedicated screen-reader session was performed in this consumer check. This verifies a local HTTP registry, not an externally deployed host.
