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

    constructor(page: Page, private request: APIRequestContext, private base = process.env.BASE_URL_API!) {
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

    async registerViaUI(user: {userName: string; password: string, firstName: string, lastName: string}) {
        await this.userName.fill(user.userName);
        await this.password.fill(user.password);
        await this.firstName.fill(user.firstName);
        await this.lastName.fill(user.lastName);
        await this.captcha.click();
        await this.btnRegister.click();
        await expect(this.page.locator('#name')).toHaveText('User Register Successfully');
    }

    async createUser(c: Credentials): Promise<User> {
            const response = await this.request.post(`${this.base}/Account/v1/User`, { data: c });
            expect(response.ok()).toBeTruthy();
            return response.json();
        }
}