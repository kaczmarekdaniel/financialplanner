import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
	testDir: "./src/app",
	use: {
		headless: false,
		viewport: { width: 1280, height: 720 },
		launchOptions: {
			slowMo: 50,
		},
	},
};

export default config;
