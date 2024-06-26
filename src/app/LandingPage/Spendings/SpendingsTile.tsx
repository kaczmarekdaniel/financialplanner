import { useEffect, useState } from "react";
import SpendingsList from "./Components/SpendingsSection";
import { spendingsStore } from "@/state/spendings/spendingsStore";
import { Button } from "@/app/components/custom/button";
import fetchSpendings from "@/state/spendings/helpers/fetchData";
import Loader from "@/app/components/custom/Loader";
import CategoryForm from "./Components/CategoryForm";
import appStore from "@/state/store";

const SpendingsTile = () => {
	const overWriteSpendings = spendingsStore((state) => state.overWriteSpendings);
	const spendings = spendingsStore((state) => state.data);
	const month = appStore((state) => state.month);

	

	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetchSpendings(overWriteSpendings, setIsLoading, setError, "/spendings", month as number);
	}, [month]);

	return (
		<div className="h-72 col-span-3 row-start-2 p-5 grid grid-cols-4 grid-rows-4">
			<h2 className="col-span-3 row-span-1 text-[30px] font-extrabold text-black dark:text-offwhite text-left opacity-85">
				Spendings
			</h2>
			<CategoryForm />
			{isLoading && (
				<div className="col-span-4 row-span-4 flex items-center justify-center ">
					<Loader />
				</div>
			)}
			{error && !isLoading && (
				<div>
					{error}
					<Button
						onClick={() =>
							fetchSpendings(overWriteSpendings, setIsLoading, setError, "/spendings", month as number)
						}
					>
						reload
					</Button>
				</div>
			)}

			{!isLoading && !error && (
				<>
					{Object.keys(spendings).map((key) => {
						return <SpendingsList key={key} title={key} stateName={key} />;
					})}
					{/* <SpendingsList title={"Food"} stateName="food" />
					<SpendingsList title={"Entertainment"} stateName="entertainment" />
					<SpendingsList title={"Transport"} stateName="transport" />
					<SpendingsList title={"Other"} stateName="other" /> */}
				</>
			)}
		</div>
	);
};

export default SpendingsTile;
