import { test, expect } from '@playwright/test';

test('Check header Home,Login ang Register links', async ({ page }) => {
    // await page.goto('http://localhost:8080');  // you can replace this URL with any page that includes the header
    // await page.goto('https://movies-ci-cd-piplene.onrender.com'); 
    await page.goto('http://localhost:4200/');
    const homeLink = await page.$('a[href="/"]');
    const text = await homeLink?.textContent();
    expect(text).toBe('Home');

    const loginLink = await page.$('a[href="/auth/login"]');
    const loginText = await loginLink?.textContent();
    expect(loginText).toBe('Login');

    const registerLink = await page.$('a[href="/auth/register"]');
    const registerText = await registerLink?.textContent();
    expect(registerText).toBe('Register');
});

test('Check visibility of "Login" and "Register" buttons', async ({ page }) => {
    await page.goto('http://localhost:4200/');

    const loginButton = await page.$('a[href="/auth/login"]');
    expect(await loginButton?.isVisible()).toBe(true);

    const registerButton = await page.$('a[href="/auth/register"]');
    expect(await registerButton?.isVisible()).toBe(true);
});

test('Check visibility of "Catalog" button', async ({ page }) => {
    await page.goto('http://localhost:4200/');
    
    const catalogButton = await page.$('button[routerLink="/catalog/products"]');
    expect(await catalogButton?.isVisible()).toBe(true);
});

test('Check visibility of "Profile" button when logged in', async ({ page }) => {
    await page.goto('http://localhost:4200/');
    
    // Log in (replace with your login logic)
    await page.fill('input[name="username"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('button[type="submit"]');

    const profileButton = await page.$('button[routerLink="/auth/profile"]');
    expect(await profileButton?.isVisible()).toBe(true);
});

test('Check visibility of "Add New" button when logged in', async ({ page }) => {
    await page.goto('http://localhost:4200/');
    
    // Log in (replace with your login logic)
    await page.fill('input[name="username"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('button[type="submit"]');
    const addNewButton = await page.$('button[routerLink="/catalog/addNewProduct"]');
    expect(await addNewButton?.isVisible()).toBe(true);
});