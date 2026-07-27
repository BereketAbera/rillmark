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
