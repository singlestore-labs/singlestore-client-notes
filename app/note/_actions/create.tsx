"use server";

import { revalidateTag } from "next/cache";

import { notesTable } from "@/lib/db";

export async function createNote() {
  const [rows] = await notesTable.insert({});
  const id = rows[0].insertId;
  revalidateTag("notes");
  return id;
}
