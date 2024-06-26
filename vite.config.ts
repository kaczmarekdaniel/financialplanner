import { resolve } from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dns from "dns";

dns.setDefaultResultOrder("verbatim");

export default defineConfig({
	plugins: [react()],

	resolve: {
		alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
	},
});
