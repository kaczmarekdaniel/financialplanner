import React from "react";

type RoundedButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	className?: string;
};

const RoundedButton = ({ className,  ...props }: RoundedButtonProps): JSX.Element => {
	return (
		<button
			{...props}
			className={`w-[50px] rounded-full bg-offwhite h-[50px] ${className || ""}`}
		></button>
	);
};
export default RoundedButton;
