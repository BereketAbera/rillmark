import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "rillmark/accordion"

export default function ComponentDemo() {
  return <Accordion type="single" collapsible className="w-full max-w-lg">
    <AccordionItem value="ownership"><AccordionTrigger>Who owns the component source?</AccordionTrigger><AccordionContent>You do. Installation copies TypeScript into your project so your team can edit it directly.</AccordionContent></AccordionItem>
    <AccordionItem value="themes"><AccordionTrigger>Can we adapt the palette?</AccordionTrigger><AccordionContent>Yes. Update the semantic CSS variables in your stylesheet. Every component follows the same light and dark color relationships.</AccordionContent></AccordionItem>
  </Accordion>
}
