"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { Card, CardProps } from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { ComponentProps } from "@/types/component";
import { Note } from "@/types/db";

export type NoteCardProps = ComponentProps<CardProps, Pick<Note, "id" | "title" | "createdAt">>;

export function NoteCard({ className, id, title, createdAt, ...props }: NoteCardProps) {
  const params = useParams();
  const paramsId = params.id ? Number(params.id) : 0;
  const isActive = paramsId === id;
  const _createdAt = new Date(createdAt).toLocaleString("en-US");

  return (
    <Card
      {...props}
      className={cn(
        "group relative px-4 py-3 transition-all",
        isActive ? "bg-accent shadow-none" : "hover:shadow-md",
        className,
      )}
    >
      <h4
        className={cn(
          "line-clamp-1 text-sm font-medium transition-all",
          isActive ? "text-primary" : "group-hover:text-primary",
        )}
      >
        {title}
      </h4>
      <time
        dateTime={_createdAt}
        className="text-xs text-muted-foreground"
      >
        {_createdAt}
      </time>
      <Link
        href={ROUTES.NOTE_BY_ID(id)}
        className="absolute left-0 top-0 z-[1] h-full w-full"
      />
    </Card>
  );
}
