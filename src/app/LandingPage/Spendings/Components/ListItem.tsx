import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";

import { TrashIcon } from "@radix-ui/react-icons";
import React from "react";

type ListItemProps = {
	result: { name: string; amount: number; id: string };
	removeSpend: (id: string, callback: (isActive: boolean)=> void) => void;
};

const ListItem: React.FC<ListItemProps> = ({ result, removeSpend  }) => {
const [isActive, setIsActive] = React.useState(true);

    if (!isActive) return;

	return (
		<li
			className="flex flex-row  overflow-hidden justify-between items-start"
		>
			<ContextMenu>
				<ContextMenuTrigger className="w-full flex justify-between">
					<span className="relative m-0 p-0 font-extralight">
						{result.name}
						<span
							className="absolute left-[calc(100%+4px)] top-4  w-screen h-[.5px] bg-black dark:bg-white opacity-40"
							aria-hidden="true"
						></span>
					</span>

					<span className="font-bold text-lg leading-snug bg-offwhite dark:bg-black pl-1 z-20">
						{result.amount}
					</span>
				</ContextMenuTrigger>
				<ContextMenuContent>
					<ContextMenuItem
						className="cursor-pointer"
						onClick={() => console.log("test")}
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
						onClick={() => removeSpend(result.id, setIsActive)}
						className="bg-red-100 hover:!bg-red-200 transition-colors duration-200 font-semibold flex justify-between cursor-pointer"
					>
						Remove
						<TrashIcon />
					</ContextMenuItem>
				</ContextMenuContent>
			</ContextMenu>
		</li>
	);
};

export default ListItem;
