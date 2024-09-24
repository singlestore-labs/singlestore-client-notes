import { Note } from "@/types/db";

const ROOT = "/";

const NOTES = `${ROOT}notes`;

const NOTE_BY_ID = (id: Note["id"]) => `${NOTES}/${id}`;

export const ROUTES = {
  ROOT,
  NOTES,
  NOTE_BY_ID,
};
