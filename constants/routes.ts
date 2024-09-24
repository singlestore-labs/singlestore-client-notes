import { Note } from "@/types/db";

const ROOT = "/";

const NOTE = `${ROOT}note`;

const NOTE_BY_ID = (id: Note["id"]) => `${NOTE}/${id}`;

export const ROUTES = {
  ROOT,
  NOTES: NOTE,
  NOTE_BY_ID,
};
