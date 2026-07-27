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
