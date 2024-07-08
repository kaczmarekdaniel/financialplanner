import NewCategoryForm from "@/app/components/custom/CategorySection/components/NewCategoryForm.tsx";
import { useContext } from "react";
import { SectionContext } from "@/app/components/custom/CategorySection/CategorySection.tsx";

const Header = () => {
	const { storeName, title } = useContext(SectionContext);

	return (
		<div className='col-span-4 row-span-1 w-full flex items-center justify-between mb-8'>
			<h2
				className=" text-[30px] font-extrabold text-black dark:text-offwhite text-left opacity-85">
				{title}
			</h2>
			<NewCategoryForm storeName={storeName} />
		</div>
	);
};

export default Header;