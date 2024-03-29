import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { serial, text, pgTable, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("user", {
  id: serial("id").primaryKey().notNull(),
  external_id: text("external_id").notNull().unique(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  avatar_url: text("avatar_url"),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
  deleted_at: timestamp("deleted_at"),
});

export const projects = pgTable("project", {
  id: serial("id").primaryKey().notNull(),
  user_id: serial("user_id")
    .references(() => users.id)
    .notNull(),
  title: text("title").notNull(),
  project_link: text("project_link").notNull(),
  start_date: timestamp("start_date").notNull().defaultNow(),
  end_date: timestamp("end_date").notNull().defaultNow(),
  slug: text("slug").notNull().unique(),
  tags: text("tags"),
  subtitle: text("subtitle"),
  cover_image: text("cover_image").notNull(),
  content: text("content").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
  deleted_at: timestamp("deleted_at"),
});

export const codeSnipets = pgTable("code_snipet", {
  id: serial("id").primaryKey().notNull(),
  user_id: serial("user_id")
    .references(() => users.id)
    .notNull(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  cover_image: text("cover_image").notNull(),
  description: text("description"),
  code: text("code").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
  deleted_at: timestamp("deleted_at"),
});

export type InsertUser = InferInsertModel<typeof users>;
export type SelectUser = InferSelectModel<typeof users>;
export type InsertProject = InferInsertModel<typeof projects>;
