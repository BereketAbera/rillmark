# Accordion

Detail when it is needed.

Use type="single" with collapsible or type="multiple". Every item needs a unique value. Triggers preserve heading and keyboard semantics.

## Install

First follow [setup](../getting-started.md). Install the package once:

```sh
npm install rillmark
```

Import components from `rillmark/accordion`. Load `rillmark/styles.css` once, or use the Tailwind CSS 4 integration in setup. React 19 is supplied by your application.

## Working example

```tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "rillmark/accordion"

export default function ComponentDemo() {
  return <Accordion type="single" collapsible className="w-full max-w-lg">
    <AccordionItem value="ownership"><AccordionTrigger>Who owns the component source?</AccordionTrigger><AccordionContent>You do. Installation copies TypeScript into your project so your team can edit it directly.</AccordionContent></AccordionItem>
    <AccordionItem value="themes"><AccordionTrigger>Can we adapt the palette?</AccordionTrigger><AccordionContent>Yes. Update the semantic CSS variables in your stylesheet. Every component follows the same light and dark color relationships.</AccordionContent></AccordionItem>
  </Accordion>
}

```

## API

Exports (generated from TypeScript): `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`. Native element and underlying Radix props are forwarded.

Locally declared props (generated):

| Component.prop | Type | Requirement/default | Description |
|---|---|---|---|
| AccordionItem.asChild | `boolean` | Optional |  |
| AccordionTrigger.asChild | `boolean` | Optional |  |
| AccordionContent.asChild | `boolean` | Optional |  |
| Accordion.asChild | `boolean` | Optional |  |

[Readable source](../../source/accordion.tsx)
