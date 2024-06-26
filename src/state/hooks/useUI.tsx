import useStore from "../store";

export const useUI = () => {
	const darkMode = useStore((state) => state.ui.darkMode);
	const setUI = useStore((state) => state.setUI);

	const toggleDarkMode = () => {
		setUI({ darkMode: !darkMode });
		if (!darkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	};

	return { darkMode, toggleDarkMode };
};
