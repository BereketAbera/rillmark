# Research and direction

Research date: 3 November 2026. Rillmark is a working name: a lightweight web search did not identify an established UI system using it.

## What the references teach

These systems inform individual decisions, not Rillmark's appearance.

- **Material 3 Expressive:** shape, typography and motion can communicate state and grouping. Its motion system distinguishes expressive and standard behavior. Rillmark uses restrained transitions for state changes; it does not adopt Material's pill ecosystem, ripples, shape morphs or dynamic-color machinery. [Overview](https://m3.material.io/) · [Motion](https://m3.material.io/styles/motion)
- **Carbon:** dense product interfaces need a measured type hierarchy and spacing that separates groups while keeping related information close. Rillmark adopts that discipline, with an original palette, type choice and corner language. [Typography](https://www.carbondesignsystem.com/building-blocks/foundations/typography/overview) · [Spacing](https://www.carbondesignsystem.com/building-blocks/foundations/spacing/overview)
- **Radix Themes:** semantic color roles and contextual radii are preferable to arbitrary colors and one global corner value. A checkbox must remain visibly different from a radio. Rillmark uses semantic CSS variables and contextual shapes without a runtime theme-provider API. [Color](https://www.radix-ui.com/themes/docs/theme/color) · [Radius](https://www.radix-ui.com/themes/docs/theme/radius)
- **Park UI:** consistent control heights and variant names make composition predictable. Rillmark aligns inputs, buttons and selects and keeps a small vocabulary; it does not expose a palette-selection or expression framework. [Theming](https://park-ui.com/docs/theming)
- **shadcn/ui:** the reference for distribution and developer experience: install only what is needed, own the source and compose familiar React APIs. It is not the visual reference. [Registry](https://ui.shadcn.com/docs/registry) · [CLI](https://ui.shadcn.com/docs/cli) · [MCP](https://ui.shadcn.com/docs/mcp) · [AI index](https://ui.shadcn.com/llms.txt)

## Three short visual studies

Open [`/exploration.html`](../public/exploration.html) for the comparison. Each study renders the same Fieldwork studio dashboard with identical summary values, project rows, filters and review message. These are deliberately static visual studies, not component demonstrations.

1. **Signal:** cool white, blue ink, cobalt selection, square panels and precise rules. Highly legible at density, but less distinctive among technical dashboards.
2. **Fieldnotes — selected:** paper canvas, ivory panels, mineral green actions, mint selection and apricot notices. Compact humanist typography and a restrained unequal-corner panel motif give ordinary controls a recognizable family resemblance.
3. **Terrace:** cream, espresso and rust with broad rounded modules and inset rows. Welcoming in onboarding, but its heavier containers consume too much space in dense work.

Fieldnotes offers the strongest range: it can feel considered in a dense table and generous in discovery without changing its component language. Expression comes from shape hierarchy, readable rhythm, surface relationships and purposeful state changes. Large headings or decorative effects are not required.

## Decisions carried into implementation

- Native HTML for ordinary controls; Radix primitives for focus management, composite controls and overlays. One accessible primitive foundation avoids competing interaction models.
- Warm background and surface colors, deep mineral ink, a green primary and warm secondary surfaces. Text and interactive boundaries receive explicit contrast checks in both modes.
- Compact sans-serif UI typography. Editorial serif is reserved for short contextual moments; forms, labels and tables remain consistent.
- A four-pixel spacing rhythm. Controls share sizes and alignment. Panels, controls and small indicators use related but distinct corner sizes.
- Small, familiar variants with local `className` overrides. No expression prop or theme engine.
- Motion explains entry, exit and state, using short CSS transitions. Reduced-motion preferences suppress movement; no perpetual animation is needed to make the system feel alive.
- Borders carry ordinary hierarchy; shadows are reserved for floating surfaces. Selected, invalid and loading states include semantic cues beyond color.

`tokens.json` is the implementation authority; the studies capture the decision process rather than a second source of production values.
