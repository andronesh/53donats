"use server";

import { Jar } from "@/dto/jar";
import { Donat } from "../dto/donat";

export const fetchMainJar = async (): Promise<Jar | undefined> => {
	const monoApiToken = process.env.MONO_AUTH_TOKEN!;

	const apiUrl = `https://api.monobank.ua/personal/client-info`;
	const response = await fetch(apiUrl, {
		headers: {
			"Content-Type": "application/json",
			"X-Token": monoApiToken,
		},
	});

	const data = await response.json();
	return (data.jars as Jar[]).find((jar) => jar.id === process.env.MONO_JAR_ID!);
};

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
