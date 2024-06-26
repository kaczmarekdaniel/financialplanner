export type Spend = {
	id: string;
	amount: number;
	name: string;
};

export type SpendingsData = {
	[key: string]: Spend[];
	// entertainment: Spend[];
	// other: Spend[];
};

export interface SpendingStore {
	data: {
		[key: string]: Spend[] | [];
	}
	setSpendings: (category: string, newSpendings: Spend[]) => void;
	updateSpendings: (category: string, newSpendings: Spend) => void;
	setAllSpendings: (newData: SpendingsData) => void;
	overWriteSpendings: (newData: SpendingsData) => void;
	nested: { count: number },
	loading: boolean;
	setLoading: (value: boolean) => void;
	removeSpending: (category: string, id: string) => void;
	swapSpendings: (category: string, id: string, newSpendings: Spend) => void;
	addCategory: (category: string) => void;

}