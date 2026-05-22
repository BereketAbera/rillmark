# Accordion

Detail when it is needed.

Use type="single" with collapsible or type="multiple". Every item needs a unique value. Triggers preserve heading and keyboard semantics.

## Install

First follow [setup](../getting-started.md). Then:

```sh
npx shadcn@latest add @rillmark/accordion
```

Runtime dependencies: radix-ui@^1.8.1, lucide-react@^1.67.0. Theme and local source dependencies install automatically. React is supplied by your application.

## Working example

```tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

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

[Editable source](../../source/accordion.tsx) · [Registry item](../../r/accordion.json)
