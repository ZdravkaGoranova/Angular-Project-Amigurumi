import { test, expect } from '@playwright/test';

test.describe('Profile', () => {
    test('Check My Profile text', async ({ page }) => {
        await page.goto('https://amugurumiusers.web.app/auth/profile');
        // await page.goto('https://movies-ci-cd-piplene.onrender.com');
        // await page.goto(process.env.DEPLOYED_URL);
        const heading = await page.$('h3');
        const text = await heading?.textContent();
        expect(text).toContain('My Profile');
    });
    test('Check My Products', async ({ page }) => {
        await page.goto('https://amugurumiusers.web.app/auth/profile');
        // await page.goto('https://movies-ci-cd-piplene.onrender.com');
        // await page.goto(process.env.DEPLOYED_URL);
        const heading = await page.$('h3');
        const text = await heading?.textContent();
        expect(text).toContain('My Products');
    });

    test('Check Liked Products', async ({ page }) => {
        await page.goto('http://localhost:4200/');
        // await page.goto('https://movies-ci-cd-piplene.onrender.com');
        // await page.goto(process.env.DEPLOYED_URL);
        const heading = await page.$('h3');
        const text = await heading?.textContent();
        expect(text).toContain('Liked Products');
    });
});