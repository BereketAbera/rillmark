import { useState } from 'react'
import { Field } from 'rillmark/field'
import { NumberInput } from 'rillmark/number-input'

export default function ComponentDemo() {
  const [seats, setSeats] = useState<number | ''>(4)
  return <div className="w-full max-w-xs space-y-4"><Field label="Team seats" description="Choose between 1 and 20 seats."><NumberInput value={seats} onValueChange={setSeats} min={1} max={20} decrementLabel="Remove one seat" incrementLabel="Add one seat"/></Field><p className="text-sm text-muted-foreground">{seats === '' ? 'Enter a seat count.' : `${seats} seats · $${seats * 12} per month`}</p></div>
}
