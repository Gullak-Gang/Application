import "dotenv/config";

import * as schema from "@/lib/db/schema/schema";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

export const client = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

export const db = drizzle(client, { schema });
