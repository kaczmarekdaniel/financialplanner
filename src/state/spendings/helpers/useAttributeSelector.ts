import {StoreApi, UseBoundStore } from "zustand";

interface DataStore<T> {
	data: T;
}

const useAttributeSelector = <T, K extends keyof T>(
	store: UseBoundStore<StoreApi<DataStore<T>>>,
	key: K
) => {
	const data = store((state) => state.data[key]);
	return data;
};

export default useAttributeSelector;
