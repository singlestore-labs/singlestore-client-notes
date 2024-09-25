import { notFound } from "next/navigation";

import { NoteContentControl } from "@/app/note/_content/components/control";
import { getNoteById } from "@/app/note/_lib/get-by-id";
import { NoteTitleControl } from "@/app/note/_title/components/control";

type NotePageProps = {
  params: { id: string };
};

export default async function NotePage({ params }: NotePageProps) {
  const id = Number(params.id);
  const note = await getNoteById(id);

  if (!note) {
    return notFound();
  }

  const _createdAt = new Date(note.createdAt).toLocaleString("en-US");

  return (
    <div className="h-full px-12 py-8">
      <div className="mx-auto w-full max-w-4xl">
        <time
          dateTime={_createdAt}
          className="text-sm text-muted-foreground"
        >
          {_createdAt}
        </time>
        <NoteTitleControl
          id={note.id}
          title={note.title}
          className="mt-4"
        />
        <NoteContentControl
          id={note.id}
          content={note.content}
          className="mt-4"
        />
      </div>
    </div>
  );
}
