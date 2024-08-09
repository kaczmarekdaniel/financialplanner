import { Checkbox } from "@/app/components/shadcn/checkbox.tsx";
import { TrashIcon } from "@radix-ui/react-icons";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";

import { toast } from "@/components/ui/use-toast.ts";

import React from "react";
import paymentsStore from "@/state/payments/paymentsStore";

export type PaymentsItemProps = {
	id: string;
	name: string;
};

const deletePayment = (id: string, apiRemoveHandler: (id: string) => void) => {
	fetch(`${import.meta.env.VITE_API_URL}/payments/${id}`, {
		credentials: "include",
		method: "DELETE",
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error("An error occurred, try again later.");
			}
			return response.json();
		})
		.then(() => {
			apiRemoveHandler(id);
		})
		.catch(() => {
			toast({
				variant: "destructive",
				title: "Uoops! Something went wrong.",
				description: "There was a problem with your request.",
			});
		});
};

export const PaymentsItem: React.FC<PaymentsItemProps> = ({ id, name }) => {
	const removePayment = paymentsStore((store) => store.removePayment);

	return (
		<li>
			<ContextMenu>
				<ContextMenuTrigger className="flex items-center justify-start gap-2 mb-2">
					<Checkbox id={name} onCheckedChange={() => console.log(name, id)} />
					<label
						htmlFor={name}
						className="text-md font-medium leading-none opacity-85 cursor-pointer"
					>
						{name}
					</label>
				</ContextMenuTrigger>
				<ContextMenuContent>
					<ContextMenuItem
						className="cursor-pointer"
						onClick={() => console.log("test", id)}
					>
						Details
					</ContextMenuItem>
					<ContextMenuItem
						className="cursor-pointer"
						onClick={() => console.log("test")}
					>
						Edit
					</ContextMenuItem>

					<ContextMenuItem
						className="bg-red-100 hover:!bg-red-200 transition-colors duration-200 font-semibold flex justify-between cursor-pointer"
						onClick={() => deletePayment(id, removePayment)}
					>
						Remove
						<TrashIcon />
					</ContextMenuItem>
				</ContextMenuContent>
			</ContextMenu>
		</li>
	);
};
