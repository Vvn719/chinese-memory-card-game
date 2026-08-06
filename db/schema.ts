import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const units = sqliteTable("units", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull().default(""),
  icon: text("icon").notNull().default("📚"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const words = sqliteTable("words", {
  id: text("id").primaryKey(),
  unitId: text("unit_id").notNull().references(() => units.id, { onDelete: "cascade" }),
  word: text("word").notNull(),
  zhuyin: text("zhuyin").notNull(),
  khmer: text("khmer").notNull().default(""),
  imageUrl: text("image_url"),
  emoji: text("emoji"),
  color: text("color").notNull().default("coral"),
  sortOrder: integer("sort_order").notNull().default(0),
});
