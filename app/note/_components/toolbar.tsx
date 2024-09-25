"use client";

import { ComponentProps } from "@/types/component";
import { cn } from "@/lib/utils";
import { Card, CardProps } from "@/components/ui/card";
import { ButtonDelete } from "@/components/button/delete";
import { useTransition } from "react";
import { Note } from "@/types/db";
import { deleteNote } from "@/app/note/_actions/delete";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { NoteAssistantAskAction } from "@/app/note/_assistant/components/action/ask";

export type NoteToolbarProps = ComponentProps<CardProps, Pick<Note, "id">>;

export function NoteToolbar({ className, id, ...props }: NoteToolbarProps) {
  const [isPending, startTransition] = useTransition();
  const { replace } = useRouter();

  const handleDeleteClick = () => {
    startTransition(async () => {
      await deleteNote(id);
      replace(ROUTES.ROOT);
    });
  };

  return (
    <Card
      {...props}
      className={cn("flex gap-2 p-2", className)}
    >
      <NoteAssistantAskAction />
      <ButtonDelete
        className="ml-auto"
        title="Delete the note?"
        disabled={isPending}
        onClick={handleDeleteClick}
      />
    </Card>
  );
}
