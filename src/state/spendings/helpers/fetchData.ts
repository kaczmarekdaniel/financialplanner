import { SpendingsData } from "../spendingTypes";

type fetchSpendingsType = (
	storeHandler: (data: SpendingsData) => void,
	loadingHandler: (isLoading: boolean) => void,
	errorHandler: (error: string) => void,
	endpoint: string,
	month: number,
) => void;

const fetchSpendings: fetchSpendingsType = async (
	storeHandler,
	loadingHandler,
	errorHandler,
	endpoint,
	month,
) => {
	loadingHandler(true);
	fetch(`${import.meta.env.VITE_API_URL}${endpoint}?month=${month}`, {
		credentials: "include",
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error("An error occurred, try again later.");
			}
			return response.json();
		})
		.then((data) => {
			storeHandler(data);
			loadingHandler(false);
		})
		.catch((error: Error) => {
			loadingHandler(false);

			errorHandler(error.message);
		});
};

export default fetchSpendings;
