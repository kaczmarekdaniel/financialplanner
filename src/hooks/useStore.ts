import spendingsStore from "@/state/spendings/spendingsStore";
import { StoreApi, UseBoundStore } from "zustand";
import { SpendingStore } from "@/state/spendings/spendingTypes.ts";
import paymentsStore from "@/state/payments/paymentsStore.ts";
import {PaymentsStore} from "@/state/payments/paymentsTypes.ts";

type StoreState = SpendingStore | PaymentsStore;

const useSpendingsStore = spendingsStore as UseBoundStore<StoreApi<SpendingStore>>;
const usePaymentsStore = paymentsStore as UseBoundStore<StoreApi<PaymentsStore>>;

const stores: Record<string, UseBoundStore<StoreApi<StoreState>>> = {
	spendingsStore: useSpendingsStore,
	paymentsStore: usePaymentsStore,
};

export const useStore = (storeName: string): UseBoundStore<StoreApi<StoreState>> => {
	if (!stores[storeName]) {
		throw new Error(`Store ${storeName} is not defined`);
	}

	return stores[storeName];
};
