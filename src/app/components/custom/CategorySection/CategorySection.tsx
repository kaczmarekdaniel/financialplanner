import Header from "@/app/components/custom/CategorySection/components/Header";
import Categories from "@/app/components/custom/CategorySection/components/Categories";
import React, { createContext } from "react";
import { PaymentsItem } from "@/app/screens/LandingPage/Payments/components/PaymentsItem";
import SpendingsForm from "@/app/screens/LandingPage/Spendings/Components/SpendingsForm";
import appStore from "@/state/store";
import { AnimatePresence, motion } from "framer-motion";

type ItemProps = {
	id: string;
	name: string;
	amount: number;
};

export type AddItemFormProps = {
	stateName: string;
	setFormOpen: (value: boolean) => void;
};

type CategoryProps = {
	columns?: number;
	contentIsLoading: boolean;
	storeName: string;
	title: string;
	Item: React.ComponentType<ItemProps>;
	Form: React.ComponentType<AddItemFormProps>;
};

export const SectionContext = createContext<CategoryProps>({
	columns: 4,
	storeName: "",
	title: "",
	Item: PaymentsItem,
	Form: SpendingsForm,
	contentIsLoading: true,
});

const CategorySection = ({
	columns,
	storeName,
	Item,
	Form,
	title,
	contentIsLoading,
  }: CategoryProps): JSX.Element => {
	const isLoading = appStore((state) => state.isLoading);

	return (
		<SectionContext.Provider
			value={{ columns, storeName, Item, Form, title, contentIsLoading }}
		>
			<Header />

			<AnimatePresence mode="wait">
				{(isLoading || contentIsLoading) && (
					<motion.div
						key="skeleton-loading-animation"
						initial={{ opacity: 0 }}
						animate={{ opacity: [0.5, 1, 0.5] }}
						exit={{
							opacity: [.5, 0],
							transition: { duration: 0.2 },
						}} 
						className={`w-11/12 col-span-4 overflow-x-hidden row-span-3 grid grid-cols-${columns}`}
					>
						<div className="col-span-1 row-span-3 flex items-start flex-col gap-4 ">
							<div className="w-full flex items-center justify-between">
								<div className="w-20 h-7 bg-gray-300 rounded-xl"></div>
								<div className="w-4 h-4 bg-gray-300 rounded-xl"></div>
							</div>
							<div className="w-full flex flex-col gap-1">
								<div className="w-3/4 h-5 bg-gray-300 rounded-xl"></div>
								<div className="w-3/4 h-5 bg-gray-300 rounded-xl"></div>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
			{!isLoading && !contentIsLoading && <Categories />}
		</SectionContext.Provider>
	);
};

export default CategorySection;
