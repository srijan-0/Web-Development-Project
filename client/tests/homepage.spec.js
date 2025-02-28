const { test, expect } = require('@playwright/test');

test('FitNest Categories button works and fetches all categories correctly', async ({ page }) => {
    // Navigate to the homepage and wait for all network activity to settle
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check if the Categories button is visible and clickable
    const categoriesButton = await page.locator('span.text-md.md\\:text-lg.hover\\:text-yellow-700');
    await expect(categoriesButton).toBeVisible({ timeout: 10000 }); // Increase timeout to 10 seconds
    await expect(categoriesButton).toHaveText('Categories');

    // Click the Categories button (assuming it triggers a categories display or update)
    await categoriesButton.click();

    // Optionally, wait for the categories grid or API response
    await page.waitForLoadState('networkidle'); // Wait for any network activity after clicking

    // Check if the categories grid is visible after clicking the button
    const categoriesGrid = await page.locator('div.py-1.grid.grid-cols-2.md\\:grid-cols-3.lg\\:grid-cols-4');
    await expect(categoriesGrid).toBeVisible({ timeout: 10000 });

    // Verify there are 4 category items (or adjust based on your backend data)
    const categoryItems = await categoriesGrid.locator('div.m-2.flex.flex-col.items-center.justify-center.space-y-2');
    await expect(categoryItems).toHaveCount(4); // Update this number if your backend returns a different count

    // Define expected categories (match your backend data)
    const expectedCategories = [
        { name: 'Muscle Builders', src: 'http://localhost:8000/uploads/categories/1739618834409_86bc255acaf4bce5cb2da1ff335a3dd3.jpg' },
        { name: 'Weight Loss Seeker', src: 'http://localhost:8000/uploads/categories/1739618535095_56356beddb1d0ac54913b577b5678cf1.jpg' },
        { name: 'Cardio', src: 'http://localhost:8000/uploads/categories/1739618194763_0f8684356aa653b918ffa1204c1d8b8a.jpg' },
        { name: 'Weightlifting', src: 'http://localhost:8000/uploads/categories/1739617889131_2f1fd646f5b0882e39e18bf3b191c898.jpg' },
    ];

    // Check each category item (image and text) against expected data
    for (const [index, category] of expectedCategories.entries()) {
        const item = categoryItems.nth(index);

        // Verify the category name (text) is visible and matches
        const categoryName = await item.locator('div.font-medium');
        await expect(categoryName).toBeVisible();
        await expect(categoryName).toHaveText(category.name);

        // Verify the image is visible and has the correct src
        const categoryImage = await item.locator('img[alt="pic"]');
        await expect(categoryImage).toBeVisible();
        const srcAttribute = await categoryImage.getAttribute('src');
        await expect(srcAttribute).toBe(category.src);

        // Optionally, verify the image loads (check for broken images)
        const imageLoaded = await categoryImage.evaluate((img) => img.complete && img.naturalHeight !== 0);
        await expect(imageLoaded).toBe(true);
    }

    // Optionally, monitor network requests to confirm the API call for categories
    await page.route('**/api/categories', (route) => {
        route.continue().then(() => {
            console.log('Categories API request intercepted');
        });
    });
});