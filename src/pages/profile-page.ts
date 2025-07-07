import { Page, Locator } from '@playwright/test';

export class ProfilePage {
    page: Page;
    userName: Locator;
    rows: Locator;
    deleteBook: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userName = page.locator('#userName-value');
        this.rows = page.locator('.rt-tr-group');
        this.deleteBook = page.locator('#delete-record-undefined');
    }

    async open() {
        await this.page.goto('/profile');
        await this.page.waitForURL(/.*profile/);
    }

    async getUserName(): Promise<string> {
        return await this.userName.textContent() || '';
    }

    bookRow(bookName: string): Locator {
        return this.rows.filter({ hasText: bookName });
    }

}