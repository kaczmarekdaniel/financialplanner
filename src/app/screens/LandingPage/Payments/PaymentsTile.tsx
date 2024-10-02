import { useEffect, useState } from "react";
import paymentsStore from "@/state/payments/paymentsStore";

import CategorySection from "@/app/components/custom/CategorySection/CategorySection.tsx";
import { PaymentsItem } from "@/app/screens/LandingPage/Payments/components/PaymentsItem";
import { PaymentsForm } from "@/app/screens/LandingPage/Payments/components/PaymentsForm";
import fetchData from "@/state/helpers/fetchData.ts";
import { PaymentsData } from "@/state/payments/paymentsTypes.ts";
import appStore from "@/state/store";

export const PaymentsTile = () => {
	const overridePayments = paymentsStore((state) => state.overridePayments);
	const month = appStore((state) => state.month);

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetchData<PaymentsData>(
			overridePayments,
			setIsLoading,
			setError,
			"/payments",
			month as number
		);
	}, [month]);

	return (
		<div className="h-72 col-span-2 p-5 grid grid-cols-3 grid-rows-4 gap-x-4">
			{!error && (
				<CategorySection
					contentIsLoading={isLoading}
					columns={3}
					title="Payments"
					storeName={"paymentsStore"}
					Item={PaymentsItem}
					Form={PaymentsForm}
				/>
			)}
		</div>
	);
};
