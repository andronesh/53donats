"use client";

import DonatDetailsCompact from "@/components/donats/DonatDetailsCompact";
import { DonatEntity } from "@/db/schema";
import { getAllDonatsSanitised } from "@/service/donatsService";
import { useEffect, useState } from "react";

export default function Home() {
	const [donats, setDonats] = useState<DonatEntity[]>([]);

	useEffect(() => {
		getAllDonatsSanitised()
			.then((data) => setDonats(data))
			.catch((error) => window.alert(JSON.stringify(error)));
	}, []);

	return (
		<div className="items-center justify-items-center min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col items-center max-w-md">
				{donats && donats.map((donat: DonatEntity) => <DonatDetailsCompact key={donat.id} donat={donat} />)}
			</main>
		</div>
	);
}
