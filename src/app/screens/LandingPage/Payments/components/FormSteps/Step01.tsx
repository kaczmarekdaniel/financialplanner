import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/app/components/shadcn/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/app/components/shadcn/form";
import { Input } from "@/app/components/shadcn/input";

type PaymentsFormProps = {
	gotoNextStep: () => void;
	setStep1Data: (data: { amount: number, name: string }) => void;
	step1Data: { amount: number, name: string };
};

const formSchema = z.object({
	amount: z.coerce.number().int().positive("Amount must be a positive integer"),
	name: z.string().min(3, "Name must have at least 3 characters"),
});

const Step01 = ({ gotoNextStep, setStep1Data, step1Data }: PaymentsFormProps): JSX.Element => {
	function onSubmit(values: z.infer<typeof formSchema>) {
		setStep1Data(values);
		gotoNextStep();
	}


	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			amount: step1Data.amount || 0,
			name: step1Data.name || "",
		},
	});


	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="grid grid-cols-2 grid-rows-2 h-full gap-x-1 gap-y-3 w-full relative"
				autoComplete="off"
			>
				<div className="col-span-1 row-span-1">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="ml-1">Name</FormLabel>
								<FormControl>
									<Input {...field} type="string" />
								</FormControl>
							</FormItem>
						)}
					/>
				</div>
				<div className="col-span-1 col-start-2 row-span-1 ">
					<FormField
						control={form.control}
						name="amount"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="ml-1">Amount</FormLabel>
								<FormControl>
									<Input {...field} type="number" />
								</FormControl>
							</FormItem>
						)}
					/>
				</div>


				<div className="col-span-2 row-span-1 row-start-2 flex items-center justify-center">
					<Button type="submit" className="w-full font-light text-xs">
						Next Step
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default Step01;
