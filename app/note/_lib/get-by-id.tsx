import { notesTable } from "@/lib/db";
import { Note } from "@/types/db";

export async function getNoteById(id: Note["id"]) {
  const rows = await notesTable.find({ select: ["id", "title", "content", "createdAt"], where: { id } });
  return rows[0];
}
