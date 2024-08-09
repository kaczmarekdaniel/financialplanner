import { useEffect, useState } from "react";
import paymentsStore from "@/state/payments/paymentsStore";

import CategorySection from "@/app/components/custom/CategorySection/CategorySection.tsx";
import { PaymentsItem } from "@/app/LandingPage/Payments/components/PaymentsItem.tsx";
import PaymentsForm from "@/app/LandingPage/Payments/components/PaymentsForm.tsx";
import fetchData from "@/state/helpers/fetchData.ts";
import Loader from "@/app/components/custom/Loader.tsx";
import { PaymentsData } from "@/state/payments/paymentsTypes.ts";

const PaymentsTile = () => {
	const setAllPayments = paymentsStore((state) => state.setAllPayments);

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetchData<PaymentsData>(setAllPayments, setIsLoading, setError, "/payments", 0);
	}, []);

	return (
		<div className="h-72 col-span-2 p-5 grid grid-cols-3 grid-rows-4 gap-x-4">

			{isLoading && <div><Loader /></div>}
			{error && !isLoading && <p>error</p>}

			{!error && !isLoading && <CategorySection columns={3} title="Payments" storeName={"paymentsStore"} Item={PaymentsItem} Form={PaymentsForm} />}
		</div>
	);
};

export default PaymentsTile;
