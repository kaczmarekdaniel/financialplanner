
export type Spend = {
	type: string,
	amount: number,
	name: string
}

interface SpendingState {
	data: Spend[]; 
}

type SpendingStoreState = {
	food: SpendingState;
	setFood: (newSpendings: SpendingState) => void;

    entertainment: SpendingState;
	setEntertainment: (newSpendings: SpendingState) => void;

    subscriptions: SpendingState;
	setSubscriptions: (newSpendings: SpendingState) => void;

};

export default SpendingStoreState;