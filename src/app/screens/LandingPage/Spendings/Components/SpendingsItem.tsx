import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";

import { TrashIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
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
	const { spendingsService } = appStore();

	const removeSpend = async (id: string) => {
		setHidden(true);
			await spendingsService.removeSpend(id).catch(() => setHidden(false));
			
	};

	useEffect(() => {
		console.log(hidden);
		return () => {
			console.log("unmounted");
		};
	}, [hidden]);

	if (hidden) return <></>;

	return (
		<motion.li
			layoutId={id}
			className="flex flex-row overflow-hidden justify-between items-start"
		>
			<ContextMenu>
				<ContextMenuTrigger className="w-full flex justify-between">
					<motion.span
						layoutId={`title-container-${id}`}
						className="relative m-0 p-0 font-extralight"
					>
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
