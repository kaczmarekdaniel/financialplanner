import { PlusIcon } from "@radix-ui/react-icons";
import { spendingsStore } from "@/state/spendings/spendingsStore";
import { Button } from "@/app/components/shadcn/button";
import { Input } from "@/app/components/shadcn/input";
import { useState } from "react";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/app/components/shadcn/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	name: z.string().min(3, "Name must have at least 3 characters"),
});

const CategoryForm = () => {
	const [formOpen, setFormOpen] = useState(false);
	const addCategory = spendingsStore((state) => state.addCategory);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
		},
	});

	const formHandler = () => {
		setFormOpen(!formOpen);
	};

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
		addCategory(values.name);
        form.reset();
		setFormOpen(false); // Close the form after submission
	}

	return (
		<div className="col-span-1 row-span-1 flex items-start justify-end gap-1">
			{formOpen && (
				<Form {...form}>
					<form
						className="flex flex-row items-start justify-center gap-2"
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="ml-1 hidden">Name</FormLabel>
									<FormControl>
										<Input className="!m-0" {...field} type="string" />
									</FormControl>
									<FormMessage>
										{form.formState.errors.name && (
											<span className="text-red-500">
												{form.formState.errors.name.message}
											</span>
										)}
									</FormMessage>
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							variant={"outline"}
							className="w-9 h-9 px-2 col-span-1 row-span-1 flex gap-2"
						>
							<PlusIcon />
						</Button>
					</form>
				</Form>
			)}
			{!formOpen && (
				<Button
					variant={"outline"}
					className="w-auto h-9 px-2 col-span-1 row-span-1 flex gap-2"
					onClick={formHandler}
				>
					Add category
					<PlusIcon />
				</Button>
			)}
		</div>
	);
};

export default CategoryForm;
