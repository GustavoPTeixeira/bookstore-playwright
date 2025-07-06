import { Locator, Page, expect } from '@playwright/test';

export class BookstorePage {
    page: Page;
    bookList: Locator;
    bookItem: Locator;
    searchInput: Locator;
    searchButton: Locator;
    listNextPage: Locator;
    listPreviousPage: Locator;
    listRows: Locator;

    constructor(page: Page) {
        this.page = page;
        this.bookList = page.locator('.rt-tbody');
        this.bookItem = this.bookList.locator('.rt-tr-group');
        this.searchInput = page.locator('#searchBox');
        this.searchButton = page.locator('#basic-addon2');
        this.listNextPage = page.locator('.-next');
        this.listPreviousPage = page.locator('.-previous');
        this.listRows = page.locator('[aria-label="rows per page"]');
    }

    async open(){
        await this.page.goto('/books');
        await expect(this.page).toHaveURL(/.*books/);
    }

    async searchBook(bookName: string) {
        await this.searchInput.fill(bookName);
        await this.searchButton.click();
        await expect(this.bookList).toContainText(bookName);
    }

    


}