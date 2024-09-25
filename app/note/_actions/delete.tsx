"use server";

import { revalidateTag } from "next/cache";

import { notesTable } from "@/lib/db";
import { Note } from "@/types/db";

export async function deleteNote(id: Note["id"]) {
  await notesTable.delete({ id });
  revalidateTag("notes");
}
