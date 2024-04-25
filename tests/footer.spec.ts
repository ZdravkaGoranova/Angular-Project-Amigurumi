import { test, expect } from '@playwright/test';

test.describe('Footer', () => {
    test('Check Footer UL', async ({ page }) => {
        await page.goto('http://localhost:4200/');
        const list = await page.$('ul');
        expect(list).toBeTruthy();
    });

    test('Check Footer Links', async ({ page }) => {
        await page.goto('http://localhost:4200/');
        const footerLinks = await page.$('a[href="https://github.com/ZdravkaGoranova"]');
        const text = await footerLinks?.textContent();
        expect(text).toContain('All rights reserved.');
    });
});
