const { test, expect } = require('@playwright/test');

test('Should display "No product found in wishList" message', async ({ page }) => {
    // Replace with the actual URL of your wishlist page
    await page.goto('http://localhost:3000/wish-list');

    // Check for the "No product found in wishList" message
    const emptyMessage = await page.locator('div:text("No product found in wishList")');
    await expect(emptyMessage).toBeVisible();
});





