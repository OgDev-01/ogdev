import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const dbConnectionString = process.env.NEON_DB_CONNECTION_STRING || ""; // Ensure the environment variable is defined
const sql = neon(dbConnectionString);

export const db = drizzle(sql, {});
