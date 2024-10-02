import { LoginPage } from "@/app/screens/LoginPage/LoginPage";
import appStore from "@/state/store";
import { useEffect } from "react";
import {
	Route,
	Routes,
	useLocation,
	useNavigate,
} from "react-router-dom";
import { LandingPage } from "./screens/LandingPage/LandingPage";

function App() {
	const setIsLoading = appStore((state) => state.setIsLoading);

	const setUser = appStore((state) => state.setUser);
	const location = useLocation();

	const navigate = useNavigate();

	useEffect(() => {
		fetch("http://localhost:3000/user", {
			credentials: "include",
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.message === "Unauthorized") {
					navigate("/login");
				} else {
					setUser(data);
				}
				setIsLoading(false);
			})
			.catch((error) => {
				console.error("Error:", error);
				setIsLoading(false);
			});

		// fetch("http://localhost:3000/spendings", {
		// 	credentials: "include",
		// })
		// 	.then((res) => res.json())
		// 	.then((data) => {
		// 		console.log(data);
		// 	})
		// 	.catch((error) => {
		// 		console.error("Error:", error);
		// 	});
	}, []);

	// if (isLoading)
	// 	return (
	// 		<div className="h-screen w-screen flex items-center justify-center">
	// 			<Loader />
	// 		</div>
	// 	);

	return (
		<main className="max-w-[1200px] h-auto w-full mx-auto mt-14 px-10 xxl:px-0">
			<Routes location={location} key={location.pathname}>
				<Route path="/" element={<LandingPage />} />

				<Route path="/login" element={<LoginPage />} />
				<Route path="/error" element={<h1>error !!!11!</h1>} />

				<Route path="*" element={<div>notfound </div>} />
			</Routes>
		</main>
	);
}

export default App;
