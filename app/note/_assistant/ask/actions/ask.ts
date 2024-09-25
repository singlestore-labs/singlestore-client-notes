"use server";
import { createStreamableValue } from "ai/rsc";

import { ai, notesTable } from "@/lib/db";
import { Note } from "@/types/db";

export async function askNoteAssistant(id: Note["id"], prompt: string) {
  const streamableValue = createStreamableValue("");

  (async () => {
    const stream = await notesTable.createChatCompletion(
      {
        prompt,
        model: "gpt-4o-mini",
        vectorColumn: "content_v",
        stream: true,
      },
      {
        select: ["title", "content"],
        where: { id },
        limit: 1,
      },
    );

    const completion = await ai.chatCompletions.handleStream(stream, (chunk) => {
      streamableValue.update(chunk.content);
    });

    streamableValue.done();
  })();

  return streamableValue.value;
}
