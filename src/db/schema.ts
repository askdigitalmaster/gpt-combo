import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const contentOutputs = pgTable("content_outputs", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: varchar("user_id", { length: 256 }).notNull(),
  userInput: text("user_input").notNull(),
  gptOutput: text("gpt_output"),
  grokOutput: text("grok_output"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
