# Stepper

A clear path through a larger task.

Pass unique step ids and the current value. Omit onValueChange for a progress-only trail; provide it to allow navigation, and disable inaccessible steps. Validate each step in your application before advancing. Current and completed states have text semantics.

## Install

First follow [setup](../getting-started.md). Install the package once:

```sh
npm install rillmark
```

Import components from `rillmark/stepper`. Load `rillmark/styles.css` once, or use the Tailwind CSS 4 integration in setup. React 19 is supplied by your application.

## Working example

```tsx
import { useState } from 'react'
import { Stepper } from 'rillmark/stepper'
import { Button } from 'rillmark/button'

const steps = [{ id: 'brief', title: 'Write the brief', description: 'Set your direction' }, { id: 'team', title: 'Invite your team', description: 'Choose collaborators' }, { id: 'review', title: 'Review', description: 'Ready to begin' }]
const descriptions = ['Give the next idea a clear starting point.', 'Bring together the people who will make it happen.', 'A thoughtful start makes the next step easier.']

export default function ComponentDemo() {
  const [step, setStep] = useState('brief')
  const index = steps.findIndex((item) => item.id === step)
  return <div className="w-full max-w-2xl space-y-6"><Stepper steps={steps} value={step} onValueChange={setStep} aria-label="Project setup"/><div className="rounded-xl border border-border bg-card p-5"><h3 className="font-semibold">{steps[index].title}</h3><p className="mt-2 text-sm text-muted-foreground">{descriptions[index]}</p></div><div className="flex justify-between gap-3"><Button variant="outline" disabled={index === 0} onClick={() => setStep(steps[index - 1].id)}>Previous</Button><Button disabled={index === steps.length - 1} onClick={() => setStep(steps[index + 1].id)}>Next step</Button></div></div>
}

```

## API

Exports (generated from TypeScript): `Stepper`. Native element and underlying Radix props are forwarded.

Locally declared props (generated):

| Component.prop | Type | Requirement/default | Description |
|---|---|---|---|
| Stepper.steps | `StepperStep[]` | Required |  |
| Stepper.value | `string` | Required | The id of the current step. |
| Stepper.onValueChange | `((value: string) => void)` | Optional | Omit for a noninteractive progress indicator. Validation belongs to the application. |

[Readable source](../../source/stepper.tsx)
