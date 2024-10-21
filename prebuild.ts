import { loadEnvConfig } from "@next/env";
import { SingleStoreClient } from "@singlestore/client";

import { readCertificate } from "@/read-certificate";

const dir = process.cwd();
const env = loadEnvConfig(dir).combinedEnv;

(async () => {
  try {
    const client = new SingleStoreClient();
    const databaseName = env.DB_NAME || "singlestore_client_notes";

    const connection = client.connect({
      host: env.DB_HOST,
      user: env.DB_USER,
      port: Number(env.DB_PORT),
      database: databaseName,
      password: env.DB_PASSWORD,
      ssl: { ca: readCertificate() },
    });

    let database;
    if (Number(env.IS_FREE_TIER)) {
      database = connection.database.use(databaseName);
    } else {
      database = await connection.database.create({ name: databaseName });
    }

    await database.table.create({
      name: "notes",
      columns: {
        id: { type: "BIGINT", primaryKey: true, autoIncrement: true },
        title: { type: "VARCHAR(64)" },
        content: { type: "TEXT" },
        createdAt: { type: "DATETIME(6)", default: "CURRENT_TIMESTAMP(6)" },
        updatedAt: { type: "DATETIME(6)" },
        content_v: { type: "VECTOR(1536)" },
      },
    });

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
