"use client";

import { useRef, useState, useTransition } from "react";
import { SubmitHandler } from "react-hook-form";

import { updateNoteTitle } from "@/app/note/_title/actions/update";
import { NoteTitleForm, NoteTitleFormSchema } from "@/app/note/_title/components/form";
import { ButtonEdit } from "@/components/button/edit";
import { cn } from "@/lib/utils";
import { ComponentProps } from "@/types/component";
import { Note } from "@/types/db";

export type NoteTitleControlProps = ComponentProps<"div", Pick<Note, "id" | "title">>;

export function NoteTitleControl({ className, id, title, ...props }: NoteTitleControlProps) {
  const prevTitleRef = useRef(title);
  const [isEditMode, setIsEditMode] = useState(!title);
  const [isPending, startTransition] = useTransition();

  const handleSubmit: SubmitHandler<NoteTitleFormSchema> = async (values) => {
    if (prevTitleRef.current === values.title) {
      setIsEditMode(false);
      return;
    }

    startTransition(async () => {
      await updateNoteTitle(id, values.title);
      prevTitleRef.current = values.title;
      setIsEditMode(false);
    });
  };

  const handleEditButtonClick = () => {
    prevTitleRef.current = title;
    setIsEditMode((is) => !is);
  };

  return (
    <div
      {...props}
      className={cn("", className)}
    >
      {isEditMode ? (
        <NoteTitleForm
          className="relative -ml-10"
          defaultValues={{ title }}
          isDisabled={isPending}
          onSubmit={handleSubmit}
        />
      ) : (
        <div className="group relative -ml-10 flex items-start gap-2">
          <ButtonEdit
            className="invisible group-hover:visible group-hover:opacity-100"
            onClick={handleEditButtonClick}
          />
          <h1 className="text-3xl font-bold">{title}</h1>
        </div>
      )}
    </div>
  );
}
