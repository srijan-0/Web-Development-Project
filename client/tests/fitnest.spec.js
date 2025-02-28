const { test, expect } = require('@playwright/test');

test('FitNest title loads on homepage', async ({ page }) => {
    // Navigate to the homepage and wait for all network activity to settle
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check the "FitNest" title (from the Navber component)
    // Use the exact selector from your HTML: <div class="hidden lg:block flex items-left col-span-1 text-center text-gray-800 font-bold tracking-widest uppercase text-2xl cursor-pointer" style="letter-spacing: 0.7rem;">FitNest</div>
    const title = await page.locator('div.text-2xl.font-bold.text-gray-800'); // Adjusted to match your HTML
    await expect(title).toBeVisible({ timeout: 10000 }); // Increase timeout to 10 seconds
    await expect(title).toHaveText('FitNest');

});

test('FitNest homepage slider image loads correctly', async ({ page }) => {
    // Navigate to the homepage and wait for all network activity to settle
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check if the slider image is visible
    const sliderImage = await page.locator('img.w-full.object-cover.rounded-lg.shadow-lg');
    await expect(sliderImage).toBeVisible({ timeout: 10000 }); // Increase timeout to 10 seconds

    // Verify the image source matches the expected URL
    const srcAttribute = await sliderImage.getAttribute('src');
    await expect(srcAttribute).toBe('http://localhost:8000/uploads/customize/1739610389098_76c76a7a19d36104ad013fe959f5f8ef.jpg');

    // Optionally, verify the image loads (check for broken images)
    const imageLoaded = await sliderImage.evaluate((img) => img.complete && img.naturalHeight !== 0);
    await expect(imageLoaded).toBe(true);
});
