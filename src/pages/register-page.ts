import { Locator, Page, expect, APIRequestContext } from '@playwright/test';
export interface Credentials {  userName: string; password: string; }
export interface User { userId: string; username: string; books: any[]}
import * as dotenv from 'dotenv';
dotenv.config({ path: './env/.env' });

export class RegisterPage {
    page: Page;
    userName: Locator;
    password: Locator;
    confirmPassword: Locator;
    captcha: Locator;
    btnRegister: Locator;
    successModal: Locator;
    firstName: Locator;
    lastName: Locator; 

    constructor(page: Page) {
        this.page = page;
        this.userName = page.locator('#userName');
        this.password = page.locator('#password');
        this.firstName = page.locator('#firstname');
        this.lastName = page.locator('#lastname');
        this.confirmPassword = page.locator('#confirmPassword');
        this.captcha = page.frameLocator('iframe[title="reCAPTCHA"]').locator('#recaptcha-anchor');
        this.btnRegister = page.locator('#register');
        this.successModal = page.locator('#name:has-text("User Register Successfully")');
    }

    async open(){
        await this.page.goto('/register');
        await expect(this.page).toHaveURL(/.*register/);
    }

}