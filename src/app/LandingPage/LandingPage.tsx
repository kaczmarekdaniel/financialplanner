import PaymentsTile from "./Payments/PaymentsTile";
import SpendingsTile from "./Spendings/SpendingsTile";
import Summary from "@/app/LandingPage/Summary/Summary.tsx";

const LandingPage = () => {
	return (
		<div className="grid grid-cols-3 grid-rows-2 gap-4 [&>*]:bg-offwhite dark:[&>*]:bg-black [&>*]:rounded-[20px]">
			<Summary />
			<PaymentsTile />
			<SpendingsTile />
		</div>
	);
};

export default LandingPage;
