import { PaymentsData } from "@/state/payments/paymentsTypes.ts";
import { SpendingsData } from "@/state/spendings/spendingTypes.ts";
import React, { useEffect, useState } from "react";

type Props = {
	payments: PaymentsData;
	spendings: SpendingsData;
}

const calculateGroupTotal = <T extends { amount: number }>(group: T[]): number => {
	return group.reduce((total, item) => total + item.amount, 0);
};

const calculateDisplayValues = <T extends { amount: number }>(
	data: Record<string, T[]>,
): Record<string, number> => {
	const displayValues: Record<string, number> = {};

	Object.entries(data).forEach(([key, items]) => {
		displayValues[key] = calculateGroupTotal(items);
	});

	return displayValues;
};

const SummaryList: React.FC<Props> = ({ payments, spendings }) => {
	const [data, setData] = useState<Record<string, number>>({});

	useEffect(() => {
		setData({ ...data, ...calculateDisplayValues(spendings) });
	}, [spendings]);

	useEffect(() => {
		setData({ ...data, ...calculateDisplayValues(payments) });
	}, [payments]);



	return (
		<div className="row-start-2 row-span-3 col-span-1 py-3 pl-4 flex flex-col justify-between">
			<ul className="flex items-end justify-center flex-col">

				{Object.entries(data).map(([key, value]) => (
					<li key={key} className="w-full flex flex-row  overflow-hidden justify-between items-start relative gap-2">
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

				{/*<li className="w-full flex flex-row  overflow-hidden justify-between items-start">*/}
				{/*		<span className="relative m-0 p-0 font-extralight">*/}
				{/*			Entertainment*/}
				{/*			<span*/}
				{/*				className="absolute left-[calc(100%+4px)] top-4  w-screen h-[.5px] bg-black dark:bg-white opacity-40"*/}
				{/*				aria-hidden="true"*/}
				{/*			></span>*/}
				{/*		</span>*/}

				{/*	<span className="font-extrabold text-lg leading-snug bg-offwhite dark:bg-black pl-1 z-20">*/}
				{/*			120*/}
				{/*		</span>*/}
				{/*</li>*/}
				{/*<li className="w-full flex flex-row  overflow-hidden justify-between items-start">*/}
				{/*		<span className="relative m-0 p-0 font-extralight">*/}
				{/*			Gas*/}
				{/*			<span*/}
				{/*				className="absolute left-[calc(100%+4px)] top-4  w-screen h-[.5px] bg-black dark:bg-white opacity-40"*/}
				{/*				aria-hidden="true"*/}
				{/*			></span>*/}
				{/*		</span>*/}

				{/*	<span className="font-extrabold text-lg leading-snug bg-offwhite dark:bg-black pl-1 z-10">*/}
				{/*			450*/}
				{/*		</span>*/}
				{/*</li>*/}
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
						1770
					</span>
			</div>
		</div>

	);
};

export default SummaryList;