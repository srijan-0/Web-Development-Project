const { test, expect } = require('@playwright/test');

test.describe('API Test: Fetch All Notices', () => {

    test('should return a list of notices', async ({ request }) => {
        const response = await request.get('http://localhost:8000/api/notice/all-notices');

        await expect(response.status()).toBe(200);

        const responseBody = await response.json();

        await expect(responseBody).toHaveProperty('notices');
        await expect(Array.isArray(responseBody.notices)).toBeTruthy();

        await expect(responseBody.notices.length).toBeGreaterThan(0);

        const firstNotice = responseBody.notices[0];

        await expect(firstNotice).toHaveProperty('title');
        await expect(firstNotice).toHaveProperty('description');
        await expect(firstNotice).toHaveProperty('time');
    });

});
