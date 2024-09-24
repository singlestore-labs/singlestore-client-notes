"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { createNote } from "@/app/note/_actions/create";
import { Button, ButtonProps } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { ComponentProps } from "@/types/component";

export type CreateNoteActionProps = ComponentProps<ButtonProps>;

export function CreateNoteAction({ className, ...props }: CreateNoteActionProps) {
  const [isPending, startTransition] = useTransition();
  const { push } = useRouter();

  const handleClick = () => {
    startTransition(async () => {
      const id = await createNote();
      push(ROUTES.NOTE_BY_ID(id));
    });
  };

  return (
    <Button
      {...props}
      className={cn("flex items-center gap-0.5", className)}
      disabled={isPending}
      onClick={handleClick}
    >
      <Plus className="size-5" />
      New Note
    </Button>
  );
}
