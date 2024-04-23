import { test, expect } from '@playwright/test';
require('dotenv').config();
test('Check home page', async ({ page }) => {
    await page.goto('http://localhost:4200/');
    // await page.goto('https://movies-ci-cd-piplene.onrender.com');
    // await page.goto(process.env.DEPLOYED_URL);
    const heading = await page.$('h1');
    const text = await heading?.textContent();
    expect(text).toContain('Welcome to Amigurumi');  

   
  });
  