const { test, expect } = require('@playwright/test');

test.describe('Header Icons (Wishlist, Login, Cart)', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to the application (update URL if necessary)
        await page.goto('http://localhost:3000');
    });

    test('should display Wishlist, Login, and Cart icons', async ({ page }) => {
        // Wishlist Icon
        const wishlistIcon = page.locator('div[title="Wishlist"]');
        await expect(wishlistIcon).toBeVisible();

        // Login Icon
        const loginIcon = page.locator('div[title="Login"]');
        await expect(loginIcon).toBeVisible();

        // Cart Icon
        const cartIcon = page.locator('div[title="Cart"]');
        await expect(cartIcon).toBeVisible();

        // Verify Cart Count is Displayed
        const cartCount = cartIcon.locator('span');
        await expect(cartCount).toHaveText('0');
    });


});
