import { AI } from "@singlestore/ai";
import { SingleStoreClient } from "@singlestore/client";

import { DB_NAME } from "@/constants/config";
import { Database } from "@/types/db";

export const ai = new AI({ openAIApiKey: process.env.OPENAI_API_KEY });

export const client = new SingleStoreClient({ ai });

const connection = client.connect({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

export const db = connection.database.use<Database>(DB_NAME);

export const notesTable = db.table.use("notes");
