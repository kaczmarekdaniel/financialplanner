import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import "@/css/index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
);

ReactDOM.createRoot(document.getElementById("toast")!).render(<Toaster />);
