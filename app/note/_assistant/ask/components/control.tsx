"use client";

import { useState, useTransition } from "react";

import { NoteAssistantAskForm, NoteAssistantAskFormProps } from "@/app/note/_assistant/ask/components/form";
import { Content } from "@/components/content";
import { cn } from "@/lib/utils";
import { ComponentProps } from "@/types/component";

export type NoteAssistantAskControlProps = ComponentProps<"div">;

export function NoteAssistantAskControl({ className, ...props }: NoteAssistantAskControlProps) {
  const [isPending, startTransition] = useTransition();
  const [response, setResponse] = useState();

  const handleSubmit: NoteAssistantAskFormProps["onSubmit"] = (values) => {
    console.log(values);

    startTransition(async () => {});
  };

  return (
    <div
      {...props}
      className={cn("", className)}
    >
      {response ? (
        <div>
          <Content>{response}</Content>
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
