import React from "react";

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

import DonutChart from "@/app/components/custom/charts/Donut";

const SummaryTile = () => {

	

	return (
		<div className="h-72 p-5 grid grid-cols-2 grid-rows-4">
			<div className="col-span-1 row-span-1 opacity-90">
				<h2 className="text-[30px] font-extrabold text-black dark:text-offwhite text-center">
					March 2024
				</h2>
			</div>
			<div className="row-start-2 row-span-3 col-span-1 flex items-center justify-center">
				<DonutChart data={data} />
			</div>
			<div className="row-start-2 row-span-3 col-span-1 py-3 pl-4 flex flex-col justify-between">
				<ul className="flex items-end justify-center flex-col">
					<li className="w-full flex flex-row  overflow-hidden justify-between items-start">
						<span className="relative m-0 p-0 font-extralight">
							Food
							<span
								className="absolute left-[calc(100%+4px)] top-4  w-screen h-[.5px] bg-black dark:bg-white opacity-40"
								aria-hidden="true"
							></span>
						</span>

						<span className="font-extrabold text-lg leading-snug bg-offwhite dark:bg-black pl-1 z-20">
							1200
						</span>
					</li>
					<li className="w-full flex flex-row  overflow-hidden justify-between items-start">
						<span className="relative m-0 p-0 font-extralight">
							Entertainment
							<span
								className="absolute left-[calc(100%+4px)] top-4  w-screen h-[.5px] bg-black dark:bg-white opacity-40"
								aria-hidden="true"
							></span>
						</span>

						<span className="font-extrabold text-lg leading-snug bg-offwhite dark:bg-black pl-1 z-20">
							120
						</span>
					</li>
					<li className="w-full flex flex-row  overflow-hidden justify-between items-start">
						<span className="relative m-0 p-0 font-extralight">
							Gas
							<span
								className="absolute left-[calc(100%+4px)] top-4  w-screen h-[.5px] bg-black dark:bg-white opacity-40"
								aria-hidden="true"
							></span>
						</span>

						<span className="font-extrabold text-lg leading-snug bg-offwhite dark:bg-black pl-1 z-10">
							450
						</span>
					</li>
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
		</div>
	);
};

export default SummaryTile;
