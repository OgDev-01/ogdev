import "dotenv/config";
import { neonConfig } from "@neondatabase/serverless";
import { migrate } from "drizzle-orm/neon-http/migrator";
import { db } from "./libs/db";

(async () => {
  neonConfig.fetchConnectionCache = true;

  await migrate(db, { migrationsFolder: "./migrations" });

  console.log("Done");
})();
