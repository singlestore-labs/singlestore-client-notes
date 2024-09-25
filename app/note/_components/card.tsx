"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Card, CardProps } from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { ComponentProps } from "@/types/component";
import { Note } from "@/types/db";

export type NoteCardProps = ComponentProps<CardProps, Pick<Note, "id" | "title" | "createdAt">>;

export function NoteCard({ className, id, title, createdAt, ...props }: NoteCardProps) {
  const pathname = usePathname();
  const isActive = pathname === ROUTES.NOTE_BY_ID(id);
  const _createdAt = new Date(createdAt).toLocaleString("en-US");

  return (
    <Card
      {...props}
      className={cn("group relative border-none px-4 py-3 shadow-none", isActive ? "bg-accent" : "hover:bg-accent", className)}
    >
      <h4 className="line-clamp-1 text-sm font-medium">{title || "Untitled"}</h4>
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
