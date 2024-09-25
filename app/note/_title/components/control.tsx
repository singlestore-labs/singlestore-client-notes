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
  const [_title, setTitle] = useState(title || "");
  const [isEditMode, setIsEditMode] = useState(!_title);
  const [isPending, startTransition] = useTransition();

  const handleSubmit: SubmitHandler<NoteTitleFormSchema> = async (values) => {
    const title = values.title.trim();

    if (_title === title) {
      setIsEditMode(false);
      return;
    }

    startTransition(async () => {
      await updateNoteTitle(id, title);
      setTitle(title);
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
          className="relative -ml-12"
          defaultValues={{ title: _title }}
          isDisabled={isPending}
          onSubmit={handleSubmit}
        />
      ) : (
        <div className="group relative -ml-12 flex items-start gap-2">
          <ButtonEdit
            className="invisible group-hover:visible"
            onClick={handleEditButtonClick}
          />
          {!_title ? (
            <p className="text-3xl font-bold text-muted-foreground">Title</p>
          ) : (
            <h1 className="text-3xl font-bold">{_title}</h1>
          )}
        </div>
      )}
    </div>
  );
}
