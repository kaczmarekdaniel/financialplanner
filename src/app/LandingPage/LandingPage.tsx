import appStore from "@/state/store";
import Header from "../Header/Header";
import DetailsScreen from "./DetailsScreen/DetailsScreen";
import PaymentsTile from "./Payments/PaymentsTile";
import SpendingsTile from "./Spendings/SpendingsTile";
import Summary from "@/app/LandingPage/Summary/Summary.tsx";
import { LayoutGroup, AnimatePresence } from "framer-motion";

const LandingPage = () => {
	const activeItem = appStore((state) => state.activeItem);
	return (
		<LayoutGroup>
			<Header />

			<div className="grid grid-cols-3 grid-rows-2 gap-4 [&>*]:bg-offwhite dark:[&>*]:bg-black [&>*]:rounded-[20px] relative">
				<Summary />
				<PaymentsTile />
				<SpendingsTile />
				<AnimatePresence>{activeItem && <DetailsScreen item={activeItem} />} </AnimatePresence>
			</div>
		</LayoutGroup>
	);
};

export default LandingPage;
