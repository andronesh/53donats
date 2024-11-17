import { getMainJar, insertJarAndReturn, updateMainJarState } from "@/db/dao/jarsDAO";
import { fetchMainJar } from "@/service/bankaApi";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const requestHeaders = new Headers(request.headers);
	const appAuthToken = process.env.APP_AUTH_TOKEN;
	const requestAuthToken = requestHeaders.get("X-App-Auth-Token");
	if (appAuthToken === undefined || appAuthToken !== requestAuthToken) {
		return new Response(JSON.stringify({ message: "WHAT ARE YOU TRYING TO DO?!" }), {
			status: 403,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

	const mainJar = await fetchMainJar();
	if (mainJar === undefined) {
		console.error(`Couldn't find jar with id ${process.env.MONO_JAR_ID}`);
		return new Response(JSON.stringify({ message: "Couldn't find jar" }), {
			status: 404,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

	let existingJar = await getMainJar();
	if (existingJar) {
		await updateMainJarState(mainJar.balance, mainJar.goal);
	} else {
		await insertJarAndReturn(mainJar.id, mainJar.balance, mainJar.goal);
	}
	existingJar = await getMainJar();
	return new Response(JSON.stringify(existingJar), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
}
