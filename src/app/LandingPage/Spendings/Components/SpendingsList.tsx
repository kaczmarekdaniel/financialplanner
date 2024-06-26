import React from "react";
import { Spend } from "@/state/spendings/spendingTypes";

import spendingsStore from "@/state/spendings/spendingsStore";
import { useToast } from "@/components/ui/use-toast";

import ListItem from "./ListItem";

type SpendingsListProps = {
	data: Spend[];
	stateName: string;
};

const SpendingsList: React.FC<SpendingsListProps> = ({ data, stateName }) => {
	const removeSpendFromState = spendingsStore((state) => state.removeSpending);

	const { toast } = useToast();

	if (!data || data.length === 0) {
		return;
	}

	const removeSpend = (id: string, callback: (value: boolean) => void) => {
		callback(false);

		fetch(`http://localhost:3000/spendings/${id}`, {
			credentials: "include", // Ensuring cookies are sent with the request
			method: "DELETE",
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("An error occurred, try again later.");
				}
			})
			.then(() => {
				removeSpendFromState(stateName, id);
			})
			.catch((error: Error) => {
				// targetElement.classList.remove("hidden");
				callback(true);

				toast({
					variant: "destructive",
					title: "Uoops! Something went wrong.",
					description: "There was a problem with your request.",
				});
				console.log(error);
			});
	};

	return (
		<ul>
			{data.map((result, i) => {
				return <ListItem result={result} removeSpend={removeSpend} key={i}  />;
			})}
		</ul>
	);
};

export default SpendingsList;
