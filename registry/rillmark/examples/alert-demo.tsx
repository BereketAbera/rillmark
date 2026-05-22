import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ComponentDemo() {
  return <div className="w-full max-w-lg space-y-4">
    <Alert variant="accent"><AlertTitle>Ready for the next chapter</AlertTitle><AlertDescription>All 12 observations have been reviewed. Your team can begin the synthesis.</AlertDescription></Alert>
    <Alert variant="danger"><AlertTitle>Two notes need attention</AlertTitle><AlertDescription>Add a site location to each note before including it in your report.</AlertDescription></Alert>
  </div>
}
