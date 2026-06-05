"use client"
import { useState } from "react"
import { Button } from "rillmark/button"
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "rillmark/toast"

export default function ComponentDemo() {
  const [open, setOpen] = useState(false)
  const [revision, setRevision] = useState(0)
  return <ToastProvider>
    <Button onClick={() => { setRevision(revision + 1); setOpen(true) }}>Save changes</Button>
    <Toast key={revision} open={open} onOpenChange={setOpen} variant="success">
      <ToastTitle>Changes saved</ToastTitle><ToastDescription>Your workspace preferences are up to date.</ToastDescription><ToastClose />
    </Toast>
    <ToastViewport />
  </ToastProvider>
}
