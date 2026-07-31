# Kbd

A familiar hint for a keyboard shortcut.

Kbd is a semantic kbd element. It displays the key; shortcut behavior belongs to the application. Group keys in reading order and account for platform differences.

## Install

First follow [setup](../getting-started.md). Install the package once:

```sh
npm install rillmark
```

Import components from `rillmark/kbd`. Load `rillmark/styles.css` once, or use the Tailwind CSS 4 integration in setup. React 19 is supplied by your application.

## Working example

```tsx
import { useEffect, useRef } from 'react'
import { Kbd } from 'rillmark/kbd'
import { Field } from 'rillmark/field'
import { Input } from 'rillmark/input'

export default function ComponentDemo() {
  const input = useRef<HTMLInputElement>(null)
  useEffect(() => {
    const focusSearch = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); input.current?.focus() } }
    window.addEventListener('keydown', focusSearch)
    return () => window.removeEventListener('keydown', focusSearch)
  }, [])
  return <div className="w-full max-w-sm space-y-4"><Field label="Find a page"><Input ref={input} placeholder="Start typing…" type="search"/></Field><p className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">Focus search with <Kbd>⌘ / Ctrl</Kbd><span>+</span><Kbd>K</Kbd></p></div>
}

```

## API

Exports (generated from TypeScript): `Kbd`. Native element and underlying Radix props are forwarded.

Use the underlying native element or Radix primitive props shown in the example. No additional configuration is required.

[Readable source](../../source/kbd.tsx)
