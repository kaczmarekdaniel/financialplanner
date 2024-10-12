import CategorySection from "@/app/components/custom/CategorySection/CategorySection.tsx";
import appStore from "@/state/store";
import { useEffect } from "react";

import SpendingsForm from "@/app/screens/LandingPage/Spendings/Components/SpendingsForm";
import SpendingsItem from "@/app/screens/LandingPage/Spendings/Components/SpendingsItem";
import spendingsStore from "@/state/spendings/spendingsStore";

export const SpendingsTile = () => {
	const { spendingsService } = appStore();
	const { loading, error } = spendingsStore();

	useEffect(() => {
		spendingsService.subscribeToSpendings();

		return () => {
			spendingsService.unsubscribeFromSpendings();
		};
	}, []);

	return (
		<div className="h-72 col-span-3 row-start-2 p-5 grid grid-cols-4 grid-rows-4">
			{error && <p>error</p>}
			{!error && (
				<CategorySection
					columns={4}
					contentIsLoading={loading}
					title="Spendings"
					storeName={"spendingsStore"}
					Item={SpendingsItem}
					Form={SpendingsForm}
				/>
			)}
		</div>
	);
};
