import { NextRequest } from "next/server";

// type DonatWebhookDto = {

// }

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
	const data = await request.json();
	console.info("Deceived donat data", data);
	return new Response(JSON.stringify({}), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
	// const appAuthToken = process.env.APP_AUTH_TOKEN;
	// const requestAuthToken = requestHeaders.get("X-App-Auth-Token");
	// if (appAuthToken !== undefined && appAuthToken === requestAuthToken) {
	// 	// const data = (await request.json()) as Donat;
	// 	// // TODO add validation using zod
	// 	// console.info("accepted data", data);
	// 	// console.info(
	// 	//   `      severity is ${
	// 	// 	 data.severity
	// 	//   } and known: ${VersionSeverityValues.includes(data.severity)}`
	// 	// );

	// 	return new Response(JSON.stringify({}), {
	// 		status: 200,
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 	});
	// } else {
	// 	return new Response(JSON.stringify({ message: "WHAT ARE YOU TRYING TO DO?!" }), {
	// 		status: 403,
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 	});
	// }
}
