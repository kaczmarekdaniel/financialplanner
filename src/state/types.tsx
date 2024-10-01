

interface UIState {
	darkMode: boolean; // Example of UI data
	// other UI-related state
}

type User = {
	name: string;
};


type StoreState = {
	activeItem: {storeName: string, id: string} | null;
	setActiveItem: (newActiveItem: {storeName: string, id: string} | null) => void;

	month: number | string;
	setMonth: (newMonth: number | string) => void;

	offset: number;
	setOffset: (newOffset: number) => void;
	
	user: User | null,
	setUser: (newUser: User) => void;
	ui: UIState;
	setUI: (newUI: UIState) => void;
	isLoading: boolean;
	setIsLoading: (newIsLoading: boolean) => void;
};

export default StoreState;
