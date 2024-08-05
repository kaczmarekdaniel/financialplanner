import DonutChart from "@/app/components/custom/charts/Donut.tsx";
import SummaryList from "@/app/LandingPage/Summary/components/SummaryList.tsx";
import { spendingsStore } from "@/state/spendings/spendingsStore.ts";
import {paymentsStore} from "@/state/payments/paymentsStore.ts"
import { useEffect } from "react";


const data = {
	labels: ["Red", "Blue", "Yellow", "Green"],
	datasets: [
		{
			data: [300, 50, 100, 50],
			backgroundColor: [
				"rgba(255, 99, 132, 0.6)",
				"rgba(54, 162, 235, 0.6)",
				"rgba(255, 206, 86, 0.6)",
				"rgba(75, 192, 192, 0.6)",
			],
			borderColor: [
				"rgba(255, 99, 132, 1)",
				"rgba(54, 162, 235, 1)",
				"rgba(255, 206, 86, 1)",
				"rgba(75, 192, 192, 1)",
			],
			borderWidth: 1,
		},
	],
};




const Summary = () => {
	const spendings = spendingsStore((state) => state.data);
	const payments = paymentsStore((state) => state.data);


	return (
		<div className="h-72 p-5 grid grid-cols-2 grid-rows-4">
			<div className="col-span-2 row-span-1 opacity-80 ">
				<h2 className="text-[30px] font-extrabold text-black dark:text-offwhite">
					September 2024
				</h2>
			</div>
			<div className="row-start-2 row-span-3 col-span-1 flex items-center justify-center">
				<DonutChart data={data} />
			</div>
			<SummaryList payments={payments} spendings={spendings} />
		</div>
	);
};

export default Summary;