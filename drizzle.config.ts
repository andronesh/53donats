import { defineConfig } from "drizzle-kit";

export default defineConfig({
	out: "./src/db/drizzle_migrations",
	schema: "./src/db/schema.ts",
	dialect: "turso",
	dbCredentials: {
		url: process.env.DATABASE_URL!,
		authToken: process.env.DATABASE_AUTH_TOKEN!,
	},
});
