"use client"
import { useState } from "react"
import { Field } from "@/components/ui/field"
import { Slider } from "@/components/ui/slider"

export default function ComponentDemo() {
  const [capacity, setCapacity] = useState([40])
  return <Field label="Review capacity" description={`${capacity[0]} observations per week.`} className="w-full max-w-sm">
    <Slider value={capacity} onValueChange={setCapacity} min={10} max={100} step={5} thumbLabels={["Observations per week"]} />
  </Field>
}
