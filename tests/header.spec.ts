import { test, expect } from '@playwright/test';
test.describe('Header', () => {
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

        await page.goto('http://localhost:4200/auth/login', { timeout: 120000 });

        await page.fill('input[name="email"]', 'peter@abv.bg', { timeout: 5000 });
        await page.fill('input[name="password"]', '123456', { timeout: 5000 });


        await page.click('.action-button');

        // const profileButton = await page.$('button[routerLink="/auth/profile"]');
        const profileButton =    await page.waitForSelector('button[routerLink="/auth/profile"]', { timeout: 10000 }); 

        expect(await profileButton?.isVisible()).toBe(true);
    });

    test('Check visibility of "Add New" button when logged in', async ({ page }) => {

        await page.goto('http://localhost:4200/auth/login', { timeout: 60000 });

        await page.fill('input[name="email"]', 'peter@abv.bg', { timeout: 5000 });
        await page.fill('input[name="password"]', '123456', { timeout: 5000 });


        await page.click('.action-button');
        const addNewButton = await page.waitForSelector('button[routerLink="/catalog/addNewProduct"]', { timeout: 10000 }); 

        expect(await addNewButton?.isVisible()).toBe(true);
    });


    test('Check visibility of "Logout" button when logged in', async ({ page }) => {

        await page.goto('http://localhost:4200/auth/login', { timeout: 120000 });

        await page.fill('input[name="email"]', 'peter@abv.bg', { timeout: 5000 });
        await page.fill('input[name="password"]', '123456', { timeout: 5000 });

        await page.click('.action-button');
       
        const registerButton = await page.$('a[href="/auth/register"]');

        const registerText = await registerButton?.textContent();
        expect(registerText).toBe('Logout');
       
    });
    // test('Check visibility of "Logout" button when logged in', async ({ page }) => {
    
    //     await page.goto('http://localhost:4200/');

    
    //     const logoutButton = await page.$('a[href="/auth/register"]');
    //     expect(await logoutButton?.isVisible()).toBe(false);


    //     await page.click('a[href="/auth/login"]');
    //     await page.fill('input[name="email"]', 'peter@abv.bg');
    //     await page.fill('input[name="password"]', '123456');
    //     await page.click('.action-button');

        
    //     await page.waitForSelector('a[href="/auth/register"]');
    //     expect(await logoutButton?.isVisible()).toBe(true);

    
    // });


});
