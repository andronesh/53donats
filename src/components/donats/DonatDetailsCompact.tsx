import { DonatEntity } from "@/db/schema";

type Props = {
	donat: DonatEntity;
};

export default function DonatDetailsCompact(props: Props) {
	return (
		<div className={`flex flex-col p-3 w-full border-b-2`}>
			<div className={`flex flex-row items-center justify-between w-full`}>
				<h3 className={"text-lg"}>
					<span className={"font-bold"}>
						{props.donat.amount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ") + " "}
					</span>
					{props.donat.descriptionAnon.replace("Від:", " грн. від ")}
				</h3>
				<span>
					{new Date(props.donat.time)
						.toLocaleString("uk", { timeStyle: "short", dateStyle: "short" })
						.replace(".24,", " о")}
				</span>
			</div>
			{props.donat.commentAnon && (
				<div className="text-mg truncate text-gray-400">коментар: {props.donat.commentAnon}</div>
			)}
		</div>
	);
}
