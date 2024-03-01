import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

neonConfig.fetchConnectionCache = true; // Enable the connection cache

// Workaround until Neon Vercel integration adds this query parameter
if (!process.env.DATABASE_URL) {
  throw new Error("process.env.DATABASE_URL was missing");
}
const url = new URL(process.env.DATABASE_URL);
url.searchParams.set("sslmode", "require");

const dbConnectionString = url.toString();
const sql = neon(dbConnectionString);

export const db = drizzle(sql, { schema });
