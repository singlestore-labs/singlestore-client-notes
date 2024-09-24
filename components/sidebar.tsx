import { Suspense } from "react";

import { CreateNoteAction } from "@/app/note/_components/action/create";
import { NotesList } from "@/app/note/_components/list";
import { cn } from "@/lib/utils";
import { ComponentProps } from "@/types/component";

export type SidebarProps = ComponentProps<"div">;

export function Sidebar({ className, ...props }: SidebarProps) {
  return (
    <div
      {...props}
      className={cn("flex h-full w-72 flex-col border-r", className)}
    >
      <h2 className="mx-4 mt-4 text-xs font-medium uppercase text-muted-foreground">Notes</h2>
      <CreateNoteAction className="mx-4 mt-4" />
      <Suspense>
        <NotesList className="mt-4 flex-1 px-4" />
      </Suspense>
    </div>
  );
}
