"use server";

import { revalidateTag } from "next/cache";

import { notesTable } from "@/lib/db";
import { Note } from "@/types/db";

export async function updateNoteTitle(id: Note["id"], title: Note["title"]) {
  await notesTable.update({ title }, { id });
  revalidateTag("notes");
}
