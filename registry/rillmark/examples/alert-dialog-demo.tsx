"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

export default function ComponentDemo() {
  const [archived, setArchived] = useState(false)
  return <div className="space-y-3">
    <p role="status" className="text-sm text-muted-foreground">{archived ? "Spring research was archived." : "Spring research is active."}</p>
    {archived ? <Button variant="outline" onClick={() => setArchived(false)}>Restore project</Button> : <AlertDialog>
      <AlertDialogTrigger asChild><Button variant="danger">Archive project</Button></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader><AlertDialogTitle>Archive Spring research?</AlertDialogTitle><AlertDialogDescription>The project will leave your active list. You can restore it later.</AlertDialogDescription></AlertDialogHeader>
        <AlertDialogFooter><AlertDialogCancel>Keep active</AlertDialogCancel><AlertDialogAction onClick={() => setArchived(true)}>Archive project</AlertDialogAction></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>}
  </div>
}
