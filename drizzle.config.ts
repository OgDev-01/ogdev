import * as dotenv from "dotenv";
import type { Config } from "drizzle-kit";
dotenv.config();

if (!("NEON_DB_CONNECTION_STRING" in process.env))
  throw new Error("NEON_DB_CONNECTION_STRING not found in environment");

export default {
  schema: "./src/libs/schema.ts",
  out: "./src/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.NEON_DB_CONNECTION_STRING!,
  },
  strict: true,
} satisfies Config;
