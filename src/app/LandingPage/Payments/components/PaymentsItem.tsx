import { Checkbox } from "@/app/components/shadcn/checkbox.tsx";
import React from "react";

export type PaymentsItemProps = {
	id: string,
	name: string,
}

export const PaymentsItem: React.FC<PaymentsItemProps> = ({ id, name }) => {


		return (
			<li className="flex items-center justify-start gap-2">
				<Checkbox id={name} onCheckedChange={() => console.log(name, id)} />
				<label
					htmlFor={name}
					className="text-sm font-medium leading-none opacity-75 cursor-pointer"
				>
					{name}
				</label>
			</li>
		);
	}
;