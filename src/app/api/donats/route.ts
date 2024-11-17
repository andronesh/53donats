import { getAllDonatsSanitised } from "@/app/service/donatsService";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	let donats = await getAllDonatsSanitised();
	return new Response(JSON.stringify(donats), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
}
