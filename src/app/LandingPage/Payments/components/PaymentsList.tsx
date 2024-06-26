import React, { useState } from "react";
import { Payment } from "@/state/payments/paymentsTypes";
import { Cross1Icon, PlusIcon } from "@radix-ui/react-icons";
import PaymentsForm from "./PaymentsForm";
import { PaymentsItem } from "@/app/LandingPage/Payments/components/PaymentsItem.tsx";

type PaymentsList = {
	data: Payment[];
	title: string;
};

const PaymentsList: React.FC<PaymentsList> = ({ data, title }) => {
	const [formOpen, setFormOpen] = useState(false);
	return (
		<>
			<div className="flex flex-row items-center justify-between">
				<h3 className="font-bold text-xl opacity-85"> {title}</h3>
				<button type="button" onClick={() => setFormOpen(!formOpen)}>
					{formOpen ? <Cross1Icon /> : <PlusIcon />}
				</button>
			</div>
			{formOpen ? (
				<PaymentsForm stateName="payments" setFormOpen={setFormOpen} />
			) : (
				<>
					<ul className="flex items-start justify-start flex-col gap-2">
						{data.map((result, i) => (
							<PaymentsItem result={result} key={i} />
						))}
					</ul>
				</>
			)}
		</>
	);
};

export default PaymentsList;
