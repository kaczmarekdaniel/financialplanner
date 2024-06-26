import { create } from "zustand";
import StoreState from "./types";
import { getCurrentMonth } from "./helpers/getCurrentMonth";

export const appStore = create<StoreState>()((set) => ({
	month: getCurrentMonth("timestamp"),
	setMonth: (newMonth) => set({ month: newMonth }),

	user: null,
	setUser: (newUser) => set({ user: newUser }),

	ui: {
		darkMode: false,
	},
	setUI: (newUI) => set({ ui: newUI }),
}));

export default appStore;
