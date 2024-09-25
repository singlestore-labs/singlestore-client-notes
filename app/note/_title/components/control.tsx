"use client";

import { useState, useTransition } from "react";
import { SubmitHandler } from "react-hook-form";

import { updateNoteTitle } from "@/app/note/_title/actions/update";
import { NoteTitleForm, NoteTitleFormSchema } from "@/app/note/_title/components/form";
import { ButtonEdit } from "@/components/button/edit";
import { cn } from "@/lib/utils";
import { ComponentProps } from "@/types/component";
import { Note } from "@/types/db";

export type NoteTitleControlProps = ComponentProps<"div", Pick<Note, "id" | "title">>;

export function NoteTitleControl({ className, id, title, ...props }: NoteTitleControlProps) {
  const [_title, setTitle] = useState(title);
  const [isEditMode, setIsEditMode] = useState(!_title);
  const [isPending, startTransition] = useTransition();

  const handleSubmit: SubmitHandler<NoteTitleFormSchema> = async (values) => {
    if (_title === values.title) {
      setIsEditMode(false);
      return;
    }

    startTransition(async () => {
      await updateNoteTitle(id, values.title);
      setTitle(values.title);
      setIsEditMode(false);
    });
  };

  const handleEditButtonClick = () => {
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
          defaultValues={{ title: _title }}
          isDisabled={isPending}
          onSubmit={handleSubmit}
        />
      ) : (
        <div className="group relative -ml-10 flex items-start gap-2">
          <ButtonEdit
            className="invisible group-hover:visible group-hover:opacity-100"
            onClick={handleEditButtonClick}
          />
          <h1 className="text-3xl font-bold">{_title}</h1>
        </div>
      )}
    </div>
  );
}
