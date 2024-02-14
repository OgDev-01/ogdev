ALTER TABLE "code_snipet" ADD COLUMN "cover_image" text NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "project_link" text NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "start_date" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "end_date" timestamp NOT NULL;