import { expect, test } from '@playwright/test';

test.describe('Product Listing Page', () => {

    test.beforeEach(async ({ page }) => {

        await page.goto('http://localhost:8000/products');
    });


    test('should allow clicking the wishlist button', async ({ page }) => {
        const favoriteButtons = page.locator('svg.cursor-pointer');

        for (let i = 0; i < await favoriteButtons.count(); i++) {
            const button = favoriteButtons.nth(i);
            await button.click();
            await expect(button).toHaveClass(/hidden/);
        }
    });

    test('should open product details when clicking on the image', async ({ page }) => {
        const productImages = await page.locator('img.cursor-pointer');

        if (await productImages.count() > 0) {
            await productImages.first().click();
            await expect(page).toHaveURL(/product\/\d+/);
        }
    });

});


