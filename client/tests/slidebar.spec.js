const { test, expect } = require('@playwright/test');

test('Notices section should be visible', async ({ page }) => {
    await page.goto('http://localhost:3000/blog'); // Update the URL if necessary

    // Check if the "All Notices" heading is visible
    const heading = page.locator('text=All Notices');
    await expect(heading).toBeVisible();
});
