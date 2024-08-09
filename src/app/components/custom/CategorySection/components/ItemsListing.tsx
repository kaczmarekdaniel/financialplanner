import React, { useContext, useState } from "react";
import { Spend } from "@/state/spendings/spendingTypes.ts";
import { SectionContext } from "@/app/components/custom/CategorySection/CategorySection.tsx";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@/app/components/custom/button.tsx";

type ItemsListingProps = {
	item: [string, Spend[]];
};

const ItemsListing: React.FC<ItemsListingProps> = ({ item }) => {
	const [title, items] = item;
	const [formOpen, setFormOpen] = useState(false);

	const { Item, Form } = useContext(SectionContext);

	return (
		<>
			<div
				className={`w-11/12 col-span-1 flex flex-col items-start justify-start gap-4 pr-6 ${!formOpen && "overflow-y-auto pr-3 "}`}
			>
				<div className="w-full flex items-center justify-between">
					<h3 className="font-bold text-xl opacity-85"> {title}</h3>
					<button onClick={() => setFormOpen(!formOpen)}>
						<PlusIcon />
					</button>
				</div>

				{items.length === 0 && !formOpen && (
					<div className="flex items-center justify-center flex-col gap-4 font-extralight">
						<p className="text-sm">
							looks like you don{"'"}t have any spendings in this category
						</p>
						<Button
							className="w-full flex gap-3"
							onClick={() => setFormOpen(true)}
						>
							add first item <PlusIcon />{" "}
						</Button>
					</div>
				)}

				{formOpen ? (
					<Form stateName={title} setFormOpen={setFormOpen} />
				) : (
					<ul className="w-full">
						{items.map((item) => (
							<Item
								name={item.name}
								id={item.id}
								amount={item.amount}
								key={item.id}
							/>
						))}
					</ul>
				)}
			</div>
		</>
	);
};

export default ItemsListing;
