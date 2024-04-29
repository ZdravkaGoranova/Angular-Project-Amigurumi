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
        // await page.goto('https://amugurumiusers.web.app/auth/profile');
        // await page.goto('https://movies-ci-cd-piplene.onrender.com');
        // await page.goto(process.env.DEPLOYED_URL);
        await page.goto('http://localhost:4200/auth/login', { timeout: 60000 });

        await page.fill('input[name="email"]', 'peter@abv.bg', { timeout: 5000 });
        await page.fill('input[name="password"]', '123456', { timeout: 5000 });


        await page.click('.action-button');
        test.setTimeout(120000);

        // await page.waitForSelector('.card-title');
        const heading = await page.$('.card-title');

        const text = await heading?.textContent();
        expect(text).toContain('My Products');
       
        // const headingText = await page.evaluate(() => {
        //     const heading = document.querySelector('.card-title');
        //     return heading?.textContent?.trim();
        // });

        // expect(headingText).toContain('My Products');
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