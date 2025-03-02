const { test, expect } = require('@playwright/test');

test.describe('Notices UI Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000/api/notice/all-notices');
        await page.waitForLoadState('networkidle');
    });


    test("Read More button should expand full description", async ({ page }) => {
        const readMoreButton = await page.locator('button:text("Read More")').first();

        if (await readMoreButton.isVisible()) {
            await readMoreButton.click();
            await expect(readMoreButton).toHaveText("Read Less");
        }
    });


});
