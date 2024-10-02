import { useEffect, useState } from "react";
import paymentsStore from "@/state/payments/paymentsStore.ts";

import Step01 from "./FormSteps/Step01";
import Step02 from "./FormSteps/Step02";

import { Step1Data, Step2Data, PaymentsFormProps } from "../types";

export const PaymentsForm = ({
	setFormOpen,
	stateName,
}: PaymentsFormProps): JSX.Element => {
	const addPayment = paymentsStore((state) => state.addPayment);

	const [step, setStep] = useState(1);
	const [step1Data, setStep1Data] = useState<Step1Data>({
		amount: 0,
		name: "",
	});
	const [step2Data, setStep2Data] = useState<Step2Data>({
		startDate: 0,
		endDate: 0,
	});

	const submitForm = () => {
		const itemID = Math.random().toString();
		const formData = { ...step1Data, ...step2Data };
		addPayment(stateName, { ...formData, paid: false, id: itemID });
		setFormOpen(false);

		fetch("http://localhost:3000/payments", {
			credentials: "include",
			method: "POST",
			body: JSON.stringify({
				name: formData.name,
				amount: formData.amount,
				startDate: formData.startDate,
				endDate: formData.endDate,
				category: stateName,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("An error occurred, try again later.");
				}
				return response.json();
			})

			.catch((error: Error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		if (step === 3) {
			submitForm();
		}
	}, [step]);

	if (step === 1) {
		return (
			<Step01
				gotoNextStep={() => setStep(2)}
				setStep1Data={setStep1Data}
				step1Data={step1Data}
			/>
		);
	}

	if (step === 2) {
		return (
			<Step02
				setStep2Data={setStep2Data}
				goBack={() => setStep(1)}
				submitForm={() => setStep(3)}
				step2Data={step2Data}
			/>
		);
	}

	return <></>;
};
