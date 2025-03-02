const { test, expect } = require('@playwright/test');

test('Notices section should be visible', async ({ page }) => {
    await page.goto('http://localhost:3000/blog');

    const heading = page.locator('text=All Notices');
    await expect(heading).toBeVisible();
});


test.describe('Footer Component Test', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000');
    });

    test('Footer should be visible and have correct text', async ({ page }) => {
        const footer = await page.locator('footer');

        await expect(footer).toBeVisible();

        await expect(footer).toHaveText(/Develop by Srijan 2025/);
    });

    test('Footer should have correct styles', async ({ page }) => {
        const footer = await page.locator('footer');

        const bgColor = await footer.evaluate(el => getComputedStyle(el).backgroundColor);
        expect(bgColor).toBe('rgb(48, 48, 49)');

        const textColor = await footer.evaluate(el => getComputedStyle(el).color);
        expect(textColor).toBe('rgb(135, 137, 138)');
    });
});
