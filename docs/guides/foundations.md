# A quiet kind of expressive.

Rillmark's default Fieldnotes direction pairs warm paper with mineral green, compact humanist type and one small corner on otherwise generous surfaces. Its character should remain visible in a form or a dense table.

## Color has a job

`background` is the canvas. `card` and `popover` contain work. `primary` identifies an action, `secondary` supports selection, and `accent` calls for attention. Every surface has a corresponding foreground. Use `destructive` with an explicit description of the consequence.

Avoid hard-coded colors inside product screens. For example, `bg-secondary text-secondary-foreground` adapts to both themes; a mint hex value does not. Color always accompanies a label, icon, border or selected state.

## Typography and spacing

The documentation bundles DM Sans locally. Components fall back to Segoe UI and the system sans serif; no network font or font package is required in consumer apps. To reproduce the documentation typography, install `@fontsource/dm-sans` and import its 400, 500, 600 and 700 weight CSS files in your entry point.

Use 14–16px body text, 20–24px section titles and tabular numerals for data. Georgia is reserved for a brief editorial moment. A four-pixel spacing rhythm keeps related controls close and leaves more space between sections.

Controls use a 44px default height. Compact 36px buttons are appropriate for dense pointer interfaces with space between targets. Panels are softer than controls; radios stay circular and checkboxes remain square.

## A small vocabulary

Buttons use `solid`, `soft`, `outline`, `ghost` and `danger`. Sizes are `sm`, `md` and `lg`. Choose one primary action per context. Feedback uses `soft`, `accent` and `danger` where relevant. Use the coordinated [visual presets](./themes.md) to change the feel while keeping this vocabulary consistent.

## Presets and appearance

Set two attributes on the document root:

```html
<html data-rillmark-preset="fieldnotes" data-rillmark-mode="system">
```

Presets are `fieldnotes`, `studio` and `play`; appearance is `light`, `dark` or `system`. These independent choices affect colors, type, corners, shadows and motion in both stylesheet paths. No provider is required. All six palettes have checked text, control-boundary and focus-ring contrast. Existing `.dark` usage still works when no explicit mode overrides it. See [the theme guide](./themes.md) for configuration, font fallbacks and custom overrides.

## Customization

In this repository, `tokens.json` is canonical. `npm run generate` creates semantic theme CSS. Consumer projects can override CSS variables after the package stylesheet, using selectors matching the root's preset and appearance. Keep paired foreground and surface values together. See the [override example](./themes.md).

Use `className` for local spacing, width and layout. Shared utilities merge Tailwind classes so your additions can override defaults. Keep foreground/surface pairs together when changing tokens and recheck contrast.

## Access belongs in the defaults

Use Field for labels and error association. Give icon-only actions a label. Include titles and descriptions in dialogs. Keep focus rings visible. Radix manages complex focus and keyboard behavior; applications still own good labels, validation messages and reading order.

Motion describes a change, then stops. Overlay entry ranges from 120ms in Studio to 240ms in Play; Fieldnotes retains 180ms. Reduced-motion preferences remove transitions and movement. Avoid idle animation beyond temporary loading indicators.

Try the [live preset explorer](/#/themes), or revisit the [initial three-direction study](/exploration.html).
