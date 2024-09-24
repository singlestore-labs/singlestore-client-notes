import { NoteCard } from "@/app/note/_components/card";
import { cachedGetNotes } from "@/app/note/_lib/get";
import { Fade } from "@/components/fade";
import { cn } from "@/lib/utils";
import { ComponentProps } from "@/types/component";

export type NotesListProps = ComponentProps<"div">;

export async function NotesList({ className, ...props }: NotesListProps) {
  const notes = await cachedGetNotes();

  return (
    <div
      {...props}
      className={cn("relative", className)}
    >
      <Fade
        className="top-0 w-full"
        direction="b"
      />
      <Fade
        className="bottom-0 w-full"
        direction="t"
      />
      <ul className="absolute left-0 top-0 flex h-full w-full flex-col gap-2 overflow-auto px-4 py-2">
        {notes.map((note) => (
          <li key={note.id}>
            <NoteCard {...note} />
          </li>
        ))}
      </ul>
    </div>
  );
}
