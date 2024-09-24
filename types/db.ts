import { DatabaseType } from "@singlestore/client/database";
import { TableType } from "@singlestore/client/table";

export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  content_v: string;
}

export interface Database {
  name: "singlestore_client_todo";
  tables: {
    notes: Note;
  };
}
