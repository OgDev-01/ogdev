import { serial, text, pgTable, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("user", {
  id: serial("id").primaryKey().notNull(),
  external_id: text("external_id").notNull().unique(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
  deleted_at: timestamp("deleted_at"),
});

export const projects = pgTable("project", {
  id: serial("id").primaryKey().notNull(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  cover_image: text("cover_image").notNull(),
  content: text("content").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
  deleted_at: timestamp("deleted_at"),
});
