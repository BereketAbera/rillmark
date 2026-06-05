import { Tabs, TabsContent, TabsList, TabsTrigger } from "rillmark/tabs"

export default function ComponentDemo() {
  return <Tabs defaultValue="overview">
    <TabsList aria-label="Project sections"><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="activity">Activity</TabsTrigger><TabsTrigger value="files" disabled>Restricted files</TabsTrigger></TabsList>
    <TabsContent value="overview"><p className="text-sm leading-relaxed">Spring research brings together 12 field notes from the coastal restoration team. The next review is on Friday.</p></TabsContent>
    <TabsContent value="activity"><p className="text-sm leading-relaxed">Maya added a field note. Niko reviewed the site survey. Three observations are ready for discussion.</p></TabsContent>
  </Tabs>
}
