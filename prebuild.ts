import { DB_NAME } from "@/constants/config";
import { Database } from "@/types/db";
import { loadEnvConfig } from "@next/env";
import { SingleStoreClient } from "@singlestore/client";

const dir = process.cwd();
const env = loadEnvConfig(dir).combinedEnv;

(async () => {
  try {
    const client = new SingleStoreClient();

    const connection = client.connect({
      host: env.DB_HOST,
      user: env.DB_USER,
      password: env.DB_PASSWORD,
    });

    await connection.database.create<Database>({
      name: DB_NAME,
      tables: {
        notes: {
          columns: {
            id: { type: "BIGINT", primaryKey: true, autoIncrement: true },
            title: { type: "VARCHAR(64)", nullable: false },
            content: { type: "TEXT" },
            createdAt: { type: "DATETIME(6)", default: "CURRENT_TIMESTAMP(6)" },
            updatedAt: { type: "DATETIME(6)" },
            content_v: { type: "VECTOR(1536)" },
          },
        },
      },
    });

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
