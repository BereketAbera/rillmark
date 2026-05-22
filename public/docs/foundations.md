# A quiet kind of expressive.

Rillmark's Fieldnotes direction pairs warm paper with mineral green, compact humanist type and one small corner on otherwise generous surfaces. Its character should remain visible in a form or a dense table.

## Color has a job

`background` is the canvas. `card` and `popover` contain work. `primary` identifies an action, `secondary` supports selection, and `accent` calls for attention. Every surface has a corresponding foreground. Use `destructive` with an explicit description of the consequence.

Avoid hard-coded colors inside product screens. For example, `bg-secondary text-secondary-foreground` adapts to both themes; a mint hex value does not. Color always accompanies a label, icon, border or selected state.

## Typography and spacing

The documentation bundles DM Sans locally. Components fall back to Segoe UI and the system sans serif; no network font or font package is required in consumer apps. To reproduce the documentation typography, install `@fontsource/dm-sans` and import its 400, 500, 600 and 700 weight CSS files in your entry point.

Use 14–16px body text, 20–24px section titles and tabular numerals for data. Georgia is reserved for a brief editorial moment. A four-pixel spacing rhythm keeps related controls close and leaves more space between sections.

Controls use a 44px default height. Compact 36px buttons are appropriate for dense pointer interfaces with space between targets. Panels are softer than controls; radios stay circular and checkboxes remain square.

## A small vocabulary

Buttons use `solid`, `soft`, `outline`, `ghost` and `danger`. Sizes are `sm`, `md` and `lg`. Choose one primary action per context. Feedback uses `soft`, `accent` and `danger` where relevant. Do not add an expression setting, per-component palette or theme provider.

## Dark mode

Toggle the `dark` class on the document element. Theme tokens and Tailwind's dark variant are installed with the foundation.

```ts
document.documentElement.classList.toggle("dark")
```

Respect the system preference on first visit and save a deliberate user choice. Both palettes have checked text, control-boundary and focus-ring contrast.

## Customization

In this repository, `tokens.json` is canonical. `npm run generate` creates the CSS and registry theme. In a consumer project, edit the variables installed into your application's CSS:

```css
:root {
  --primary: #245f55;
  --primary-foreground: #fffdf7;
}
.dark {
  --primary: #b2d5ba;
  --primary-foreground: #193c2c;
}
```

Use `className` for local spacing, width and layout. Shared utilities merge Tailwind classes so your additions can override defaults. Keep foreground/surface pairs together when changing tokens and recheck contrast.

## Access belongs in the defaults

Use Field for labels and error association. Give icon-only actions a label. Include titles and descriptions in dialogs. Keep focus rings visible. Radix manages complex focus and keyboard behavior; applications still own good labels, validation messages and reading order.

Motion describes a change, then stops. Overlays enter in 180ms; simple state feedback uses 150ms. Reduced-motion preferences remove transitions and movement. Avoid idle animation beyond temporary loading indicators.

See the [three-direction study](/exploration.html) for the short decision record.
