import { getAllDonatsSanitised } from "@/app/service/donatsService";

export async function GET() {
	const donats = await getAllDonatsSanitised();
	return new Response(JSON.stringify(donats), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
}

export const dynamic = "force-dynamic";
