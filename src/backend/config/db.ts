import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Workaround until Neon Vercel integration adds this query parameter
if (!process.env.NEON_DB_CONNECTION_STRING) {
  throw new Error("process.env.DATABASE_URL was missing");
}
const url = new URL(process.env.NEON_DB_CONNECTION_STRING);
url.searchParams.set("sslmode", "require");

const dbConnectionString = url.toString();
const sql = neon(dbConnectionString);

export const db = drizzle(sql, { schema });
