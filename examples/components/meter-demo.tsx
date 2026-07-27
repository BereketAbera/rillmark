import { useState } from 'react'
import { Meter } from 'rillmark/meter'
import { Field } from 'rillmark/field'
import { Slider } from 'rillmark/slider'

export default function ComponentDemo() {
  const [used, setUsed] = useState(6)
  return <div className="w-full max-w-sm space-y-6"><div><div className="mb-2 flex justify-between gap-4 text-sm"><span id="storage-label" className="font-medium">Storage used</span><span className="text-muted-foreground">{used} of 20 GB</span></div><Meter aria-labelledby="storage-label" value={used} max={20} aria-valuetext={`${used} of 20 gigabytes used`}/></div><Field label="Preview usage"><Slider value={[used]} onValueChange={([next]) => setUsed(next)} max={20} step={1}/></Field></div>
}
