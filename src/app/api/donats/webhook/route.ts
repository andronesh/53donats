import { Donat } from "@/app/dto/donat";
import { saveDonats } from "@/app/service/donatsService";
import { NextRequest } from "next/server";

type DonatWebhookDto = {
	type: string;
	data: {
		account: string;
		statementItem: Donat;
	};
};

export async function GET(request: NextRequest) {
	const requestHeaders = new Headers(request.headers);
	requestHeaders.forEach((value, key) => console.info(`HEADER ${key} HAS VALUE ${value}`));
	return new Response(JSON.stringify({ message: "Give me money" }), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
}

export async function POST(request: NextRequest) {
	console.info("Mono just called webhook");
	const requestHeaders = new Headers(request.headers);
	requestHeaders.forEach((value, key) => console.info(`HEADER ${key} HAS VALUE ${value}`));
	const data = (await request.json()) as DonatWebhookDto;
	console.info("Deceived donat data", data);
	if (data.data.account === process.env.MONO_JAR_ID) {
		await saveDonats([data.data.statementItem]);
	}
	return new Response(JSON.stringify({}), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
}
