import { Breadcrumbs, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumbs"

export default function ComponentDemo() {
  return <Breadcrumbs><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="/">Rillmark</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>Breadcrumbs</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumbs>
}
