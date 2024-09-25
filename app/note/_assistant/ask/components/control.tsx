"use client";

import { useState, useTransition } from "react";

import { askNoteAssistant } from "@/app/note/_assistant/ask/actions/ask";
import { NoteAssistantAskForm, NoteAssistantAskFormProps } from "@/app/note/_assistant/ask/components/form";
import { Content } from "@/components/content";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ComponentProps } from "@/types/component";
import { Note } from "@/types/db";

export type NoteAssistantAskControlProps = ComponentProps<"div", Pick<Note, "id">>;

export function NoteAssistantAskControl({ className, id, ...props }: NoteAssistantAskControlProps) {
  const [isPending, startTransition] = useTransition();
  const [response, setResponse] = useState<string | undefined>();

  const handleSubmit: NoteAssistantAskFormProps["onSubmit"] = (values) => {
    const prompt = values.prompt.trim();

    startTransition(async () => {
      const response = await askNoteAssistant(id, prompt);
      console.log(response);
    });
  };

  return (
    <div
      {...props}
      className={cn("", className)}
    >
      {response ? (
        <div>
          <Content>{response}</Content>
          <Button
            className="mt-4 w-full"
            variant="outline"
            onClick={() => setResponse(undefined)}
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
