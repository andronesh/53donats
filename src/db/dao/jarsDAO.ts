"use server";

import { eq } from "drizzle-orm";
import { db } from "..";
import { JarEntity, jars } from "../schema";

export const getMainJar = async (): Promise<JarEntity | null> => {
	const result = await db.select().from(jars).where(eq(jars.bankId, process.env.MONO_JAR_ID!));
	if (result.length > 0) {
		return result[0];
	} else {
		return null;
	}
};

export const insertJarAndReturn = async (
	bankId: string,
	balance: number,
	goal: number | null,
): Promise<JarEntity> => {
	const result = await db
		.insert(jars)
		.values({
			bankId,
			balance: balance / 100,
			goal: goal ? goal / 100 : null,
		})
		.returning();
	return result[0];
};

export const updateMainJarState = async (balance: number, goal: number | null) => {
	const jarBankId = process.env.MONO_JAR_ID!;
	const dataToUpdate = goal
		? {
				balance: balance / 100,
				goal: goal / 100,
		  }
		: {
				balance: balance / 100,
		  };
	await db.update(jars).set(dataToUpdate).where(eq(jars.bankId, jarBankId));
};
