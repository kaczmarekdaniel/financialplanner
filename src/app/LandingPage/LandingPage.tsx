import SummaryTile from "./Tiles/SummaryTile";
import PaymentsTile from "./Payments/PaymentsTile";
import SpendingsTile from "./Spendings/SpendingsTile";

const LandingPage = () => {
	return (
		<div className="grid grid-cols-3 grid-rows-2 gap-4 [&>*]:bg-offwhite dark:[&>*]:bg-black [&>*]:rounded-[20px]">
			<SummaryTile />
			<PaymentsTile />
			<SpendingsTile />
		</div>
	);
};

export default LandingPage;
