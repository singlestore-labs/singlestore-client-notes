import { unstable_cache } from "next/cache";

import { notesTable } from "@/lib/db";

export async function getNotes() {
  return notesTable.find({
    select: ["id", "title", "createdAt"],
    orderBy: { createdAt: "desc" },
  });
}

export const cachedGetNotes = unstable_cache(getNotes, ["cachedGetNotes"], { tags: ["notes"] });
