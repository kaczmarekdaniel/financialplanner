import appStore from "@/state/store";
import { useEffect, useState } from "react";
import { calculateDisplayValues, calculateTotal } from "../helpers/summary.ts";
import { spendingsStore } from "@/state/spendings/spendingsStore.ts";
import { paymentsStore } from "@/state/payments/paymentsStore.ts";

const SummaryList = () => {
	const [data, setData] = useState<Record<string, number>>({});
	const month = appStore((state) => state.month);
	const spendings = spendingsStore((state) => state.data);
	const payments = paymentsStore((state) => state.data);

	useEffect(() => {
		setData({ ...data, ...calculateDisplayValues(spendings, payments)});
	}, [spendings, payments]);

	useEffect(() => {
		setData({});
	}, [month]);

	return (
		<div className="row-start-2 row-span-3 col-span-1 py-3 pl-4 flex flex-col justify-between">
			<ul className="flex items-end justify-center flex-col">
				{Object.entries(data).map(([key, value]) => (
					<li
						key={key}
						className="w-full flex flex-row  overflow-hidden justify-between items-start relative gap-2"
					>
						<p className="relative m-0 p-0 font-extralight w-auto truncate bg-offwhite dark:bg-black z-10 pr-1">
							{key}
						</p>
						<span
							className="absolute top-4 w-40 h-[.5px] bg-black dark:bg-white opacity-40"
							aria-hidden="true"
						></span>
						<span className="font-extrabold text-lg leading-snug bg-offwhite dark:bg-black pl-1 z-20">
							{value}
						</span>
					</li>
				))}
			</ul>
			<div className="flex flex-row justify-between overflow-hidden items-center">
				<div className="relative m-0 p-0 font-extralight ">
					<span>Total</span>

					<span
						className="absolute left-[calc(100%+4px)] top-4  w-screen h-[.5px] bg-black dark:bg-white opacity-40"
						aria-hidden="true"
					></span>
				</div>
				<span className="font-black text-xl bg-offwhite dark:bg-black leading-snug pl-1 z-10">
					{calculateTotal(data)}
				</span>
			</div>
		</div>
	);
};

export default SummaryList;
