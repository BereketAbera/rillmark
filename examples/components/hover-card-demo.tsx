"use client"
import { HoverCard, HoverCardArrow, HoverCardContent, HoverCardTrigger } from "rillmark/hover-card"

export default function ComponentDemo() {
  return <p className="text-sm leading-relaxed">
    Build with the <HoverCard openDelay={250}>
      <HoverCardTrigger href="https://rillmark.vercel.app/docs/foundations.md" className="rounded-sm font-semibold text-primary underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Fieldnotes foundations</HoverCardTrigger>
      <HoverCardContent>
        <h3 className="font-semibold">Warm, clear and considered</h3>
        <p className="mt-2 text-muted-foreground">Paper surfaces, mineral accents and a shared spacing rhythm keep busy workspaces calm.</p>
        <p className="mt-3 text-xs text-muted-foreground">Follow the link for tokens, typography and both color modes.</p>
        <HoverCardArrow />
      </HoverCardContent>
    </HoverCard> as a starting point.
  </p>
}
