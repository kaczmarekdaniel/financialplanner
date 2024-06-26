import PaymentsList from "./PaymentsList";
import useAttributeSelector from "@/state/spendings/helpers/useAttributeSelector";
import paymentsStore from "@/state/payments/paymentsStore";

type PaymentsSectionProps = {
	title: string;
};

const PaymentsSection: React.FC<PaymentsSectionProps> = ({ title }) => {
	const data = useAttributeSelector(paymentsStore, title);

	return (
		<div className="col-span-1 row-span-3 flex flex-col gap-4 ">
			<PaymentsList data={data} title={title} />
		</div>
	);
};

export default PaymentsSection;
