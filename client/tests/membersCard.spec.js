const { test, expect } = require('@playwright/test');

test.describe('Header Icons (Wishlist, Login, Cart)', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000');
    });

    test('should display Wishlist, Login, and Cart icons', async ({ page }) => {
        const wishlistIcon = page.locator('div[title="Wishlist"]');
        await expect(wishlistIcon).toBeVisible();

        const loginIcon = page.locator('div[title="Login"]');
        await expect(loginIcon).toBeVisible();

        const cartIcon = page.locator('div[title="Cart"]');
        await expect(cartIcon).toBeVisible();

        const cartCount = cartIcon.locator('span');
        await expect(cartCount).toHaveText('0');
    });


});
