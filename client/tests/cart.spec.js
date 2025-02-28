const { test, expect } = require('@playwright/test');

test.describe('API Test: Fetch All Notices', () => {

    test('should return a list of notices', async ({ request }) => {
        // Send GET request to the API
        const response = await request.get('http://localhost:8000/api/notice/all-notices');

        // Expect the response to be successful
        await expect(response.status()).toBe(200);

        // Convert response to JSON
        const responseBody = await response.json();

        // Ensure the response has a "notices" array
        await expect(responseBody).toHaveProperty('notices');
        await expect(Array.isArray(responseBody.notices)).toBeTruthy();

        // Check that at least one notice exists
        await expect(responseBody.notices.length).toBeGreaterThan(0);

        // Validate structure of the first notice
        const firstNotice = responseBody.notices[0];

        await expect(firstNotice).toHaveProperty('title');
        await expect(firstNotice).toHaveProperty('description');
        await expect(firstNotice).toHaveProperty('time');
    });

});
