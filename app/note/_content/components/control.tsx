"use client";

import { useState, useTransition } from "react";
import { SubmitHandler } from "react-hook-form";

import { updateNoteContent } from "@/app/note/_content/actions/update";
import { NoteContentForm, NoteContentFormSchema } from "@/app/note/_content/components/form";
import { ButtonEdit } from "@/components/button/edit";
import { cn } from "@/lib/utils";
import { ComponentProps } from "@/types/component";
import { Note } from "@/types/db";
import { Content } from "@/components/content";

export type NoteContentControlProps = ComponentProps<"div", Pick<Note, "id" | "content">>;

export function NoteContentControl({ className, id, content, ...props }: NoteContentControlProps) {
  const [_content, setContent] = useState(content || "");
  const [isEditMode, setIsEditMode] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit: SubmitHandler<NoteContentFormSchema> = async (values) => {
    const content = values.content.trim();

    if (_content === content) {
      setIsEditMode(false);
      return;
    }

    startTransition(async () => {
      await updateNoteContent(id, content);
      setContent(content);
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
        <NoteContentForm
          className="relative -ml-10"
          defaultValues={{ content: _content }}
          isDisabled={isPending}
          onSubmit={handleSubmit}
        />
      ) : (
        <div className="group relative -ml-10 flex items-start gap-2">
          <ButtonEdit
            className="invisible group-hover:visible group-hover:opacity-100"
            onClick={handleEditButtonClick}
          />
          {!_content ? <p className="text-base text-muted-foreground">Content</p> : <Content>{_content}</Content>}
        </div>
      )}
    </div>
  );
}
