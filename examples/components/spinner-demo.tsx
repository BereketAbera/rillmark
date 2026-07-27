import { useEffect, useRef, useState } from 'react'
import { Spinner } from 'rillmark/spinner'
import { Button } from 'rillmark/button'

export default function ComponentDemo() {
  const [loading, setLoading] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => () => clearTimeout(timer.current), [])
  return <div className="flex flex-col items-center gap-5"><div className="flex items-center gap-5"><Spinner size="sm" label="Small loading indicator"/><Spinner label="Medium loading indicator"/><Spinner size="lg" label="Large loading indicator"/></div><Button disabled={loading} onClick={() => { setLoading(true); timer.current = setTimeout(() => setLoading(false), 1800) }}>{loading ? <><Spinner label="Refreshing preview" className="text-primary-foreground"/> Refreshing…</> : 'Preview loading state'}</Button><p className="text-xs text-muted-foreground">Animation respects reduced motion.</p></div>
}
