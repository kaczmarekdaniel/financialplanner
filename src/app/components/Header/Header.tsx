import { HeaderButton } from "./components/HeaderButton";
import { CalendarIcon, MoonIcon, GearIcon } from "@radix-ui/react-icons";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/app/components/shadcn/popover";
import appStore from "@/state/store";

import MonthPicker from "@/app/components/custom/MonthPicker";
import { useState } from "react";

export const Header = () => {
	const [showPicker, setShowPicker] = useState(false);
	const user = appStore((state) => state.user);

	return (
		<header className="flex justify-between">
			<h1 className="text-[76px] font-black text-black dark:text-offwhite">
				hi {user && user.name ? user.name.split(" ")[0] : "there"}
			</h1>
			<div className="flex flex-row items-center gap-4">
				<div className="relative">
					<HeaderButton
						action={""}
						onClick={() => setShowPicker((prevState) => !prevState)}
					>
						<CalendarIcon />
					</HeaderButton>
					{showPicker && (
						<div className="absolute right-[calc(100%+1rem)]  text-black  dark:text-white dark:bg-opacity-80 rounded-lg h-[42px] mt-[4px] top-0 w-52 flex items-center justify-center">
							<MonthPicker />
						</div>
					)}
				</div>
				<HeaderButton action={"dark_mode"}>
					<MoonIcon />
				</HeaderButton>
				<Popover>
					<PopoverTrigger className="w-[50px] rounded-full bg-offwhite dark:bg-black h-[50px] flex items-center justify-center">
						<GearIcon />
					</PopoverTrigger>
					<PopoverContent className="right-0" align="end">
						Place content for the popover here.
					</PopoverContent>
				</Popover>
			</div>
		</header>
	);
};
