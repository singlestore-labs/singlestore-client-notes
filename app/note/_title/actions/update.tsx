"use server";

import { revalidateTag } from "next/cache";

import { notesTable } from "@/lib/db";
import { Note } from "@/types/db";

export async function updateNoteTitle(id: Note["id"], title: Note["title"]) {
  const updatedAt = new Date().toISOString().slice(0, 23).replace("T", " ");
  await notesTable.update({ title, updatedAt }, { id });
  revalidateTag("notes");
}
