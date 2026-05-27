# Release verification

Verified locally on 2026-11-03 using Node 24.13.0 and headed Google Chrome on macOS. The repository locks React 19.3.1, Tailwind 4.3.4, Radix 1.8.1, TypeScript 6.0.3, Vite 8.3.5 and shadcn 4.23.0. The independent agent consumer also built with TypeScript 7.

## Repeatable checks

| Check | Evidence |
| --- | --- |
| Registry schemas | All 66 built items parsed by the official `shadcn/schema` validators; source content and dependency closure checked. |
| Documentation | All 32 live examples and fenced TSX guide examples compile with the application. TypeScript-derived exports/local props generate focused Markdown and API JSON. |
| Types and lint | `npm run typecheck` and `npm run lint` pass. |
| Interaction regression tests | 21 Vitest tests pass: forms, validation association, native submission/reset, keyboard choices, focus return, dialog cancellation, toast dismissal, and reviewed edge cases. |
| Production build | `npm run build` emits a static documentation site, bundled local fonts, focused docs and registry. No build warnings. |
| Clean consumer | A fresh independent npm project runs official shadcn init/add, installs all 32 examples and components, checks theme/dark/reduced-motion CSS, then typechecks and builds. |
| Source ownership | Existing `utils.ts` is byte-preserved; Rillmark installs its own helper. Reinstalling a component preserves an edited primary token. |
| Agent skill | Existing skills CLI installed byte-identical copies for Codex and Claude Code. The skill validator passes; an independent agent followed the skill and built a seven-component settings screen. |
| MCP | The official server initialized, listed its seven tools, found the namespace, searched/viewed Combobox and returned its compiling demo. |
| Runtime dependencies | `npm audit --omit=dev` reports zero vulnerabilities. |

Detailed reports: [clean consumer](consumer-verification.md), [independent agent use](agent-verification.md), [skill installation](skill-installation.md), and [official MCP](mcp-verification.md).

## Browser verification

The headed suite passes all 17 tests (1.8 minutes in the final local run). It checks documentation search/source/copy, theme persistence, mobile navigation, every component's live page, complete example workflows and toast focus. Automated axe WCAG A/AA checks cover all 32 component pages in light and dark, the three guides, home, all three example screens in light/dark, and mobile example layouts. Open dialog, confirmation and combobox states are also checked. Contrast audits wait for purposeful entry animations to settle.

Keyboard checks include dialog focus containment and restoration, Escape dismissal, initial cancel focus, Select and Combobox selection, radio and slider arrows, checkbox/switch activation, and F8/Tab/Escape toast navigation. Reduced-motion checks inspect the actual rendered animation styles. Mobile checks test both page overflow and internal card bounds at 375–390px, so clipped content cannot pass only because its parent hides overflow.

Example tests cover project search/filter/sort/pagination, CSV export, bulk completion, validation and persistent creation; settings validation and saved preferences; discovery categories, search, bookmarks, detail dialogs and focus recovery after removing the last saved item. Screenshots are visually inspected, not treated as proof by themselves.

Reviewed images are in [evidence](evidence/):

- [Documentation, light](evidence/documentation-light.png), [dark](evidence/documentation-dark.png), [mobile](evidence/documentation-mobile.png).
- [Dashboard](evidence/dashboard-light.png), [settings](evidence/settings-light.png), [discovery](evidence/discovery-light.png).
- [Dashboard mobile](evidence/dashboard-mobile.png), [settings mobile](evidence/settings-mobile.png), [discovery mobile](evidence/discovery-mobile.png).
- [Three-direction exploration](evidence/exploration.png).

## Corrections made during verification

- Explicit one-time foundation installation applies Fieldnotes; transitive theme installation alone preserves shadcn's initial values.
- A separate `rillmark-utils.ts` prevents collisions with an existing app utility.
- The unchecked Switch thumb, documentation counts, and toast keyboard focus now remain visible in both themes.
- CardTitle supports an explicit semantic heading level. Field labels keep working with caller-defined and nested control IDs.
- Disabled/loading slotted buttons suppress the child's activation handler; sliders respect a nonzero minimum; initial Combobox ArrowUp selects the final enabled option.
- Overlay animation uses `transform` separately from the translation used for centering.
- Settings grids avoid intrinsic-width clipping on mobile; saved-item removal restores focus to a useful surviving control.

## Boundaries and remaining limitations

- Safari, Firefox, physical touch devices and dedicated screen-reader sessions were not tested. Automated axe checks plus keyboard/visual review do not prove complete accessibility conformance.
- Example content is fictional and browser-local. There is no backend, synchronization, production authentication, rich-text editor, spreadsheet grid or charting engine.
- The static site is ready to host, but no production hosting destination or public registry URL is configured. Local/loopback installs and MCP discovery are verified; external deployment is not.
- shadcn 4.23's MCP `view` returns metadata rather than complete source. The standard example tool returns code; focused docs and registry JSON expose full component source.
- The full development-tool audit has three **low** findings in one dependency chain: `deepmerge` → `@shadcn/registry`/`shadcn`. The current published deepmerge 4.3.1 has [an upstream prototype-poisoning advisory](https://github.com/advisories/GHSA-gcqx-w48m-w2h4) and no newer patch available at verification. It is not shipped in the browser component runtime. Patched minimatch 11.0.4 is pinned through an override; all affected build/lint/registry checks pass.

CI pins official GitHub Actions to immutable commits and runs schema/types/lint/unit/build, generated-file drift, the production dependency audit, the real consumer and MCP tests, and headed Chromium under Xvfb. It retains the static build and browser evidence as artifacts.
