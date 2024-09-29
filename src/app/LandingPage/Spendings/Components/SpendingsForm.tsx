import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FileIcon, CrossCircledIcon } from "@radix-ui/react-icons";

import { Button } from "@/app/components/shadcn/button";
import { AddItemFormProps } from "@/app/components/custom/CategorySection/CategorySection.tsx";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from "@/app/components/shadcn/form";
import { Input } from "@/app/components/shadcn/input";
import spendingsStore from "@/state/spendings/spendingsStore";
import appStore from "@/state/store";
import { useToast } from "@/components/ui/use-toast";



const formSchema = z.object({
	amount: z.coerce.number().int().positive("Amount must be a positive integer"),
	name: z.string().min(3, "Name must have at least 3 characters"),
});

const SpendingsForm: React.FC<AddItemFormProps> = ({
	stateName,
	setFormOpen,
}) => {
	const [filePickerOpen, setFilePickerOpen] = useState(false);
	const updateSpendings = spendingsStore((state) => state.updateSpendings);
	const removeSpending = spendingsStore((state) => state.removeSpending);
	const swapSpendings = spendingsStore((state) => state.swapSpendings);
	const month = appStore((state) => state.month);

	const { toast } = useToast();

	function onSubmit(values: z.infer<typeof formSchema>) {
		const itemID = Math.random().toString();

		updateSpendings(stateName, { ...values, id: itemID });
		setFormOpen(false);

		fetch("http://localhost:3000/spendings", {
			credentials: "include", 
			method: "POST",
			body: JSON.stringify({
				name: values.name,
				amount: values.amount,
				category: stateName,
				month: month,
			}), 
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("An error occurred, try again later.");
				}
				return response.json();
			})
			.then((data) => {
				console.log(data);
				swapSpendings(stateName, itemID, { ...data.data });
			})
			.catch((error: Error) => {
				removeSpending(itemID);
				toast({
					variant: "destructive",
					title: "Uoops! Something went wrong.",
					description: "There was a problem with your request.",
				});
				console.log(error);
			});
	}

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			amount: 0,
			name: "",
		},
	});

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col items-between h-full gap-6 w-full relative"
				autoComplete="off"
			>
				<div className="flex gap-3">
					<div className="w-3/5">
						<FormField
							control={form.control}
							name="amount"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="ml-1">Amount</FormLabel>
									<FormControl>
										<Input {...field} type="number" />
									</FormControl>

									<FormDescription className="ml-1">required</FormDescription>
								</FormItem>
							)}
						/>
					</div>

					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="ml-1">Name</FormLabel>
								<FormControl>
									<Input {...field} type="string" />
								</FormControl>

								<FormDescription className="ml-1">
									min 3. characters
								</FormDescription>
							</FormItem>
						)}
					/>
				</div>
				<div className="flex absolute bottom-0 left-0 w-full h-auto gap-1">
					{filePickerOpen && (
						<>
							<Button onClick={() => setFilePickerOpen(false)}>
								<CrossCircledIcon />
							</Button>
							<Input type="file" className="cursor-pointer" />
						</>
					)}

					{!filePickerOpen && (
						<>
							<Button type="button" onClick={() => setFilePickerOpen(true)}>
								<FileIcon />
							</Button>
							<Button type="submit" className="w-full h-auto z-10">
								Submit
							</Button>
						</>
					)}
				</div>
			</form>
		</Form>
	);
};

export default SpendingsForm;
