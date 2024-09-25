"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { deleteNote } from "@/app/note/_actions/delete";
import { NoteAssistantAskDialog } from "@/app/note/_assistant/ask/components/dialog";
import { ButtonDelete } from "@/components/button/delete";
import { Card, CardProps } from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { ComponentProps } from "@/types/component";
import { Note } from "@/types/db";

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
      <NoteAssistantAskDialog />
      <ButtonDelete
        className="ml-auto"
        title="Delete the note?"
        disabled={isPending}
        onClick={handleDeleteClick}
      />
    </Card>
  );
}
