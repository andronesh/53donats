"use client";

import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import DonatDetailsCompact from "@/components/donats/DonatDetailsCompact";
import { getMainJar } from "@/db/dao/jarsDAO";
import { DonatEntity, JarEntity } from "@/db/schema";
import { getAllDonatsSanitised } from "@/service/donatsService";
import { useEffect, useState } from "react";

export default function Home() {
	const [donats, setDonats] = useState<DonatEntity[]>([]);
	const [jar, setJar] = useState<JarEntity | null>(null);

	useEffect(() => {
		getAllDonatsSanitised()
			.then((data) => setDonats(data))
			.catch((error) => window.alert(JSON.stringify(error)));
		getMainJar()
			.then((data) => setJar(data))
			.catch((error) => window.alert(JSON.stringify(error)));
	}, []);

	return (
		<div className="items-center justify-items-center min-h-screen p-4 pb-12 font-[family-name:var(--font-geist-sans)]">
			<div className="flex flex-col items-center max-w-md pb-4">
				<div className="flex flex-row justify-between w-full">
					<h3 className={"text-2xl flex flex-row w-full"}>
						<span>Зібрано </span>
						<span className="font-bold w-full pl-2">
							{jar ? (
								jar.balance.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ") + " грн."
							) : (
								<LoadingSpinner className="pl-4 max-h-8" />
							)}
						</span>
					</h3>
					<a
						className="rounded-md bg-foreground text-background px-3 py-1 font-bold"
						href="https://send.monobank.ua/jar/99j8N7T9vZ"
						target="_blank"
					>
						поповнити
					</a>
				</div>
				<h3 className={"text-xl"}>на мавіки для підрозділу БпЛА 53го ОСБ</h3>
			</div>
			<main className="flex flex-col items-center max-w-md">
				{donats.length > 0 &&
					donats.map((donat: DonatEntity) => <DonatDetailsCompact key={donat.id} donat={donat} />)}
				{donats.length === 0 && <LoadingSpinner className="w-full max-h-20" />}
			</main>
		</div>
	);
}
