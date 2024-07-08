
type fetchDataType = <T>(
	storeHandler: (data: T) => void,
	loadingHandler: (isLoading: boolean) => void,
	errorHandler: (error: string) => void,
	endpoint: string,
	month: number,
) => void;

const fetchData: fetchDataType = async <T>(
	storeHandler: (data: T) => void,
	loadingHandler: (isLoading: boolean) => void,
	errorHandler: (error: string) => void,
	endpoint: string,
	month: number,
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
		.then((data: T) => {
			storeHandler(data);
			loadingHandler(false);
		})
		.catch((error: Error) => {
			loadingHandler(false);
			errorHandler(error.message);
		});
};

export default fetchData;
