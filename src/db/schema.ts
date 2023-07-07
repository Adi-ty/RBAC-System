import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const application = pgTable("application", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 256 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
