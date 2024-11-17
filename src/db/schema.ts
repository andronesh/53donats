import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";

export type DonatEntity = typeof donats.$inferSelect;

export const donats = sqliteTable("donats", {
	id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
	bankId: text("bank_id").notNull().unique(),
	time: integer("time", { mode: "number" }).notNull(),
	description: text("description").notNull(),
	descriptionAnon: text("description_anon").notNull(),
	comment: text("comment"),
	commentAnon: text("comment_anon"),
	amount: integer("amount", { mode: "number" }).notNull(),
});
