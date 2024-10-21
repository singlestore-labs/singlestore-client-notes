export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  content_v: string;
}

export interface Database {
  name: string;
  tables: {
    notes: Note;
  };
}
