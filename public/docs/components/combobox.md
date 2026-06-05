# Combobox

Find a choice without losing your place.

Pass options with unique value and label. Typing filters; arrows move, Enter selects, Escape closes. Field supplies the accessible label. Use required when a real option must be selected.

## Install

First follow [setup](../getting-started.md). Install the package once:

```sh
npm install rillmark
```

Import components from `rillmark/combobox`. Load `rillmark/styles.css` once, or use the Tailwind CSS 4 integration in setup. React 19 is supplied by your application.

## Working example

```tsx
"use client"
import { useState } from "react"
import { Combobox } from "rillmark/combobox"
import { Field } from "rillmark/field"

const options = [{ value: "maya", label: "Maya Chen", keywords: ["research"] }, { value: "niko", label: "Niko Alvarez", keywords: ["design"] }, { value: "ada", label: "Ada Okafor", keywords: ["ecology"] }, { value: "leo", label: "Leo Park · away", disabled: true }]

export default function ComponentDemo() {
  const [owner, setOwner] = useState("")
  return <Field label="Project lead" description="Find a teammate by name or specialty." className="w-full max-w-sm">
    <Combobox options={options} value={owner} onValueChange={setOwner} placeholder="Choose a teammate" emptyMessage="No teammates match. Try a different name." />
  </Field>
}

```

## API

Exports (generated from TypeScript): `Combobox`. Native element and underlying Radix props are forwarded.

Locally declared props (generated):

| Component.prop | Type | Requirement/default | Description |
|---|---|---|---|
| Combobox.options | `ComboboxOption[]` | Required |  |
| Combobox.value | `string` | Optional |  |
| Combobox.defaultValue | `string` |  |  |
| Combobox.onValueChange | `((value: string) => void)` | Optional |  |
| Combobox.searchPlaceholder | `string` | Search options… |  |
| Combobox.emptyMessage | `string` | No matches found. |  |

[Readable source](../../source/combobox.tsx)
