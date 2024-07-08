import { useEffect, useState } from "react";
import { spendingsStore } from "@/state/spendings/spendingsStore";
import Loader from "@/app/components/custom/Loader";
import appStore from "@/state/store";
import CategorySection from "@/app/components/custom/CategorySection/CategorySection.tsx";

import SpendingsItem from "@/app/LandingPage/Spendings/Components/SpendingsItem.tsx";
import SpendingsForm from "@/app/LandingPage/Spendings/Components/SpendingsForm.tsx";
import fetchData from "@/state/helpers/fetchData.ts";

const SpendingsTile = () => {
	const overWriteSpendings = spendingsStore((state) => state.overWriteSpendings);
	const month = appStore((state) => state.month);

	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetchData(overWriteSpendings, setIsLoading, setError, "/spendings", month as number);
	}, [month]);

	return (
		<div className="h-72 col-span-3 row-start-2 p-5 grid grid-cols-4 grid-rows-4">
			{isLoading && <Loader />}
			{error && <p>error</p>}
			{!isLoading && !error &&
				<CategorySection title="Spendings" storeName={"spendingsStore"} Item={SpendingsItem} Form={SpendingsForm} />}
		</div>
	);


};

export default SpendingsTile;
