import { notFound } from "next/navigation";

import { NoteContentControl } from "@/app/note/_content/components/control";
import { getNoteById } from "@/app/note/_lib/get-by-id";
import { NoteTitleControl } from "@/app/note/_title/components/control";
import { NoteToolbar } from "@/app/note/_components/toolbar";

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
    <div className="relative h-full overflow-y-auto overflow-x-hidden px-12 py-8">
      <div className="mx-auto w-full max-w-4xl pb-12">
        <time
          className="text-sm text-muted-foreground"
          dateTime={_createdAt}
        >
          {_createdAt}
        </time>
        <NoteTitleControl
          className="mt-4"
          id={note.id}
          title={note.title}
        />
        <NoteContentControl
          className="mt-6"
          id={note.id}
          content={note.content}
        />
      </div>

      <NoteToolbar
        className="fixed bottom-4 right-8 z-[1]"
        id={note.id}
      />
    </div>
  );
}
