import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login-page';
import * as dotenv from 'dotenv';

test.describe('Login Test', () => {
    test.afterEach(async ({ page}, testInfo) => {
        if (testInfo.status === 'passed') {
            await page.screenshot({ path: `screenshots/${testInfo.title}-passed.png`, fullPage: true });
        }
    })



    test('Login with valid credentials and logout', async ({ page }) => {
        const user = {
            userName: process.env.LOGIN_USERNAME_DEFAULT!,
            password: process.env.LOGIN_PASSWORD_DEFAULT!
        }

        const lgn = new LoginPage(page);
        await lgn.open();
        await lgn.login(user);

        await lgn.logout();
        await expect(page).toHaveURL(/.*login/);
    })

    test('Login with invalid credentials', async ({ page }) => {
        const user = {
            userName: 'invalidUser',
            password: 'invalidPassword'
        }

        const lgn = new LoginPage(page);
        await lgn.open();
        await lgn.loginFail(user);
    })
})
