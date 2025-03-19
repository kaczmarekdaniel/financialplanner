import { Header } from "@/app/components/Header/Header";
import { Summary } from "@/app/screens/LandingPage/Summary/Summary";
import appStore from "@/state/store";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import { DetailsScreen } from "./DetailsScreen/DetailsScreen";
import { PaymentsTile } from "./Payments/PaymentsTile";
import { SpendingsTile } from "./Spendings/SpendingsTile";

export const LandingPage = () => {
	const activeItem = appStore((state) => state.activeItem);
	return (
		<LayoutGroup>
			<Header />

			<div className="grid grid-cols-3 grid-rows-2 gap-4 [&>*]:bg-offwhite dark:[&>*]:bg-black [&>*]:rounded-[20px] relative">
				<Summary />
				<PaymentsTile />
				<SpendingsTile />
				<AnimatePresence>
					{activeItem && <DetailsScreen item={activeItem} />}
				</AnimatePresence>
			</div>
		</LayoutGroup>
	);
};
