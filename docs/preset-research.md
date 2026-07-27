# Coordinated presets, independent appearance

Research and implementation decision, 2026-11-04.

The goal is a visibly different product feel from two settings, while preserving component APIs, accessibility and the existing default.

## What established systems do

- [Radix Themes](https://www.radix-ui.com/themes/docs/components/theme) separates appearance from accent, neutral color, radius and scaling. This makes light/dark orthogonal to visual choices. Rillmark adopts that separation, with three coordinated presets instead of exposing every axis independently.
- [Carbon themes](https://www.carbondesignsystem.com/building-blocks/foundations/themes/overview) keep semantic token roles stable while theme values change. Rillmark follows the same principle: components consume roles; presets replace values.
- [Material motion](https://m3.material.io/styles/motion) distinguishes standard and expressive motion schemes. This reinforces that feel includes behavior as well as palette. Rillmark uses its own restrained duration/easing tokens, always respecting reduced motion.
- [Panda presets](https://panda-css.com/docs/theming/presets) package reusable tokens and recipes for a shared build configuration. Its documentation distinguishes those from a stylesheet for apps that do not use that build tool. Rillmark therefore ships ready CSS for every preset through both existing stylesheet paths.

## Rillmark's decision

Set `data-rillmark-preset="fieldnotes|studio|play"` and `data-rillmark-mode="light|dark|system"` on `html`. No React provider, additional dependency, generated consumer configuration or runtime theme engine is needed. The browser's media query handles system appearance; server-rendered attributes work before hydration. Root placement lets portalled dialogs, selects, menus and toasts inherit the same tokens.

Fieldnotes preserves the warm, editorial starting point. Studio uses cool neutrals, blue, system type, small corners and quicker transitions. Play uses violet, warm accents, softer type, generous corners and a slower ease. Each changes color, type, shape, surface shadow and motion together. Default control sizing stays accessible across presets.

Appearance never selects a preset. Each preset has its own light and dark palette. With no attributes, the existing light Fieldnotes default remains; the legacy `.dark` class remains supported. An explicit mode takes precedence over that class. `system` responds directly to the user's operating-system preference.

The initial public API intentionally supports document-level presets. Nested themes would need portal context and an additional runtime contract. Local customization remains ordinary CSS variables and `className`.

## Verification contract

Check six foreground/surface, input-boundary and focus-ring palettes; exercise system preference changes; verify computed shape, font and motion values; open real portalled overlays; run automated accessibility checks and mobile overflow checks; test both precompiled and Tailwind consumer builds. Presets must change existing components and examples, not only the explorer swatches.
