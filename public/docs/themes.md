# A different feel. Two settings.

Choose a coordinated visual preset, then choose its appearance. Every Rillmark component uses the same semantic tokens, so the entire product follows.

```html
<html data-rillmark-preset="studio" data-rillmark-mode="system">
```

Both `rillmark/styles.css` and `rillmark/tailwind.css` include all presets. There is nothing else to install.

## Choose a preset

- **Fieldnotes** (`fieldnotes`): warm paper, mineral green, editorial serif accents and one smaller corner. This is the default.
- **Studio** (`studio`): cool neutrals, clear blue, system sans serif, precise corners and quicker transitions.
- **Play** (`play`): soft violet, warm apricot, friendly type, generous curves and a gentler rhythm.

Try the [live preset explorer](/#/themes), then open any component or complete example. The site's selector changes the whole document and remembers your choice.

## Appearance is independent

`data-rillmark-mode` accepts `light`, `dark` or `system`. System appearance follows `prefers-color-scheme` in CSS, including changes after the page loads. Supply attributes in your server-rendered HTML to avoid a first-paint mismatch. If you persist a user's choice, apply it before rendering the application.

In a client-rendered application, the entire switch is:

```ts
document.documentElement.dataset.rillmarkPreset = 'play'
document.documentElement.dataset.rillmarkMode = 'dark'
```

In a React root layout, use the same attributes on your `html` element. Keep the attributes on the document root so dialogs and menus rendered in portals inherit them. Nested presets are not supported.

With no attributes, Rillmark keeps its light Fieldnotes defaults. Existing `.dark` usage still works; an explicit `data-rillmark-mode` takes precedence over that class. Unknown preset values are unsupported; use one of the three names above.

## Adjust a token when you need to

Load your overrides after the package styles. Match the root's preset and appearance attributes when overriding palette values:

```css
:root[data-rillmark-preset="studio"][data-rillmark-mode="light"] {
  --primary: #2949b8;
  --primary-foreground: #ffffff;
}
:root[data-rillmark-preset="studio"] {
  --radius-xl: 0.5rem;
  --radius-corner: 0.5rem;
  --font-editorial: Georgia, serif;
}
```

Set both foreground and surface colors and recheck contrast. For system appearance overrides, include matching light and `prefers-color-scheme: dark` rules. The package exports `rillmark/tokens.json` for design tooling; the existing `theme`, `light` and `dark` keys remain the Fieldnotes defaults, with other presets under `presets`.

Typography uses local system fallbacks. Fieldnotes uses DM Sans when loaded by your app; Studio uses the system sans serif; Play prefers Trebuchet MS, then Segoe UI/system sans. No preset downloads a font. Corner, shadow and duration tokens are CSS variables too. Reduced motion always takes precedence over preset motion.

Use `className` for local layout. Keep the component's label, keyboard behavior and focus indication in every preset. See [foundations](./foundations.md) for composition guidance.
