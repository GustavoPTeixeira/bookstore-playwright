import { Locator, Page, expect } from '@playwright/test';

export class BookDetailsPage {
    page: Page;
    isbn: Locator;
    bookTitle: Locator;
    bookSubtitle: Locator;
    bookAuthor: Locator;
    bookPublisher: Locator;
    bookTotalPages: Locator;
    bookDescription: Locator;
    bookWebsite: Locator;
    btnBackToBookstore: Locator;

    constructor(page: Page){
        this.page = page;
        this.isbn = page.locator('#isbn');
        this.bookTitle = page.locator('#title');
        this.bookSubtitle = page.locator('#subtitle');
        this.bookAuthor = page.locator('#author');
        this.bookPublisher = page.locator('#publisher');
        this.bookTotalPages = page.locator('#pages');
        this.bookDescription = page.locator('#description');
        this.bookWebsite = page.locator('#website');
        this.btnBackToBookstore = page.locator('button:has-text("Back To Bookstore")');
    }

    async open(isbn: string) {
        await this.page.goto(`/profile?book=${isbn}`);
        await expect(this.page).toHaveURL(new RegExp(`/profile?book=${isbn}`));
    }

    async verifyBookDetails(book: {isbn: string; title: string; subtitle: string; author: string; publisher: string; totalPages: number; description: string; website: string}) {
        await expect(this.isbn).toHaveText(book.isbn);
        await expect(this.bookTitle).toHaveText(book.title);
        await expect(this.bookSubtitle).toHaveText(book.subtitle);
        await expect(this.bookAuthor).toHaveText(book.author);
        await expect(this.bookPublisher).toHaveText(book.publisher);
        await expect(this.bookTotalPages).toHaveText(book.totalPages.toString());
        await expect(this.bookDescription).toHaveText(book.description);
        await expect(this.bookWebsite).toHaveAttribute('href', book.website);
    }

    async goBackToBookstore() {
        await this.btnBackToBookstore.click();
        await expect(this.page).toHaveURL(/.*profile/);
    }


}