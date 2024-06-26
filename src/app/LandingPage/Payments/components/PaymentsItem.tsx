import { Checkbox } from "@/app/components/shadcn/checkbox.tsx";
import React from "react";

type PaymentsItemProps = {
	result: {
		name: string
	}
}

export const PaymentsItem: React.FC<PaymentsItemProps> = ({ result }) => {

		// function onSubmit(values: z.infer<typeof formSchema>) {
		// 	const itemID = Math.random().toString();
		//
		// 	updateSpendings(stateName, { ...values, id: itemID });
		// 	setFormOpen(false);
		//
		// 	fetch("http://localhost:3000/spendings", {
		// 		credentials: "include", // Ensuring cookies are sent with the request
		// 		method: "POST",
		// 		body: JSON.stringify({
		// 			name: values.name,
		// 			amount: values.amount,
		// 			category: stateName,
		// 		}), // Correctly stringify the body
		// 		headers: {
		// 			"Content-Type": "application/json",
		// 		},
		// 	})
		// 		.then((response) => {
		// 			if (!response.ok) {
		// 				throw new Error("An error occurred, try again later.");
		// 			}
		// 			return response.json();
		// 		})
		// 		.then((data) => {
		// 			console.log(data);
		// 			swapSpendings(stateName, itemID, { ...data.data });
		// 		})
		// 		.catch((error: Error) => {
		// 			removeSpending(stateName, itemID);
		// 			toast({
		// 				variant: "destructive",
		// 				title: "Uoops! Something went wrong.",
		// 				description: "There was a problem with your request.",
		// 			});
		// 			console.log(error);
		// 		});
		// }

		return (
			<li className="flex items-center justify-start gap-2">
				<Checkbox id={result.name} onCheckedChange={() => console.log(result.name)} />
				<label
					htmlFor={result.name}
					className="text-sm font-medium leading-none opacity-75 cursor-pointer"
				>
					{result.name}
				</label>
			</li>
		);
	}
;