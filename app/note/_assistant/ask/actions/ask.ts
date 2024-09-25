"use server";

import { ai, notesTable } from "@/lib/db";
import { Note } from "@/types/db";

export async function askNoteAssistant(id: Note["id"], prompt: string) {
  (async () => {
    const stream = await notesTable.createChatCompletion(
      {
        prompt,
        model: "gpt-4o-mini",
        vectorColumn: "content_v",
        stream: true,
      },
      { where: { id }, limit: 1 },
    );

    const completion = await ai.chatCompletions.handleStream(stream);
  })();
}
