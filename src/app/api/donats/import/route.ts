import { getDonatsFromJar } from "@/app/service/bankaApi";
import { saveDonats } from "@/app/service/donatsService";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const requestHeaders = new Headers(request.headers);
	const appAuthToken = process.env.APP_AUTH_TOKEN;
	const requestAuthToken = requestHeaders.get("X-App-Auth-Token");
	if (appAuthToken !== undefined && appAuthToken === requestAuthToken) {
		const donats = await getDonatsFromJar();

		const savedDonats = await saveDonats(donats);
		console.info(`Imported ${saveDonats.length} donat${saveDonats.length === 1 ? "" : "s"}`);
		return new Response(JSON.stringify(savedDonats), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} else {
		return new Response(JSON.stringify({ message: "WHAT ARE YOU TRYING TO DO?!" }), {
			status: 403,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
}
