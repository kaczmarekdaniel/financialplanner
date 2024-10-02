import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/app/components/shadcn/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/app/components/shadcn/form";
// import { useToast } from "@/components/ui/use-toast";
import { DatePicker } from "@/app/components/shadcn/datepicker";
import { ChevronLeftIcon } from "@radix-ui/react-icons";

type PaymentsFormProps = {
	setStep2Data: (data: { startDate: number, endDate: number }) => void;
	step2Data: { startDate: number, endDate: number };
	goBack: () => void;
	submitForm: () => void;

};

const formSchema = z.object({
	startDate: z.coerce.number().positive(),
	endDate: z.coerce.number().positive(),
});

const Step02 = ({ setStep2Data, goBack, step2Data, submitForm }: PaymentsFormProps): JSX.Element => {

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			startDate: step2Data.startDate || 0,
			endDate: step2Data.endDate || 0,
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		setStep2Data(values);
		submitForm();
	}

	const handleSetDate = (value: "startDate" | "endDate", date: Date) => {
		const dateFormatted = new Date(date);
		const timestamp = dateFormatted.getTime();
		form.setValue(value, timestamp);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="grid grid-cols-4 grid-rows-2 h-full gap-x-1 gap-y-3 w-full relative"
				autoComplete="off"
			>
				<div className="col-span-2 row-span-1">
					<FormField
						control={form.control}
						name="startDate"
						render={() => (
							<FormItem>
								<FormLabel className="ml-1">Pay Day</FormLabel>
								<FormControl>
									<DatePicker
										setDate={(date) => {
											handleSetDate("startDate", date);
										}}
										className="w-full"
									/>
								</FormControl>
							</FormItem>
						)}
					/>
				</div>

				<div className="col-span-2 col-start-3 row-span-1 row-start-1">
					<FormField
						control={form.control}
						name="endDate"
						render={() => (
							<FormItem>
								<FormLabel className="ml-1">Pay Day</FormLabel>
								<FormControl>
									<DatePicker
										setDate={(date) => {
											handleSetDate("endDate", date);
										}}
										className="w-full"
									/>
								</FormControl>
							</FormItem>
						)}
					/>
				</div>
				<div className="col-span-1  row-span-1 row-start-2 flex items-center justify-center m-0 p-0">
					<Button onClick={goBack} className="w-full">
						<ChevronLeftIcon />
					</Button>
				</div>
				<div className="col-span-3 col-start-2 row-span-1 row-start-2 flex items-center justify-center m-0 p-0">
					<Button type="submit" className="w-full font-extralight ">Submit</Button>
				</div>
			</form>
		</Form>
	);
};

export default Step02;
