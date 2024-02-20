DROP TABLE "blog";--> statement-breakpoint
ALTER TABLE "project" ALTER COLUMN "start_date" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "project" ALTER COLUMN "end_date" SET DEFAULT now();