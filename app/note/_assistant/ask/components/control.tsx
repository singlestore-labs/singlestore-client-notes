"use client";

import { NoteAssistantAskForm, NoteAssistantAskFormProps } from "@/app/note/_assistant/ask/components/form";
import { cn } from "@/lib/utils";
import { ComponentProps } from "@/types/component";

export type NoteAssistantAskControlProps = ComponentProps<"div">;

export function NoteAssistantAskControl({ className, ...props }: NoteAssistantAskControlProps) {
  const handleSubmit: NoteAssistantAskFormProps["onSubmit"] = (values) => {
    console.log(values);
  };

  return (
    <div
      {...props}
      className={cn("", className)}
    >
      <NoteAssistantAskForm onSubmit={handleSubmit} />
    </div>
  );
}
