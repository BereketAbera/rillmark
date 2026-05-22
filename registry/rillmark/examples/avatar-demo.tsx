import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function ComponentDemo() {
  return <div className="flex items-center gap-4">
    <div className="flex -space-x-2"><Avatar role="img" aria-label="Maya Chen"><AvatarFallback>MC</AvatarFallback></Avatar><Avatar role="img" aria-label="Ada Okafor"><AvatarFallback className="bg-accent text-accent-foreground">AO</AvatarFallback></Avatar><Avatar role="img" aria-label="Niko Alvarez"><AvatarFallback>NA</AvatarFallback></Avatar></div>
    <div><p className="text-sm font-semibold">The research team</p><p className="text-sm text-muted-foreground">Maya, Ada, and Niko</p></div>
  </div>
}
