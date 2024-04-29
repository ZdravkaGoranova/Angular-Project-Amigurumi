import { test, expect } from '@playwright/test';

test.describe('Details', () => {
    test('Check Details heading', async ({ page }) => {

        const url = page.url();
        const productId = new URL(url).searchParams.get('productId');
        await page.goto(`http://localhost:4200/catalog/products/${productId}`);

        const heading = await page.$('h3');
        const text = await heading?.textContent();
        expect(text).toContain('Amigurumi Details:');
    });

    
    test('Check Product Title', async ({ page }) => {
        // Отваряне на страницата на продукта
        await page.goto('http://localhost:4200/catalog/products');
    
        await page.waitForSelector('#title', { timeout: 30000 });
        const titleElement = await page.$('#title');
      
        expect(await titleElement?.isVisible()).toBe(true);
    
        const textTitleElement = await titleElement?.textContent();

        const productTitle = await page.evaluate(() => {
            return document.querySelector('#title')?.textContent?.trim();
        });
    
        expect(textTitleElement).toBe(productTitle);
    });
    
});
