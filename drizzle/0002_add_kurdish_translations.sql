-- Add Kurdish translation columns to menu_items table
ALTER TABLE "menu_items" ADD COLUMN "title_kurdish" varchar(255) DEFAULT '';
ALTER TABLE "menu_items" ADD COLUMN "description_kurdish" text DEFAULT '';
