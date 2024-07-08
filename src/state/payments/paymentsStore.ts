import { Payment, PaymentsStore } from "./paymentsTypes";
import { create } from "zustand";

import { subscribeWithSelector } from "zustand/middleware";

export const paymentsStore = create<PaymentsStore>()(
	subscribeWithSelector((set, get) => ({
		data: {
			test: []
		},
		isLoading: false,
		getData: () => get().data,
		nested: { count: 0 },
		setPayments: (key: string, value: Payment[]) =>
			set((state) => ({
				data: { ...state.data, [key]: value },
			})),
		setAllPayments: (data) =>
			set((state) => ({
				data: {
					...state.data,
					...data,
				},
			})),

		updatePayments: (key: string, newValues: Payment) =>
			set((state) => ({
				data: {
					...state.data,
					[key]: [...(state.data[key] || []), newValues],
				},
			})),
		addPayment: (key: string, newValues: Payment) =>
			set((state) => ({
				data: {
					...state.data,
					[key]: [...(state.data[key] || []), newValues],
				},
			})),

		updatePaid: (key: string, id: string, paid: boolean) =>
			set((state) => ({
				data: {
					...state.data,
					[key]: state.data[key].map((item) =>
						item.id === id ? { ...item, paid: paid } : item,
					),
				},
			})),
	})),
);

// paymentsStore.subscribe(
// 	(state) => state, // you could watch the whole state or just part of it
// 	(data) => {
// 		// console.log("Data changed:", data);
// 	}
// );

export default paymentsStore;
