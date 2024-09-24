import { unstable_cache } from "next/cache";

import { notesTable } from "@/lib/db";

export async function countNotes() {
  const rows = await notesTable.find({ select: ["count(*) AS total"] });
  return rows[0].total;
}

export const cachedCountNotes = unstable_cache(countNotes, ["countNotes"], { tags: ["notes"] });
