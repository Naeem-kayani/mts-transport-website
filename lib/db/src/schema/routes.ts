import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const routesTable = pgTable("routes", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  fromLocation: text("from_location").notNull(),
  toLocation: text("to_location").notNull(),
  covered: text("covered").notNull().default(""),
  timing: text("timing").notNull().default(""),
  vehicle: text("vehicle").notNull(),
  category: text("category").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertRouteSchema = createInsertSchema(routesTable).omit({ id: true, createdAt: true });
export type InsertRoute = z.infer<typeof insertRouteSchema>;
export type Route = typeof routesTable.$inferSelect;
