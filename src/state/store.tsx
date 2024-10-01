import { create } from "zustand";
import StoreState from "./types";
import { getCurrentMonth } from "./helpers/getCurrentMonth";

export const appStore = create<StoreState>()((set) => ({
	activeItem: null,
	setActiveItem: (newActiveItem) => set({ activeItem: newActiveItem }),

	month: getCurrentMonth("timestamp"),
	setMonth: (newMonth) => set({ month: newMonth }),

	offset: 0,
	setOffset: (newOffset) => set(() => {
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() + newOffset);
        return { offset: newOffset, month: currentDate.getTime() };
    }),

	user: null,
	setUser: (newUser) => set({ user: newUser }),

	ui: {
		darkMode: false,
	},
	setUI: (newUI) => set({ ui: newUI }),
	isLoading: true,
	setIsLoading: (newIsLoading) => set({ isLoading: newIsLoading }),

}));

export default appStore;
