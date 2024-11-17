import { getDonatsFromJar } from "@/app/service/bankaApi";
import { saveDonats } from "@/app/service/donatsService";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	let donats = await getDonatsFromJar();

	const savedDonats = await saveDonats(donats);
	console.info(`Imported ${saveDonats.length} donat${saveDonats.length === 1 ? "" : "s"}`);
	return new Response(JSON.stringify(savedDonats), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
}
