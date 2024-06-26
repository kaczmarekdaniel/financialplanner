import { PlusIcon, Cross1Icon } from "@radix-ui/react-icons";
import SpendingsList from "./SpendingsList";
import SpendingsForm from "./SpendingsForm";
import spendingsStore from "@/state/spendings/spendingsStore";
import { useState } from "react";
import useAttributeSelector from "@/state/spendings/helpers/useAttributeSelector";

type SpendingsSectionProps = {
	title: string;
	stateName: string; // Adjust the type of stateName to accept only valid keys of StoreState
};

const SpendingsSection: React.FC<SpendingsSectionProps> = ({
	title,
	stateName,
}) => {
	const data = useAttributeSelector(spendingsStore, stateName);
	const [formOpen, setFormOpen] = useState(false);

	if (!data) return null;

	return (
		<>
			<div className="col-span-1 row-span-3 flex flex-col gap-4 w-3/4">
				<div className="flex flex-row items-center justify-between ">
					<h3 className="font-bold text-xl opacity-85"> {title}</h3>
					<button type="button" onClick={() => setFormOpen(!formOpen)}>
						{formOpen ? <Cross1Icon /> : <PlusIcon />}
					</button>
				</div>
				{!formOpen && <SpendingsList data={data} stateName={stateName} />}
				{formOpen && (
					<SpendingsForm setFormOpen={setFormOpen} stateName={stateName} />
				)}
			</div>
		</>
	);
};

export default SpendingsSection;
