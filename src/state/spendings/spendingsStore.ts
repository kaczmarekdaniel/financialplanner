import { create } from "zustand";
import { Spend, SpendingStore } from "./spendingTypes";
import { subscribeWithSelector } from "zustand/middleware";

export const spendingsStore = create<SpendingStore>()(
	subscribeWithSelector((set, get) => ({
		data: {
		},
		nested: { count: 0 },
		loading: true,
		getData: () => get().data,
		setLoading: (value: boolean) => set({ loading: value }),
		error: false,
		setError: (message: string) => set({ error: message }),
		resetError: () => set({ error: false }),
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
					[key]: [...(state.data[key] || []), newValues],
				},
			})),
		removeSpend: (id: string) =>
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
						item.id === id ? newValues : item
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
		getItemById: (id) => {
			const { data } = get();
			for (const category in data) {
				const foundSpending = data[category].find(
					(spending: Spend) => spending.id === id
				);
				if (foundSpending) return foundSpending;
			}
			return undefined; // Return undefined if not found
		},
	}))
);

// spendingsStore.subscribe(
// 	(state) => state.data,
// 	async (data) => {
// 		console.log(data);
// 	},
// );

export default spendingsStore;
