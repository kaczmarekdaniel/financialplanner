import { ArrowLeftIcon } from "@radix-ui/react-icons";
import appStore from "@/state/store";
import { motion } from "framer-motion";

import { useStore } from "@/app/components/custom/CategorySection/helpers/store";
import { toast } from "@/components/ui/use-toast";

import { DetailsScreenProps } from "./types";

const DetailsScreen: React.FC<DetailsScreenProps> = ({ item }) => {
	const setActiveItem = appStore((store) => store.setActiveItem);
	const store = useStore(item.storeName);
	const data = store((state) => state.getItemById(item.id));

	if (!data) {
		toast({
			variant: "destructive",
			title: "Uoops! Something went wrong.",
			description: "This item does not exist.",
		});
		return;
	}

	return (
		<motion.div
			layoutId={item.id}
			transition={{
				type: "spring",
				stiffness: 260,
				damping: 20,
			}}
			className="absolute top-0 left-0 w-full h-full z-50 p-10 grid grid-cols-9 grid-rows-9 bg-white dark:bg-black"
		>
			<ArrowLeftIcon
				onClick={() => setActiveItem(null)}
				className="w-8 h-8 cursor-pointer col-span-1 row-span-1"
			/>
			<motion.h2
				layoutId={`title-container-${item.id}`}
				className="font-bold text-3xl opacity-85 text-center w-full col-start-3 col-span-5 row-start-2 row-span-1 "
			>
				{data.name}
			</motion.h2>

			<div className="col-start-2 col-span-4 row-start-4 row-span-5  flex no-wrap">
				details
			</div>
			<div className="col-span-4 row-start-4 row-span-5 flex no-wrap">
				<img className="w-full h-full object-contain" src="https://www.fakturaxl.pl/img/paragon-wzor.png" alt="receipt" />
			</div>
		</motion.div>
	);
};

export default DetailsScreen;
