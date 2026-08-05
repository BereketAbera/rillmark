# Public npm verification

On **4 November 2026**, the published **rillmark 0.2.0** artifact passed the fresh-consumer verification. Public metadata briefly returned 404 during propagation; a bounded, cache-busted retry resolved it. The metadata and downloaded artifact matched the preserved prepublication report:

```text
sha512-or7fkOGMYU2Ksu6sRhN3+VGRdn1Vwe3PsUrAbod+pzXCyClxW+Zcfz+vx8oX+VFZ/QorqXOg5z217s6BWlE5tQ==
```

The repeatable command was:

```sh
RILLMARK_PACKAGE_VERSION=0.2.0 node scripts/test-package.mjs
```

This mode downloads `rillmark@0.2.0` from the public npm registry with `npm pack`, installs that downloaded artifact and real dependencies into an isolated temporary application, and runs headed Chrome checks. It does not rebuild the package or link the repository into the consumer.

## Results

- Root imports and all **48 component subpaths** resolved. Strict TypeScript compilation passed with `skipLibCheck: false`, including rejection of an unsupported button variant. Node ESM imports and server rendering passed.
- The precompiled `rillmark/styles.css` path passed with **no Tailwind installed**. The alternate `tailwindcss` + `rillmark/tailwind.css` path passed with app-defined utility generation. Both consumers built successfully for production.
- Both stylesheet paths passed all **six preset/appearance combinations**: Fieldnotes, Studio and Play in light and dark. Checks covered palette, corners, 44px controls, motion duration, portalled overlay colors and shadows, and card shadows. CSS followed system appearance changes without a theme provider; local token overrides and reduced motion also passed.
- Browser workflows passed for Field label association, keyboard combobox selection, native number-arrow stepping, tag creation, form submission, dialog focus containment, Escape dismissal and focus return. The 390px mobile layout had no horizontal overflow. Neither stylesheet path produced browser runtime errors.
- React resolved to one shared peer. The **158-file** package contained original TypeScript, declarations, compiled modules, styles, tokens and the consuming skill, without build-only files. The downloaded archive was **67,793 bytes**; unpacked content was **334,466 bytes**.
- The packaged skill installed successfully into project-scoped Codex and Claude Code directories. Both installed `SKILL.md` files matched the canonical packaged instructions.

Environment: Node 24.13.0, React/React DOM 19.3.1, TypeScript 6.0.3, Vite 8.3.5, Tailwind CSS 4.3.4 and Playwright 1.64.1, using headed Chrome on macOS. These results cover the React/Vite consumer and the tested browser.

The local public-release result is `evidence/npm-package/report.json`; the preserved comparison is `evidence/npm-package/prepublication-report.json`. The downloaded archive and screenshots remain beside them. The temporary consumer is:

```text
/var/folders/q9/gnkm1lh53m30f5k08sjzdv680000gn/T/rillmark-package-consumer-SB8iLV/app
```

Release: [npm package](https://www.npmjs.com/package/rillmark/v/0.2.0) · [public package metadata](https://registry.npmjs.org/rillmark/0.2.0).
