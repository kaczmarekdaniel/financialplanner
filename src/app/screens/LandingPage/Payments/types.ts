export type PaymentsFormProps = {
	stateName: string;
	setFormOpen: (value: boolean) => void;
};

export  type Step1Data = {
	amount: number;
	name: string;
};

export type Step2Data = {
	startDate: number;
	endDate: number;
};