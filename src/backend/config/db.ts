import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const dbConnectionString = process.env.NEON_DB_CONNECTION_STRING as string;

const sql = neon(dbConnectionString);

export const db = drizzle(sql, { schema });
