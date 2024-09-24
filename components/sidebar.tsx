import { NoteList } from "@/app/note/_components/list";
import { cn } from "@/lib/utils";
import { ComponentProps } from "@/types/component";

export type SidebarProps = ComponentProps<"div">;

export function Sidebar({ className, ...props }: SidebarProps) {
  return (
    <div
      {...props}
      className={cn("flex h-full w-72 flex-col border-r py-4", className)}
    >
      <NoteList />
    </div>
  );
}
