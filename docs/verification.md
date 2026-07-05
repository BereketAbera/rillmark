# Release verification

Verified on 2026-11-04 using Node 24.13.0 and headed Google Chrome on macOS. The release uses React 19.3.1, Tailwind 4.3.4, Radix 1.8.1, TypeScript 6.0.3 and Vite 8.3.5. Rillmark is an independent npm package; reference design systems are not distribution or implementation dependencies.

## Published release

`rillmark@0.1.0` was published on 2026-11-04. The public npm metadata and tarball endpoint respond successfully; published integrity matches the exact tested artifact. The package contains 110 intended files (39,970 bytes compressed), including portable TypeScript source and the consuming skill. See [npm](https://www.npmjs.com/package/rillmark) and [public consumer verification](npm-verification.md).

The final local run passes all **21 unit tests and 17 headed browser tests**. Both packed-package styling modes, strict declarations, server rendering and Codex/Claude skill installation pass. The full dependency audit reports zero vulnerabilities.

## Repeatable checks

| Check | Evidence |
| --- | --- |
| Source and documentation | All 32 component sources match public source downloads; demo modules match generated examples; component imports resolve. |
| Documentation compilation | All 32 live examples and fenced TSX guide examples compile with the application using actual consumer import paths. Exports/local props are generated from TypeScript. |
| Types and lint | TypeScript and ESLint pass. |
| Unit interactions | 21 tests cover labels/validation, native submission/reset, keyboard choices, overlay focus/cancellation, toast dismissal and reviewed edge cases. |
| Production build | Static documentation, local fonts, focused Markdown and API metadata build without warnings. |
| npm package | A real packed tarball is installed into a fresh app, without workspace symlinks. Root/component imports, strict declarations, invalid-variant rejection, Node ESM imports, SSR and a single React peer are checked. |
| Both stylesheet paths | Precompiled CSS is tested without Tailwind installed; the separate Tailwind 4 integration is tested with actual package class scanning and custom app utilities. |
| Agent skill | The skill is included in the npm artifact. Installation from the fresh app's node_modules was verified byte-for-byte for Codex and Claude Code; the standard validator passes. |
| Dependencies | The package uses React/ReactDOM peers plus Radix, Lucide, clsx and tailwind-merge. The full development and runtime dependency audit reports zero vulnerabilities. |

The packed consumer verifies light/dark colors, 44px controls, label focus, keyboard Combobox selection, dialog containment/Escape/focus return, 390px layout, and production builds with both stylesheet paths. Its exact tested tarball, integrity, file allowlist, report and screenshots are retained under `evidence/npm-package/` and uploaded as CI artifacts.

See [skill installation](skill-installation.md), [distribution decisions](distribution-research.md) and [release instructions](releasing.md).

## Headed browser coverage

The 17-test suite checks documentation search/source/copy, theme persistence, mobile navigation, every component page, complete example workflows and toast focus. Axe WCAG A/AA checks cover all 32 component pages in light and dark, three guides, home, all three application screens, and mobile layouts. Open dialog, confirmation and combobox states are audited after purposeful entry animations settle.

Keyboard checks include dialog containment/restoration, Escape, initial cancel focus, Select/Combobox selection, radio/slider arrows, checkbox/switch activation and F8/Tab/Escape toast navigation. Reduced-motion tests inspect rendered animation styles. Mobile tests check page overflow and internal card bounds at 375–390px.

Workflows cover project search/filter/sort/pagination, CSV export, bulk completion, validation and persistent creation; settings validation and saved preferences; discovery categories, search, bookmarks, readable details and focus recovery after removing the final saved item.

Reviewed screenshots are in [evidence](evidence/), including [light documentation](evidence/documentation-light.png), [dark documentation](evidence/documentation-dark.png), [mobile documentation](evidence/documentation-mobile.png), all three screens in both themes and mobile sizes, and the [three-direction study](evidence/exploration.png).

## Corrections made during verification

- Unchecked Switch thumbs, documentation metadata and toast keyboard focus remain visible in both themes.
- CardTitle supports explicit semantic heading levels; Field respects caller-defined and nested control IDs.
- Disabled/loading slotted buttons suppress child activation; sliders respect nonzero minimums; initial Combobox ArrowUp selects the last enabled option.
- Overlay entry animation preserves centering.
- Settings grids avoid intrinsic-width clipping on mobile; saved-item removal restores focus to a surviving control.
- Package source uses portable relative imports. Published JavaScript and declarations resolve without repository aliases.

## Hosted verification

Production component pages passed automated accessibility checks in both themes, and the working example flows were exercised over HTTPS. The Select keyboard test now waits for visible option focus before sending the next key; it passed three consecutive live reruns.

A longer live rerun encountered two asset-loading stalls: the main scripts remained pending until a navigation timeout, and a Discovery lazy import exceeded the test's short visibility deadline. Traces recorded no JavaScript errors or completed HTTP failures; they cannot identify whether the network path, CDN or browser transport caused the delay. The final local suite passes all 17 tests. Public documentation/API endpoints return HTTP 200 with the expected content; the removed endpoint returns HTTP 404.

GitHub Actions is enabled and the release workflow is queued. At verification time GitHub had assigned no hosted runner and exposed no annotations or explanation. Remote CI completion is therefore unverified; equivalent checks were executed locally.

## Boundaries

Safari, Firefox, physical touch devices and dedicated screen-reader sessions were not tested. Automated axe checks plus keyboard and visual review do not prove complete accessibility conformance. Example content is fictional and browser-local; no backend, synchronization, production authentication, rich-text editor, spreadsheet grid or charting engine is included.

CI pins official GitHub Actions to immutable commits and runs source/docs validation, types, lint, unit tests, generated-file drift, production build, dependency audit, the real packed consumer and headed Chromium under Xvfb. The public deployment is [rillmark.vercel.app](https://rillmark.vercel.app); Git source is private under [BereketAbera/rillmark](https://github.com/BereketAbera/rillmark).
