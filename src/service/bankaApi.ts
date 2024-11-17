"use server";

import { Donat } from "../dto/donat";

export const getDonatsFromJar = async (): Promise<Donat[]> => {
	const to = Math.floor(Date.now() / 1000);
	const from = to - 2592000;
	const monoApiToken = process.env.MONO_AUTH_TOKEN!;
	const jarId = process.env.MONO_JAR_ID!;

	const apiUrl = `https://api.monobank.ua/personal/statement/${jarId}/${from}/${to}`;
	const data = await fetch(apiUrl, {
		headers: {
			"Content-Type": "application/json",
			"X-Token": monoApiToken,
		},
	});

	const donats = await data.json();
	console.info(`Fetched ${donats.length} donat${donats.length > 1 ? "s" : ""} from Mono jar`);
	return donats;
};
