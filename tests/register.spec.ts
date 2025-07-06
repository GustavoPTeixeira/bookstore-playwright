import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { RegisterPage } from '../src/pages/register.page';


test.describe('Register Test', () => {
    test.afterEach(async ({ page }, testInfo) => {
        if (testInfo.status === 'passed') {
            await page.screenshot({ path: `screenshots/${testInfo.title}-passed.png`, fullPage: true });
        }
    });

    test('Register a new user via UI', async ({ page }) => {
        const user = {
            userName: faker.internet.username(),
            password: faker.internet.password(),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
        }

        const rp = new RegisterPage(page, page.request);
        await rp.open();
        await rp.registerViaUI(user);
    })

    test('Register a new user via API', async ({ page }) => {
        const user = {
            userName: faker.internet.username(),
            password: faker.internet.password(),
        }

        const rp = new RegisterPage(page, page.request);
        await rp.createUser(user);
    })

})