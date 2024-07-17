import { create } from "zustand";
import { Spend, SpendingStore } from "./spendingTypes";
import { subscribeWithSelector } from "zustand/middleware";

export const spendingsStore = create<SpendingStore>()(
	subscribeWithSelector((set, get) => ({
		data: {
			food: [],
		},
		nested: { count: 0 },
		loading: true,
		getData: () => get().data,
		setLoading: (value: boolean) => set({ loading: value }),
		setSpendings: (key: string, value: Spend[]) =>
			set((state) => ({
				data: { ...state.data, [key]: value },
			})),
		overWriteSpendings: (newData) =>
			set(() => ({
				data: {
					...newData,
				},
			})),
		setAllSpendings: (newData) =>
			set((state) => ({
				data: {
					...state.data,
					...newData,
				},
			})),
		updateSpendings: (key: string, newValues: Spend) =>
			set((state) => ({
				data: {
					...state.data,
					[key]: [...(state.data[key] || []), newValues], // Append new values
				},
			})),
		removeSpending: (id: string) =>
			set((state) => {
				const newData = Object.fromEntries(
					Object.entries(state.data).map(([key, items]) => [
						key,
						items.filter((item) => item.id !== id),
					])
				);

				return {
					data: newData,
				};
			}),


		swapSpendings: (key: string, id: string, newValues: Spend) =>
			set((state) => ({
				data: {
					...state.data,
					[key]: state.data[key].map((item) =>
						item.id === id ? newValues : item,
					),
				},
			})),
		addCategory: (key: string) =>
			set((state) => ({
				data: {
					...state.data,
					[key]: [],
				},
			})),
	})),
);

// let initialChange = true;

spendingsStore.subscribe(
	(state) => state.data,
	async (data) => {

		console.log(data);
	},
);

// const fetchData = async () => {
// 	fetch(`${import.meta.env.VITE_API_URL}/spendings`, {
// 		credentials: "include",
// 	})
// 		.then((response) => {
// 			if (!response.ok) {
// 				throw new Error("An error occurred, try again later.");
// 			}
// 			return response.json();
// 		})
// 		.then((data) => {
// 			spendingsStore.getState().setAllSpendings(data);
// 			spendingsStore.getState().setLoading(false);
// 		})
// 		.catch((error: Error) => {
// 			console.error(error.message);
// 		});
// };

// fetchData();
export default spendingsStore;
