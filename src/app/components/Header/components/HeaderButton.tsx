import React from "react";
import RoundedButton from "@/app/components/custom/RoundedButton";
import { buttonHandler } from "../helpers/buttonHandler";

type HeaderButtonType = {
	action: string;
	children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>; // Extend standard button attributes

export const HeaderButton = ({
	action,
	children,
	...rest
}: HeaderButtonType): JSX.Element => {
	return (
		<RoundedButton
			type="button"
			onClick={buttonHandler(action)}
			className="flex items-center justify-center dark:bg-black"
			{...rest}
		>
			{children}
		</RoundedButton>
	);
};

