import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const { users } = schema;

neonConfig.fetchConnectionCache = true; // Enable the connection cache

// Workaround until Neon Vercel integration adds this query parameter
if (!process.env.NEON_DB_CONNECTION_STRING) {
  throw new Error("process.env.DATABASE_URL was missing");
}
const url = new URL(process.env.NEON_DB_CONNECTION_STRING);
url.searchParams.set("sslmode", "require");

const dbConnectionString = url.toString(); // Ensure the environment variable is defined
const sql = neon(dbConnectionString);

export const db = drizzle(sql, { schema });

// Projects
export const addProject = async () => {};

export const getProjects = async () => {};

export const getSingleProjectBySlug = async () => {};

// Auth
export const SyncUser = async (userInfo: schema.InsertUser) => {
  if (!userInfo) {
    throw new Error("No user info provided");
  }

  const result = await db
    .insert(users)
    .values(userInfo)
    .onConflictDoUpdate({
      target: users.external_id,
      set: {
        name: userInfo.name,
        email: userInfo.email,
        avatar_url: userInfo.avatar_url,
        updated_at: new Date(),
      },
    });

  console.log("SyncUser result:", result);
};

// Blog Posts
