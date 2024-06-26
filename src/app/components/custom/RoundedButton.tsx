import React from "react";

type RoundedButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
};

const RoundedButton: React.FC<RoundedButtonProps> = (props) => {
	return (
		<button
			{...props}
			className={`w-[50px] rounded-full bg-offwhite h-[50px] ${props.className || ""}`}
		></button>
	);
};
export default RoundedButton;
