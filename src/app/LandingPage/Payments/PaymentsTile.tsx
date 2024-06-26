import { useEffect, useState } from "react";
import paymentsStore from "@/state/payments/paymentsStore";
import { Button } from "@/app/components/shadcn/button";
import PaymentsSection from "./components/PaymentsSection";
import fetchPayments from "@/state/payments/helpers/fetchPayments.ts";

const PaymentsTile = () => {
	const setAllPayments = paymentsStore((state) => state.setAllPayments);
	const data = paymentsStore((state) => state.data);

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetchPayments(setAllPayments, setIsLoading, setError, "/payments");
	}, []);

	useEffect(() => {
	}, [isLoading]);

	return (
		<div className="h-72 col-span-2 p-5 grid grid-cols-3 grid-rows-4 gap-x-4">
			<h2
				className="col-span-4 row-span-1 text-[30px] font-extrabold text-black dark:text-offwhite text-left opacity-85">
				Payments
			</h2>

			{isLoading && <div>Loading...</div>}
			{error && !isLoading && (
				<div>
					{error}{" "}
					<Button
						onClick={() =>
							fetchPayments(setAllPayments, setIsLoading, setError, "/payments")
						}
					>
						reload
					</Button>
				</div>
			)}

			{!isLoading && !error && (
				<>
					{Object.keys(data).map((key) => {
						return <PaymentsSection key={key} title={key} />;
					})}
				</>
			)}
		</div>
	);
};

export default PaymentsTile;
