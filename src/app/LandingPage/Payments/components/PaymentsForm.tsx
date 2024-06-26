import React, { useEffect, useState } from "react";


import Step01 from "./FormSteps/Step01";
import Step02 from "./FormSteps/Step02";

type PaymentsFormProps = {
	stateName: string;
	setFormOpen: (value: boolean) => void;
};

type Step1Data = {
	amount: number;
	name: string;
};

type Step2Data = {
	startDate: number;
	endDate: number;
};

const PaymentsForm: React.FC<PaymentsFormProps> = ({ setFormOpen }) => {
	const [step, setStep] = useState(1);
	const [step1Data, setStep1Data] = useState<Step1Data>({ amount: 0, name: "" });
	const [step2Data, setStep2Data] = useState<Step2Data>({ startDate: 0, endDate: 0 });

	const submitForm = () => {
		console.log(step1Data, step2Data);
		setFormOpen(false);
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


};

export default PaymentsForm;
