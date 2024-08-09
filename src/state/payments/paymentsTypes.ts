import { SpendingsData } from "@/state/spendings/spendingTypes.ts";

export type Payment = {
	id: string;
	amount: number;
	name: string;
	paid: boolean;
};

export type PaymentsData = {
	[key: string]: Payment[];
};

export interface PaymentsStore {
	data: {
		[key: string]: Payment[] | [];
	} ;
	setPayments: (category: string, newSpendings: Payment[]) => void;
	setAllPayments: (newData: PaymentsData) => void;
	updatePayments: (category: string, newSpendings: Payment) => void;
	addPayment: (category: string, newSpendings: Payment) => void;
	updatePaid: (category: string, id: string, paid: boolean) => void;
	nested: { count: number };
	getData: () => SpendingsData;
	addCategory: (category: string) => void;
	removePayment: (id: string) => void;
}
