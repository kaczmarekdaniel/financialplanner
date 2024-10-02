/* eslint-disable indent */


import { useUI } from "@/state/hooks/useUI";

export const buttonHandler = (actionType: string) => {
	const { toggleDarkMode } = useUI();
	switch (actionType) {
		case "dark_mode":
			return toggleDarkMode;
		case "settings":
			return function () {
				alert("2");
			};
		default:
			return function () {
				// default action or throw error
			};
	}
};
