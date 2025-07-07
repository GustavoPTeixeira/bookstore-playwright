import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { RegisterPage } from '../src/pages/register-page';
import { AccountAPI } from '../src/api/account.api';


test.describe('Register Test', () => {
    test.afterEach(async ({ page }, testInfo) => {
        if (testInfo.status === 'passed') {
            await page.screenshot({ path: `screenshots/${testInfo.title}-passed.png`, fullPage: true });
        }
    });

    test('Register a new user via API', async ({ page, request }) => {
        const user = {
            userName: faker.internet.username(),
            password: "$Teste123",
        }

        const acAPI = new AccountAPI(page.request);
        await acAPI.createUserViaAPI(user);
    })
})
