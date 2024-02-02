import type { Config } from "drizzle-kit";

export default {
  schema: "./src/libs/schema.ts",
  out: "./src/migrations",
} satisfies Config;
