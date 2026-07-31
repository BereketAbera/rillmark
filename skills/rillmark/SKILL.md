---
name: rillmark
description: Build or customize React interfaces with the Rillmark npm package. Discover component APIs, compose accessible screens and verify interactions. Use when Rillmark is requested or already present in the project.
---

# Rillmark

Rillmark is an independent React 19 design system with its own components and semantic tokens. Use its npm package directly. Complex interactions use Radix primitives.

## Read focused documentation

Start with [the component index](https://rillmark.vercel.app/llms.txt), then read only the relevant pages:

- [Getting started](https://rillmark.vercel.app/docs/getting-started.md): package installation and stylesheet choices.
- `https://rillmark.vercel.app/docs/components/<name>.md`: exports, props, behavior and working examples for that component.
- [Themes](https://rillmark.vercel.app/docs/themes.md): three coordinated presets and independent light/dark/system appearance.
- [Foundations](https://rillmark.vercel.app/docs/foundations.md): semantic tokens, typography, dark mode and customization.

Inspect the consumer's installed package version and declarations when an API differs from the live documentation. If the documentation is unreachable, use installed declarations and available local source, and identify any remaining uncertainty.

## Install and import

Preserve the consumer's framework and package manager. Rillmark requires React and React DOM 19. Check those versions before installation; an existing older application needs an explicit React migration decision.

```sh
npm install rillmark
```

Import the precompiled stylesheet once in the application's global entry point. This path needs no Tailwind build, aliases or source transforms:

```tsx
import 'rillmark/styles.css'
import { Button } from 'rillmark/button'
import { Field } from 'rillmark/field'
import { Input } from 'rillmark/input'
```

Named root imports such as `import { Button, Field, Input } from 'rillmark'` also work. Use ordinary CSS for application layout when choosing the precompiled stylesheet.

For an existing Tailwind CSS 4 application, use this in its global CSS **instead of** importing `rillmark/styles.css`:

```css
@import "tailwindcss";
@import "rillmark/tailwind.css";
```

The alternate entry exposes semantic utilities and registers package modules for Tailwind class detection. Application `className` utilities participate in the same build. Import only one of these stylesheet paths.

## Compose and customize

- Read the relevant component page before composing; use its actual exports and props. Component subpaths are `rillmark/<name>`.
- Choose a coordinated preset on `html`: `data-rillmark-preset="fieldnotes|studio|play"`. Fieldnotes is the warm editorial default, Studio is precise blue, and Play is soft violet. Use semantic colors and default component sizes, with `className` for layout.
- Use `Field` with `label`, `description` and `error` to associate controls and validation. `IconButton` requires its `label` prop. Overlays need their title and description parts; keep the provided focus management.
- Set `data-rillmark-mode="light|dark|system"` independently on `html`; no theme provider is needed and portals inherit from the root. `.dark` remains supported when no explicit mode overrides it. Use one actual value per attribute; the pipes above denote choices. CSS overrides need selectors matching the root attributes. The package exports `rillmark/tokens.json`.
- System font fallbacks work immediately. Load DM Sans separately only when the application's typography calls for the documentation site's font.

## Verify the result

Run the consumer's type check and production build. Exercise the implemented interactions and check keyboard focus/return, accessible names, validation feedback, mobile overflow and reduced motion. Use headed browser tests when available. Report any verification limits precisely.
