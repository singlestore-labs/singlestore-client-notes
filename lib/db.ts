import { AI } from "@singlestore/ai";
import { SingleStoreClient } from "@singlestore/client";

import { readCertificate } from "@/read-certificate";
import { Database } from "@/types/db";

export const ai = new AI({ openAIApiKey: process.env.OPENAI_API_KEY });
export const client = new SingleStoreClient({ ai });
const databaseName = process.env.DB_NAME || "singlestore_client_notes";

const connection = client.connect({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: Number(process.env.DB_PORT),
  database: databaseName,
  password: process.env.DB_PASSWORD,
  ssl: { ca: readCertificate() },
});

export const db = connection.database.use<Database>(databaseName);

export const notesTable = db.table.use("notes");
