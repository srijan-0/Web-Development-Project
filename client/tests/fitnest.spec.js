const { test, expect } = require('@playwright/test');

test('FitNest title loads on homepage', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');


    const title = await page.locator('div.text-2xl.font-bold.text-gray-800');
    await expect(title).toBeVisible({ timeout: 10000 });
    await expect(title).toHaveText('FitNest');

});
