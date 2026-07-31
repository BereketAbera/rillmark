# TagInput

A small collection, one thought at a time.

Enter or comma adds a trimmed tag. Case-insensitive duplicates are ignored. Backspace on an empty input focuses the last remove button; activating it returns focus to the input. Use name to submit repeated values and Field for a persistent label.

## Install

First follow [setup](../getting-started.md). Install the package once:

```sh
npm install rillmark
```

Import components from `rillmark/tag-input`. Load `rillmark/styles.css` once, or use the Tailwind CSS 4 integration in setup. React 19 is supplied by your application.

## Working example

```tsx
import { useState } from 'react'
import { Field } from 'rillmark/field'
import { TagInput } from 'rillmark/tag-input'

export default function ComponentDemo() {
  const [tags, setTags] = useState(['Research', 'Design'])
  return <div className="w-full max-w-md"><Field label="Project topics" description={`${tags.length} of 5 topics added.`}><TagInput value={tags} onValueChange={setTags} maxTags={5} placeholder="Add a topic…" name="topics"/></Field></div>
}

```

## API

Exports (generated from TypeScript): `TagInput`. Native element and underlying Radix props are forwarded.

Locally declared props (generated):

| Component.prop | Type | Requirement/default | Description |
|---|---|---|---|
| TagInput.value | `string[]` | Optional |  |
| TagInput.defaultValue | `string[]` | [] |  |
| TagInput.onValueChange | `((value: string[]) => void)` | Optional |  |
| TagInput.maxTags | `number` | Optional | Maximum number of tags. Duplicates are ignored, ignoring case. |

[Readable source](../../source/tag-input.tsx)
