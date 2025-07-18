import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { RegisterPage } from '../pages/register-page';
import { BookstorePage } from '../pages/bookstore-page';
import { BookDetailsPage } from '../pages/book-details-page';
import { ProfilePage } from '../pages/profile-page';
import { AccountAPI } from '../api/account.api';
import { BookstoreAPI } from '../api/bookstore.api';

export type Fixtures = {
    loginPage: LoginPage;
    registerPage: RegisterPage;
    bookstorePage: BookstorePage;
    bookDetailsPage: BookDetailsPage;
    accountAPI: AccountAPI;
    bookstoreAPI: BookstoreAPI;
    profilePage: ProfilePage;
}

export const test = base.extend<Fixtures>({
    // UI Fixtures
    loginPage: async ({ page }, use) =>{
        await use(new LoginPage(page));
    },

    registerPage: async ({ page }, use) => {
        await use(new RegisterPage(page));
    },

    bookstorePage: async ({ page }, use) => {
        await use(new BookstorePage(page));
    },

    bookDetailsPage: async ({ page }, use) => {
        await use(new BookDetailsPage(page));
    },

    // API Fixtures
    accountAPI: async ({ request }, use) => {
        await use(new AccountAPI(request));
    },

    bookstoreAPI: async ({ request }, use) => {
        await use(new BookstoreAPI(request));
    },

    profilePage: async ({ page }, use) => {
        await use(new ProfilePage(page));
    }

})

export { expect } from '@playwright/test';
