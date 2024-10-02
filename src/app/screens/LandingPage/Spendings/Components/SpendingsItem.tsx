import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";

import { TrashIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast.ts";
import appStore from "@/state/store";
import { motion } from "framer-motion";

type ListItemProps = {
	name: string;
	amount: number;
	id: string;
};

const SpendingsItem = ({ name, amount, id }: ListItemProps): JSX.Element => {
	const [hidden, setHidden] = useState(false);
	const setActiveItem = appStore((store) => store.setActiveItem);

	const removeSpend = (id: string) => {
		setHidden(true);
		fetch(`${import.meta.env.VITE_API_URL}/spendings/${id}`, {
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
				removeSpend(id);
			})
			.catch(() => {
				toast({
					variant: "destructive",
					title: "Uoops! Something went wrong.",
					description: "There was a problem with your request.",
				});
				setHidden(false);
			});
	};

	if (hidden) return <></>;

	return (
		<motion.li layoutId={id} className="flex flex-row overflow-hidden justify-between items-start">
			<ContextMenu>
				<ContextMenuTrigger className="w-full flex justify-between">
					<motion.span layoutId={`title-container-${id}`} className="relative m-0 p-0 font-extralight">
						{name}
						<span
							className="absolute left-[calc(100%+4px)] top-4  w-screen h-[.5px] bg-black dark:bg-white opacity-40"
							aria-hidden="true"
						></span>
					</motion.span>

					<span className="font-bold text-lg leading-snug bg-offwhite dark:bg-black pl-1 z-20">
						{amount}
					</span>
				</ContextMenuTrigger>
				<ContextMenuContent>
					<ContextMenuItem
						className="cursor-pointer"
						onClick={() => setActiveItem({ storeName: "spendingsStore", id })}
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
						onClick={() => removeSpend(id)}
					>
						Remove
						<TrashIcon />
					</ContextMenuItem>
				</ContextMenuContent>
			</ContextMenu>
		</motion.li>
	);
};

export default SpendingsItem;
