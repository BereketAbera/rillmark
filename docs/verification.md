# Release verification

Verified on 2026-11-04 with Node 24.13.0 and headed Google Chrome on macOS. React 19.3.1, Tailwind 4.3.4, Radix 1.8.1, TypeScript 6.0.3 and Vite 8.3.5 remain unchanged. No runtime dependency was added for the expansion.

## Published 0.2.0 release

The exact tested tarball was published as `rillmark@0.2.0`. Public npm integrity matches the prepublication artifact, and a fresh public-registry consumer passes both styling paths. The artifact contains 158 intended files, 67,793 compressed bytes, and the canonical consuming skill. See [public npm verification](npm-verification.md). The production documentation is live on Vercel.

- **45 unit tests** pass, together with TypeScript, ESLint, source/docs validation and all six token-contrast palettes.
- **42 headed browser cases** pass: six complete component-page sweeps, 27 documentation/theme/workflow regressions and nine expanded-component cases. These were run in three bounded suites against the same local preview.
- **288 component-page accessibility scans** cover all 48 components in each of the three presets, light and dark. Additional scans cover the explorer, guides, open overlays, all five examples and responsive layouts.
- **Both packed-package styling paths** pass in a fresh strict-TypeScript app: precompiled CSS without Tailwind installed, and Tailwind CSS 4 with actual package scanning and application utilities.
- **Dependency audit: zero vulnerabilities**, including development dependencies.
- Production build passes without warnings; the initial JavaScript chunk is 426.56 kB (125.13 kB gzip). Markdown rendering and examples load separately.

## Presets and distribution

Browser checks verify actual primary/surface colors, corner radii, runtime card and overlay shadows, animation durations, default 44px controls, portalled dialog styling, system appearance changes, explicit mode precedence over `.dark`, token overrides and reduced motion. The fresh consumer contains no theme provider or media-query JavaScript: system appearance must work in CSS itself.

All 48 component subpaths resolve from the packed artifact. Root imports, strict declarations, invalid-variant rejection, Node ESM imports, server rendering and a single shared React peer pass. Original TypeScript source and generated public documentation match their canonical implementations. The consuming skill installs byte-for-byte for Codex and Claude Code through the standard installer.

The tested artifact, file allowlist, integrity, consumer paths and browser evidence are recorded under `evidence/npm-package/`. Use `RILLMARK_PACKAGE_VERSION=0.2.0 node scripts/test-package.mjs` to run the same consumer checks against the public npm artifact after publication.

## Working examples and interaction coverage

The existing dashboard, settings and discovery workflows retain their search, filter, sorting, selection, export, validation, persistence and focus-return coverage. The new project brief validates three steps, accepts local reference files, persists filename-only reference metadata, reviews and downloads a brief, and confirms reset. The activity inbox supports search/type/unread/saved filters, persistent read/save states, private notes, contextual actions and command search.

New component checks include native number bounds and keyboard stepping, tags and duplicate handling, file selection/rejection/removal and native FormData, canceled native resets, controlled value rejection, toggle state, collapsible disclosure, menu keyboard traversal, command filtering/disabled/empty states, focus containment and restoration. Context-menu and detail-dialog focus returns to the invoking article. Command shortcuts do not open a second modal over an active detail dialog.

The new examples are audited in all six palettes and exercised through their mobile workflows in each preset. Screenshots are reviewed at desktop and 390px widths, including the explorer and both new screens. See [visual evidence](evidence/), [preset explorer](evidence/presets-fieldnotes.png), [project brief](evidence/onboarding-light.png) and [activity inbox](evidence/activity-light.png).

## Corrections and precise audit scope

- CSS shadow utilities now read preset variables at runtime; named Tailwind shadow utilities had baked in the initial values.
- Configuration-copy feedback is tied to the copied settings, so changing a preset never claims the new configuration was already copied.
- Controlled number stepping preserves a parent's rejected value; NumberInput, TagInput and FileDropzone honor canceled form resets.
- HoverCard and ContextMenu pass explicit forceMount requests through their portals.
- NumberInput hides duplicate native spin glyphs while preserving arrow-key behavior; tag removal controls have 44px targets.

For open modal context menus, axe scans the actual menu subtree while explicit Tab, Shift+Tab and programmatic-focus tests verify the primitive's containment. Axe otherwise treats its hidden application background differently from a dialog. For NavigationMenu, only the primitive's single transient, hidden focus proxy is excluded from the open-state axe scan; forward/reverse traversal verifies focus is immediately redirected to visible content. Rules are not disabled globally, and the complete closed component pages remain audited without these scoped exclusions.

## Boundaries and hosting

Safari, Firefox, physical touch devices and dedicated screen-reader sessions remain unverified. Automated accessibility checks plus keyboard and visual review do not prove complete conformance. Example data is fictional and browser-local; there is no backend, upload service, synchronization, production authentication, rich-text editor, spreadsheet grid or chart engine.

Five targeted headed production cases pass over HTTPS: the full brief, inbox persistence, contextual/command actions, preset controls/copy/portals, and system appearance. The production theme assertion normalizes colors through the browser because minification can shorten white to `#fff`; the initial failure was in that test conversion, and the corrected case passes. Public API metadata lists all 48 components, and the theme, command, file and AI documentation endpoints return HTTP 200.

CI runs the same meaningful checks with headed Chromium under Xvfb. Hosted CI completion is not established by these local and public checks; prior runs remained queued without an assigned runner. The documentation is deployed to [rillmark.vercel.app](https://rillmark.vercel.app), and Git source remains private under [BereketAbera/rillmark](https://github.com/BereketAbera/rillmark).
