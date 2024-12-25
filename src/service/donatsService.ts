"use server";

import { findDonatByBankId, getAllDonats, insertDonatAndReturn } from "@/db/dao/donatsDAO";
import { Donat } from "../dto/donat";
import { DonatEntity } from "@/db/schema";

const allowedComments = ["Поповнення рахунку банки", "За псиланням"];

export const getAllDonatsSanitised = async (): Promise<DonatEntity[]> => {
	const donats = await getAllDonats();
	for (let i = 0; i < donats.length; i++) {
		donats[i].description = donats[i].descriptionAnon;
		if (donats[i].comment) {
			donats[i].comment = donats[i].commentAnon;
		}
	}
	return donats;
};

export const saveDonats = async (donats: Donat[]): Promise<DonatEntity[]> => {
	const savedDonats = new Array<DonatEntity>();
	for (let i = 0; i < donats.length; i++) {
		const existingDonat = await findDonatByBankId(donats[i].id);
		if (existingDonat === null) {
			const savedDonat = await insertDonatAndReturn(convertToEntityAndAnonymise(donats[i]));
			savedDonats.push(savedDonat);
			console.info(
				`Saved donat from ${savedDonat.description} for ${savedDonat.amount} with bank id ${savedDonat.bankId}`,
			);
		} else {
			console.info(`Donat  with bank id ${existingDonat.bankId} already in DB`);
			console.info(`      from ${existingDonat.description} for ${existingDonat.amount}`);
		}
	}
	return savedDonats;
};

const convertToEntityAndAnonymise = (donat: Donat): DonatEntity => {
	const entity = {
		bankId: donat.id,
		time: new Date(donat.time * 1000).valueOf(),
		description: donat.description,
		comment: donat.comment ? donat.comment : null,
		amount: donat.amount / 100,
	} as DonatEntity;
	const descriptionArray = donat.description.split(" ");
	if (descriptionArray.length > 2) {
		const descToReplace = descriptionArray[descriptionArray.length - 1].substring(2);
		entity.descriptionAnon = donat.description.replace(descToReplace, `🇺🇦🇺🇦🇺🇦`);
	} else {
		entity.descriptionAnon = donat.description;
	}
	if (donat.comment) {
		entity.commentAnon = allowedComments.includes(donat.comment)
			? donat.comment
			: donat.comment.replace(/./g, "🇺🇦");
	} else {
		entity.commentAnon = null;
	}
	return entity;
};
