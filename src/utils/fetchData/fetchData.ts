import { toast } from "@/components/ui/use-toast";
import spendingsStore from "@/state/spendings/spendingsStore";
import appStore from "@/state/store";
import { SpendEntity } from "@/state/spendings/types";

type SpendDTO = {
	id: string;
	amount: number;
	name: string;
};

// const spendFromDTO = ({ id, amount, name }: SpendDTO): Spend => ({
// 	id,
// 	amount,
// 	name,
// });

// const spendToDTO = ({ id, amount, name }: Spend ): SpendDTO => ({
// 	id,
// 	amount,
// 	name,
// });

export type SpendingsDataDTO = {
	[key: string]: SpendDTO[];
};

type SpendingsData = {
	[key: string]: Pick<SpendEntity, "id" | "amount" | "name">[];
};

const spendingsDataFromDTO = (data: SpendingsDataDTO): SpendingsData => {
	return { ...data };
};

enum HttpMethod {
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
	DELETE = "DELETE",
}

class ApiError extends Error {
	public code: number;

	constructor(code: number, message: string) {
		super(message);
		this.code = code;
		this.name = "ApiError";
		Object.setPrototypeOf(this, ApiError.prototype);
	}
}

class BaseHttpService {
	protected async callApi<T>(method: HttpMethod, url: string): Promise<T> {
		const response = await fetch(url, {
			credentials: "include",
			method: method,
		});

		if (!response.ok) {
			throw new ApiError(response.status, response.statusText);
		}

		const data: T = await response.json();
		return data;
	}
}

export class SpendingsService extends BaseHttpService {
	private serverUrl: string;
	private unsubscribe: (() => void) | null = null;
	private spendingsStore = spendingsStore.getState();
	private errorService: errorService;

	constructor(errorService: errorService) {
		super();
		this.serverUrl = import.meta.env.VITE_API_URL as string;
		this.errorService = errorService;
	}

	subscribeToSpendings() {
		this.unsubscribe = appStore.subscribe(({ month }) => {
			this.getSpendings(month);
		});
	}

	unsubscribeFromSpendings(): void {
		if (!this.unsubscribe) return;

		this.unsubscribe();
		this.unsubscribe = null;
	}

	private handleStoreError(error: unknown): void {
		const errorMessage =
			error instanceof ApiError ? error.message : "Unknown error occurred";
		this.spendingsStore.setError(errorMessage);
	}

	async getSpendings(month: number): Promise<void> {
		if (!this.spendingsStore.data) this.spendingsStore.setLoading(true);

		try {
			const responseDTO = await this.callApi<SpendingsDataDTO>(
				HttpMethod.GET,
				`${this.serverUrl}/spendings?month=${month}`
			);
			console.log("data fetch");
			const response = spendingsDataFromDTO(responseDTO);

			this.spendingsStore.overWriteSpendings(response);
		} catch (error) {
			this.handleStoreError(error);
			this.errorService.error(error);
		} finally {
			this.spendingsStore.setLoading(false);
		}
	}

	async removeSpend(id: string): Promise<void> {
		try {
			await this.callApi<{ id: string }>(
				HttpMethod.DELETE,
				`${this.serverUrl}/spendingsss/${id}`
			);

			this.spendingsStore.removeSpend(id);
		} catch (e: unknown) {
			this.errorService.error(e);
			throw e;
		}
	}
}

export class errorService {
	error(error: unknown) {
		let title = "Uoops! Something went wrong.";
		let description = "There was a problem with your request.";

		if (error instanceof ApiError) {
			switch (error.code) {
				case 404:
					title = "Not Found";
					description = "The resource you requested could not be found.";
					break;
				case 500:
					title = "Server Error";
					description =
						"The server encountered an issue. Please try again later.";
					break;
				case 401:
					title = "Unauthorized";
					description = "You are not authorized to access this resource.";
					break;
				default:
					description = error.message || "An unexpected error occurred.";
			}
		} else {
			description = "An unexpected error occurred.";
		}

		toast({
			variant: "destructive",
			title,
			description,
		});
	}
}

// export class SpendingsStoreService {
// 	private serverUrl: string;
// 	private unsubscribe: (() => void) | null = null;
// 	private spendingsStore = spendingsStore.getState();

// 	constructor() {
// 		super();
// 		this.serverUrl = import.meta.env.VITE_API_URL as string;
// 	}

// 	subscribeSpendings() {
// 		this.unsubscribe = appStore.subscribe(({ month }) => {
// 			this.getSpendings(month);
// 		});
// 	}

// 	unsubscribeSpendings(): void {
// 		if (!this.unsubscribe) return;

// 		this.unsubscribe();
// 		this.unsubscribe = null;
// 	}

// }
