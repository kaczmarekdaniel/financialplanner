import Header from "@/app/components/custom/CategorySection/components/Header";
import Categories from "@/app/components/custom/CategorySection/components/Categories";
import React, { createContext } from "react";
import { PaymentsItem } from "@/app/LandingPage/Payments/components/PaymentsItem.tsx";
import SpendingsForm from "@/app/LandingPage/Spendings/Components/SpendingsForm.tsx";

type ItemProps = {
	id: string,
	name: string,
	amount: number,
};

export type AddItemFormProps = {
	stateName: string;
	setFormOpen: (value: boolean) => void;
};

type CategoryProps = {
	columns?: number;
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
});

const CategorySection: React.FC<CategoryProps> = ({ columns, storeName, Item, Form, title }) => {
	return (
		<SectionContext.Provider value={{ columns, storeName, Item, Form, title }}>
			<Header />
			<Categories storeName={storeName} />
		</SectionContext.Provider>
	);
};

export default CategorySection;
