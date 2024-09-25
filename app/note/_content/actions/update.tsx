"use server";

import { notesTable } from "@/lib/db";
import { Note } from "@/types/db";

export async function updateNoteContent(id: Note["id"], content: Note["content"]) {
  await notesTable.update({ content }, { id });
}
