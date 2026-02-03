import { integer, pgTable, serial, text, timestamp, varchar, json } from "drizzle-orm/pg-core";

export const menuItems = pgTable("menu_items", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  titleKurdish: varchar("title_kurdish", { length: 255 }).default(""),
  description: text("description").default(""),
  descriptionKurdish: text("description_kurdish").default(""),
  category: varchar("category", { length: 50 }).default("coffee").notNull(),
  price: integer("price").notNull(),
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type MenuItem = typeof menuItems.$inferSelect;
export type NewMenuItem = typeof menuItems.$inferInsert;
