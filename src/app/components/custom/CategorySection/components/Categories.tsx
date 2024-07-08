import { useStore } from "@/app/components/custom/CategorySection/helpers/store.ts";
import React, { useContext } from "react";
import ItemsListing from "@/app/components/custom/CategorySection/components/ItemsListing.tsx";
import { SectionContext } from "@/app/components/custom/CategorySection/CategorySection.tsx";

type CategoriesProps = {
	storeName: string
}


const Categories: React.FC<CategoriesProps> = () => {
	const { storeName } = useContext(SectionContext);
	const store = useStore(storeName);
	const items = store((state) => state.data);

	return (
		<ul className="col-span-4 row-span-3 grid grid-cols-4 grid-rows-1 gap-x-4">
			{Object.entries(items).map((item, i) => {
				return <ItemsListing item={item} key={item[0] + i} />;
			})}
		</ul>
	);
};

export default Categories;