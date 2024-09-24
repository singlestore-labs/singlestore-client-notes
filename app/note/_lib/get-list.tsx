import { notesTable } from "@/lib/db";

export async function getNoteList() {
  return notesTable.find({
    select: ["id", "title", "createdAt"],
    orderBy: { createdAt: "desc" },
  });
}
