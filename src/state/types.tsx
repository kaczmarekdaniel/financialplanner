

interface UIState {
	darkMode: boolean; // Example of UI data
	// other UI-related state
}

type User = {
	name: string;
};


type StoreState = {
	month: number | string;
	setMonth: (newMonth: number | string) => void;
	
	user: User | null,
	setUser: (newUser: User) => void;
	ui: UIState;
	setUI: (newUI: UIState) => void;
};

export default StoreState;
