const { test, expect } = require('@playwright/test');

test.describe('Notices UI Tests', () => {

    test.beforeEach(async ({ page }) => {
        // Navigate to the notices page
        await page.goto('http://localhost:3000/api/notice/all-notices'); // Update URL as needed
        await page.waitForLoadState('networkidle'); // Ensure data is fully loaded
    });


    test('✅ "Read More" button should expand full description', async ({ page }) => {
        // Locate the first "Read More" button
        const readMoreButton = await page.locator('button:text("Read More")').first();

        // If "Read More" button exists, click it and check expanded text
        if (await readMoreButton.isVisible()) {
            await readMoreButton.click();
            await expect(readMoreButton).toHaveText("Read Less");
        }
    });


});
