import { useStore } from "@/hooks/useStore";
import { useContext } from "react";
import ItemsListing from "@/app/components/custom/CategorySection/components/ItemsListing.tsx";
import { SectionContext } from "@/app/components/custom/CategorySection/CategorySection.tsx";
import { motion } from "framer-motion";

const Categories = () => {
	const { columns, storeName } = useContext(SectionContext);
	const store = useStore(storeName);
	const items = store((state) => state.data);

	if (Object.entries(items).length === 0) {
		return (
			<motion.div
				className={`col-span-4 row-span-3 flex items-center justify-center 
				`}
				key="no-categories-animation"
				initial={{ display: "none", opacity: 0 }}
				animate={{ display: "flex", opacity: 1, transition: { delay: 0.3 } }}
			>
				<p className="font-extralight text-md">
					{" "}
					you don{"'"}t have any categories yet{" "}
				</p>
			</motion.div>
		);
	}

	return (
		<motion.ul
			key="categories-animation"
			initial={{ display: "none", opacity: 0 }}
			animate={{ display: "grid", opacity: 1, transition: { delay: 0.3 } }}
			className={`col-span-4 row-span-3 grid grid-cols-${columns} grid-rows-1 gap-x-4`}
		>
			{Object.entries(items).map((item, i) => {
				return <ItemsListing item={item} key={item[0] + i} />;
			})}
		</motion.ul>
	);
};

export default Categories;
