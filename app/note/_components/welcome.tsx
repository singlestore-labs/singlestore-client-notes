import { CreateNoteAction } from "@/app/note/_components/action/create";
import { cachedCountNotes } from "@/app/note/_lib/count";
import { cn } from "@/lib/utils";
import { ComponentProps } from "@/types/component";

export type NoteWelcomeProps = ComponentProps<"div">;

export async function NoteWelcome({ className, ...props }: NoteWelcomeProps) {
  const notesCount = await cachedCountNotes();
  const message = !notesCount ? "Start by creating a new note." : "Click on a note in the sidebar to open it.";

  return (
    <div
      {...props}
      className={cn("flex -translate-y-1/2 flex-col items-center gap-4", className)}
    >
      <p className="text-center text-sm text-muted-foreground">{message}</p>
      {!notesCount && <CreateNoteAction />}
    </div>
  );
}
