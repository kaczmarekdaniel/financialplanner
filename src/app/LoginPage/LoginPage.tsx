import { useEffect } from "react";
import { Button } from "../components/shadcn/button";
import { toast } from "@/components/ui/use-toast";
import { useSearchParams } from "react-router-dom";

const LoginPage = () => {
	const [searchParams] = useSearchParams();
	const handleOAuth = () => {
		window.open("http://localhost:3000/api/auth/login/google", "_self");
	};

	useEffect(() => {
		if (searchParams.get("err")) {
			toast({
				variant: "destructive",
				title: "Uoops! Something went wrong.",
				description: "There was a problem with your request. Try again later.",
			});
		}
	}, []);

	return (
		<div className="max-w-[800px] max-h-screen h-full w-full mx-auto pt-20 px-10 xxl:px-0 grid grid-cols-1 grid-rows-6 ">
			<div className="row-span-1 row-start-2">
				<header className="flex justify-between ">
					<h1 className="text-[76px] font-black text-black dark:text-offwhite">
						log in
					</h1>
				</header>
				<main className="w-full h-96 m-auto  bg-offwhite dark:bg-black rounded-[20px] flex items-center justify-center flex-col gap-4">
					<Button
						onClick={handleOAuth}
						className="flex items-between justify-between gap-3 h-12 w-52 text-md"
					>
						{" "}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="1.8em"
							height="1.8em"
							viewBox="0 0 24 24"
						>
							<path
								fill="currentColor"
								d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27c3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10c5.35 0 9.25-3.67 9.25-9.09c0-1.15-.15-1.81-.15-1.81"
							/>
						</svg>
						Log in with Google
					</Button>

					<Button className="flex items-between justify-between gap-3 h-12 w-52 text-md">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="2em"
							height="2em"
							viewBox="0 0 24 24"
						>
							<path
								fill="currentColor"
								d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47c-1.34.03-1.77-.79-3.29-.79c-1.53 0-2 .77-3.27.82c-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51c1.28-.02 2.5.87 3.29.87c.78 0 2.26-1.07 3.81-.91c.65.03 2.47.26 3.64 1.98c-.09.06-2.17 1.28-2.15 3.81c.03 3.02 2.65 4.03 2.68 4.04c-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5c.13 1.17-.34 2.35-1.04 3.19c-.69.85-1.83 1.51-2.95 1.42c-.15-1.15.41-2.35 1.05-3.11"
							/>
						</svg>
						Log in with Apple
					</Button>
				</main>
			</div>
		</div>
	);
};

export default LoginPage;
