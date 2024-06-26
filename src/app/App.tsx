import appStore from "@/state/store";
import Header from "./Header/Header";
import LandingPage from "./LandingPage/LandingPage";
import LoginPage from "./LoginPage/LoginPage";
import { useEffect, useState } from "react";
import Loader from "./components/custom/Loader";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useNavigate,
} from "react-router-dom";

function App() {
	const user = appStore((state) => state.user);
	const setUser = appStore((state) => state.setUser);
	const [isLoading, setIsLoading] = useState(true);

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
			})
			.catch((error) => {
				console.error("Error:", error);
				setIsLoading(false);
			});

		setTimeout(() => {
			setIsLoading(false);
		}, 3000);

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

	if (isLoading)
		return (
			<div className="h-screen w-screen flex items-center justify-center">
				<Loader />
			</div>
		);
	if (!user) return <LoginPage />;

	return (
		<div className="max-w-[1200px] h-auto w-full mx-auto mt-20 px-10 xxl:px-0">
			<Header />
			<main>
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="*" element={<div>notfound </div>} />
				</Routes>
			</main>
		</div>
	);
}

export default App;
