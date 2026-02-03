CREATE TABLE "menu_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text DEFAULT '',
	"price" integer NOT NULL,
	"image_url" varchar(1024) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
