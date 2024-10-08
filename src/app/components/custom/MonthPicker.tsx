import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

import { Button } from "@/app/components/custom/button";
import { getCurrentMonth } from "@/state/helpers/getCurrentMonth";

import appStore from "@/state/store";

const MonthPicker = () => {
	const offset = appStore((state) => state.offset);
	const setOffset = appStore((state) => state.setOffset);

	return (
		<div className="flex flex-row justify-center items-center gap-5">
			<Button
				variant="outline"
				size="icon"
				className="w-7 h-7 p-0 bg-transparent"
				onClick={() => setOffset(offset - 1)}
			>
				<ChevronLeftIcon className="h-4 w-4" />
			</Button>
			<p className="opacity-80">{getCurrentMonth("string", offset)}</p>
			<Button
				variant="outline"
				size="icon"
				className="w-7 h-7 p-0 bg-transparent"
				onClick={() => setOffset(offset + 1)}
			>
				<ChevronRightIcon className="h-4 w-4" />
			</Button>
		</div>
	);
};

export default MonthPicker;
