export const calculateTotal = (obj: { [key: string]: number }): number => {
	return Object.values(obj)
		.filter((value) => typeof value === "number" && !isNaN(value))
		.reduce((sum, value) => sum + value, 0);
};

const calculateGroupTotal = <T extends { amount: number }>(
	group: T[]
): number => {
	return group.reduce((total, item) => total + item.amount, 0);
};

export const calculateDisplayValues = <T extends { amount: number }>(
	payments: Record<string, T[]>,
	spendings: Record<string, T[]>
): Record<string, number> => {
	const displayValues: Record<string, number> = {};

	const processEntries = (data: Record<string, T[]>) => {
		for (const [key, items] of Object.entries(data)) {
			const total = calculateGroupTotal(items);
			if (displayValues[key]) {
				displayValues[key] += total;
			} else {
				displayValues[key] = total;
			}
		}
	};

	processEntries(payments);
	processEntries(spendings);

	return displayValues;
};
