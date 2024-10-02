import { test, expect } from "@playwright/test";

test("should navigate to the React app and check for content", async ({
	page,
}) => {
	await page.goto("127.0.0.1:5173/");
	const title = page.locator("text=Hi Daniel");
	await expect(title).toBeVisible();
});
