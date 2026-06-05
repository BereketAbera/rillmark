# Rillmark

Expressive React components with warm paper surfaces, mineral teal, considered shapes and accessible interaction. React 19 is required. The package and documentation use the same canonical Rillmark implementation.

[Documentation and live examples](https://rillmark.vercel.app)

## Install

```sh
npm install rillmark
```

Import the precompiled CSS once in your application's entry point. It includes the light/dark tokens, base styles and component utilities, so Tailwind is not required for this path.

```tsx
import 'rillmark/styles.css'
import { Button } from 'rillmark/button'
import { Card, CardContent, CardHeader, CardTitle } from 'rillmark/card'

export function Welcome() {
  return (
    <Card>
      <CardHeader><CardTitle as="h2">A place for good work</CardTitle></CardHeader>
      <CardContent><Button onClick={() => window.alert('Welcome to the team.')}>Get started</Button></CardContent>
    </Card>
  )
}
```

Root imports such as `import { Button, Field, Input } from 'rillmark'` also work. Component subpaths keep imports explicit. JavaScript modules and TypeScript declarations are included; no aliases or build-time source transforms are needed in your app.

Use your own CSS classes for application layout on this path. To use additional Tailwind utilities in `className`, choose the Tailwind integration below.

## Existing Tailwind CSS 4 applications

Use this **instead of** the precompiled `styles.css` import:

```css
@import "tailwindcss";
@import "rillmark/tailwind.css";
```

This adds the semantic theme and explicitly registers the package's component modules for class detection. Tailwind normally ignores `node_modules`; the package handles that source registration for you. Your app can now use utilities such as `bg-background`, `text-primary` and `border-border`, and custom `className` values participate in the same Tailwind build.

## Themes and customization

Add `.dark` to the document root for the dark theme. Override semantic CSS variables after the stylesheet to customize the palette. The `rillmark/tokens.json` export contains the canonical tokens; `rillmark/theme.css` exports the uncompiled Tailwind theme, base styles and motion rules.

Keep visible labels on forms and icon actions. `Field` connects labels, descriptions and errors to Rillmark controls. Overlays use Radix focus management and need their title/description parts. Reduced motion is supported by default.

The package uses system font fallbacks. Load DM Sans separately if you want the documentation site's exact typography.

## Editable source

Use versioned npm imports by default. The package includes the original TypeScript in `node_modules/rillmark/src/`, and the documentation exposes the same readable source. To own an implementation, copy the needed `src/ui` files together with their referenced sibling components and `src/lib/rillmark-utils.ts`, preserving those relative paths. Keep the stylesheet import and runtime dependencies from the package manifest. Components and tokens have one canonical source in Rillmark.
