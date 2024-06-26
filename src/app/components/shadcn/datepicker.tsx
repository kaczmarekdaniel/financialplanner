import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";

import { cn } from "@/app/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

type DatePickerProps = {
    className?: string;
    setDate: (date: Date) => void;
};

export function DatePicker({className, setDate}: DatePickerProps) {
	const [localDate, setLocalDate] = React.useState<Date>();

    React.useEffect(() => {
        if(localDate){
            setDate(localDate);
        }
    }, [localDate]);

	return (
		<Popover >
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"w-[280px] flex items-center justify-center text-center text-xs font-light",
						!localDate && "text-muted-foreground",
                        className
					)}
				>
					
                    {localDate ? <></>: <CalendarIcon className="h-4 w-4" />}
					{localDate ? format(localDate, "P") : <></>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar
					mode="single"
					selected={localDate}
					onSelect={setLocalDate}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
}
