import { PaymentsData } from "../paymentsTypes";

type fetchPaymentsType = (
	storeHandler: (newData: PaymentsData) => void,
	loadingHandler: (isLoading: boolean) => void,
	errorHandler: (error: string) => void,
	endpoint: string,
) => void;

const fetchPayments: fetchPaymentsType = async (
	storeHandler,
	loadingHandler,
	errorHandler,
	endpoint,
) => {
	loadingHandler(true);
	fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
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

export default fetchPayments;
