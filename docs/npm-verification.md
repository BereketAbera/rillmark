# Public npm verification

On **4 November 2026**, an independent fresh consumer installed **rillmark 0.1.0** from the public npm registry. Publication metadata initially returned 404, then became available on the next bounded retry. The consumer used the published package, with no local tarball, workspace link or repository aliases.

The public metadata and installed lockfile matched the tested release integrity:

```text
sha512-harwkt8GB0PGj0Y/Ae1PCcV/yJzV1vJ4enVPVHfb72cuGgOo1iETuFZafEZdJRYf1HFGEMjTP2MjlDVPzlTwLg==
```

## Results

- All **32 component subpaths** imported successfully and matched their named root exports. Strict TypeScript compilation passed with `skipLibCheck: false`; an unsupported button variant remained a type error. Node ESM imports and server rendering passed.
- The default `rillmark/styles.css` path passed a production build and browser checks **without Tailwind installed**. The alternate `tailwindcss` + `rillmark/tailwind.css` path also passed, including app-defined utility generation.
- Both paths passed headed Chrome checks for label association, keyboard combobox selection, Space toggling a switch, keyboard form submission, toast dismissal, dialog focus containment, Escape dismissal and focus return. Visible focus styling and the default 44px button height were verified.
- Light/dark semantic colors, a local CSS variable override, reduced-motion behavior and a 390px layout without horizontal overflow passed. No browser runtime errors occurred. Desktop and mobile screenshots were inspected.
- React resolved to one shared peer. All original component sources, the shared utility, theme/tokens and the consuming skill were present in the installed package.
- `skills` 1.7.6 installed the packaged skill into isolated Codex and Claude Code project directories. Both installed `SKILL.md` files matched the published package byte for byte.

Environment: Node 24.13.0, React/React DOM 19.3.1, TypeScript 6.0.3, Vite 8.3.5, Tailwind CSS 4.3.4 and Playwright 1.64.1, using headed Chrome on macOS. These results cover the React/Vite consumer; they do not certify other frameworks or browsers.

Temporary fixture, verification scripts, lockfile, JSON report and screenshots remain at:

```text
/private/var/folders/q9/gnkm1lh53m30f5k08sjzdv680000gn/T/rillmark-public-20261104-3krt0wqx
```

Release: [npm package](https://www.npmjs.com/package/rillmark/v/0.1.0) · [public package metadata](https://registry.npmjs.org/rillmark/0.1.0).
