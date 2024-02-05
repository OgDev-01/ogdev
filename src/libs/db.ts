import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const { users } = schema;
const dbConnectionString = process.env.NEON_DB_CONNECTION_STRING || ""; // Ensure the environment variable is defined
neonConfig.fetchConnectionCache = true; // Enable the connection cache
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

export const HelloWorld = async () => {
  const response = await sql`SELECT NOW()`;
  return response;
};

async function configureDB() {
  const dbResponse = await sql`
  CREATE TABLE IF NOT EXISTS "project" (
    "id" serial PRIMARY KEY NOT NULL,
    "user_id" serial NOT NULL,
    "title" text NOT NULL,
    "slug" text NOT NULL,
    "description" text,
    "cover_image" text NOT NULL,
    "content" text NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    "deleted_at" timestamp,
    CONSTRAINT "project_slug_unique" UNIQUE("slug")
  );
  `;
  console.log("User table created:", dbResponse);
}

configureDB().catch((err) => {
  console.error("Error configuring database", err);
});
