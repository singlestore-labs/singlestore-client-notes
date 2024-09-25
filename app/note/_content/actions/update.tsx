"use server";

import { ai, notesTable } from "@/lib/db";
import { Note } from "@/types/db";

export async function updateNoteContent(id: Note["id"], content: Note["content"]) {
  const updatedAt = new Date().toISOString().slice(0, 23).replace("T", " ");
  const content_v = (await ai.embeddings.create(content))[0];

  await notesTable.update(
    {
      content,
      content_v: JSON.stringify(content_v),
      updatedAt,
    },
    { id },
  );
}
