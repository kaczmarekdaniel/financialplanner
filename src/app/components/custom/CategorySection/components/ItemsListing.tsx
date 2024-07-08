import React, { useContext, useState } from "react";
import { Spend } from "@/state/spendings/spendingTypes.ts";
import { SectionContext } from "@/app/components/custom/CategorySection/CategorySection.tsx";
import { PlusIcon } from "@radix-ui/react-icons";

type ItemsListingProps = {
	item: [string, Spend[]]
}


const ItemsListing: React.FC<ItemsListingProps> = ({ item }) => {
	const [title, items] = item;
	const [formOpen, setFormOpen] = useState(false);

	const { Item, Form } = useContext(SectionContext);

	return (
		<>
			<div className="w-11/12 col-span-1 flex flex-col items-start justify-start gap-4 ">
				<div className="w-full flex items-center justify-between">
					<h3 className="font-bold text-xl opacity-85"> {title}</h3>
					<button onClick={() => setFormOpen(!formOpen)}>
						<PlusIcon />
					</button>
				</div>
				{formOpen ? <Form stateName={title} setFormOpen={setFormOpen} /> :
					<ul className="w-full">
						{items.map((item) => (
							<Item name={item.name} id={item.id} amount={item.amount} key={item.id} />
						))}
					</ul>}
			</div>
		</>
	);
};

export default ItemsListing;