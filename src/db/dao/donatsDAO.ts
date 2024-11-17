"use server";

import { eq, desc } from "drizzle-orm";
import { db } from "..";
import { DonatEntity, donats } from "../schema";

export const findDonatByBankId = async (bankId: string): Promise<DonatEntity | null> => {
	const result = await db.select().from(donats).where(eq(donats.bankId, bankId));

	return result.length > 0 ? result[0] : null;
};

export const getAllDonats = async (): Promise<DonatEntity[]> => {
	return await db.select().from(donats).orderBy(desc(donats.time));
};

export const insertDonatAndReturn = async (entity: DonatEntity): Promise<DonatEntity> => {
	const result = await db.insert(donats).values(entity).returning();
	return result[0];
};
