"use client";

import { readStreamableValue } from "ai/rsc";
import { useCallback, useState, useTransition } from "react";

import { askNoteAssistant } from "@/app/note/_assistant/ask/actions/ask";
import { NoteAssistantAskForm, NoteAssistantAskFormProps } from "@/app/note/_assistant/ask/components/form";
import { Content } from "@/components/content";
import { Fade } from "@/components/fade";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ComponentProps } from "@/types/component";
import { Note } from "@/types/db";

export type NoteAssistantAskControlProps = ComponentProps<"div", Pick<Note, "id">>;

export function NoteAssistantAskControl({ className, id, ...props }: NoteAssistantAskControlProps) {
  const [isPending, startTransition] = useTransition();
  const [response, setResponse] = useState<string>("");

  const handleSubmit = useCallback<NoteAssistantAskFormProps["onSubmit"]>(
    (values) => {
      const prompt = values.prompt.trim();

      startTransition(async () => {
        const streamableValue = await askNoteAssistant(id, prompt);
        for await (const chunk of readStreamableValue(streamableValue)) {
          setResponse((i) => `${i}${chunk}`);
        }
      });
    },
    [id],
  );

  return (
    <div
      {...props}
      className={cn("", className)}
    >
      {response ? (
        <div>
          <div className="relative">
            <Fade
              className="top-0 w-full bg-background"
              direction="b"
            />
            <Fade
              className="bottom-0 w-full bg-background"
              direction="t"
            />
            <Content className="max-h-96 overflow-auto py-4">{response}</Content>
          </div>
          <Button
            className="mt-4 w-full"
            variant="outline"
            onClick={() => setResponse("")}
          >
            Ask
          </Button>
        </div>
      ) : (
        <NoteAssistantAskForm
          isDisabled={isPending}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
