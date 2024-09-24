import Link from "next/link";

import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { ComponentProps } from "@/types/component";
import { Note } from "@/types/db";

export type NoteListItem = Pick<Note, "id" | "title" | "createdAt">;

export type NoteListProps = ComponentProps<"ul", { notes?: NoteListItem[] }>;

export function NoteList({ className, notes = [], ...props }: NoteListProps) {
  return (
    <ul
      {...props}
      className={cn("", className)}
    >
      {notes.map((note) => (
        <li key={note.id}>
          <Link href={ROUTES.NOTE_BY_ID(note.id)}>
            <h4>{note.title}</h4>
          </Link>
        </li>
      ))}
    </ul>
  );
}
